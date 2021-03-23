const express = require("express")
const database = require("./database/database")
const session = require("express-session")
const Games = require("./models/Games")
const Users = require("./models/Users")
const cors = require('cors')
const jwt = require("jsonwebtoken")
const auth = require('./middlewares/auth')
const PORT = 4000 || process.env.PORT

const JWTSecret = "mgfanmfkamslkmfalkmfakmfaslknfajna"
const app = express();

app.use(express.json())
app.use(express.urlencoded({extend: false}))

app.use(cors())

app.use(express.static('./consumoDeApi'))

database.authenticate().then(
    console.log("Conexão com o banco de dados feita com sucesso")
).catch(err => {
    console.log(err)
})

var timeToExpire = (Date.now() + (60 * 60 * 1000))
app.use(session({
    secret: "MKVSKGNSDGNÇLKJBDMMÇLKBFD", cookie: { maxAge: timeToExpire}
}))
    

// const DB = {

//     games: [
//         {
//             id: 23,
//             title: "Call of Duty MW",
//             year: 2019,
//             price: 60
//         },

//         {
//             id: 65,
//             title: "Sea of thieves",
//             year: 2018,  
//             price: 48
//         },

//         {
//             id: 2,
//             title: "Minecraft",
//             year: 2009,
//             price: 20
//         }
//     ]
// }

app.get("/", auth,(req, res) => {

    res.render("./consumoDeApi/index.html")
})

app.get("/games", auth, (req, res) => {

    // var user = req.loggedUser
    Games.findAll().then(games => {

        res.json(games)
    }).catch(err => {
        res.json({message: "Algo deu errado :(", error: err})
    })
})

app.get("/game/:id", auth, (req, res) => {

    var id = req.params.id

    if(!isNaN(id)) {

        Games.findOne({where: {id: id}}).then(game => {
            res.json(game).status(200)
        }).catch(err => {
            res.json({message: "Não encontramos esse jogo no nosso sistema :(", error: err})
        })
    } else {

        res.json({message: "Não encontramos esse jogo no nosso sistema :("})
    }
})
app.post("/newgame",auth, (req, res) => {

    const {
        title,
        year,
        price     
    } = req.body


    Games.findOne({
        where: {title: title}
    }).then(game => {
        if(game == undefined) {
            Games.create({title, year,price, createdAt: Date.now()}).then(() => {

                res.json({message: "Dados salvos com sucesso"}).status(200)
        
            }).catch(err => {
                res.json({message: "Não deu certo :(", error: err})
            })
        } 

        else {
            res.json({message: "Game já criado"})
        }
    }).catch(err => {
        res.json({message: "Algo deu errado :(", error: err})
    })

})

app.delete("/game/:id",auth, (req, res) => {
    var id = req.params.id

    if(!isNaN(id)) {

        Games.destroy({where: {id: id}}).then(() => {

            res.json({message: "O jogo " + id + " foi excluído"}).status(200)
        }).catch(err => {
            res.json({message: "Não foi possível excluir o jogo", erro: err}).status(400)
        })
    } else {

        res.json({message: "Não encontramos esse jogo no nosso sistema :("})
    }
})

app.post("/auth", (req, res) => {

    const {email, password} = req.body

    if(email != undefined) {

        Users.findOne({where: {email: email}}).then(user => {
            
            if(user != undefined) {

                if(user.password == password) {

                    jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (err, token) => {

                        if(err) {

                            res.status(400)
                            res.json({message: "Falha interna", error: err})
                        }
                        else {
                            res.status(200)
                            req.session.token = token
                            res.json({token})
                        }
                    })

                }

                else {
                    res.status(400)
                    res.json({message: "Email ou senha inválidos"})
                }
            }else {

                res.status(400)
                res.json({message: "Email ou senha inválidos"})
            }

        }).catch(err => {

            res.status = 400
            res.json({message: "Houve um erro :(", error: err})
        })
    }
})


app.post('/newuser', auth,(req, res) => {

    const {email, password} = req.body

    Users.create({
        email,
        password,
        createdAt: Date.now()
    }).then(
        res.json({message: "Usuário criado com sucesso"}).status(200)
    ).catch(err => {

        res.json(err)
    })
})

app.put("/game/:id",auth, (req, res) => {

    var id = req.params.id

    const {
        title,
        year,
        price     
    } = req.body
    
    if(!isNaN(id)) {
        Games.update({title, year,price, createdAt: Date.now()},{where: {id: id}}).then(game => {

            res.json({message: "Jogo atualizado com  sucesso"}).status(200)

        }).catch(err => {
            res.json({message: "Não foi possivel atualizar o jogo :(", erro: err}).status(400)
        })
    }else {

        res.json({message: "Esse ID não existe no nosso sistema"}).status(404)
    }

})

app.listen(PORT, () => { console.log("Server is running")})