const postList = document.querySelector('#post-list');
const searchInput = document.querySelector('#post-search');
const filterTabs = [...document.querySelectorAll('.filter-tab')];
const emptyState = document.querySelector('#empty-state');
const postForm = document.querySelector('#post-form');
const expandedComposer = document.querySelector('.composer-expanded');
const postTitle = document.querySelector('#post-title');
const postMessage = document.querySelector('#post-message');
const postCategory = document.querySelector('#post-category');
let activeFilter = 'todos';

function updateActiveNavigation() {
    const activeHash = window.location.hash || '#inicio';
    document.querySelectorAll('.nav-link').forEach((link) => {
        const selected = link.hash === activeHash;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

updateActiveNavigation();
window.addEventListener('hashchange', updateActiveNavigation);

function updatePosts() {
    const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
    let visiblePosts = 0;

    postList.querySelectorAll('.post-card').forEach((post) => {
        const categoryMatches = activeFilter === 'todos' || post.dataset.category === activeFilter;
        const searchMatches = post.dataset.search.includes(query);
        const visible = categoryMatches && searchMatches;
        post.hidden = !visible;
        if (visible) visiblePosts += 1;
    });

    emptyState.hidden = visiblePosts !== 0;
}

filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        activeFilter = tab.dataset.filter;
        filterTabs.forEach((item) => {
            const selected = item === tab;
            item.classList.toggle('selected', selected);
            item.setAttribute('aria-selected', String(selected));
        });
        updatePosts();
    });
});

searchInput.addEventListener('input', updatePosts);

document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        event.preventDefault();
        searchInput.focus();
    }
    if (event.key === 'Escape' && document.activeElement === searchInput) searchInput.blur();
});

postForm.addEventListener('click', (event) => {
    if (event.target.closest('.publish-button, .composer-prompt')) {
        expandedComposer.hidden = false;
        postTitle.focus();
    }
});

postForm.addEventListener('submit', (event) => {
    if (event.submitter?.classList.contains('submit-post')) {
        event.preventDefault();
        const title = postTitle.value.trim();
        const message = postMessage.value.trim();
        if (!title || !message) {
            (title ? postMessage : postTitle).focus();
            return;
        }

        const categoryLabels = {
            comunicados: ['Comunicado', 'comunicados'],
            eventos: ['Evento', 'eventos'],
            celebracoes: ['Conquista', 'celebracoes']
        };
        const [label, category] = categoryLabels[postCategory.value];
        const card = document.createElement('article');
        card.className = 'post-card';
        card.dataset.category = category;
        card.dataset.search = `${title} ${message} Ana Ribeiro`.toLocaleLowerCase('pt-BR');

        const heading = document.createElement('div');
        heading.className = 'post-heading';
        const avatar = document.createElement('span');
        avatar.className = 'author-avatar avatar-coral';
        avatar.textContent = 'AR';
        const author = document.createElement('div');
        author.className = 'author-meta';
        const name = document.createElement('strong');
        name.textContent = 'Ana Ribeiro · Educadora';
        const time = document.createElement('span');
        time.textContent = 'Agora mesmo';
        author.append(name, time);
        heading.append(avatar, author);

        const content = document.createElement('div');
        content.className = 'post-content';
        const tag = document.createElement('span');
        tag.className = `post-tag tag-${category}`;
        const tagDot = document.createElement('span');
        tag.append(tagDot, document.createTextNode(label));
        const headingText = document.createElement('h2');
        headingText.textContent = title;
        const bodyText = document.createElement('p');
        bodyText.textContent = message;
        content.append(tag, headingText, bodyText);

        const footer = document.createElement('footer');
        footer.className = 'post-footer';
        footer.innerHTML = '<button class="reaction-button" type="button" aria-pressed="false"><span aria-hidden="true">♡</span> <span class="reaction-count">0</span></button><button class="comment-button" type="button"><span aria-hidden="true">◌</span> Comentar</button><button class="share-button" type="button" aria-label="Compartilhar aviso"><span aria-hidden="true">↗</span></button>';
        card.append(heading, content, footer);
        postList.prepend(card);
        postTitle.value = '';
        postMessage.value = '';
        expandedComposer.hidden = true;
        activeFilter = 'todos';
        filterTabs.forEach((tab) => {
            const selected = tab.dataset.filter === 'todos';
            tab.classList.toggle('selected', selected);
            tab.setAttribute('aria-selected', String(selected));
        });
        searchInput.value = '';
        updatePosts();
    }
});

postList.addEventListener('click', (event) => {
    const reaction = event.target.closest('.reaction-button');
    if (reaction) {
        const liked = reaction.getAttribute('aria-pressed') === 'true';
        const count = reaction.querySelector('.reaction-count');
        reaction.setAttribute('aria-pressed', String(!liked));
        reaction.classList.toggle('liked', !liked);
        count.textContent = String(Number(count.textContent) + (liked ? -1 : 1));
    }

    if (event.target.closest('.share-button')) {
        const title = event.target.closest('.post-card').querySelector('h2').textContent;
        if (navigator.share) navigator.share({ title, url: window.location.href });
        else if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
    }
});