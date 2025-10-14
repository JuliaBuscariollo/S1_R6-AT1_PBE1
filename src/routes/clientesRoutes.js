const express = require("express");
const router = express.Router();
const {clienteController} = require("../controllers/clienteController")

//GET/ produtos -> lista todos os produtos
router.get("/clientes", clienteController.listarClientes);

//POST/produtos -> cria um novo produto
router.post("/clientes",clienteController.criarCliente)
module.exports = {clientesRoutes : router};