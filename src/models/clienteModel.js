const { sql, getConnection } = require("../config/db");

const clienteModel = {
  burscarTodos: async () => {
    try {
      const pool = await getConnection();
      let sql = "SELECT * FROM Clientes;";
      const result = await pool.request().query(sql);
      return result.recordset;
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
      throw error; // passa o erro para controller tratar
    }
  },
  burscarCpf: async (cpfCliente) => {
    try {
      const pool = await getConnection();
      let querySQL = "SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente;";
      const result = await pool
        .request()
        .input("cpfCliente", sql.Char(11), cpfCliente)
        .query(querySQL);

      return result.recordset;
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
      throw error; // passa o erro para controller tratar
    }
  },
  buscarUm: async (idCliente) => {
    try {
      const pool = await getConnection();

      const querySQL = `SELECT * FROM clientes WHERE idCliente = @idCliente`;

      const result = await pool
        .request()
        .input(`idCliente`, sql.UniqueIdentifier, idCliente)
        .query(querySQL);

      return result.recordset;
    } catch (error) {
      console.error(`Erro ao buscar o cliente:`, error);
      throw error;
    }
  },
  inserirCliente: async (nomeCliente, cpfCliente) => {
    try {
      const pool = await getConnection();

      let querySQL =
        "INSERT INTO clientes  (nomeCliente, cpfCliente) VALUES ( @nomeCliente, @cpfCliente)";
      await pool
        .request()

        .input(`nomeCliente`, sql.VarChar(100), nomeCliente)
        .input("cpfCliente", sql.VarChar(11), cpfCliente)

        .query(querySQL);
    } catch (error) {
      console.error("Erro ao criar cliente!", error);
      throw error;
    }
  },

  atualizarCliente: async (idCliente, nomeCliente, cpfCliente) => {
    try {
      const pool = await getConnection();

      const querySQL = `
        UPDATE Clientes
        SET  nomeCliente = @nomeCliente,
        cpfCliente = @cpfCliente
        WHERE idCliente = @idCliente

        `;
      await pool
        .request()
        .input(`idCliente`, sql.UniqueIdentifier, idCliente)
        .input(`nomeCliente`, sql.VarChar(100), nomeCliente)
        .input(`cpfCliente`, sql.Char(11), cpfCliente)
        .query(querySQL);
    } catch (error) {
      console.error(`Erro ao atualizar cliente!`, error);
      throw error;
    }
  },

  deletarCliente: async (idCliente) => {
    try {
      const pool = await getConnection();

      const querySQL = "DELETE FROM Clientes WHERE idCliente = @idCliente";

      await pool
        .request()

        .input(`idCliente`, sql.UniqueIdentifier, idCliente)
        .query(querySQL);
    } catch (error) {
      console.error("Erro ao deletar o cliente!", error);
      throw error;
    }
  },
};

// async function teste() {
//     const produtos = await produtosModel1.burscarTodos();

//     console.log(produtos);
// }

// teste();
module.exports = { clienteModel };
