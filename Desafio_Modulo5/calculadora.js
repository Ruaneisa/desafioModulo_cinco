const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let listaNumeros = [];

let mensagem = "A lista de números está vazia.";

function novaLista() {
    rl.question("Digite os números (separados por vírgula): ", (input) => {
        const newNum = input.split(',').map(valor => parseFloat(valor.trim()));
        
        if (newNum.some(isNaN) || newNum.some(valor => valor <= 0)) {
            console.log('Número inválido. O valor deve ser um número positivo.')
            inputMenu();
            return;
        }
        listaNumeros = newNum; 
        console.log('Números adicionados: ', listaNumeros);

        inputMenu();
    });
}

function calculoMediaLista () {
    if (listaNumeros.length === 0) {
        console.log(mensagem);
        inputMenu();
        return;
    }
    const soma = listaNumeros.reduce((acc, val) => acc + val, 0);
    const media = soma / listaNumeros.length;
    console.log("A média da lista é:", media);

    inputMenu();

}

function calculoMedianaLista () {
    if (listaNumeros.length === 0) {
        console.log(mensagem);
        inputMenu();
        return;
    }
    listaNumeros.sort((a, b) => a - b);

    if (listaNumeros.length % 2 === 0) { 
        const mediana1 = listaNumeros[listaNumeros.length / 2 - 1];
        const mediana2 = listaNumeros[listaNumeros.length / 2];
        const mediana = (mediana1 + mediana2) / 2;
        console.log('A mediana da lista é: ', mediana);
    } else { 
        const mediana = listaNumeros[Math.floor(listaNumeros.length / 2)];
        console.log('A mediana da lista é: ', mediana);
    }

    inputMenu();
}

function calculoModaLista () {
    if (listaNumeros.length === 0) {
        console.log(mensagem);
        inputMenu();
        return;
    }

    const counts = {};

    listaNumeros.forEach(num => {
        counts[num] = (counts[num] || 0) + 1;
    });

    let maxCount = 0;
    let mode = [];

    for (let num in counts) {
        if (counts[num] > maxCount) {
            maxCount = counts[num];
            mode = [num];
        } else if (counts[num] === maxCount) {
            mode.push(num);
        }
    }

    console.log('A moda da lista é: ', mode);

    inputMenu();
}

function inputMenu() {
    console.log('\n\n###################################');
    console.log('1 -  Adicionar uma nova lista');
    console.log('2 -  Calcular média da lista');
    console.log('3 -  Calcular a mediana da lista');
    console.log('4 -  Calcular a moda da lista');
    console.log('5 -  Sair');
    console.log('#######################################');
    rl.question('Digite uma opção: ', (opção) => {
        switch (opção.trim()) {
            case '1':
                novaLista();
                break;
            case '2':
                calculoMediaLista();
                break;
            case '3':
                calculoMedianaLista();
                break;
            case '4':
                calculoModaLista();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Opção inválida!Por favor, tente novamente.');
                inputMenu();
                break;
        }
    });
}

inputMenu();