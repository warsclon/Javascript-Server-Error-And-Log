var proper = require("node-properties-parser");
var log4js = require('log4js');
var logger = log4js.getLogger();


var PORT_WEB = "port_web";
var MONGODB_PORT = "mongodb_port";
var MONGODB_IP = "mongodb_ip";
var USERNAME = "username";
var PASSWORD = "password";
var NAME_DATABASE = "name_database";
var KEY = "key";
var SECRET = "secret";
var SEND_MAIL_ERROR = "send_mail_error";
var SEND_MAIL_LOG = "send_mail_log";
var USER_MAIL = "user_mail";
var PASSWORD_MAIL = "password_mail";
var HOST = "host";
var SSL = "ssl";
var SUBJECT = "subject";
var FROM = "from";
var TO = "to";
var DATE_FORMAT = "date_format";

logger.info("------------------------");
logger.info("JAVASCRIPT SERVER ERROR 0.0.3");
logger.info("------------------------");
logger.info("Loading properties sync before start server...");
var par = proper.readSync("./javascript_server_error.properties");
logger.info("------------------------");

exports.portWeb = portWeb = par[PORT_WEB];
logger.info("port_web:"+portWeb);

exports.mongodbPort = mongodbPort = par[MONGODB_PORT];
logger.info("mongodbPort:"+mongodbPort);

exports.mongodbIp = mongodbIp = par[MONGODB_IP];
logger.info("mongodbIp:"+mongodbIp);

exports.username = username = par[USERNAME];
logger.info("username:"+username);

exports.password = password = par[PASSWORD];
logger.info("password:"+password);

exports.name_database = name_database = par[NAME_DATABASE];
logger.info("name_database:"+name_database);

exports.secret = secret = par[SECRET];
logger.info("secret:"+secret);

exports.key = key = par[KEY];
logger.info("key:"+key);

exports.send_mail_error = send_mail_error = par[SEND_MAIL_ERROR];
logger.info("send_mail_error:"+send_mail_error);

exports.send_mail_log = send_mail_log = par[SEND_MAIL_LOG];
logger.info("send_mail_log:"+send_mail_log);

exports.user_mail = user_mail = par[USER_MAIL];
logger.info("user_mail:"+user_mail);

exports.password_mail = password_mail = par[PASSWORD_MAIL];
logger.info("password_mail:"+password_mail);

exports.host = host = par[HOST];
logger.info("host:"+host);

exports.ssl = ssl = par[SSL];
logger.info("ssl:"+ssl);

exports.subject = subject = par[SUBJECT];
logger.info("subject:"+subject);

exports.from = from = par[FROM];
logger.info("from:"+from);

exports.to = to = par[TO];
logger.info("to:"+to);

exports.date_format = date_format = par[DATE_FORMAT];
logger.info("date_format:"+date_format);

logger.info("------------------------");



