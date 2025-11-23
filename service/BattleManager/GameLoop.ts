import { atacar, ataqueMagico, curar } from "../CombatService/Combat";
import { Personagem } from "../../model/Personagem";
import { Guerreiro } from "../../model/Guerreiro";
import { Mago } from "../../model/Mago";
import { AcaoCombate, ClassesJogo } from "../../model/GameTypes";

// Definindo o que o processarTurno vai devolver
interface ResultadoTurno {
    jogoContinua: boolean;
    logs: string[];
}

export class GameLoop {
    private principal!: Personagem;
    private alvo!: Personagem;
    
    // Nosso "caderninho" de anotações
    private logs: string[] = [];

    // Helper para adicionar mensagens no caderno
    private log(msg: string) {
        this.logs.push(msg);
    }

    public iniciarJogo(nome: string, escolhaClasse: ClassesJogo): Personagem {
        switch (escolhaClasse) {
            case 'GUERREIRO':
                this.alvo = new Mago("Merlin");
                this.principal = new Guerreiro(nome);
                return this.principal;

            case 'MAGO':
                this.alvo = new Guerreiro("Arthur");
                this.principal = new Mago(nome);
                return this.principal;

            default:
                throw new Error("Classe inválida.");
        }
    }

    public getPrincipal(): Personagem { return this.principal; }
    public getAlvo(): Personagem { return this.alvo; }

    public processarTurno(acao: AcaoCombate): ResultadoTurno {
        // 1. Limpa o caderno no início do turno (apaga logs antigos)
        this.logs = [];

        // 2. Turno do Jogador
        this.turnoJogador(acao);

        // 3. Verifica Vitória
        if (this.alvo.gethp() <= 0) {
            this.log("🎉 Você venceu o combate!");
            return { jogoContinua: false, logs: this.logs };
        }

        // 4. Turno do Inimigo
        this.turnoInimigo();

        // 5. Verifica Derrota
        if (this.principal.gethp() <= 0) {
            this.log("💀 Você foi derrotado...");
            return { jogoContinua: false, logs: this.logs };
        }

        // 6. Retorna tudo
        return { jogoContinua: true, logs: this.logs };
    }

    private turnoJogador(acao: AcaoCombate) {
        // Aqui você pode melhorar as mensagens depois
        switch (acao) {
            case 'ATACAR':
                const danoFisico = atacar(this.principal, this.alvo);
                this.log(`Você atacou e causou ${danoFisico} de dano.`);
                break;
            case 'CURAR':
                const cura = curar(this.principal);
                this.log(`Você usou uma poção e recuperou ${cura} de HP.`);
                break;
            case 'MAGIA':
                const danoMagico = ataqueMagico(this.principal, this.alvo);
                this.log(`Você usou magia e causou ${danoMagico} de dano.`);
                break;
            default:
                this.log("Você tropeçou e perdeu a vez (Escolha inválida).");
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
            this.log(`O inimigo usa uma poção e curou ${cura} de HP.`);
            return;
        } 
        
        if (this.alvo.getMana() > 5 && chance < 0.7) {
            let dano = ataqueMagico(this.alvo, this.principal);
            this.log(`O inimigo lançou magia e causou ${dano} de dano!`);
            return;
        }

        let danoFisico = atacar(this.alvo, this.principal);
        this.log(`O inimigo te atacou fisicamente causando ${danoFisico} de dano.`);
    }
}