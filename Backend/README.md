# API de Blog com Laravel 12

Este é um projeto de estudo para a criação de uma API RESTful utilizando o framework PHP Laravel na sua versão 12. A aplicação consiste no backend de um sistema simples de blog, responsável por gerenciar usuários, posts e comentários.

## 🎯 Propósito do Projeto

O principal objetivo deste projeto é educacional, servindo como um caso prático para aprender e aplicar conceitos de desenvolvimento de API, incluindo:

-   Criação de endpoints RESTful seguindo as melhores práticas.
-   Autenticação de SPA (Single Page Application) via token usando Laravel Sanctum.
-   Operações de CRUD (Create, Read, Update, Delete) através de rotas de API.
-   Estruturação de Controllers, Models, Factories e Seeders.

## Funcionalidades da API

-   **Autenticação**: Sistema de login via token e proteção de rotas.
-   **CRUD de Posts**: Endpoints para criar, listar, ver, atualizar e deletar posts.
-   **CRUD de Comentários**: Endpoints para criar, listar, ver, atualizar e deletar comentários.
-   **Povoamento de Dados**: Utiliza Seeders e Factories para gerar dados falsos (usuários, posts, comentários), facilitando o teste e desenvolvimento.

## Tecnologias Utilizadas

-   **Backend**: PHP 8.2, Laravel 12
-   **Autenticação**: Laravel Sanctum
-   **Banco de Dados**: SQLite, MySQL, MariaDB (configurável)
-   **Gerenciador de Dependências**: Composer

## Pré-requisitos

-   [PHP 8.2 ou superior](https://www.php.net/)
-   [Composer](https://getcomposer.org/)
-   Um ambiente de desenvolvimento com servidor de banco de dados (Ex: XAMPP, Laragon, etc.).

## Instalação e Execução

1.  **Clone o repositório e acesse a pasta do backend:**

    ```bash
    git clone [https://github.com/thedevlucxs/crud-com-laravel.git](https://github.com/thedevlucxs/crud-com-laravel.git)
    cd crud-com-laravel/Backend
    ```

2.  **Instale as dependências do Composer:**

    ```bash
    composer install
    ```

3.  **Configure o arquivo de ambiente:**

    -   Copie o arquivo de exemplo: `cp .env.example .env`
    -   Abra o arquivo `.env` e configure as variáveis do banco de dados (`DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

4.  **Gere a chave da aplicação:**

    ```bash
    php artisan key:generate
    ```

5.  **Execute as migrações e popule o banco:**

    -   Este comando cria as tabelas e adiciona dados de teste.

    ```bash
    php artisan migrate:fresh --seed
    ```

    -   Um usuário de teste será criado com as credenciais:
        -   **Email**: `lucas@gmail.com`
        -   **Senha**: `123456`

6.  **Crie o link simbólico para o storage (para as imagens):**

    ```bash
    php artisan storage:link
    ```

7.  **Inicie o servidor de desenvolvimento:**
    ```bash
    php artisan serve
    ```
    A API estará disponível em `http://127.0.0.1:8000`.
