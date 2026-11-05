import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import router from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const port = process.env.PORT || 3003;
const BASE = '/profissao';

const app = express();

// Assets sob /profissao  →  /profissao/css/..., /profissao/js/...
app.use(BASE, express.static(join(__dirname, 'public')));

// Parse do body (formulário) sob /profissao
app.use(BASE, express.urlencoded({ extended: true }));
app.use(BASE, express.json());

// EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.locals.basePath = BASE;

// Rotas do router sob /profissao
app.use(BASE, router);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}${BASE}`);
});