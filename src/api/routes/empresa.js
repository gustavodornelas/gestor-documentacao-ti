// src/api/routes/empresas.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Supondo que você tenha um arquivo para a conexão com o banco de dados
const verificarToken = require('./verificarToken');

// Listar todas as empresas
router.get('/', verificarToken, (req, res) => {
        const sql = 'SELECT * FROM empresa';
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.json(result);
        });
});

// Listar uma empresa
router.get('/:id', verificarToken, (req, res) => {

    const { id } = req.params;
    
    const sql = 'SELECT * FROM empresa WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result[0]);
    });

});

// Cadastrar uma nova empresa
router.post('/', verificarToken, (req, res) => {
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
router.put('/:id', verificarToken, (req, res) => {
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
router.delete('/:id', verificarToken, (req, res) => {
    const { id } = req.params;

    // Verificar se a empresa possui filiais
    const verificarFiliaisSql = 'SELECT COUNT(*) AS filiaisCount FROM filial_empresa WHERE id_empresa = ?';
    db.query(verificarFiliaisSql, [id], (err, result) => {
        if (err) {
            console.log('Erro ao verificar filiais: ' + err);
            res.status(500).send('Erro ao verificar filiais da empresa');
            return;
        }

        const filiaisCount = result[0].filiaisCount;

        // Se a empresa tiver filiais, retorne um erro
        if (filiaisCount > 0) {
            res.status(400).send('Não é possível excluir a empresa, pois ela possui filiais associadas.');
            return;
        }

        // Se a empresa não tiver filiais, continue com a exclusão
        const deleteEmpresaSql = 'DELETE FROM empresa WHERE ID = ?';
        db.query(deleteEmpresaSql, [id], (err, result) => {
            if (err) {
                console.log('Erro ao deletar a empresa: ' + err);
                res.status(500).send('Erro ao deletar a empresa');
            } else {
                res.send('Empresa deletada com sucesso');
            }
        });
    });
});

module.exports = router;