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
### Clientes

#### GET /clientes
-**Descrição**: Obtem uma lista de clientes
- **Response**: Array de clientes

#### POST /produtos
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