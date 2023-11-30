// src/api/routes/empresas.js
const express = require('express');
const router = express.Router();
const db = require('../database');
const verificarToken = require('./verificarToken');

function converterData(data) {
    if (data !== "") {
        
        // Divide a string da data em dia, mês e ano
        const [dia, mes, ano] = data.split('/');

        // Formata a data no formato americano
        var dataConvertida = `${mes}/${dia}/${ano}`;
        dataConvertida = new Date(dataConvertida);

        dataConvertida = dataConvertida.getUTCFullYear() + '-' +
            ('00' + (dataConvertida.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + dataConvertida.getUTCDate()).slice(-2) + ' ' +
            ('00' + dataConvertida.getUTCHours()).slice(-2) + ':' +
            ('00' + dataConvertida.getUTCMinutes()).slice(-2) + ':' +
            ('00' + dataConvertida.getUTCSeconds()).slice(-2);
        return dataConvertida;
    } else {
        return null;
    }
}

// Listar todos os colaboradores
router.get('/', verificarToken, (req, res) => {
    const sql = 'SELECT * FROM colaborador';
    db.query(sql, (err, result) => {
        
        if (err) throw err;
        
        res.json(result);
    });
});

// Cadastrar uma nova empresa
router.post('/', verificarToken, (req, res) => {
    console.log(req.body);
    const { nome, cpf, cargo, setor, sexo, data_nascimento, id_filial, celular, data_integracao, data_desligamento } = req.body;

    const dataNascimento = converterData(data_nascimento);
    const dataIntegracao = converterData(data_integracao);
    const dataDesligamento = converterData(data_desligamento);

    const sql = 'INSERT INTO colaborador (nome, cpf, cargo, setor, sexo, data_nascimento, id_filial, celular, data_integracao, data_desligamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nome, cpf, cargo, setor, sexo, dataNascimento, id_filial, celular, dataIntegracao, dataDesligamento], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao cadastrar o(a) colaborador(a)');
        } else {
            res.send('Colaborador(a) cadastrada com sucesso');
        }
    })
});

// Atualizar uma empresa
router.put('/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    const { nome, cpf, cargo, setor, sexo, data_nascimento, id_filial, celular, data_integracao, data_desligamento } = req.body;

    const dataNascimento = converterData(data_nascimento);
    const dataIntegracao = converterData(data_integracao);
    const dataDesligamento = converterData(data_desligamento);

    const sql = 'UPDATE colaborador SET nome = ?, cpf = ?, cargo = ?, setor = ?, sexo = ?, data_nascimento = ?, id_filial = ?, celular = ?, data_integracao = ?, data_desligamento = ? where ID = ?';
    db.query(sql, [nome, cpf, cargo, setor, sexo, dataNascimento, id_filial, celular, dataIntegracao, dataDesligamento, id], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao atualizar o(a) colaborador(a)');
        } else {
            res.send('Colaborador(a) atualizada com sucesso');
        }
    })
});

// Deletar uma empresa
router.delete('/:id', verificarToken, (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM colaborador WHERE ID = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao deletar (o)a Colaborador(a)');
        } else {
            res.send('Colaborador(a) deletad(o)a com sucesso');
        }
    })
});

module.exports = router;