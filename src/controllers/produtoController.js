const { default: Message } = require("tedious/lib/message");
const { produtoModel } = require("../models/produtoModel");

const produtoController = {
  //-------------------------
  // listar todos os produtos
  // get/produtos
  //-------------------------

  listarProdutos: async (req, res) => {
    try {
      const produtos = await produtoModel.burscarTodos();
      res.status(200).json(produtos);
    } catch (error) {
      console.error("Erro ao listar produtos", error);
      res.status(500).json({ Message: "Erro ao buscar o produto" });
    }
  },

  //criar um novo produto
  //POST/produtos

  /**
   {
    "nomeProduto": "valor",
    "precoProduto": o.oo
  
   }
   */

  criarProduto: async(req,res) => {
 try {

  const {nomeProduto, precoProduto} = req.body;

  if(nomeProduto == undefined|| precoProduto == undefined || isNaN(precoProduto)){
    return res.status(400).json({erro:'Campos obrigatorios não preenchidos!'});
  }

  await produtoModel.inserirProduto(nomeProduto,precoProduto);

  res.status(201).json({Message:'Produto cadastrado com sucesso!'});
  
 } catch (error) {
   console.error('Erro ao cadastrar produto!', error);
   res.status(500).json({erro:'Erro no servidor ao cadastrar produtos!'});
 }
  }
};

module.exports = { produtoController };
