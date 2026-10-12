-- 1. Criação da tabela Usuarios
CREATE TABLE Usuarios (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    SenhaHash NVARCHAR(255) NOT NULL,
    Telefone NVARCHAR(20) NULL,
    TipoPerfil INT NOT NULL,
    DataCriacao DATETIME DEFAULT GETUTCDATE()
);

-- 2. Criação da tabela Campanhas
CREATE TABLE Campanhas (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Titulo NVARCHAR(100) NOT NULL,
    Descricao NVARCHAR(MAX) NULL,
    Categoria INT NOT NULL,
    MetaQuantidade INT NOT NULL,
    QtdArrecadada INT DEFAULT 0,
    Status INT NOT NULL,
    DataCriacao DATETIME DEFAULT GETUTCDATE(),
    DataEncerramento DATETIME NULL
);

-- 3. Criação da tabela Contribuicoes (com as Foreign Keys)
CREATE TABLE Contribuicoes (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UsuarioId UNIQUEIDENTIFIER NOT NULL,
    CampanhaId UNIQUEIDENTIFIER NOT NULL,
    Quantidade INT NOT NULL,
    DataContribuicao DATETIME DEFAULT GETUTCDATE(),
    Status INT NOT NULL,
    CONSTRAINT FK_Contribuicoes_Usuarios FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
    CONSTRAINT FK_Contribuicoes_Campanhas FOREIGN KEY (CampanhaId) REFERENCES Campanhas(Id)
);