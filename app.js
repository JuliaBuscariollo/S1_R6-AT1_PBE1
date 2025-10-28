const express = require("express");
const app = express();
const {produtoRoutes} = require("./src/routes/produtosRoutes");
const {clientesRoutes} = require("./src/routes/clientesRoutes");
const {pedidoRoutes} = require("./src/routes/pedidosRoutes");

const PORT = 8081;

app.use(express.json());

app.use('/', produtoRoutes);
app.use('/', clientesRoutes);
app.use('/', pedidoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor Rodando em http://localhost:${PORT}`);
})