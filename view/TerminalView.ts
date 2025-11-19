export const GameUI = {
    exibirStatus(principal: any, alvo: any) {
        console.log(`\nSeu HP: ${principal.gethp()}/${principal.gethpMax()}`);
        console.log(`Sua MANA: ${principal.getMana()}/${principal.getManaMax()}`)
        console.log("===============================================================")
        console.log(`\n HP do Inimigo: ${alvo.gethp()}/${alvo.gethpMax()}`);
        console.log(` Mana do Inimigo: ${alvo.getMana()}/${alvo.getManaMax()}`)
    },

    exibirAcoes() {
        console.log("1 - Atacar");
        console.log("2 - Curar");
        console.log("3 - Ataque Magico")
    },

    mensagem(msg: string) {
        console.log(msg);
    }
};
