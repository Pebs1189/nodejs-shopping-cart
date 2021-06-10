const { 
  path, express, session, favicon, logger, cookieParser, bodyParser, hbs, index,
  getSession, catchAndFordwartoErrorHandler, errorHandler
} = require('./helpers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const dataSession = {
  secret: 'secret',
  resave: false,
  saveUninitialized: true
};

app.use(session(dataSession));
app.use(express.static(path.join(__dirname, 'public')));

// res.locals is an object passed to hbs engine
app.use(getSession);

app.use('/', index);

// catch 404 and forward to error handler
app.use(catchAndFordwartoErrorHandler);

// error handler
app.use(errorHandler);

module.exports = app;
