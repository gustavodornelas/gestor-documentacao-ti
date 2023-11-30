// src/api/routes/empresas.js
const express = require('express');
const router = express.Router();
const db = require('../database');
const verificarToken = require('./verificarToken');

// Listar todas as filiais
router.get('/', verificarToken, (req, res) => {
    const sql = 'SELECT f.id as id, f.nome_filial as nome, e.nome as empresa, f.endereco as endereco, f.bairro as bairro, f.cidade as cidade, ' + 
    'f.estado as estado, f.telefone as telefone FROM filial_empresa as f INNER JOIN empresa as e ON f.id_empresa = e.id';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Listar uma unica filial
router.get('/:id', verificarToken, (req, res) => {

    const { id } = req.params;

    const sql = 'SELECT f.id as id, f.nome_filial as nome, f.id_empresa, e.nome as empresa, f.endereco as endereco, f.bairro as bairro, f.cidade as cidade, ' +
        'f.estado as estado, f.telefone as telefone FROM filial_empresa as f INNER JOIN empresa as e ON f.id_empresa = e.id WHERE f.id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result[0]);
    });
});


// Cadastrar uma nova filial
router.post('/', verificarToken, (req, res) => {
    console.log(req.body);
    const { nome_filial, id_empresa, endereco, bairro, cidade, estado, telefone} = req.body;

    const sql = 'INSERT INTO filial_empresa (nome_filial, id_empresa, endereco, bairro, cidade, estado, telefone) VALUES(?, ?, ?, ?,?, ?, ?)';
    db.query(sql, [nome_filial, id_empresa, endereco, bairro, cidade, estado, telefone], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao cadastrar a filial da empresa');
        } else {
            res.send('filial da empresa cadastrada com sucesso');
        }
    })
});

// Atualizar uma empresa
router.put('/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    const { nome_filial, id_empresa, endereco, bairro, cidade, estado, telefone } = req.body;

    const sql = 'UPDATE filial_empresa SET nome_filial = ?, id_empresa = ?, endereco = ?, bairro = ?, cidade = ?, estado = ?, telefone = ? where ID = ?';
    db.query(sql, [nome_filial, id_empresa, endereco, bairro, cidade, estado, telefone, id], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao atualizar a filial da empresa');
        } else {
            res.send('filial da empresa atualizada com sucesso');
        }
    })
});

// Deletar uma empresa
router.delete('/:id', verificarToken, (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM filial_empresa WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao deletar a filial da empresa');
        } else {
            res.send('filial da empresa deletada com sucesso');
        }
    })
});

module.exports = router;