# 🚀 Txai - Teste Técnico

Bem-vindo ao projeto! Este repositório contém a aplicação back-end e front-end.

## 📦 Rodar o Backend

Para rodar o back-end, siga os passos abaixo:

1. **Acesse o diretório do servidor:**
   ```bash
   cd server

2. **Crie um arquivo .env com as seguintes informações:**
     - DATABASE_URL="mysql://root:docker@localhost:3306/txai_database"
     - PORT="3333"
     - JWT_PRIVATE_KEY="LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJRXBRSUJBQUtDQVFFQW1xaGlqeit4WkUwYllzaVJlbWNZRzU3dng1UWxEZC9rMWVmNUNnYkMvU3AvZHpNbA0KbXYwb0swVU5NMXdzZUdmNXJVb2IvMi9veU1lSTFsZDZnVTJ5MXdPVHArZFU0UmJ4QVYreDFVbnV1MU1VVGp2Ng0KV1ZIWWtieitjaG1PSWlGRS92QVJZNGtFTUttRm0vR2gyTk5Ta1RhNmtjdHFFT0RrWWxJUnNWWXQ5cVpGTk03Rw0KMGNHTmZKQ1BaM1pNMkNpN3ZENWVCYlFFYUhxQm8zTjBtWSt4UTBNS0xua1RlUk1URWpObTZaT1FkNlU2cWtxZA0KNHlDa1BrL2xiSVd6T1ZXeHFnTmJiTEc3QUF2VkxTZEUyT0UycHplV05mQ2d1LzRBK1hTWDgrcmJXNFZDNklqNQ0KY0VKeUR1cU1KVExMb2F3RTRXdEFYMm0wYUR5c0dmaVdxeG1xNXdJREFRQUJBb0lCQVFDRlhXTHdhRnBPUmZleA0KcllkVjZBVHYvSlNFcEFsMzkzUmJ5UmdHUDJKeDhlM05HbnY1TlFrb2x2a1ZLd3ptSDdNOGJjWEs5ZlBrLzd2Tw0KS2Mxb0oxcHE4NWltbDJPb1hxSWhMeVlvNlFKRzR4T0ZpMDhOS3ZqNFkrTisvTzZHRys1bGNSdHRtNy9UUHJ3Sw0KaDhtck1qL25IU3l4Z0puTVNFSnBUcUFYTGx1Z2J0WE0yOE1yRjBsWnVzMWFZV1BaeU84ZGkxd0xCTXJVNWRRRA0KVzVJN0ZpUXU4YlJrSlY3Uk1YajNRN0lHWG5CZXp1VkFQUGNxUDkvcXBWbFpWUWtpTE5wWGhybzNVWGdVZDEvWQ0KZm9yN3VnTEs1a3ZYZURZNDJZR24vRkZrZTFQejZ5TUZoTFRoWkZkZjFFRExlZ1ZmRkNQQ1RmNHdjTS9hdnc5eg0KaU44SVVsT3hBb0dCQU1zT2Vhd1VrVVdYdDk5bHNhallHQWtpVWt1RXFFcVBGb3FaYVpuK01DUzU4OXNqenV1eg0KTmdHMzlEM3JLcmF6N2JQdTl6TU45ck5ad1hrcTdHbVZXalJkNDJaTTNKOGV0ZEtKZEp6ME13b0JjMWd4eXA3Tg0KS0puNU9zc1VRTWJ2L3NWS0xSTktlVnNheldnL3UzZ0dxUkxEdWdMZXNwRzk2bDl1dk4zZUFJRXRBb0dCQU1MNw0KYU5odFhJdG0rR0hzejBhU1A3L3F0dVRKZ0dOd2EvcU1pNTR2VHJPRDdhaTVJektiRXNFK1NSVnZBRjd0YkFwaw0KS1ZaenI0L1EwOS9rSlc0WnNmVmtIQzVJSS9lZm96S1RMaWFueVIyWVlXWEZiOTBYWlNaOU1nZW1QL0dCNFRnbg0KcHFQR21VYzBhOWtjRjZsT0tRZHAwQ1pUZkJ3d2k3OEVpdGpFZDZEakFvR0JBTVVia3c1d2xLZ0tZNG11akt1Sw0Kd0tJMU44OW93WGhHdDZub3k3S1pKU0N4aFQ2bTN0aTdpT1JZTGZYaER3QjFYbnU0cnl0WEZhLzVvNjQ3OVd0MA0KZURDM0p1T0tIdXN6QTJxUTFhcjUvWVZyN1F5aW9MNVFCbWFZb1BLN0FUcGJnMkw5NHcyRDBKT1lTK1l6WDRaZQ0KYU1iM1NkdzVVdnZZYitjZGRxYWtOcmN0QW9HQUlHR29jK2tWcVlFY1Z3Y0JGWE5NYXc4TCtNc09LM1dNT1R3Rw0KSStzdll0alNLMmN6MVQrenlhd1NieURVS3UrN05hNlV2dXJQaVU3aElSbStyWjVPMDdZZ2gvOHJHZ0RGRmEwag0KeVArc2d1Ry9xeXN5L01EWjU1NTdKSklUcElReFp5WU9vcnhrMEZLQVpyb25vOUo3TmVQNDBhU2p3L3E3K3FsQw0KZGVXTENJa0NnWUVBbWtnKzlRellLN1VKaWdxV1VHaXFoTFFDTW14YmhyL1Y5RlFONStYNGw2dlRxNzE4V3l2YQ0KL29MbEpkVlcvWHZML29xZnZJZDR6c3JJU2RzYmp4SlNieURyblZoV3pJRXRtM2xVTyt3bFBiUStJOG1qSW01bQ0KZlJDbmFzSk5BcTllcmZyRWxPOXUwNUE4VTJ4L2xRQlJRM0lqUDdYcnZRMTZWWFR1cDNtV0g0cz0NCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t"
     - JWT_PUBLIC_KEY="LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBbXFoaWp6K3haRTBiWXNpUmVtY1kNCkc1N3Z4NVFsRGQvazFlZjVDZ2JDL1NwL2R6TWxtdjBvSzBVTk0xd3NlR2Y1clVvYi8yL295TWVJMWxkNmdVMnkNCjF3T1RwK2RVNFJieEFWK3gxVW51dTFNVVRqdjZXVkhZa2J6K2NobU9JaUZFL3ZBUlk0a0VNS21GbS9HaDJOTlMNCmtUYTZrY3RxRU9Ea1lsSVJzVll0OXFaRk5NN0cwY0dOZkpDUFozWk0yQ2k3dkQ1ZUJiUUVhSHFCbzNOMG1ZK3gNClEwTUtMbmtUZVJNVEVqTm02Wk9RZDZVNnFrcWQ0eUNrUGsvbGJJV3pPVld4cWdOYmJMRzdBQXZWTFNkRTJPRTINCnB6ZVdOZkNndS80QStYU1g4K3JiVzRWQzZJajVjRUp5RHVxTUpUTExvYXdFNFd0QVgybTBhRHlzR2ZpV3F4bXENCjV3SURBUUFCDQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0="
     - AWS_ACCESS_KEY="AKIAYLMG7BEJX3454WRS"
     - AWS_SECRET_ACCESS_KEY="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"
     - AWS_S3_REGION="us-east-1"

3. **Instale as dependências:**
   ```bash
   npm i

4. **Inicie o Docker Compose:**
   ```bash
   docker-compose up -d
   
5. **Gere o cliente do Prisma:**
   ```bash
   npx prisma generate
   
6. **Execute as migrações do Prisma:**
   ```bash
   npx prisma migrate dev
   
7. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev

8. **Acessar Swagger:**
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
│        ├── create-product.controller.ts # Controlador para criação de produtos.
│        ├── delete-product.controller.ts # Controlador para deleção de produtos.
│        ├── delete-account.controller.ts # Controlador para deleção de usuários.
│        ├── fetch-account.controller.ts # Controlador para busca de usuários.
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

