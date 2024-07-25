

# Autotrac-Starlink

O Autotrac-Starlink é um mvp para demonstração de resposta da API Starlink. 
Este MVP em Angular é o embrião do portal de acesso às informações do projeto Starlink.
![alt text](src/assets/imagens/proj_starlink_img.png)
# Api em Nest

Esse é um protótipo da API pra permitir o desenvolvimento do frontend.

<img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg" width="150px">


## 🛠️ Instalação de dependências

```bash
$ npm install
```

## 🛠️ Execução

Para iniciar o servidor frontend.
```bash
$ ng serve
```
Para iniciar o servidor backend para fazer o bypass do CORS em ambiente de desenvolvimento.
```bash
$ node src/server.js
```

Deixe os dois terminais em execução para fazer as chamadas da RESTAPI da Starlink.

## 🛠️ Documentação

Com a aplicação em execução, abra o seu navegador e acesse [http://localhost:4200](http://localhost:4200).


## Autenticação

Necessário obter clientId e client_secret em portal da Starlink. Verificar acesso com o gerente da área.
Adicionar o token ao header das requisições autenticadas:

```
Authorization: Bearer <ACCESS_TOKEN>
```

## 📚 Mais informações sobre a API da Starlink. 
[https://starlink.readme.io/reference/get_enterprise-v1-account-accountnumber-service-lines-available-products](API-Starlink)
Caso não possua senha, gentileza autenticar em: [https://starlink.readme.io/password?redirect=/reference/get_enterprise-v1-accounts](URL-Auth da API)

Outros acessos: [https://www.starlink.com/account/home](Home do portal)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
