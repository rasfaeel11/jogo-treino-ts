import { Guerreiro  } from "../model/Guerreiro";
import { Mago } from "../model/Mago";
import { atacar } from "../CombatService/Combat";

const heroi = new Guerreiro("Arthur");
const vilao = new Mago("Merlin");
console.log(heroi.nome);
console.log(vilao.nome);

console.log(atacar(heroi, vilao))