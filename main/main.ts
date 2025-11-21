import { GameLoop } from "../service/BattleManager/GameLoop";

(async () => {
    const jogo = new GameLoop();
    const nome = await jogo.ask("Escolha seu Nome de Jogador: ");
    console.log("[1] Guerreiro");
    console.log("[2] Mago");

    const escolhaStr = await jogo.ask("Escolha sua Classe: ");
    const escolha = Number(escolhaStr);

    jogo.iniciarJogo(nome, escolha);
    jogo.iniciarCombate();
})();