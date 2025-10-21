const { default: Message } = require("tedious/lib/message");
const { clienteModel } = require("../models/clienteModel");

const clienteController = {
  //-------------------------
  // listar todos os produtos
  // get/produtos
  //-------------------------

  listarClientes: async (req, res) => {
    try {
      const {idCliente} = req.query;

      if (idCliente) {
        if(idCliente.length != 36) {
          return res.status(400).json({erro: `id do cliente invalido!`})
        }
        const cliente = await clienteModel.buscarUm(idCliente);

        return res.status(200).json(cliente);
      }

      const clientes = await clienteModel.burscarTodos();
      res.status(200).json(clientes);
    } catch (error) {
      console.error("Erro ao listar clientes", error);
      res.status(500).json({ Message: "Erro ao buscar clientes" });
    }
  },

  //criar um novo cliente
  //POST/produtos

  /**
   {
  "idCliente": "1"
    "nomeCliente": "valor",
    "cpfCliente": "123.456.789.34"
  
   }
   */

  criarCliente: async (req, res) => {
    try {
      const { nomeCliente, cpfCliente } = req.body;

      if (nomeCliente == undefined || cpfCliente == undefined) {
        return res
          .status(400)
          .json({ erro: "Campos obrigatorios não preenchidos!" });
      }

      const result = await clienteModel.burscarCpf(cpfCliente);
      console.log(result);
       if(result.length > 0 ){
        return res.status(409).json({Message:"Cpf já cadastrado"});
       }
       
      await clienteModel.inserirCliente(nomeCliente,cpfCliente);
      

      res.status(201).json({ Message: "Cliente cadastrado com sucesso!" });
    } catch (error) {
      console.error("Erro ao cadastrar cliente!", error);
      res.status(500).json({ erro: "Erro no servidor ao cadastrar cliente!" });
    }
  },
  atualizaCliente: async(req,res) => {
    try {
      const {idCliente} = req.params;
      const {nomeCliente, cpfCliente} = req.body;

      if(idCliente.length != 36) {
        return res.status(400).json({erro: `id do cliente invalido!`})
      }

      const cliente = await clienteModel.buscarUm(idCliente);


      if(!cliente || cliente.length !== 1) {
        return res.status(404).json ({erro: `Cliente não encontrado!`});
      }

      const clienteAtual = cliente[0];

      const nomeAtualizado = nomeCliente ?? clienteAtual.nomeCliente;

      const cpfAtualizado = cpfCliente ?? clienteAtual.cpfCliente;

      await clienteModel.atualizarCliente(idCliente, nomeAtualizado, cpfAtualizado);

      res.status(200).json({Message: `Cliente atualizado com sucesso!`});
       
    } catch (error) {
      console.error (`Erro ao atualizar cliente`, error);
      res.status(500).json ({erro: `Erro no servidor ao atualizar cliente.`});
    }
  },

  deletarCliente: async(req,res) => {
      try {
        
        const idCliente = req.params.idCliente;
   console.log(idCliente)
        if(idCliente.length != 36) {
          return res.status(400).json({erro: `id do cliente invalido!`})
        }
  
        const cliente = await clienteModel.buscarUm(idCliente);
  
  
        if(!cliente || cliente.length !== 1) {
          return res.status(404).json ({erro: `Cliente não encontrado!`});
        }

        await clienteModel.deletarCliente(idCliente);

        res.status(200).json({Message: 'Cliente deletado com sucesso!'})
        
      } catch (error) {
        console.error({erro:'Erro ao deletar o cliente!', error});
        res.status(500).json({erro:'Erro no servidor ao deletar o cliente!'});
      }
  }
};

module.exports = { clienteController };
