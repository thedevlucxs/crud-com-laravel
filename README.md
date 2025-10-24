# Blog com API Laravel e Frontend React + shadcn/ui

Este é um projeto de estudo que implementa um sistema de blog completo, construído com uma arquitetura desacoplada: um backend robusto em Laravel que serve uma API RESTful e um frontend moderno e reativo em React, utilizando componentes **shadcn/ui** para a interface.

## 🎯 Propósito do Projeto

O principal objetivo deste projeto é educacional, servindo como um caso prático para aprender e aplicar conceitos de desenvolvimento full-stack, incluindo:

- Criação de APIs RESTful com Laravel.
- Autenticação de SPA (Single Page Application) usando Laravel Sanctum.
- Desenvolvimento de uma interface de usuário reativa com React.
- Integração e personalização de componentes UI com **shadcn/ui**, Radix UI e Tailwind CSS.
- Consumo de APIs a partir de um cliente frontend (Axios).
- Operações de CRUD (Create, Read, Update, Delete) em um ambiente desacoplado.
- Gerenciamento de estado básico no React.

## 📁 Estrutura do Projeto

O projeto é dividido em duas pastas principais:

-   `Backend/`: Contém a API RESTful construída com Laravel 12. Responsável pela lógica de negócios, interação com o banco de dados e autenticação via Sanctum.
-   `Frontend/`: Contém a Single Page Application (SPA) construída com React e Vite. Responsável pela interface do usuário, utilizando componentes **shadcn/ui**, e consumo da API do backend.

## ✨ Interface com shadcn/ui

Este projeto utiliza **shadcn/ui** para construir a interface do usuário no frontend React.

**O que é shadcn/ui?**

shadcn/ui não é uma biblioteca de componentes tradicional que você instala via npm. Em vez disso, é uma **coleção de componentes reutilizáveis** que você copia e cola diretamente no seu projeto. Esses componentes são construídos utilizando [Radix UI](https://www.radix-ui.com/) para primitivas de UI acessíveis e sem estilo, e [Tailwind CSS](https://tailwindcss.com/) para estilização.

**Filosofia:**

A principal ideia por trás do shadcn/ui é dar a você **total controle e propriedade** sobre os componentes. Ao adicioná-los diretamente ao seu codebase (geralmente na pasta `src/components/ui`), você pode modificá-los e estilizá-los como quiser, sem depender de atualizações de uma biblioteca externa ou lutar contra estilos encapsulados.

**Integração neste Projeto:**

1.  **Inicialização:** O shadcn/ui foi inicializado no projeto Frontend, configurando o `tailwind.config.js` e `src/index.css`, além de criar o arquivo `components.json` que define os caminhos e preferências.
2.  **Componentes Utilizados:** Componentes específicos foram adicionados usando o CLI do shadcn/ui (`npx shadcn-ui@latest add [component]`). Os componentes presentes neste projeto incluem:
    * `Button`: Para botões interativos.
    * `Card`: Para agrupar conteúdo relacionado, como posts e formulários.
    * `Input`: Para campos de entrada de texto (login, título do post).
    * `Label`: Para associar rótulos a campos de formulário.
    * `Textarea`: Para campos de texto maiores (conteúdo do post, comentários).
3.  **Localização:** Os componentes adicionados residem em `Frontend/src/components/ui/`.
4.  **Utilitários:** A função `cn` (de `clsx` e `tailwind-merge`) em `Frontend/src/lib/utils.ts` é usada para mesclar classes do Tailwind CSS de forma condicional e eficiente.

**Benefícios:**

-   **Customização Total:** Fácil de adaptar a aparência ao design do projeto.
-   **Propriedade do Código:** Você controla o código dos componentes.
-   **Acessibilidade:** Herda a acessibilidade das primitivas do Radix UI.
-   **Consistência:** Mantém a consistência visual através do Tailwind CSS.

## 🛠️ Tecnologias Principais

-   **Backend**: PHP 8.2+, Laravel 12, Laravel Sanctum, mySQL (padrão).
-   **Frontend**: React 19, Vite, Axios, Tailwind CSS, shadcn/ui, Radix UI.

## 🚀 Como Executar o Projeto Completo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/thedevlucxs/crud-com-laravel.git](https://github.com/thedevlucxs/crud-com-laravel.git)
    cd crud-com-laravel
    ```
2.  **Configure e Inicie o Backend (API Laravel):**
    * Siga as instruções detalhadas no `Backend/README.md`. Essencialmente:
        ```bash
        cd Backend
        composer install
        cp .env.example .env
        # Edite o .env com suas configurações de banco de dados, se necessário
        php artisan key:generate
        php artisan migrate:fresh --seed
        php artisan serve
        ```
    * A API estará rodando em `http://127.0.0.1:8000` por padrão.

3.  **Configure e Inicie o Frontend (React App):**
    * Em outro terminal, a partir da raiz do projeto, siga as instruções do `Frontend/README.md`:
        ```bash
        cd Frontend
        npm install
        npm run dev
        ```
    * A aplicação frontend estará disponível em `http://localhost:5173` por padrão.

4.  **Acesse a Aplicação:** Abra `http://localhost:5173` no seu navegador. Use as credenciais de teste (`lucas@gmail.com` / `123456`) ou crie novos usuários se a funcionalidade for implementada.