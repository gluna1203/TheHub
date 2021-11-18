const express = require('express');
const pug = require('pug');
const expressSession = require('express-session');
const routes = require('./routes/routes.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");
app.use(express.static(path.join(__dirname, '/public')));

app.use(expressSession({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = express.urlencoded({
    extended: false
})

const checkAuth = (req, res, next) => {
    if (req.session.user && req.session.user.isAuthenticated){
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/', routes.login);

app.listen(3000);