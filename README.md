![Logo](./img/readme_img.jpeg)

<h1 align="center">Culture Power</h1>

**MÓDULO 02 - Culture Power**: Neste projeto, estou desenvolvendo uma aplicação de gamificação para uma empresa "Exemplo". Este trabalho concentra-se integralmente no BackEnd, aplicando de forma prática os conceitos estudados ao longo deste módulo 02.

<h3 align="center">~ Modelos ~</h3>

```plaintext
Admin
- Name: string
- Email: string
- Password: string

Product
- Name: string
- Value: number
- Amount: number
- Description: string
- Photo: string

User
- Name: string
- Email: string
- Password: string
- jewelsAmount: number
- Products: Product[]
- FavoriteProducts: Product[]
- Photo: string
```

<h3 align="center">~ Cenários de uso ~</h3>

1. **Cadastro de Usuário**
   - Informações necessárias: nome, e-mail, senha, foto
   - Não permitir o cadastro se um usuário com o mesmo e-mail já existir
   - Criptografar a senha antes de armazenar no banco de dados
