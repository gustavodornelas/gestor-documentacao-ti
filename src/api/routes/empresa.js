// src/api/routes/empresas.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Supondo que você tenha um arquivo para a conexão com o banco de dados


// Listar todas as empresas
router.get('/', (req, res) => {
        const sql = 'SELECT * FROM empresa';
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.json(result);
        });
});

// Listar uma empresa
router.get('/:id', (req, res) => {

    const { id } = req.params;
    const sql = 'SELECT * FROM empresa WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });

});

// Cadastrar uma nova empresa
router.post('/', (req, res) => {
    console.log(req.body);
    const { nome, cnpj } = req.body;

    const sql = 'INSERT INTO empresa (nome, cnpj) VALUES (?, ?)';
    db.query(sql, [nome, cnpj], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao cadastrar a empresa');
        } else {
            res.send('Empresa cadastrada com sucesso');
        }
    })
});

// Atualizar uma empresa
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cnpj } = req.body;

    const sql = 'UPDATE empresa SET nome = ?, cnpj = ? where ID = ?';
    db.query(sql, [nome, cnpj, id], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao atualizar a empresa');
        } else {
            res.send('Empresa atualizada com sucesso');
        }
    })
});

// Deletar uma empresa
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM empresa WHERE ID = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao deletar a empresa');
        } else {
            res.send('Empresa deletada com sucesso');
        }
    })
});

module.exports = router;