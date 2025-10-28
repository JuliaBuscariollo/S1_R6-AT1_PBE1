const express = require("express");
const router = express.Router();
const {pedidosController} = require("../controllers/pedidosController")

/**
 * 
 * define as rotas relacionadas ao pedidos
 * 
 * @module pedidoRoutes
 * 
 * @description
 *  -GET/pedidos - lista todos os pedidos
 * -POST / pedidos - cria um novo pedido
 */


//GET/ produtos -> lista todos os produtos
router.get("/pedidos", pedidosController.listarPedidos);

router.post("/pedidos", pedidosController.criarPedidos);

module.exports = {pedidoRoutes: router}