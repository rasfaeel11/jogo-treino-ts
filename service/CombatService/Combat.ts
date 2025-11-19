import { Personagem } from "../../model/Personagem";


const critico = 20;
const falha = 1;

function logicaDanoFisico(personagem: Personagem): number{
    const d20 = rolarDadodd20();
    if(d20 === falha){
        return 0;
    }
    let danoTotal = d20 + personagem.getForca();
    if(d20 === critico){
        danoTotal *= 2;
        return danoTotal;
    }
    return danoTotal;
}

function logicaDanoMagico(personagem: Personagem): number{
    const gastoManoAtaque = 5;
    if(personagem.getMana() < gastoManoAtaque) return 0;
    let novaMana = personagem.getMana() - gastoManoAtaque;
    personagem.setMana(novaMana);
    const d20 = rolarDadodd20();
    if(d20 === falha) return 0;
    
    let danoTotal = d20 + personagem.getInteligencia();
    if(d20 === critico){
        danoTotal *=2;
    }
    return danoTotal;
}

function rolarDadodd20(): number{
    const d20 = Math.floor(Math.random() * 20) + 1;
    return d20;
}

export function atacar(atacante: Personagem, alvo:Personagem): number{
    const hpAtualDoAlvo = alvo.gethp();
    const dano = logicaDanoFisico(atacante);
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

export function ataqueMagico(atacante: Personagem, alvo: Personagem): number{
    const hpAtualDoAlvo = alvo.gethp();
    const dano = logicaDanoMagico(atacante);
    const novoHp = hpAtualDoAlvo - dano;
    alvo.setHp(novoHp);
    return novoHp;
}