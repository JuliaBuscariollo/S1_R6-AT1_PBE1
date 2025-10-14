const {sql, getConnection} = require("../config/db");

const clienteModel = {
    burscarTodos: async ()=> {
        try {
            const pool = await getConnection();
            let sql ="SELECT * FROM Clientes;";
            const result = await pool.request().query(sql);
            return result.recordset;
        
        } catch (error) {
            console.error('Erro ao buscar clientes', error);
            throw error; // passa o erro para controller tratar
        }
    },
    burscarCpf: async (cpfCliente)=> {
        try {
            const pool = await getConnection();
            let querySQL ="SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente;";
            const result = await pool.request().input('cpfCliente', sql.VarChar(11),cpfCliente).query(querySQL);

            return result.recordset;
        
        } catch (error) {
            console.error('Erro ao buscar clientes', error);
            throw error; // passa o erro para controller tratar
        }
    },
    inserirCliente: async( nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();

            let querySQL = 'INSERT INTO clientes  (nomeCliente, cpfCliente) VALUES ( @nomeCliente, @cpfCliente)'
            await pool.request()
            
            .input(`nomeCliente`, sql.VarChar(100), nomeCliente)
            .input('cpfCliente', sql.VarChar(11),cpfCliente)

            .query(querySQL);

        } catch (error) {
            console.error('Erro ao criar cliente!',error);
            throw error;
        }
    }
}

// async function teste() {
//     const produtos = await produtosModel1.burscarTodos();

//     console.log(produtos);
// }
 
// teste();
module.exports = {clienteModel}