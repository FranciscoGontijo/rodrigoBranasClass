class Ano {
    constructor () {
        this.meses = [];
    }

    adicionarMes (mes) {
        this.meses.push(mes)    
    }

    calcularSaldo () {
        let saldoTotal = 0;
        for (const mes of this.meses) {
            console.log(mes);
            saldoTotal += mes.totalizador.saldo;
        }
        return saldoTotal;
    }
};