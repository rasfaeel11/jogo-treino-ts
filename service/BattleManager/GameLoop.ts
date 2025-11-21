import { atacar, ataqueMagico, curar } from "../CombatService/Combat";
import { Personagem } from "../../model/Personagem";
import { Guerreiro } from "../../model/Guerreiro";
import { Mago } from "../../model/Mago";
import { GameUI } from "../../view/TerminalView";

export class GameLoop {
    private principal!: Personagem;
    private alvo!: Personagem;

    public iniciarJogo(nome: string, escolhaClasse: number): Personagem {
        switch (escolhaClasse) {
            case 1:
                this.alvo = new Mago("Merlin");
                this.principal = new Guerreiro(nome);
                return this.principal;

            case 2:
                this.alvo = new Guerreiro("Arthur");
                this.principal = new Mago(nome);
                return this.principal;

            default:
                throw new Error("Classe inválida.");
        }
    }

    public getPrincipal(): Personagem {
        return this.principal;
    }

    public getAlvo(): Personagem {
        return this.alvo;
    }

    public processarTurno(escolha: number): boolean {
        this.turnoJogador(escolha);

        if (this.alvo.gethp() <= 0) {
            GameUI.mensagem("\n🎉 Você venceu o combate!");
            return false;
        }

        this.turnoInimigo();

        if (this.principal.gethp() <= 0) {
            GameUI.mensagem("\n💀 Você foi derrotado...");
            return false;
        }

        return true;
    }

    private turnoJogador(escolha: number) {
        switch (escolha) {
            case 1:
                return atacar(this.principal, this.alvo);

            case 2:
                return curar(this.principal);

            case 3:
                return ataqueMagico(this.principal, this.alvo);

            default:
                console.log("Escolha inválida!");
        }
    }

    private turnoInimigo() {
        const chance = Math.random();

        if (
            this.alvo.gethp() <= 0.15 * this.alvo.gethpMax() &&
            this.alvo.getQtdPot() > 0 &&
            chance < 0.3
        ) {
            let cura = curar(this.alvo);
            GameUI.mensagem("\nO inimigo usa uma poção e curou " + cura);
            return cura;
        } else if (this.alvo.getMana() > 5 && chance < 0.7) {
            let dano = ataqueMagico(this.alvo, this.principal);
            GameUI.mensagem("\nO inimigo usou um Ataque Magico e causou " + dano + " de dano magico!");
            return dano;
        }

        GameUI.mensagem("\nO inimigo te ataca com um Ataque Fisico!");
        return atacar(this.alvo, this.principal);
    }
}