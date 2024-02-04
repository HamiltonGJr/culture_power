![Logo](./img/readme_img.jpeg)

<h1 align="center">Culture Power</h1>

**MÓDULO 02 - Culture Power**: Neste projeto, estou desenvolvendo uma aplicação de gamificação para uma empresa "Exemplo". Este trabalho concentra-se integralmente no BackEnd, aplicando de forma prática os conceitos estudados ao longo deste módulo 02.

<h3>Modelos:</h3>

```plaintext
Admin {
  name: string,
  email: string,
  password: string
};

Product {
  name: string,
  value: number,
  amount: number,
  description: string,
  photo: string
};

User {
  name: string,
  email: string,
  password: string,
  jewelsAmount: number,
  products: Product[],
  favoriteProducts: Product[],
  photo: string
};
```

<h3 align="center">~ Cenários de uso ~</h3>

1. **Cadastro de Usuário**

- [x] Informações necessárias: nome, e-mail, senha, foto.
- [x] Não permitir o cadastro se um usuário com o mesmo e-mail já existir.
- [x] Criptografar a senha antes de armazenar no banco de dados.

2. **Login de Usuário**

- [x] Informações necessárias: e-mail e senha.
- [x] Não gerar um token se não existir um usuário com o e-mail fornecido.
- [x] Não gerar um token se a senha enviada não for compatível com a do banco de dados.
- [x] Gerar um token e retornar se as credenciais estiverem corretas.

<h3>Tecnologias utilizadas:</h3>

1. [BCrypt;](https://www.npmjs.com/package/bcrypt)
2. [DotEnv;](https://www.npmjs.com/package/dotenv)
3. [Express;](https://expressjs.com/pt-br/)
4. [Mongoose;](https://mongoosejs.com/)
5. [Eslint;](https://eslint.org/docs/latest/use/getting-started)
6. [Prettier;](https://prettier.io/docs/en/)
7. [Ts-Node-Dev;](https://www.npmjs.com/package/ts-node-dev)
8. [TypeScript;](https://www.typescriptlang.org/pt/docs/)
