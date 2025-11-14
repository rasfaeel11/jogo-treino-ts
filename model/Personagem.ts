export abstract class Personagem {
    constructor(
        public nome: string,
        protected classe: string,
        protected hp: number,
        public hpMax: number,
        protected mana: number,
        public forca: number
        
    ){
      // this etc bla bla bla  
    }
}