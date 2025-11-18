import readline from "readline";
import { atacar, curar } from "../CombatService/Combat";
import { Personagem } from "../../model/Personagem";
import { Guerreiro } from "../../model";
import { Mago } from "../../model";
import { GameUI } from "../../view/TerminalView";

let principal: Personagem;
let alvo: Personagem;

// ========================
//  Sistema de Input
// ========================
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function ask(question: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

// ========================
//  Inicialização do Jogo
// ========================
export function iniciarJogo(nome: string, escolhaClasse: number): Personagem {
    switch (escolhaClasse) {
        case 1:
            alvo = new Mago("Merlin");
            return principal = new Guerreiro(nome);

        case 2:
            alvo = new Guerreiro("Arthur");
            return principal = new Mago(nome);

        default:
            throw new Error("Classe inválida.");
    }
}

// ========================
//  Turno do Jogador
// ========================
function turnoJogador(escolha: number) {
    switch (escolha) {
        case 1:
            return atacar(principal, alvo);

        case 2:
            return curar(principal);

        default:
            console.log("Escolha inválida!");
    }
}

// ========================
//  Turno do Inimigo (IA)
// ========================
function turnoInimigo() {
    const chance = Math.random();

    if (
        alvo.gethp() <= 0.30 * alvo.gethpMax() && 
        alvo.getQtdPot() > 0 && 
        chance < 0.3
    ) {
        console.log("\nO inimigo usa uma poção!");
        return curar(alvo);
    }

    console.log("\nO inimigo te ataca!");
    return atacar(alvo, principal);
}

// ========================
//  Loop de Combate
// ========================
export async function iniciarCombate() {

    GameUI.mensagem("\n=== COMBATE INICIADO ===");

    while (alvo.gethp() > 0 && principal.gethp() > 0) {

        GameUI.exibirStatus(principal, alvo);
        GameUI.exibirAcoes();

        const entrada = await ask("Escolha sua ação: ");
        const escolha = Number(entrada);

        turnoJogador(escolha);

        if (alvo.gethp() <= 0) {
            GameUI.mensagem("\n🎉 Você venceu o combate!");
            break;
        }

        turnoInimigo();

        if (principal.gethp() <= 0) {
            GameUI.mensagem("\n💀 Você foi derrotado...");
            break;
        }
    }
    rl.close();
}


