const express = require("express");
const app = express();
const {produtoRoutes} = require("./src/routes/produtosRoutes");
const {clientesRoutes} = require("./src/routes/clientesRoutes");

const PORT = 8081;

app.use(express.json());

app.use('/', produtoRoutes);
app.use('/', clientesRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor Rodando em http://localhost:${PORT}`);
})