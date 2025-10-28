const { sql, getConnection } = require("../config/db");

const pedidosModel = {
  /**
   * ela busca todos os pedidos e seus respectivos itens no banco de dados
   *
   * @async
   * @function burscarTodos
   * @returns {Promise<array>} retorna uma lista com todos os pedidos e os seus itens
   * @throws mostra no console e propaga o erro caso a busca falhe
   */

  burscarTodos: async () => {
    try {
      const pool = await getConnection();

      const querySQL = `
            SELECT 
                CL.nomeCliente,
                PD.dataPedido,
                PD.statusPag,
                PR.nomeProduto,
                IT.qtdItem
            FROM Pedidos PD
            INNER JOIN itemPedido IT ON IT.idPedido = PD.idPedido
            INNER JOIN Produtos PR  ON PR.idProduto = IT.idProduto
            INNER JOIN clientes CL ON CL.idCliente = PD.idCliente
            `;

      const result = await pool.request().query(querySQL);

      return result.recordset;
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
      throw error; // passa o erro para controller tratar
    }
  },

  inserirPedidos: async (idCliente, dataPedido, statusPag, { itens }) => {
    // itens realiza a desestruturação do obejto itens

    const pool = await getConnection();

    const transaction = new sql.Transaction(pool);
    await transaction.begin(); //inicia a transação

    try {
      let querySQL = `
    INSERT INTO Pedidos (idCliente, dataPedido, statusPag)
    OUTPUT INSERTED.idPedido
    VALUES  (@idCliente, @dataPedido, @statusPag)
    `;

      const result = await transaction
        .request()
        .input("idCliente", sql.UniqueIdentifier, idCliente)
        .input("dataPedido", sql.Date, dataPedido)
        .input("statusPag", sql.Bit, statusPag)
        .query(querySQL);

      const idPedido = result.recordset[0].idPedido;

      for (const item of itens) {
        const { idProduto, qtdItem } = item;

        querySQL = `
        INSERT INTO ItemPedido (idPedido, idProduto, qtdItem)
        VALUES(@idPedido, @idProduto, @qtdItem)
        `;

        const resultTeste = await transaction.request()
          .input("idProduto", sql.UniqueIdentifier, idProduto)
          .input("idPedido", sql.UniqueIdentifier, idPedido)
          .input("qtdItem", sql.Int, qtdItem)
          .query(querySQL);
      }
      await transaction.commit(); // confirma a transaçao ( salva tudo no banco)
    } catch (error) {
      await transaction.rollback(); // des fas tudo caso de erro
      console.error("Erro ao inserir pedido", error);
      throw error;
    }
  },
};

module.exports = { pedidosModel };
