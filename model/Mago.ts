    import { Personagem } from "./Personagem";

    export class Mago extends Personagem {
        constructor(nome: string){
            const classeMago = "Mago";
            const hpMago = 35;
            const manaMago = 30;
            const forcaMago = 2;
            const qtdPot = 3;

            super(
                nome,
                classeMago,
                hpMago,
                hpMago,
                manaMago,
                forcaMago,
                qtdPot
            );

        }
    }