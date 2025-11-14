import { Personagem } from "../model/Personagem";


function logicaDano(personagem: Personagem): number{
    const d20 = rolarDadodd20();
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

function rolarDadodd20(): number{
    const d20 = Math.floor(Math.random() * 20) + 1;
    return d20;
}

export function atacar(atacante: Personagem, alvo:Personagem): number{
    const hpAtualDoAlvo = alvo.gethp();
    const dano = logicaDano(atacante);
    const novoHp = hpAtualDoAlvo - dano;
    alvo.setHp(novoHp) ;
    return novoHp;
}

export function curar(alvo: Personagem): number {
    if (alvo.getQtdPot() <= 0) {
        return alvo.gethp();
    }
    alvo.setQtdPot(alvo.getQtdPot() - 1);
    const d20 = rolarDadodd20();

    if (d20 === 1) {
        return alvo.gethp(); 
    }
    let curar = d20 + 3;
    if (d20 === 20) {
        curar *= 2;
    }
    const hpAtual = alvo.gethp();
    const hpMax = alvo.gethpMax();
    let novaVida = hpAtual + curar;

    if (novaVida > hpMax) {
        novaVida = hpMax;
    }
    alvo.setHp(novaVida);
    return novaVida;
}