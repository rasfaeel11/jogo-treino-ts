import express from 'express';
import { GameLoop } from '../service/BattleManager/GameLoop';
import { AcaoCombate, ClassesJogo } from '../model/GameTypes';

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
    const personagem = jogo.iniciarJogo(nome, classe);

    const classeValidas = ['GUERREIRO', 'MAGO'];
    if (!classeValidas.includes(classe)) {
        return res.status(400).json({ 
            erro: `Ação inválida! Use: ${classeValidas.join(', ')}` 
        });
    }

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
            erro: "O jogo não existe ou já acabou! Faça um POST em /iniciar." 
        });
    }

    const { acao } = req.body;


    const acoesValidas = ['ATACAR', 'CURAR', 'MAGIA', 'FUGIR'];
    if (!acoesValidas.includes(acao)) {
        return res.status(400).json({ 
            erro: `Ação inválida! Use: ${acoesValidas.join(', ')}` 
        });
    }
    const resultado = jogo.processarTurno(acao as AcaoCombate);

    const resposta = {
        jogoContinua: resultado.jogoContinua,
        // AQUI ESTÁ A MÁGICA: Enviamos o histórico do turno
        historicoDeBatalha: resultado.logs, 
        heroi: jogo.getPrincipal(),
        inimigo: jogo.getAlvo()
    };

    if (!resultado.jogoContinua) {
        // Se acabou, adicionamos um log final se quiser
        jogo = null; 
    }

    res.json(resposta);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('🚀 Servidor RPG rodando em http://localhost:3000');
});