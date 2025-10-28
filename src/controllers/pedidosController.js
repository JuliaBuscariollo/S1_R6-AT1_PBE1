const { pedidosModel } = require("../models/pedidosModel");
const { clienteModel } = require("../models/clienteModel");
const { produtoModel } = require("../models/produtoModel");

const pedidosController = {
  /**
   * controlador lista todos os produtos do banco de dados
   *
   * @async
   * @function: listarPedidos
   * @param {object} req -> obejto de requisisão (recebido do cliente HTTP)
   * @param {object} res -> obejto de resposta ( enviado ao  cliente HTTP)
   * @returns {@promise<void>} retorna uma resposta json com uma lista de produtos
   * @throws Mostra o console e retorna erro 500 se ocorrer falha de buscar os pedidos
   */
  listarPedidos: async (req, res) => {
    try {
      const pedidos = await pedidosModel.burscarTodos();

      res.status(200).json(pedidos);
    } catch (error) {
      console.error("Erro ao listar pedidos", error);
      res
        .status(500)
        .json({ erro: "erro interno no servidor ao listar pedidos!" });
    }
  },

  criarPedidos: async (req, res) => {
    try {
      const { idCliente, dataPedido, statusPag, itens } = req.body;

      console.log("HELLO", idCliente, dataPedido, statusPag, itens.length);

      if (
        idCliente == undefined ||
        dataPedido == undefined ||
        statusPag == undefined ||
        itens.length < 1
      ) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatorios não preenchidos!" });
      }

      if (idCliente.length != 36) {
        return res.status(400).json({ erro: "Id do cliente invalido!" });
      }

      const cliente = await clienteModel.buscarUm(idCliente);

      if (!cliente || cliente.length != 1) {
        return res.status(500).json({ erro: "Cliente não encontrado!" });
      }
      for (const item of itens) {
        const { idProduto, qtdItem } = item;

        if (idProduto == undefined || qtdItem == undefined) {
          return res
            .status(400)
            .json({ erro: "campos obrigatorios não preenchidos!" });
        }


        if (idProduto.length != 36) {
          return res.status(400).json({ erro: "Id do produto invalido!" });
        }

        const produto = await produtoModel.buscarUm(idProduto);

        if (!produto || produto.length != 1) {
          return res.status(500).json({ erro: "Produto não encontrado!" });
        }
      }

      await pedidosModel.inserirPedidos(idCliente, dataPedido, statusPag,{itens} );
      return res.status(200).json({ message: "Pedido cadastrado com sucesso!!" });

    } catch (error) {
      console.error("Erro ao cadastrar pedido!", error);
      res
        .status(500)
        .json({ erro: "Erro interno no servidor ao cadastrar pedido!" });
    }
  },
};
module.exports = { pedidosController };
