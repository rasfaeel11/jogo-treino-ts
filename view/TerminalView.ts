export const GameUI = {
    exibirStatus(principal: any, alvo: any) {
        console.log(`\nSeu HP: ${principal.gethp()}/${principal.gethpMax()}`);
        console.log(`HP do Inimigo: ${alvo.gethp()}/${alvo.gethpMax()}`);
    },

    exibirAcoes() {
        console.log("\n1 - Atacar");
        console.log("2 - Curar");
    },

    mensagem(msg: string) {
        console.log(msg);
    }
};
