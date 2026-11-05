import express from "express";

const app = express();

// ROTAS

// Página inicial

app.get('/', async (req, res) => {
    const avisos = [
        {
            categoria: 'comunicados',
            rotulo: 'Comunicado',
            titulo: 'Feira de Ciências: inscrições abertas',
            texto: 'As turmas já podem inscrever seus projetos para a nossa feira anual. Traga uma ideia, faça perguntas e venha descobrir junto com a gente.',
            autor: 'Coordenação pedagógica',
            iniciais: 'CP',
            horario: 'Hoje, 09:15',
            cor: 'coral',
            destaque: true
        },
        {
            categoria: 'eventos',
            rotulo: 'Evento',
            titulo: 'Sábado de leitura na biblioteca',
            texto: 'Neste sábado, às 10h, vamos abrir a biblioteca para uma manhã de histórias, troca de livros e leitura em família. Todo mundo é bem-vindo!',
            autor: 'Marina Costa · Bibliotecária',
            iniciais: 'MC',
            horario: 'Hoje, 08:40',
            cor: 'verde',
            destaque: false
        },
        {
            categoria: 'celebracoes',
            rotulo: 'Conquista',
            titulo: 'Nossa horta ganhou novos moradores!',
            texto: 'As turmas do 3º ano plantaram mudas de manjericão, alface e tomate. Passe pelo pátio para acompanhar de perto esse projeto cheio de vida.',
            autor: 'Turma do 3º ano · Prof. Joana',
            iniciais: '3A',
            horario: 'Ontem, 15:20',
            cor: 'amarelo',
            destaque: false
        },
        {
            categoria: 'comunicados',
            rotulo: 'Lembrete',
            titulo: 'Achados e perdidos: confira até sexta',
            texto: 'Casacos, lancheiras e garrafas estão na recepção. Os itens sem identificação serão encaminhados para doação no fim do mês.',
            autor: 'Equipe da recepção',
            iniciais: 'ER',
            horario: 'Ontem, 11:05',
            cor: 'azul',
            destaque: false
        }
    ];

    res.render('index', { basePath: '/profissao', titulo: 'Castro Agenda', avisos });
});

export default app;
