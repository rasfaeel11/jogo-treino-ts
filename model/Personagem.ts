export abstract class Personagem {
    constructor(
        public nome: string,
        protected _classe: string,
        protected hp: number,
        protected hpMax: number,
        protected _mana: number,
        protected forca: number,
        protected _qtdPot: number,
        private _inteligencia: number,
        private _manaMax: number
        
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
    public getMana(): number {
    return this._mana;
  }
  public setMana(value: number) {
    this._mana = value;
  }
    public getInteligencia(): number {
    return this._inteligencia;
  }
  public setInteligencia(value: number) {
    this._inteligencia = value;
  }

    public getManaMax(): number {
    return this._manaMax;
  }
  protected setManaMax(value: number) {
    this._manaMax = value;
  }


}