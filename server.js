const express = require('express')
const server = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

server.use(bodyParser.json())

/*CONNECTION*/
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'ideadb',
    multipleStatements: true
})

mysqlConnection.connect((err) =>{
    if(!err){
        console.log('sucessfied connection')
    }else{
        console.log('Fail connection: ' + json.stringify(err, undefined, 2))
    }
})

/*END CONNECTION*/


server.use(express.static("public")) //configurando a pasta com nome "PUBLIC", colocando tudo necessário como CSS, SCRIPTS E IMAGENS
server.use(express.urlencoded({extended: true}))

//ROUTS

server.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html")
})


server.get("/formulario", (req, res) =>{
    res.sendFile(__dirname + "/src/formIdea.html")

})

server.get("/index", (req, res) =>{
    res.sendFile(__dirname + "/src/index.html")
})


server.post("/principal", (req, res) =>{
    const user = req.body.nome
    const pass = req.body.senha
    
    mysqlConnection.query('SELECT EmpUser FROM employee WHERE EmpUser = "' + user +'" AND EmpPassword = "' + pass +'"',  (err, rows, field) =>{
        if(!err){
            if(rows.length > 0){
                //console.log(rows)
                res.sendFile(__dirname + "/src/initialGestaoFuncionario.html")
            }else{
                res.sendFile(__dirname + "/src/index2.html")
            }
        }else{
            console.log(err)
        }
    })
})

server.post("/resultadoformulario", (req, res) =>{
        
    const DadosForm ={
        FormEmployeeRa: req.body.ra,
        FormEmployeeSetor: req.body.setor,
        FormDetalhes: req.body.detalhes,
        FormEmployeeNome: req.body.nome,
        FormEmployeeCargo: req.body.cargo,
        FormAssunto: req.body.assunto
    }
        mysqlConnection.query('INSERT INTO ideasform SET ?', DadosForm,(err, rows) => {
            if(!err){
                console.log('INSERIDO')
            }else{
                console.log(err)
            }
          });
    //res.sendFile(__dirname + "/src/enviado.html")
    })
// end routs


server.listen(3000, ()=>{
    console.log("iniciado!!")
})