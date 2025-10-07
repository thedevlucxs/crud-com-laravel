# CRUD com Laravel 12

Este é um projeto de estudo para a criação de um sistema CRUD (Create, Read, Update, Delete) utilizando o framework PHP Laravel na sua versão 12. A aplicação consiste em um sistema simples de blog com gerenciamento de usuários, posts e comentários.

## Funcionalidades

-   **CRUD de Usuários:**
    -   Listagem de todos os usuários.
    -   Criação de novos usuários.
    -   Edição de usuários existentes.
    -   Visualização de um usuário específico.
    -   Exclusão de usuários.
-   **Estrutura para Posts e Comentários:** O sistema possui a estrutura de banco de dados e os models preparados para a implementação do CRUD de posts e comentários.
-   **Povoamento de Dados:** Utiliza Seeders e Factories para gerar dados falsos e realistas, facilitando o teste e desenvolvimento.

## Tecnologias Utilizadas

-   **Backend:** PHP 8.3, Laravel 12
-   **Frontend:** Blade Templates, Bootstrap 5
-   **Banco de Dados:** MySQL / MariaDB
-   **Gerenciador de Dependências:** Composer

## Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

-   [PHP 8.3 ou superior](https://www.php.net/)
-   [Composer](https://getcomposer.org/)
-   Um ambiente de desenvolvimento como [XAMPP](https://www.apachefriends.org/pt_br/index.html), WAMP ou Laragon (que inclua Apache/Nginx, MySQL/MariaDB).

## Instalação e Execução

Siga os passos abaixo para rodar o projeto em seu ambiente local.

-   **Clone o repositório:**
-   ```bash
    git clone https://github.com/thedevlucxs/crud-com-laravel crud-com-laravel
    cd crud-com-laravel
    ```
-   **Instale as dependências do Composer:** composer install
-   **Configure o arquivo de ambiente:** composer create-project laravel/laravel crud-com-laravel
-   **Acesse a pasta do seu projeto pelo vscode**
-   **Crie o banco de dados**
-   **Execute as migrações e popule o banco:** php artisan migrate:fresh --seed
-   **Inicie o servidor de desenvolvimento:** php artisan serve
