# API de Blog com Laravel 12

Este é o backend (API) do projeto de blog. Ele é construído em Laravel 12 e usa o Sanctum para autenticação.

A API é responsável por gerenciar usuários, posts e comentários, fornecendo endpoints RESTful para o frontend consumir.

## 🛠️ Tecnologias

* PHP 8.2+
* Laravel 12
* Laravel Sanctum (para autenticação de API)
* mySQL (padrão, fácil de configurar para MariaDB/PostgreSQL)
* Eloquent ORM
* Separação de lógica em *Services* (ex: `PostService`, `CommentService`)
* Autorização com *Policies* (ex: `PostPolicy`)

## 🚀 Como Executar

Siga os passos abaixo para rodar a API localmente.

1.  **Acesse a pasta:**
    ```bash
    cd Backend
    ```

2.  **Instale as dependências:**
    ```bash
    composer install
    ```
   

3.  **Configure o ambiente:**
    * Copie o arquivo de exemplo:
        ```bash
        cp .env.example .env
        ```
       
    * (Opcional) Edite o `.env` se não for usar o SQLite padrão.

4.  **Gere a chave da aplicação:**
    ```bash
    php artisan key:generate
    ```
   

5.  **Crie o banco e popule com dados de teste:**
    * Este comando cria as tabelas e adiciona dados de teste (usuários, posts, comentários).
    ```bash
    php artisan migrate:fresh --seed
    ```
   

6.  **Inicie o servidor:**
    ```bash
    php artisan serve
    ```
   

A API estará disponível em `http://127.0.0.1:8000`.

## 👤 Usuário de Teste

O comando `migrate:fresh --seed` cria um usuário padrão para testes:

* **Email**: `lucas@gmail.com`
* **Senha**: `123456`

---

## ℹ️ Detalhes Adicionais (Para Consulta)

<details>
<summary><strong>🔌 Ver Endpoints da API</strong></summary>

Abaixo estão os endpoints principais (prefixo `/api`):

### Autenticação
* `POST /login`: Autentica (`email`, `password`) e retorna um token Sanctum.
* `POST /logout`: Invalida o token atual (requer autenticação).
* `GET /user`: Retorna dados do usuário autenticado (requer autenticação).

### Posts
* `GET /posts`: Lista todos os posts com dados do autor.
* `POST /posts`: Cria um novo post (requer autenticação).
* `GET /posts/{id}`: Exibe um post específico com autor e comentários.
* `PUT /posts/{id}`: Atualiza um post (requer autenticação e ser o dono).
* `DELETE /posts/{post}`: Deleta um post (requer autenticação e ser o dono).

### Comentários
* `GET /comments`: Lista todos os comentários.
* `POST /comments`: Cria um novo comentário (requer autenticação).
* `GET /comments/{id}`: Exibe um comentário específico.
* `PUT /comments/{id}`: Atualiza um comentário (requer autenticação).
* `DELETE /comments/{id}`: Deleta um comentário (requer autenticação).

*(Nota: Rotas que requerem autenticação esperam um token Sanctum válido no header `Authorization: Bearer <token>`)*
</details>

<details>
<summary><strong>🔑 Ver Fluxo de Autenticação (Sanctum)</strong></summary>

1.  O frontend envia `email` e `senha` para `POST /api/login`.
2.  A API valida e, se correto, retorna um Token de Acesso (Bearer Token).
3.  O frontend armazena este token (ex: `localStorage`).
4.  Para rotas protegidas (como `POST /posts`), o frontend envia o token no cabeçalho `Authorization: Bearer <token>`.
5.  O middleware `auth:sanctum` no Laravel valida o token para autenticar o usuário.
6.  O `POST /api/logout` (enviado com o token) invalida o token no banco de dados.
</details>

<details>
<summary><strong>🏗️ Ver Estrutura de Pastas (Principais)</strong></summary>

* **`app/Http/Controllers`**: Controlam o fluxo das requisições (ex: `PostController`).
* **`app/Http/Requests`**: Classes de validação (ex: `StorePostRequest`).
* **`app/Http/Resources`**: Formatam as respostas JSON (ex: `PostResource`).
* **`app/Models`**: Modelos Eloquent (`User`, `Post`, `Comment`).
* **`app/Policies`**: Regras de autorização (ex: `PostPolicy` verifica se o usuário é o dono).
* **`app/Services`**: Onde a lógica de negócio principal reside (ex: `PostService`).
* **`database/migrations`**: Definição da estrutura das tabelas do banco.
* **`database/seeders`**: Arquivos para popular o banco com dados de teste.
* **`routes/api.php`**: Onde todos os endpoints da API são definidos.
</details>