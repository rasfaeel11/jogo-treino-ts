import { atacar, curar } from "../CombatService/Combat";
import { Personagem } from "../../model/Personagem";
import { Guerreiro } from "../../model";
import { Mago } from "../../model";

let principal: Personagem;
let alvo: Personagem;

function iniciarJogo(nome: string, escolhaClasse: number): Personagem{
    try{
        switch(escolhaClasse){
        case 1:
            alvo = new Mago("merlin");
            return principal = new Guerreiro(nome);
        case 2:
            alvo = new Guerreiro("Arthur");
            return principal = new Mago(nome);
        default:
            throw new Error("classe invalida")
    }
    }
    return principal;
}


function turnoJogador(escolha: number){
    switch (escolha){
        case 1:
            return atacar(principal, alvo);
        case 2:
            return curar(principal);
    }
}