const app = require('./app.js');
const bodyParser = require('body-parser');

app.listen(5002);
app.use(bodyParser.json());
console.log('Aplicação rodando na porta 5002');
