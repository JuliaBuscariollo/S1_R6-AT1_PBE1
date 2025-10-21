const express = require("express");
const router = express.Router();
const {produtoController} = require("../controllers/produtoController")

//GET/ produtos -> lista todos os produtos
router.get("/produtos", produtoController.listarProdutos);

//POST/produtos -> cria um novo produto
router.post("/produtos",produtoController.criarProduto)


// PUT/ produtos/ idProduto -> busca o produto pelo id e atualiza ele
router.put("/produtos/:idProduto", produtoController.atualizaProduto)

// DELETE/ produtos/ idProduto -> busca o produto pelo id e deleta
router.delete("/produtos/:idProduto", produtoController.deletarProduto)

module.exports = {produtoRoutes : router};