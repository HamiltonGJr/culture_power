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

3. **Login de Admin**

- [x] Informações necessárias: e-mail e senha
- [x] Não gerar um token se não existir um admin com o e-mail fornecido
- [x] Não gerar um token se a senha enviada não for compatível com a do banco de dados
- [x] Gerar um token e retornar se as credenciais estiverem corretas

4. **Visualizar Usuário Logado (ROTA PRIVADA)**

- [x] Retornar os dados do usuário logado

5. **Cadastro de Produto (ROTA PRIVADA - ADMIN)**

- [x] Informações necessárias: nome, valor, quantidade, descrição e foto
- [x] Não permitir o envio se o usuário que está executando a ação não for um administrador

6. **Edição de Produto (ROTA PRIVADA - ADMIN)**

- [ ] Informações necessárias: nome, valor, quantidade, descrição e foto
- [ ] Não permitir o envio se o usuário que está executando a ação não for um administrador

7. **Listar Todos os Produtos (ROTA PRIVADA)**

- [ ] Deve listar os produtos com quantidade maior que 0

8. **Buscar Produto por ID (ROTA PRIVADA)**

- [ ] Deve ser informado: id
- [ ] Deve retornar o produto caso encontrado

9. **Enviar Joia para Usuário (ROTA PRIVADA - ADMIN)**

- [ ] Informações necessárias: quantidade de joia, ID do usuário
- [ ] Não permitir o envio se o usuário não existirem
- [ ] Não permitir o envio se o usuário que está executando a ação não for um administrador

10. **Resgatar Produto (ROTA PRIVADA)**

- [ ] Informações necessárias: ID do produto, ID do usuário
- [ ] Não permitir o resgate se o produto ou o usuário não existirem
- [ ] Não permitir o resgate se o usuário não tiver joias suficientes
- [ ] Decrementar o valor do produto pela quantidade de joias
- [ ] Decrementar a quantidade do produto

<h3>Tecnologias utilizadas:</h3>

1.  [BCrypt;](https://www.npmjs.com/package/bcrypt)
2.  [DotEnv;](https://www.npmjs.com/package/dotenv)
3.  [Express;](https://expressjs.com/pt-br/)
4.  [JsonWebToken;](https://jwt.io/)
5.  [Mongoose;](https://mongoosejs.com/)
6.  [Multer;](https://www.npmjs.com/package/multer)
7.  [Yup;](https://www.npmjs.com/package/yup)
8.  [Eslint;](https://eslint.org/docs/latest/use/getting-started)
9.  [Prettier;](https://prettier.io/docs/en/)
10. [Ts-Node-Dev;](https://www.npmjs.com/package/ts-node-dev)
11. [TypeScript;](https://www.typescriptlang.org/pt/docs/)
