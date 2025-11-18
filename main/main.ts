import { iniciarJogo, iniciarCombate, ask } from "../service/BattleManager/GameLoop";

(async () => {
    const nome = await ask("Escolha seu Nome de Jogador: ");
    console.log("[1] Guerreiro");
    console.log("[2] Mago");

    const escolhaStr = await ask("Escolha sua Classe: ");
    const escolha = Number(escolhaStr);

    iniciarJogo(nome, escolha);
    iniciarCombate();
})();