export abstract class Personagem {
    constructor(
        public nome: string,
        protected classe: string,
        protected hp: number,
        protected hpMax: number,
        protected mana: number,
        protected forca: number
        
    ){
      // this etc bla bla bla  
    }

    public getForca(): number { return this.forca; }
    public gethpMax(): number { return this.hpMax; }
    public gethp(): number {return this.hp; }
    public setHp(novoHp: number): void {
    this.hp = novoHp;
    }
}