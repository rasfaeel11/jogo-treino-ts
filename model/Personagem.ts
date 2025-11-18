export abstract class Personagem {
    constructor(
        public nome: string,
        private _classe: string,
        protected hp: number,
        protected hpMax: number,
        protected mana: number,
        protected forca: number,
        private _qtdPot: number
        
    ){
      // this etc bla bla bla  
    }

    public getForca(): number { return this.forca; }
    public gethpMax(): number { return this.hpMax; }
    public gethp(): number {return this.hp; }
    public setHp(novoHp: number): void {
    this.hp = novoHp;
    }
    public getQtdPot(): number {
      return this._qtdPot;
    }
    public setQtdPot(value: number) {
      this._qtdPot = value;
    }

     protected getClasse(): string {
      return this._classe;
    }
    protected setClasse(value: string) {
      this._classe = value;
    }

}