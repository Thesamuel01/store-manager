const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

app.use(bodyParser);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes.productsRoute);

app.use(middlewares.errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;