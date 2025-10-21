const { default: Message } = require("tedious/lib/message");
const { produtoModel } = require("../models/produtoModel");

const produtoController = {
  //-------------------------
  // listar todos os produtos
  // get/produtos
  //-------------------------

  listarProdutos: async (req, res) => {
    try {
      const {idProduto} = req.query;

      if (idProduto) {
        if(idProduto.length != 36) {
          return res.status(400).json({erro: `id do produto invalido!`})
        }

        const produto = await produtoModel.buscarUm(idProduto);

        return res.status(200).json(produto);
      }

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
  },


  atualizaProduto: async(req,res) => {
    try {
      const {idProduto} = req.params;
      const {nomeProduto, precoProduto} = req.body;

      if(idProduto.length != 36) {
        return res.status(400).json({erro: `id do produto invalido!`})
      }

      const produto = await produtoModel.buscarUm(idProduto);


      if(!produto || produto.length !== 1) {
        return res.status(404).json ({erro: `Produto não encontrado!`});
      }

      const produtoAtual = produto[0];

      const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;

      const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

      await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

      res.status(200).json({Message: `Produto atualizado com sucesso!`});
       
    } catch (error) {
      console.error (`Erro ao atualizar produto`, error);
      res.status(500).json ({erro: `Erro no servidor ao atualizar produto.`});
    }
  },

  deletarProduto: async(req,res) => {
      try {
        
        const {idProduto} = req.params;
  
        if(idProduto.length != 36) {
          return res.status(400).json({erro: `id do produto invalido!`})
        }
  
        const produto = await produtoModel.buscarUm(idProduto);
  
  
        if(!produto || produto.length !== 1) {
          return res.status(404).json ({erro: `Produto não encontrado!`});
        }

        await produtoModel.deletarProduto(idProduto);

        res.status(200).json({Message: 'Produto deletado com sucesso!'})
        
      } catch (error) {
        console.error({erro:'Erro ao deletar o produto!', error});
        res.status(500).json({erro:'Erro no servidor ao deletar o produto!'});
      }
  }



   //atualizar um produto
  //PUT/produtos/ idProduto
  //nomeProduto e precoProduto são opcionais

  /**
   {
    "nomeProduto": "valor",
    "precoProduto": o.oo
  
   }
   */

};

module.exports = { produtoController };
