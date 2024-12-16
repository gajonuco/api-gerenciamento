# API de Gerenciamento de Produtos e Categorias

Esta é uma API desenvolvida com Node.js, Express e MongoDB para gerenciamento de usuários, categorias e produtos. A API suporta autenticação JWT e oferece funcionalidades para cadastrar usuários, autenticar, gerenciar categorias e produtos, além de consultas detalhadas.

---

## **Requisitos**

### **Instalações necessárias**

1. **Node.js** (versão 16 ou superior)
   - [Baixar Node.js](https://nodejs.org/)

2. **MongoDB**
   - Localmente: [Baixar MongoDB](https://www.mongodb.com/try/download/community)
   - Ou utilizar o MongoDB Atlas (nuvem): [Criar conta no MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

3. **Gerenciador de pacotes**
   - NPM (instalado junto com o Node.js) ou Yarn.

---

## **Instalação**

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

---

## **Configuração**

### **Configuração do banco de dados MongoDB**

1. Configure a URL de conexão com o MongoDB no arquivo `.env`.

   - Se estiver utilizando o MongoDB local:
     ```env
     MONGO_URI=mongodb://127.0.0.1:27017/nome_do_banco
     ```

   - Se estiver utilizando o MongoDB Atlas:
     ```env
     MONGO_URI=mongodb+srv://<USUARIO>:<SENHA>@<CLUSTER>.mongodb.net/nome_do_banco?retryWrites=true&w=majority
     ```

2. Configure a variável de ambiente para o token JWT no arquivo `.env`:
   ```env
   JWT_SECRET=sua_chave_secreta
   JWT_EXPIRES_IN=1h
   ```

3. O arquivo `.env` completo:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/nome_do_banco
   JWT_SECRET=sua_chave_secreta
   JWT_EXPIRES_IN=1h
   ```

---

## **Execução da aplicação**

1. Inicie o servidor:
   ```bash
   npm start
   ```

2. Para desenvolvimento (com autoreload usando nodemon):
   ```bash
   npm run dev
   ```

3. Acesse a aplicação:
   - Base URL: `http://localhost:3000`

---

## **Endpoints da API**

### **Autenticação**
- **Cadastro de usuários**:
  - Método: `POST`
  - Rota: `/api/users`
  - Body (JSON):
    ```json
    {
      "username": "seu_usuario",
      "password": "sua_senha"
    }
    ```

- **Login de usuários**:
  - Método: `POST`
  - Rota: `/api/users/login`
  - Body (JSON):
    ```json
    {
      "username": "seu_usuario",
      "password": "sua_senha"
    }
    ```
  - Retorna um token JWT que deve ser usado no cabeçalho `Authorization` nas rotas protegidas:
    ```
    Authorization: Bearer <seu_token>
    ```

### **Gestão de Categorias**
- **Criar categoria**:
  - Método: `POST`
  - Rota: `/api/categories`
  - Body (JSON):
    ```json
    {
      "name": "Categoria Exemplo",
      "description": "Descrição da categoria"
    }
    ```

- **Buscar todas as categorias**:
  - Método: `GET`
  - Rota: `/api/categories`

- **Buscar uma categoria específica**:
  - Método: `GET`
  - Rota: `/api/categories/:id`

- **Editar categoria**:
  - Método: `PUT`
  - Rota: `/api/categories/:id`

- **Deletar categoria**:
  - Método: `DELETE`
  - Rota: `/api/categories/:id`

- **Consultar categorias com produtos associados**:
  - Método: `GET`
  - Rota: `/api/categories/with-products`

- **Consultar produtos de uma categoria específica**:
  - Método: `GET`
  - Rota: `/api/categories/:id/products`

### **Gestão de Produtos**
- **Criar produto**:
  - Método: `POST`
  - Rota: `/api/products`
  - Body (JSON):
    ```json
    {
      "name": "Produto Exemplo",
      "description": "Descrição do produto",
      "amount": 10,
      "price": 99.99,
      "categories": ["<id_categoria>"]
    }
    ```

- **Buscar todos os produtos**:
  - Método: `GET`
  - Rota: `/api/products`

- **Buscar um produto específico**:
  - Método: `GET`
  - Rota: `/api/products/:id`

- **Editar produto**:
  - Método: `PUT`
  - Rota: `/api/products/:id`

- **Deletar produto**:
  - Método: `DELETE`
  - Rota: `/api/products/:id`

---

## **Testando a API**

1. Use ferramentas como **Postman** ou **Insomnia** para realizar requisições HTTP.
2. Configure os cabeçalhos corretamente para autenticação:
   ```
   Authorization: Bearer <seu_token>
   ```

---

## **Scripts Disponíveis**

- **Iniciar o servidor**:
  ```bash
  npm start
  ```

- **Iniciar o servidor em modo de desenvolvimento**:
  ```bash
  npm run dev
  ```

---

## **Licença**
Este projeto é licenciado sob a [MIT License](LICENSE).
