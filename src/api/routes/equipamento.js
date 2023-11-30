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

        console.log(dataConvertida);
        return dataConvertida;
    } else {
        return null;
    }
}


router.get('/', verificarToken, (req, res) => {
    const sql = 'SELECT * FROM equipamento';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


// Cadastrar um novo equipamento
router.post('/', verificarToken, (req, res) => {
    console.log(req.body);

    const { tipo_equipamento, alias_equipamento, id_colaborador, data_inicial_colaborador, situacao, marca, modelo, numero_serie, metodo_aquisicao,
        data_aquisicao, numero_nota_fiscal, fornecedor, contrato, valor_equipamento, data_baixa, motivo_baixa, sistema_operacional, disco_SSD,
        memoria, processador } = req.body;

    const dataInicialColaborador = converterData(data_inicial_colaborador);
    const dataAquisicao = converterData(data_aquisicao);
    const dataBaixa = converterData(data_baixa);


    const sql = 'INSERT INTO equipamento (tipo_equipamento, alias_equipamento, id_colaborador, data_inicial_colaborador, situacao, marca, modelo,' +
        'numero_serie, metodo_aquisicao, data_aquisicao, numero_nota_fiscal, fornecedor, contrato, valor_equipamento, data_baixa, motivo_baixa, ' +
        'sistema_operacional, disco_SSD, memoria, processador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [tipo_equipamento, alias_equipamento, id_colaborador, dataInicialColaborador, situacao, marca, modelo, numero_serie, metodo_aquisicao,
        dataAquisicao, numero_nota_fiscal, fornecedor, contrato, valor_equipamento, dataBaixa, motivo_baixa, sistema_operacional, disco_SSD,
        memoria, processador], (err) => {
            if (err) {
                console.log('Erro: ' + err);
                res.status(500).send('Erro ao cadastrar o equipamento');
            } else {
                res.send('Equipamento cadastrado com sucesso');
            }
        })
});

// Atualizar um equipamento
router.put('/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    const { tipo_equipamento, alias_equipamento, id_colaborador, data_inicial_colaborador, situacao, marca, modelo, numero_serie, metodo_aquisicao,
        data_aquisicao, numero_nota_fiscal, fornecedor, contrato, valor_equipamento, data_baixa, motivo_baixa, sistema_operacional, disco_SSD,
        memoria, processador } = req.body;

    const dataInicialColaborador = converterData(data_inicial_colaborador);
    const dataAquisicao = converterData(data_aquisicao);
    const dataBaixa = converterData(data_baixa);

    const sql = 'UPDATE equipamento SET tipo_equipamento= ?, alias_equipamento= ?, id_colaborador= ?, data_inicial_colaborador= ?, situacao= ?, marca= ?, modelo= ?,' +
        'numero_serie= ?, metodo_aquisicao= ?, data_aquisicao= ?, numero_nota_fiscal= ?, fornecedor= ?, contrato= ?, valor_equipamento= ?, data_baixa= ?, motivo_baixa= ?, ' +
        'sistema_operacional= ?, disco_SSD= ?, memoria= ?, processador= ? where ID = ?';
    db.query(sql, [tipo_equipamento, alias_equipamento, id_colaborador, dataInicialColaborador, situacao, marca, modelo, numero_serie, metodo_aquisicao,
        dataAquisicao, numero_nota_fiscal, fornecedor, contrato, valor_equipamento, dataBaixa, motivo_baixa, sistema_operacional, disco_SSD,
        memoria, processador, id], (err) => {
            if (err) {
                console.log('Erro: ' + err);
                res.status(500).send('Erro ao atualizar o equipamento');
            } else {
                res.send('Equipamento atualizado com sucesso');
            }
        })
});

// Deletar um equipamento
router.delete('/:id', verificarToken, (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM equipamento WHERE ID = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.log('Erro: ' + err);
            res.status(500).send('Erro ao deletar o equipamento');
        } else {
            res.send('Equipamento deletado com sucesso');
        }
    })
});

module.exports = router;