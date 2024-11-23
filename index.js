const expres = require("express");
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');

const app = expres();
app.use(session({
    secret: config.secret, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  
  }));

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());

app.use(expres.static(path.join(__dirname, 'public')));

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
    console.log("Мы успешно подключились к БД");
});

mongoose.connection.on('error', (err) => {
    console.log("Мы не подключились к БД" + err);
});

app.get('/', (req, res) => {
    res.send('Главнвя страница сайта');
});

app.use('/account', account);

app.listen(port, () => {
    console.log("Сервер был запущен по порту " + port);
});
