# FatecBook

FatecBook é uma aplicação web simples de rede social, desenvolvida como projeto para a disciplina de Técnicas de Programação 3 da FATEC. Permite que usuários criem, editem e excluam publicações, visualizem postagens de outros usuários e gerenciem sua conta.

## Funcionalidades

- Cadastro e login de usuários
- Criação de novas publicações
- Edição e exclusão de suas próprias publicações
- Visualização das postagens de todos os usuários
- Exibição da data e hora de cada postagem
- Interface responsiva e moderna

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- SQLite/PostgreSQL/MySQL (configurável)
- Handlebars (template engine)
- CSS moderno e responsivo

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Felipe-SMZ/FatecBook.git
   cd fatecbook
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   - Edite o arquivo `config/database.js` conforme o banco desejado.

4. **Inicie a aplicação:**
   ```bash
   npm start
   ```
   Ou:
   ```bash
   node app.js
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## Estrutura de Pastas

```
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
├── views/
│   ├── posts.handlebars
│   ├── editPost.handlebars
│   └── ...
├── public/
│   └── css/
│       └── style.css
├── app.js
└── package.json
```

## Como Usar

1. **Cadastre-se ou faça login.**
2. **Crie uma publicação usando o campo no topo da página.**
3. **Edite ou exclua suas publicações usando os botões abaixo de cada post.**
4. **Veja as postagens de outros usuários na timeline.**


## Licença

Este projeto é apenas para fins educacionais.

---

Desenvolvido por Felipe S. Shimizu para a FATEC.