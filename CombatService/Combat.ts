import { Personagem } from "../model/Personagem";


function logicaDano(personagem: Personagem): number{
    const d20 = Math.floor(Math.random() * 20) + 1;
    if(d20 === 1){
        return 0;
    }
    let danoTotal = d20 + personagem.getForca();
    if(d20 === 20){
        danoTotal *= 2;
        return danoTotal;
    }
    return danoTotal;
}

export function atacar(atacante: Personagem, alvo:Personagem): number{
    const hpAtualDoAlvo = alvo.gethp();
    const dano = logicaDano(atacante);
    const novoHp = hpAtualDoAlvo - dano;
    alvo.setHp(novoHp) ;
    return novoHp;
}