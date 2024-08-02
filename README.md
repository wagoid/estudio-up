## Overview

Este projeto usa as seguintes ferramentas:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Linguagem - [TypeScript](https://www.typescriptlang.org)
- Autenticação - [Auth.js](https://authjs.dev)
- Banco de dados - [MongoDB](https://www.mongodb.com)
- Componentes de UI - [Material UI](https://mui.com/material-ui)
- Formulários - [React Hook Form](https://react-hook-form.com) e [zod](https://zod.dev)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatação - [Prettier](https://prettier.io)
- Deployment - TODO

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Rodando a aplicação

Instale [Docker](https://www.docker.com), e execute o seguinte para rodar o banco de dados e object store (S3):

```sh
docker compose up
```

Inicie o servidor de desenvolvimento:

```sh
npm install
npm dev
```

A aplicação estará disponível em http://localhost:3000
