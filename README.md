# Documentação de Arquitetura do Sistema de Enquetes

## 1. Tecnologias Principais

### Backend
- **Framework**: Nest.js
- **Ambiente de Execução**: Node.js
- **Integração com Banco de Dados**: TypeORM (para facilitar a comunicação entre o backend e o banco de dados)

### Banco de Dados
- **Banco de Dados**: MySQL

### Frontend
- **Estrutura**: HTML, CSS, JavaScript
- **Framework CSS**: Bootstrap (para garantir responsividade e acelerar o desenvolvimento)
- **Integração Frontend-Backend**: O frontend será integrado com o backend via APIs RESTful, fornecidas pelo Nest.js.

### ORM/Query Builder
- **Ferramenta escolhida**: TypeORM
- **Funcionalidade**: Gerenciamento de tabelas e consultas no banco de dados de maneira simplificada, com suporte a migrações e esquemas de dados.

## 2. Estrutura do Sistema

### Arquitetura MVC (Model-View-Controller)
O sistema seguirá a arquitetura MVC, dividida da seguinte forma:

- **Models**: Gerenciados pelo TypeORM, conectando as entidades ao banco de dados.
- **Controllers**: Gerenciam as rotas e recebem as requisições HTTP.
- **Services**: Responsáveis por processar a lógica de negócios, como autenticação, criação de enquetes e votação.

## 3. Integração Frontend-Backend
O frontend será responsável por enviar requisições às APIs REST desenvolvidas no backend, que irão lidar com:

- **Autenticação**: Cadastro e login de usuários.
- **Criação e votação em enquetes**: O backend gerenciará a criação e o armazenamento das enquetes e dos votos.
- **Exibição de Resultados**: O frontend exibirá os resultados das enquetes em gráficos, consumindo os dados do backend.

## 4. Decisões de Segurança

### Autenticação e Controle de Acesso
- **Armazenamento de Senhas**: As senhas serão armazenadas utilizando hashing seguro (ex.: bcrypt).
- **Autenticação**: O sistema utilizará JWT (JSON Web Tokens) para autenticação de usuários.

### Proteção contra Ataques Comuns
- **Injeção de SQL**: Uso do TypeORM para proteger contra injeções de SQL.
- **CSRF/XSS**: Uso das bibliotecas nativas do Nest.js e boas práticas para prevenir ataques CSRF e XSS.

## 5. Deploy e Hospedagem

### Ambiente de Hospedagem Escolhido
- O ambiente de hospedagem será definido entre Heroku, AWS ou DigitalOcean.

### Estrutura do Servidor
- O deploy será configurado para suportar Node.js e o banco de dados MySQL.
- **Variáveis de Ambiente**: Chaves secretas e strings de conexão serão configuradas no servidor para garantir segurança.

## 6. Checklist Final
- [x] Descrever as tecnologias usadas para backend e frontend.
- [x] Explicar a escolha do banco de dados e integração com TypeORM.
- [x] Detalhar a arquitetura do sistema (MVC).
- [x] Definir o modelo de integração entre frontend e backend (APIs RESTful).
- [x] Incluir práticas de segurança e autenticação.
- [x] Definir o ambiente de deploy e hospedagem.
