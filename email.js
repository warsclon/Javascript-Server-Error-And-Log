var prop = require('./properties.js');
var email = require("emailjs");
var log4js = require('log4js');
var logger = log4js.getLogger("email");


var server = email.server.connect({
    user: prop.user_mail,
    password: prop.password_mail,
    host: prop.host,
    ssl: prop.ssl
});

exports.send = function send(info, log) {
    if ((prop.send_mail_log === 'yes' && log.type === 'log') || (prop.send_mail_error === 'yes' && log.type === 'error')) {
        logger.info('Send email:' + log.userAgent);
        var text = "Error in " + log.userAgent + "\n";
        text += "Date crash:" + log.date + "\n";
        text += "App Version Name:" + log.version_app + "\n";
        text += "Platform:" + log.platform + "\n";
        text += "Messages:" + log.message + "\n";
        server.send({
            text: text,
            from: prop.from,
            to: prop.to,
            cc: "",
            subject: prop.subject + " from Mobile " + info
        }, function (err, message) {
            logger.info("result send email:" + err || message);
        });
    }
}




