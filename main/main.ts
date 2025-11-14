import { Guerreiro, Mago } from "../model";
import { atacar, curar } from "../service/";

const heroi = new Guerreiro("Arthur");
const vilao = new Mago("Merlin");
console.log(heroi.nome);
console.log(vilao.nome);

console.log(atacar(heroi, vilao))