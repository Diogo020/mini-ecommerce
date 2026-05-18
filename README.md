\# Mini E-commerce



Projeto Full Stack de um Mini E-commerce desenvolvido para gerenciamento de produtos e usuários.



A aplicação possui frontend, backend e banco de dados integrados, permitindo realizar operações de cadastro, listagem, edição, visualização e exclusão.



\---



\## Tecnologias Utilizadas



\### Backend



\- Node.js

\- TypeScript

\- Express

\- SQLite

\- CORS



\### Frontend



\- React

\- JavaScript

\- Vite

\- Axios

\- CSS



\### Banco de Dados



\- SQLite



\---



\## Funcionalidades



\### Produtos



\- Cadastrar produto

\- Listar produtos

\- Editar produto

\- Excluir produto

\- Controlar status ativo/inativo



Campos do produto:



\- ID

\- Nome

\- Descrição

\- Preço

\- Quantidade em estoque

\- Categoria

\- Ativo



\### Usuários



\- Cadastrar usuário

\- Listar usuários

\- Editar usuário

\- Excluir usuário

\- Controlar status ativo/inativo



Campos do usuário:



\- ID

\- Nome

\- E-mail

\- Senha

\- Ativo



\---



\## Estrutura do Projeto



```txt

mini-ecommerce/

├── backend/

│   ├── src/

│   │   ├── config/

│   │   ├── controllers/

│   │   ├── database/

│   │   ├── repositories/

│   │   ├── routes/

│   │   ├── services/

│   │   ├── app.ts

│   │   └── server.ts

│   ├── package.json

│   └── tsconfig.json

│

├── frontend/

│   ├── src/

│   │   ├── modules/

│   │   │   ├── products/

│   │   │   └── users/

│   │   ├── services/

│   │   ├── App.jsx

│   │   └── main.jsx

│   └── package.json

│

├── .gitignore

└── README.md

