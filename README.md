# Simple games API
A simple game API with CRUD, HTTP methods, Axios API consume e JWT auth validation

## Endpoints

### GET / (necessário autenticação)
Retorna uma interface simples feita com Bootstrap

### GET /games (necessário autenticação)
Retorna todos os games listados no banco de dados

![endpoint /games](https://github.com/The-Livrodjx/simple-games-api/blob/master/images/example.png)


### GET /game/id (necessário autenticação)
Retorna um game pelo seu identificador

![endpoint /game/id](https://github.com/The-Livrodjx/simple-games-api/blob/master/images/example2.png)

### POST /newgame (necessário autenticação)
Registra um novo game no banco de dados

![endpoint /newgame](https://github.com/The-Livrodjx/simple-games-api/blob/master/images/example3.png)

### POST /auth 
Loga um usuário na API retornando um JsonWebToken

### POST /newuser
Registra um usuário no banco de dados utilizando email e senha

![endpoint /newuser](https://github.com/The-Livrodjx/simple-games-api/blob/master/images/example4.png)


### DELETE /game/id (necessário autenticação)
Deleta um game do banco de dados

### PUT /game/id (necessário autenticação)
Edita um game pelo seu identificador
