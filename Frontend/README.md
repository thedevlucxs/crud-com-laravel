# Frontend em React para Blog com Laravel

Este diretório contém a aplicação frontend, uma **Single Page Application (SPA)** construída com **React** e **Vite**. O objetivo principal é educacional, focado em demonstrar como construir uma interface de usuário que consome uma API RESTful externa para realizar operações de CRUD.

Ela consome a API fornecida pelo backend em Laravel para oferecer uma interface de usuário interativa e dinâmica para o sistema de blog.

## Funcionalidades

- Interface para login e logout de usuários.
- Visualização de lista de posts.
- Visualização detalhada de um post com seus respectivos comentários.
- Formulários para criação e edição de posts.
- Funcionalidade para deletar posts.
- Formulário para adicionar novos comentários.

## Tecnologias Utilizadas

- **Framework**: React 19
- **Build Tool**: Vite
- **Requisições HTTP**: Axios
- **Linguagem**: JavaScript (JSX)
- **Estilização**: CSS puro

## Pré-requisitos

- [Node.js e NPM](https://nodejs.org/) (versão LTS recomendada)
- O **servidor do backend (Laravel)** deve estar em execução para que o frontend possa consumir a API.

## Instalação e Execução

1.  **A partir da raiz do projeto, navegue até a pasta do frontend:**

    ```bash
    cd Frontend
    ```

2.  **Instale as dependências do NPM:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento do Vite:**
    ```bash
    npm run dev
    ```
    A aplicação frontend estará disponível por padrão em `http://localhost:5173`.

## Conexão com a API

A aplicação está configurada para se comunicar com a API do Laravel no endereço `http://127.0.0.1:8000/api`. Caso o seu backend esteja rodando em uma porta diferente, você pode alterar a `baseURL` no arquivo `src/App.jsx`.
