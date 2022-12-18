class Mes {

    constructor(nome, saldoInicial) {
        if (nome === '') throw new Error("Mes invalido: O nome e obrigatorio");
        this.nome = nome;
        this.saldoInicial = saldoInicial;
        this.totalizadorDoMes = { saldo: 0, saldoInicial, juros: 0, rendimentos: 0, receitas: 0, despesas: 0, distribuicaoDeDespesas: [] };
        this.lancamentos = [];
    }

    adicionarLancamento (lancamento) {
        this.lancamentos.push(lancamento);
    }

    distribuirDespesas () {
        const distribuicaoDeDespesas = [];
        for (const lancamento of this.lancamentos) {
            if (lancamento.tipo === "despesa") {
                const percentual = arredondar((lancamento.valor/this.totalizadorDoMes.despesas)*100);
                distribuicaoDeDespesas.push({ categoria: lancamento.categoria, percentual });
            }
        }
        return distribuicaoDeDespesas
    }

    calcularSaldo () {
        this.totalizadorDoMes.saldo = this.saldoInicial;
        for (const lancamento of this.lancamentos) {
            if (lancamento.tipo === "receita") {
                this.totalizadorDoMes.saldo += lancamento.valor;
                this.totalizadorDoMes.receitas += lancamento.valor;
            }
            if (lancamento.tipo === "despesa") {
                this.totalizadorDoMes.saldo -= lancamento.valor;
                this.totalizadorDoMes.despesas += lancamento.valor;
            }
        }
        this.totalizadorDoMes.distribuicaoDeDespesas = this.distribuirDespesas();
        const estaNegativo = this.totalizadorDoMes.saldo < 0;
        if (estaNegativo) {
            this.totalizadorDoMes.juros = this.calcularJuros(this.totalizadorDoMes.saldo);
            this.totalizadorDoMes.saldo = arredondar(this.totalizadorDoMes.saldo + this.totalizadorDoMes.juros);
        } else {
            this.totalizadorDoMes.rendimentos = this.calcularRendimentos(this.totalizadorDoMes.saldo);
            this.totalizadorDoMes.saldo = arredondar(this.totalizadorDoMes.saldo + this.totalizadorDoMes.rendimentos);
        } 
    }

    calcularJuros (valor) {
        return arredondar(valor * 0.1);
    }
    
    calcularRendimentos (valor) {
        return arredondar(valor * 0.005);				}
}

