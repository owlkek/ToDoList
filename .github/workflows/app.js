const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./routes/404');
let port = 8080;
let app = express();
app.set('view engine','pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',routes);
app.use(errorHandler);

app.listen(port, ()=>{
    console.info(`App run on http://localhost:${port}`);
});