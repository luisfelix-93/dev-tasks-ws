const app = require('./app.js');
const bodyParser = require('body-parser');

app.listen(5001);
app.use(bodyParser.json());
console.log('Aplicação rodando na porta 5001');
