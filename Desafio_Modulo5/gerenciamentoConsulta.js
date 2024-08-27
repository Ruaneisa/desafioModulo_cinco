const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let consultas = [];

const menuOptions = {
    '1': inserirNovaConsulta,
    '2': listarConsultas,
    '3': atualizarConsulta,
    '4': cancelarConsulta,
    '5': sairPrograma
};

function mostrarMenu() {
    console.log('\n\n###################################');
    console.log('1 -  Adicionar uma nova consulta');
    console.log('2 -  Listar todas as consultas');
    console.log('3 -  Atualizar uma consulta existente');
    console.log('4 -  Cancelar uma consulta');
    console.log('5 -  Sair');
    console.log('#######################################');
    
    rl.question('Escolha uma opção: ', (opcao) => {
        const action = menuOptions[opcao.trim().toUpperCase()];
        if (action) {
            action();
        } else {
            console.log('Opção inválida! Por favor, tente novamente.');
            mostrarMenu();
        }
    });
}

function obterDadosConsulta(callback, consultaAtual = {}) {
    const campos = [
        { nome: ' Nome do paciente ', chave: ' nome ' },
        { nome: ' Nome do médico ', chave: ' medico ' },
        { nome: ' Data da consulta (dd/mm/yyyy) ', chave: ' data ' },
        { nome: ' Hora da consulta (hh:mm) ', chave: ' hora ' }
    ];
    
    const dados = {};

    function perguntarCampo(index) {
        if (index >= campos.length) {
            callback({ ...consultaAtual, ...dados });
            return;
        }

        const campo = campos[index];
        rl.question(`${campo.nome}${consultaAtual[campo.chave] ? ` (atual: ${consultaAtual[campo.chave]})` : ''}: `, (valor) => {
            dados[campo.chave] = valor.trim() || consultaAtual[campo.chave] || '';
            perguntarCampo(index + 1);
        });
    }

    perguntarCampo(0);
}

function inserirNovaConsulta() {
    obterDadosConsulta((novaConsulta) => {
        consultas.push(novaConsulta);
        console.log('Consulta adicionada com sucesso!');
        mostrarMenu();
    });
}

function listarConsultas() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta foi adicionada.');
    } else {
        console.log('Consultas:');
        consultas.forEach((consulta, index) => {
            console.log(`${index + 1}. ${consulta.nome} - ${consulta.medico} - ${consulta.data} ${consulta.hora}`);
        });
    }
    mostrarMenu();
}

function atualizarConsulta() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta foi adicionada.');
        mostrarMenu();
        return;
    }
    
    rl.question('Informe o número da consulta que deseja atualizar: ', (index) => {
        index = parseInt(index.trim()) - 1;
        if (isNaN(index) || index < 0 || index >= consultas.length) {
            console.log('Consulta inválida.');
            mostrarMenu();
            return;
        }

        obterDadosConsulta((consultaAtualizada) => {
            consultas[index] = consultaAtualizada;
            console.log('Consulta atualizada com sucesso!');
            mostrarMenu();
        }, consultas[index]);
    });
}

function cancelarConsulta() {
    if (consultas.length === 0) {
        console.log('Nenhuma consulta foi adicionada.');
        mostrarMenu();
        return;
    }
    
    rl.question('Informe o número da consulta que deseja cancelar: ', (index) => {
        index = parseInt(index.trim()) - 1;
        if (isNaN(index) || index < 0 || index >= consultas.length) {
            console.log('Consulta inválida.');
            mostrarMenu();
            return;
        }
        
        consultas.splice(index, 1);
        console.log('Consulta cancelada com sucesso!');
        mostrarMenu();
    });
}

function sairPrograma() {
    console.log('Encerrar dia.');
    rl.close();
}

mostrarMenu();
