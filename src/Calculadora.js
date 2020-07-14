function getHistory() {
    return document.getElementById("valor-historico").innerText
}

function printHistory(num) {
    document.getElementById("valor-historico").innerText = num;
}

function getOutput() {
    return document.getElementById("valor-resultado").innerText;
}

function printOutput(num) {
    if (num == "") {
        document.getElementById("valor-resultado").innerText = num;
    } else {
        document.getElementById("valor-resultado").innerText = getNumeroFormatado(num);

    }
}

let history = new Array();

function getNumeroFormatado(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var valor = n.toLocaleString("en");
    return valor;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operacao")
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == "limpar") {
            printHistory("");
            printOutput("");
        } else if (this.id == "apagar") {
            var saida = reverseNumberFormat(getOutput().toString());
            if (saida) {
                saida = saida.substring(0, saida.length - 1);
                printOutput(saida);
                history = saida;
            }
        } else {
            var saida = getOutput();
            var historico = getHistory();
            if (saida == "" && historico != "") {
                if (isNaN(historico[historico.length - 1])) {
                    historico = historico.substring(0, historico - 1);
                    history = historico;
                }
            }
            if (saida != "" || historico != "") {
                saida = saida == "" ?
                    saida : reverseNumberFormat(saida);
                historico += saida;
                if (this.id == "=") {
                    try{
                        var resultado = eval(historico);
                        printOutput(resultado);
                        printHistory("");
                        history = resultado;
                    }catch (e) {
                        alert("Erro");
                    }
                } else {
                    historico += this.id;
                    printHistory(historico);
                    printOutput("")
                    history = historico;
                }
            }
        }

    });
}

var numero = document.getElementsByClassName("digito");
for (var j = 0; j < numero.length; j++) {
    numero[j].addEventListener('click', function () {
        {
            var saida = reverseNumberFormat(getOutput());
            if (saida != NaN) {
                saida += this.id;
                printOutput(saida);
                history = saida;
            }
        }
    })
}


