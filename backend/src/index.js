const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-bbp7x.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


//app.use(cors({ origin: 'http://localhost:3000' })) passar ip correto de uso.
app.use(cors());
//Cadastrando o express para entender o corpo json.
app.use(express.json());
app.use(routes);

app.listen(3333);