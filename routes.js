import express from "express";

const router = express.Router();

// ROTAS

// Página inicial
router.get('/', async (req, res) => {
    const avisos = [
        // ... (mantenha os 4 objetos exatamente como estão)
    ];

    res.render('index', { basePath: '/mural', titulo: 'Castro Agenda', avisos });
});

export default router;