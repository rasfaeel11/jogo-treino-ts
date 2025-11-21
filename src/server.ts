import express from 'express';
import { GameLoop } from '../service/BattleManager/GameLoop';

const app = express();
app.use(express.json()); 


let jogo: GameLoop | null = null; 

// 1. Rota para INICIAR o jogo
// POST http://localhost:3000/iniciar
app.post('/iniciar', (req, res) => {
    const { nome, classe } = req.body; // Pega dados do JSON enviado

    if (!nome || !classe) {
        return res.status(400).json({ erro: "Nome e Classe são obrigatórios!" });
    }

    jogo = new GameLoop();
    const personagem = jogo.iniciarJogo(nome, Number(classe));

    res.json({
        mensagem: "Jogo iniciado!",
        jogador: personagem
    });
});

// 2. Rota para JOGAR um turno
// POST http://localhost:3000/jogar
app.post('/jogar', (req, res) => {
    if (!jogo) {
        return res.status(400).json({ 
            erro: "O jogo não existe ou já acabou! Faça um POST em /iniciar para começar um novo." 
        });
    }

    const { acao } = req.body;

    // Processa o turno
    const jogoContinua = jogo.processarTurno(Number(acao));

    // Prepara a resposta padrão
    const resposta = {
        jogoContinua: jogoContinua,
        heroi: jogo.getPrincipal(),
        inimigo: jogo.getAlvo(),
        mensagem: "Turno processado."
    };

    // --- A CORREÇÃO ESTÁ AQUI ---
    if (!jogoContinua) {
        // Se o jogo acabou (false), a gente avisa e LIMPA a memória
        resposta.mensagem = "O Jogo Acabou! O estado foi resetado.";
        
        // Reseta a variável global para null
        jogo = null; 
    }

    res.json(resposta);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('🚀 Servidor RPG rodando em http://localhost:3000');
});