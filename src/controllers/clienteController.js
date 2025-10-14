const { default: Message } = require("tedious/lib/message");
const { clienteModel } = require("../models/clienteModel");

const clienteController = {
  //-------------------------
  // listar todos os produtos
  // get/produtos
  //-------------------------

  listarClientes: async (req, res) => {
    try {
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
};

module.exports = { clienteController };
