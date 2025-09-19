# Projeto Microblog

Esta é uma aplicação de microblog full-stack com backend em Laravel e frontend em React.

## Tecnologias Utilizadas

### Backend (Laravel)

*   PHP 8.2
*   Laravel 12
*   Laravel Sanctum para autenticação
*   SQLite para o banco de dados

### Frontend (React)

*   React 19
*   Vite
*   Tailwind CSS
*   Lucide React para ícones
*   React Router DOM para roteamento
*   Zod para validação

## Começando

### Pré-requisitos

*   PHP >= 8.2
*   Composer
*   Node.js
*   NPM

### Extensões PHP Necessárias

Certifique-se de que as seguintes extensões do PHP estejam habilitadas em seu ambiente para garantir o funcionamento correto do projeto:

- `curl`
- `exif`
- `fileinfo`
- `gd`
- `intl`
- `mbstring`
- `mysqli`
- `openssl`
- `pdo_pgsql` ou `pdo_mysql`
- `xsl`

Outras extensões podem ser necessárias dependendo de funcionalidades específicas ou do ambiente de desenvolvimento. Consulte a documentação do Laravel e do PHP caso encontre mensagens de erro relacionadas a extensões ausentes.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/PenguinGuerrilla/Microblog.git
    cd Microblog
    ```


2.  **Configuração do Backend:**
    ```bash
    cd backend
    composer update
    cp .env.example .env
    php artisan key:generate
    php artisan storage:link
    php artisan migrate
    php artisan db:seed
    ```
    **Importante:** Abra o arquivo `.env` e defina a variável `APP_URL` para o endereço da sua aplicação (ex: `APP_URL=http://127.0.0.1:8000`). **Não utilize `localhost`**, pois isso pode causar problemas na exibição das imagens.

3.  **Configuração do Frontend:**
    ```bash
    cd frontend
    npm install
    ```

### Executando a Aplicação

1.  **Inicie o servidor backend:**
    ```bash
    cd backend
    php artisan serve
    ```

2.  **Inicie o servidor de desenvolvimento frontend:**
    ```bash
    cd frontend
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173`.

## Endpoints da API

### Autenticação

*   `POST /api/register`: Registra um novo usuário.
*   `POST /api/login`: Autentica um usuário.
*   `POST /api/logout`: Desconecta um usuário (requer autenticação).

### Usuários

*   `GET /api/users`: Obtém uma lista de usuários (requer autenticação).
*   `POST /api/users`: Cria um novo usuário (requer autenticação).
*   `GET /api/users/{id}`: Obtém um usuário específico (requer autenticação).
*   `PUT /api/users/{id}`: Atualiza um usuário (requer autenticação).
*   `DELETE /api/users/{id}`: Exclui um usuário (requer autenticação).

### Posts

*   `GET /api/public-posts`: Obtém uma lista de todas as postagens públicas.
*   `GET /api/posts`: Obtém uma lista de postagens do usuário autenticado (requer autenticação).
*   `POST /api/posts`: Cria uma nova postagem (requer autenticação).
*   `GET /api/posts/{id}`: Obtém uma postagem específica (requer autenticação).
*   `PUT /api/posts/{id}`: Atualiza uma postagem (requer autenticação).
*   `DELETE /api/posts/{id}`: Exclui uma postagem (requer autenticação).