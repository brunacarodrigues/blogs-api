const express = require('express');
const { loginRoute, userRoute, postRoute } = require('./routes');
const categoriesRoute = require('./routes/categories.route');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', categoriesRoute);
app.use('/', postRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
