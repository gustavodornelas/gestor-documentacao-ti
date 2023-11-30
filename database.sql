CREATE DATABASE gestor_documentacao;

CREATE TABLE empresa (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cnpj VARCHAR(15) NOT NULL
);

CREATE TABLE filial_empresa (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_filial VARCHAR(50) NOT NULL,
    id_empresa INT NOT NULL,
    endereco VARCHAR(30),
    bairro VARCHAR(20),
    cidade VARCHAR(20),
    estado VARCHAR(20),
    telefone VARCHAR(20),

    CONSTRAINT FK_id_empresa FOREIGN KEY (id_empresa)
    REFERENCES empresa (id)
);

CREATE TABLE colaborador (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    cargo VARCHAR(30),
    setor VARCHAR(30),
    sexo VARCHAR(10),
    data_nascimento DATE,
    id_filial INT,
    celular VARCHAR(12),
    data_integracao DATE NOT NULL,
    data_desligamento DATE,

    CONSTRAINT FK_id_filial FOREIGN KEY (id_filial)
    REFERENCES filial_empresa (id)
);

CREATE TABLE equipamento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo_equipamento VARCHAR(30) NOT NULL,
    alias_equipamento VARCHAR(50) NOT NULL,
    id_colaborador INT,
    data_inicial_colaborador DATE,
    situacao VARCHAR(30),
    marca VARCHAR(30),
    modelo VARCHAR(30),
    numero_serie VARCHAR(30),
    metodo_aquisicao VARCHAR(30),
    data_aquisicao DATE,
    numero_nota_fiscal VARCHAR(30),
    fornecedor VARCHAR(30),
    contrato VARCHAR(30),
    valor_equipamento FLOAT,
    data_baixa DATE,
    motivo_baixa VARCHAR(30),
    sistema_operacional VARCHAR(30),
    disco_SSD VARCHAR(30),
    memoria VARCHAR(30),
    processador VARCHAR(30),

    CONSTRAINT FK_id_colaborador FOREIGN KEY (id_colaborador)
    REFERENCES colaborador (id) 
);

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario VARCHAR(18) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nome VARCHAR(50)
);

CREATE TABLE tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  token VARCHAR(255) NOT NULL,
  id_usuario INT NOT NULL,
);

INSERT INTO empresa (nome, cnpj)
            VALUES  ('F5 TECNOLOGIA', '19151776000174'),
                    ('DITRASA AGRICOLA, ' '12345678000102')
