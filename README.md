<p align="center">
  <a href="https://sagui-dev.firebaseapp.com" target="_blank">
    <img width="400" src="src/assets/images/logo.png" alt="Sagui">
  </a>
</p>

# SAGUI ([DASHBOARD](https://sagui-dev.firebaseapp.com))

[![Development](https://img.shields.io/travis/sagui-oficial/painel-react/feature/development.svg?label=development&style=flat-square)](https://travis-ci.org/sagui-oficial/painel-react) [![Production](https://img.shields.io/travis/sagui-oficial/painel-react/master.svg?label=production&style=flat-square)](https://travis-ci.org/sagui-oficial/painel-react)


Projeto desenvolvido com [Create React App](https://github.com/facebook/create-react-app) usando o style guide [Material-UI](https://material-ui.com/)

Para entender melhor sobre a arquitetura do front-end [clique aqui](docs/ARCHITECTURE.md)

## Clonar o repositório

```bash
git clone https://github.com/sagui-oficial/painel-react.git
```

## Pré-requisitos para rodar localmente

- [Node](https://nodejs.org/en/) versão >10
- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/) ou outro editor de texto
- Instalar pacotes globais para desenvolvimento (talvez precise rodar o terminal como admin)
- Use preferencialmente o terminal **bash do git**

```bash
npm i -g create-react-app yarn
```

### VSCode dicas

Instale extensões para auxilar no desenvolvimento:

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Adicione a config abaixo no `settings.json` do VSCode

```json
"eslint.autoFixOnSave": true,
```

## Como começar?

Ao abrir o terminal a partir da raiz do projeto, você poderá rodar os comandos:

### Instalar as dependências do projeto

```bash
yarn
```

### Iniciar o projeto

```bash
yarn start
```

Roda o projeto no modo de desenvolvimento.<br>
Abra [http://localhost:3000](http://localhost:3000) para visualizar no browser.

A página será recarregada quando modificações no código forem salvas.<br>
Também é possível ver logs de erros no console.

## Testes unitários

```bash
yarn test
```

## Build do projeto

Uma pasta **build** com todos arquivos referente ao projeto será gerada na raiz.

```bash
yarn build
```
