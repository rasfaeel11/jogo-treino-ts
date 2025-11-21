import readline from "readline";
import { GameLoop } from "../service/BattleManager/GameLoop";
import { GameUI } from "../view/TerminalView";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

(async () => {
    const jogo = new GameLoop();
    
    const nome = await ask("Escolha seu Nome de Jogador: ");
    console.log("[1] Guerreiro");
    console.log("[2] Mago");

    const escolhaStr = await ask("Escolha sua Classe: ");
    const escolha = Number(escolhaStr);

    jogo.iniciarJogo(nome, escolha);
    
    GameUI.mensagem("\n=== COMBATE INICIADO ===");

    let jogoRodando = true;

    while (jogoRodando) {
        const principal = jogo.getPrincipal();
        const alvo = jogo.getAlvo();

        GameUI.exibirStatus(principal, alvo);
        GameUI.exibirAcoes();

        const entrada = await ask("Escolha sua ação: ");
        const acao = Number(entrada);

        jogoRodando = jogo.processarTurno(acao);
    }

    rl.close();
})();