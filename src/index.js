const express= require('express');
const morgan = require('morgan');
const exphbs=require('express-handlebars');
const path= require('path');
const flash= require('connect-flash');
const session = require('express-session');
const mySqlStore=require('express-mysql-session');
const {database}=require('./keys');
const passport= require('passport');

//Initializations inicializacion
const app= express();
require('./lib/passport');

//settings configuracion
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'alenodeappsession',
    resave: false,
    saveUninitialized: false,
    store: new mySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



//Global variables
app.use((req, res, next) =>{
    app.locals.success= req.flash('success');
    app.locals.message= req.flash('message');
    app.locals.user = req.user;
    next();
});
//Public
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(require('./routes/'));
app.use('/links',require('./routes/links'));
app.use(require('./routes/authentication'));


//Starting the Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
 