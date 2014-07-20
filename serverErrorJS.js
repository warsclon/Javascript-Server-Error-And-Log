var log4js = require('log4js');
log4js.configure('javascript_server_error_log4js.json',{cwd:__dirname});
var logger = log4js.getLogger("serverError");

//core
var express = require('express');
//libraries
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var auth = require('http-auth');
var routes = require('./routes.js');
var prop = require('./properties.js');
var app = express();

/**
 * Get request from FirefoxOS
 */
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});


app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser(prop.secret));
app.use(clientErrorHandler);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//function control errors
function clientErrorHandler(err, req, res, next) {
    logger.error('client error handler found in ip:'+req.ip, err);
    res.status(500);
    res.render('error', {locals: {"error":err} });
}

var basic = auth.basic({
        realm: "Javascript Server."
    }, function (username, password, callback) { // Custom authentication method.
        callback(username === prop.username && password === prop.password);
    }
);

//Log without auth
app.post('/logs/:appid', routes.addLog);
//Admin with auth
app.get('/logs/:appid', auth.connect(basic), routes.findAll);
app.get('/apps',auth.connect(basic), routes.findAllCollections);
app.get('/logs/:appid/:id',auth.connect(basic),   routes.findByIdDetail);
app.get('/logs/:appid/:id/delete',auth.connect(basic), routes.deleteLog);
app.get('/logsexport/:appid/:id',auth.connect(basic), routes.findByIdDetailExport);
app.get('/logsexport/:appid',auth.connect(basic), routes.findAllExport);
app.get('/logout', routes.logout);

logger.info("------------------");
app.listen(prop.portWeb);
logger.info('Listening on port '+prop.portWeb);