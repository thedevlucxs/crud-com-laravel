# Frontend (React + shadcn/ui)

Este é o frontend (SPA) do projeto de blog. É uma aplicação React construída com Vite.

A aplicação consome a API do Laravel para todas as operações de dados (login, posts, comentários). A interface do usuário é construída com **shadcn/ui** e **Tailwind CSS**.

## 🛠️ Tecnologias

* **Framework**: React 19
* **Bundler**: Vite
* **UI**: shadcn/ui (baseado em Radix UI e Tailwind CSS)
* **Comunicação API**: Axios
* **Utilitários de Estilo**: `clsx` e `tailwind-merge`

## 🚀 Como Executar

### Pré-requisito: API Rodando

**Este frontend não funcionará sem o backend.**

1.  Certifique-se de que a API do `Backend` esteja em execução (geralmente em `http://127.0.0.1:8000`).
2.  Verifique se o arquivo `Frontend/.env` aponta para a URL correta da API. O padrão é:
    ```
    VITE_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
    ```
   

### Instalação e Execução

1.  **Acesse a pasta:**
    ```bash
    cd Frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
   

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
   

A aplicação estará disponível em `http://localhost:5173`.

---

## ℹ️ Detalhes Adicionais (Para Consulta)

<details>
<summary><strong>🧠 Ver Lógica da Aplicação e Estado (App.jsx)</strong></summary>

O componente `App.jsx` é o "cérebro" da aplicação e gerencia quase todo o estado principal usando `useState`:

* **`token`**: Armazena o token de autenticação (obtido do `localStorage` na inicialização). Controla se o usuário está logado.
* **`authUser`**: Armazena os dados do usuário autenticado.
* **`posts`**: Array com a lista de posts.
* **`selectedPost`**: Objeto com os detalhes de um post clicado (controla a visualização de detalhes).
* **`editingPost`**: Objeto com os dados de um post selecionado para edição (controla qual formulário exibir).

**Fluxo Principal:**
1.  `App.jsx` contém todas as funções de *handler* (ex: `handleLoginSuccess`, `handleCreatePost`, `handleSelectPost`).
2.  Essas funções e os estados são passados via *props* para os componentes filhos (ex: `PostList`, `PostDetail`, `LoginForm`).
3.  Quando uma ação ocorre em um componente filho (ex: clique em um botão), ele chama a função *handler* recebida do `App.jsx`.
4.  O *handler* em `App.jsx` chama o `apiService`, espera a resposta, e atualiza o estado central (ex: `setPosts(...)`).
5.  A atualização do estado faz o React renderizar novamente a UI com os novos dados.

**Renderização Condicional:**
* Se não há `token`, renderiza `<LoginForm />`.
* Se há `token`, renderiza a aplicação principal.
* Dentro da app, se `selectedPost` existir, renderiza `<PostDetail />`.
* Se `editingPost` existir, renderiza `<EditPostForm />`; senão, renderiza `<CreatePostForm />`.
</details>

<details>
<summary><strong>📡 Ver Comunicação com a API (apiService.js)</strong></summary>

Toda a comunicação com a API Laravel é centralizada em `src/services/apiService.js`.

* **Instância Axios**: Uma instância do `axios` é criada com a `baseURL` vinda do `.env`.
* **Interceptor de Requisição (Request Interceptor)**: Antes de *qualquer* requisição ser enviada, este interceptor verifica se existe um `token` no `localStorage`. Se existir, ele o adiciona automaticamente ao cabeçalho `Authorization: Bearer <token>`.
* **Interceptor de Resposta (Response Interceptor)**: Este interceptor monitora *todas* as respostas da API. Se ele receber um erro com status `401 Unauthorized` (indicando que o token é inválido ou expirou), ele remove o token do `localStorage` e recarrega a página, efetivamente deslogando o usuário.
* **Funções Exportadas**: O arquivo exporta funções simples para cada endpoint (ex: `apiLogin`, `apiFetchPosts`, `apiCreateComment`), que são usadas pelos *handlers* no `App.jsx`.
</details>

<details>
<summary><strong>🎨 Ver Componentes e UI (shadcn/ui)</strong></summary>

* **Filosofia**: `shadcn/ui` não é uma biblioteca de componentes tradicional. Em vez disso, os componentes são adicionados diretamente ao seu projeto na pasta `src/components/ui`.
* **Componentes Base**: Os arquivos em `src/components/ui` (como `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`) são os blocos de construção.
* **Componentes da Aplicação**: Os arquivos em `src/components` (como `LoginForm.jsx`, `PostList.jsx`) importam e utilizam os componentes `ui` para construir a interface da aplicação.
* **Estilização**: O `tailwind.config.js` é configurado para funcionar com o shadcn/ui. A função utilitária `cn` em `src/lib/utils.ts` é usada para mesclar classes do Tailwind de forma inteligente.
</details>