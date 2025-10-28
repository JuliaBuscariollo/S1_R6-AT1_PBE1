## API Reference

### Produtos 

#### GET /produtos
-**Descrição**: Obtem uma lista de produtos
- **Response**: Array de produtos

#### POST /produtos
-**Descrição**: Cria um novo produto
-**Body**:
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```
-**Response**:
```
{
    "message":"Produto cadastrado com sucesso!"
}
```
#### PUT /produtos
-**Descrição**: Atualiza um produto existente
-**Body**: opcional colocar nome ou preço
```
{
    "nomeProduto": "produtoExemplo"
}
```
-**Response**:
```
{
    "message":"Produto atualizado com sucesso!"
}
```
#### DELETE /produtos /idProduto
-**Descrição**: Deleta o produto referente ao id
- **Response**: 
```
{
    "message":"Produto deletado com sucesso!"
}
```

### Clientes

#### GET /clientes
-**Descrição**: Obtem uma lista de clientes
- **Response**: Array de clientes

#### POST /clientes
-**Descrição**: Cria um novo cliente
-**Body**:
```
{
    "nomeCliente": "Julia",
    "cpfCliente": "12345678998"
}
```
-**Response**:
```
{
    "message":"Cliente cadastrado com sucesso!"
}
```
#### PUT /clientes
-**Descrição**: Atualiza um cliente existente
-**Body**: opcional colocar nome ou preço
```
{
    "nomeCliente": "clienteExemplo"
}
```
-**Response**:
```
{
    "message":"Cliente atualizado com sucesso!"
}
```
#### DELETE /clientes /idCliente
-**Descrição**: Deleta o cliente referente ao id
- **Response**: 
```
{
    "message":"Cliente deletado com sucesso!"
}
```
### Pedidos