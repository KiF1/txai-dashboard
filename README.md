# 🚀 Txai - Teste Técnico

Bem-vindo ao projeto! Este repositório contém a aplicação back-end e front-end.

## 📦 Rodar o Backend

Para rodar o back-end, siga os passos abaixo:

1. **Acesse o diretório do servidor:**
   ```bash
   cd server

2. **Instale as dependências:**
   ```bash
   npm i
    ```
   
3. **Inicie o Docker Compose (Antes de rodar o comando abaixo, certifique-se que possui o docker instalado e que o mesmo está rodando):**
   ```bash
   docker-compose up -d
   ```
   
4. **Gere o cliente do Prisma:**
   ```bash
   npx prisma generate
   
5. **Execute as migrações do Prisma:**
   ```bash
   npx prisma migrate dev
   
6. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev

7. **Acessar Swagger:**
     - Para Acessar o swagger acesse: http://localhost:3333/swagger


## 📦 Rodar o Front

Para rodar o front-end, siga os passos abaixo:

1. **Acesse o diretório do cliente:**
   ```bash
   cd client

2. **Instale as dependências:**
   ```bash
   npm i

3. **Inicie a aplicação:**
   ```bash
   npm run dev


## 📂 Estrutura do Projeto

### Front-end
````shell
client/
│
├── tailwind.config.js      # Configuração do Tailwind CSS, definindo temas, cores, espaçamentos e outros estilos.
├── index.html              # Arquivo HTML principal que serve como ponto de entrada da aplicação.
├── .gitignore              # Especifica quais arquivos e pastas devem ser ignorados pelo Git.
├── eslint.config.js        # Configuração do ESLint para manter a qualidade do código com regras de linting.
├── package-lock.json       # Registra as versões exatas das dependências instaladas, garantindo consistência.
├── package.json            # Gerencia as dependências do projeto, scripts e metadados da aplicação.
├── postcss.config.js       # Configuração do PostCSS, que é usado para processar CSS e integrar plugins.
├── README.md               # Documentação do projeto, explicando como configurar e executar a aplicação.
├── tsconfig.app.json       # Configuração do TypeScript específica para a aplicação (geralmente usada para compilar o código da app).
├── tsconfig.json           # Configuração do TypeScript para o projeto, definindo opções de compilação e caminhos.
├── vite.config.ts          # Configuração do Vite, onde você pode personalizar o comportamento do bundler.
├── src/                    # Diretório principal do código-fonte da aplicação.
│   ├── components/         # Componentes globais usados nas páginas da aplicação, facilitando a reutilização.
│   ├── assets/             # Armazena imagens e outros arquivos estáticos.
│   ├── hooks/              # Hooks personalizados criados para compartilhar lógica entre componentes.
│   ├── services/           # Conexões e instâncias para interações com APIs ou serviços externos.
│   ├── utils/              # Funções globais que podem ser usadas em vários lugares no projeto.
│   ├── views               # Diretório que contém as páginas da aplicação.
│     ├── _layouts/         # Layouts que definem a estrutura de páginas, permitindo a reutilização de componentes de layout.
│       ├── app/            # Layout específico para rotas da aplicação principal.
│       ├── auth/           # Layout específico para rotas de autenticação (login, registro, etc.).
│     ├── app/              # Páginas específicas da aplicação.
│       ├── dashboard/      # Página do dashboard, geralmente uma visão geral da aplicação.
│       ├── user/           # Páginas e componentes relacionados ao gerenciamento de usuários.
│     ├── auth/sign-in      # Página de Login, onde os usuários inserem suas credenciais.
│   ├── App.tsx             # Componente raiz da aplicação que define a estrutura principal e rotas.
│   ├── global.css          # Estilos globais aplicados a toda a aplicação, geralmente importando estilos de bibliotecas como Tailwind.
│   ├── main.tsx            # Ponto de entrada do JavaScript, onde o React é renderizado na aplicação.
│   ├── routes.tsx          # Configuração das rotas da aplicação, definindo como os componentes devem ser exibidos em diferentes URLs.
│   ├── vite-env.d.ts       # Declarações de tipo específicas para Vite e TypeScript, ajudando com a tipagem no desenvolvimento.
````

### Back-end
````shell
server/
│
├── prisma/                  # Diretório para gerenciamento do banco de dados usando Prisma.
│   ├── migrations/          # Contém as migrações do banco de dados geradas pelo Prisma.
│   ├── schema.prisma        # Arquivo de definição do esquema do banco de dados, onde as tabelas e relações são definidas.
├── eslintrc.js              # Configuração do ESLint para manter a qualidade do código com regras de linting.
├── seeder.json              # Seeder com dados para usuário e produtos
├── .gitignore               # Especifica quais arquivos e pastas devem ser ignorados pelo Git.
├── .prettierrc              # Configuração do Prettier para formatação automática de código.
├── client.http              # Arquivo que pode ser usado para testar as rotas da API com ferramentas como Insomnia ou Postman.
├── docker-compose.yml       # Arquivo de configuração para orquestração de contêineres Docker.
├── package-lock.json        # Registra as versões exatas das dependências instaladas, garantindo consistência.
├── package.json             # Gerencia as dependências do projeto, scripts e metadados da aplicação.
├── env                      # Arquivo para armazenar variáveis de ambiente, geralmente usado para configuração sensível.
├── tsconfig.json            # Configuração do TypeScript para o projeto, definindo opções de compilação e caminhos.
├── nest-cli.json            # Configuração específica do CLI do NestJS, que define comandos e recursos do projeto.
├── src/                     # Diretório principal do código-fonte da aplicação.
│   ├── auth/                # Módulo de autenticação.
│        ├── auth.module.ts  # Módulo que encapsula toda a lógica de autenticação.
│        ├── current-user-decorator.ts # Decorador para obter informações do usuário atual.
│        ├── jwt-auth.guard.ts        # Guard para proteger rotas com autenticação JWT.
│        ├── jwt.strategy.ts           # Estratégia para validar tokens JWT.
│   ├── controllers/         # Controladores que definem as rotas e a lógica associada.
│        ├── authenticate.controller.ts # Controlador para autenticação do usuário.
│        ├── create-account.controller.ts # Controlador para criação de usuários.
│        ├── fetch-accounts.controller.ts # Controlador para busca de usuários.
│        ├── create-product.controller.ts # Controlador para criação de produtos.
│        ├── delete-product.controller.ts # Controlador para deleção de produtos.
│        ├── delete-account.controller.ts # Controlador para deleção de usuários.
│        ├── fetch-account.controller.ts # Controlador para busca de usuário.
│        ├── fetch-product.controller.ts # Controlador para busca de um produto.
│        ├── fetch-products.controller.ts # Controlador para busca de produtos.
│        ├── upload-photo.controller.ts # Controlador para upload de imagens no AWS S3.
│   ├── pipes/               # Pipes que transformam ou validam dados de entrada.
│        ├── zod-validation-pipe.ts # Pipe que utiliza Zod para validar dados de entrada.
│   ├── services/            # Serviços que encapsulam a lógica de negócios e interações com APIs ou serviços.
│        ├── prisma.service.ts       # Serviço que encapsula a lógica para interagir com o Prisma.
│        ├── upload.service.ts       # Serviço que gerencia uploads, como arquivos para AWS S3.
│   ├── app.module.ts        # Módulo raiz da aplicação, que agrega todos os módulos e configura serviços.
│   ├── env.ts               # Arquivo que carrega variáveis de ambiente e as torna disponíveis na aplicação.
│   ├── main.ts              # Ponto de entrada da aplicação, onde o NestJS é inicializado e configurado.
````

