# Votex-Enquetes

Bem-vindo ao **Votex-Enquetes**, um sistema de enquetes desenvolvido como parte de um projeto acadêmico. Este repositório contém o backend do sistema, que permite a criação de enquetes, votação, exibição de resultados e gerenciamento de usuários.

## Funcionalidades

- **Criação de enquetes**: Permite criar enquetes com múltiplas opções de resposta.
- **Votação**: Usuários podem votar em suas opções preferidas.
- **Exibição de resultados**: Exibe resultados em tempo real para as enquetes ativas.
- **Painel Administrativo**: Acesso para criação e gerenciamento de enquetes e resultados.
- **Gráficos Gerenciais**: Visualização dos resultados por meio de gráficos.
- **Notificações**: Sistema de notificações para manter os usuários informados.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **MySQL** como banco de dados
- **NestJS** como framework backend
- **Docker** para containerização
- **Postman** para testes de API

## Estrutura do Projeto

A estrutura principal do projeto no backend é a seguinte:

```bash
src/
├── main.ts                # Arquivo principal
└── modules/               # Pasta que contém os módulos da aplicação
    ├── user.controller.ts  # Controlador para gerenciar os usuários
    ├── user.service.ts     # Serviço com lógica de negócio de usuários
    └── app.module.ts       # Módulo principal do aplicativo
```

## Pré-requisitos

Para executar este projeto, você precisará ter o seguinte instalado:

- **Node.js** (versão 16 ou superior)
- **Docker** (caso deseje utilizar a containerização)
- **MySQL** (caso não utilize Docker)
- **Postman** (para testar as rotas da API)

## Variáveis de Ambiente

As configurações sensíveis, como as informações do banco de dados, estão armazenadas no arquivo `.env`. Certifique-se de criar seu próprio arquivo `.env` com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=votex_db
```

> **Nota**: As informações de acesso ao banco de dados **não** estão expostas diretamente no arquivo `docker-compose.yml`, por questões de segurança. Use o arquivo `.env` para gerenciar essas informações.

## Executando o Projeto

### 1. Clone o repositório:

```bash
git clone https://github.com/Votex-Forge/Votex-Enquetes.git
cd Votex-Enquetes
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Execute o projeto (modo desenvolvimento):

```bash
npm run start:dev
```

### 4. (Opcional) Execute com Docker:

Caso deseje rodar o projeto em um container Docker, siga os passos abaixo:

1. Certifique-se de que o Docker está instalado e em execução.
2. Crie o arquivo `.env` conforme descrito acima.
3. Execute o comando abaixo para subir os containers:

```bash
docker-compose up
```

> **Nota**: Este comando irá criar e iniciar os containers necessários para rodar a aplicação e o banco de dados.

## Testando com Postman

Você pode testar as rotas do backend usando o Postman. Certifique-se de importar a coleção do Postman disponível no repositório para facilitar os testes.

- **Coleção do Postman**: Inclui exemplos de requisições para as principais funcionalidades da API, facilitando a validação das funcionalidades.

## Problemas Comuns e Soluções

- **Erro de Conexão com o Banco de Dados**: Verifique se as credenciais do banco estão corretas no arquivo `.env`. Caso esteja usando Docker, garanta que os containers estão em execução.
- **Portas em Uso**: Certifique-se de que as portas necessárias (por exemplo, 3306 para o MySQL e 3000 para a aplicação) estão livres ou modifique as configurações no arquivo `.env`.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar **pull requests**.

## Licença

Este projeto é licenciado sob a licença [MIT](./LICENSE).
