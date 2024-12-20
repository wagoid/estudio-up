## Overview

Este projeto usa as seguintes ferramentas:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Linguagem - [TypeScript](https://www.typescriptlang.org)
- Autenticação - [Auth.js](https://authjs.dev)
- Banco de dados - [PostgreSQL](https://www.postgresql.org)
- Componentes de UI - [Material UI](https://mui.com/material-ui)
- Formulários - [React Hook Form](https://react-hook-form.com) e [zod](https://zod.dev)
- Formatação - [Prettier](https://prettier.io)
- Deployment - Os manifests do Kubernetes estão na pasta [kustomize](https://github.com/wagoid/estudio-up/tree/main/kustomize). Fluxo de CD utiliza Github Actions: [Release Please](https://github.com/googleapis/release-please-action) + [build-push-action](https://github.com/docker/build-push-action)

## Rodando a aplicação localmente

Obenha com outra pesssoa as variáveis de ambiente que estão vazias no `.env` e adicione ao arquivo `.env.local`.

Instale a versão correta do Node.js (presente no `.nvmrc`) através de um gerenciador de versões, como o `volta`.

Instale [Docker](https://www.docker.com), e execute o seguinte para rodar o banco de dados e object store (S3):

```sh
docker compose up
```

Instale [ffmpeg](https://www.ffmpeg.org/) e [mp3wrap](https://mp3wrap.sourceforge.net/), que são utilizadas para converter e concatenar arquivos de áudio.

Caso esteja usando uma distro linux que é baseada em debian (como Ubuntu), pode instalar diretamente via `apt`: `sudo apt install ffmpeg mp3wrap`

Instale as dependências:

```sh
npm install
```

Execute as migrations para inicializar as tabelas do banco de dados.

```sh
npm run typeorm -- -d data-source.ts migration:run
```

Solicite outra pessoa os valores para preencher o `.env.local`.

Inicie o servidor de desenvolvimento:

```sh
npm dev
```

A aplicação estará disponível em http://localhost:3000
