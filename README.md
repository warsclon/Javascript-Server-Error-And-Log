Javascript-Server-Error-And-Log (v 1.0)
===============================

Server and Javascript libraries to capture errors and logs of javascript applications as FirefoxOS or Web.

Save all the crash reports and logs in your own server.

The base is use window.onerror to capture javascripts errors and use Ajax to comunication.

Technologies Used
------------

Server = [node.js, express 4.0, ejs, mongodb, emailjs, node-properties-parser, moment, ,http-auth, ,body-parser, cookie-parser, async]

Client = [bootstrap, jquery, tablesorter, jqplot]

Installation
------------

 1. Download and unzip (or git clone) into a directory.
 2. Run "$ npm install"
 3. Configure /javascript_server_error.properties with mongodb, port web, user and password access and email credentials.
 4. Run app via "$ node serverErrorJS.js"
 
 Philosophy
------------

 * Capture errors in FirefoxOS applications.
 * Build a Server to save javascripts errors and logs.
 * Write using modern tecnologies as Node.js and Mongodb.
 * Simple configuration with a only one properties file.
 * Interface using Bootstrap.

 Features
------------

 * Basic front end web pages.
 * Send emails when receive error and/or log.
 * Login system to protect access.
 * Export all reports in json format.
 * Export detail report in json format.
 * Delete report.
 * Multiple applications in the same server.

 How to use in Javascript
--------------------------
 
Javascript code to capture errors:

	//Public direction of your server
    var SERVER_DIRECTION = "http://127.0.0.1:8888";
	//Version of your application
    var SOFTWARE_VERSION = 1;
	//See log in browser console
    var LOG_CONSOLE_BROWSER = true;
	//See XMLHttp comunication in browser console
    var DEBUG_HTTP = true;
	//Name of data base of errors in mongodb
    var NAME_DATABASE_MONGODB = "TestError";
    
	//Create and init capture errors.
    var captureErrors = CaptureErrors();
    captureErrors.init(SERVER_DIRECTION, SOFTWARE_VERSION, LOG_CONSOLE_BROWSER, DEBUG_HTTP, NAME_DATABASE_MONGODB);

Javascript file if you want to use:

    https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/master/public/captureErrors_v1.js
	
Preview console browser message:
    json:{"app":"TestError","version_app":1,"date":"Thu Jun 19 2014 19:38:38 GMT+0200 (Hora de verano romance)","appCodeName":"Mozilla","appName":"Netscape","appVersion":"5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","language":"es","cookieEnabled":true,"platform":"Win32","product":"Gecko","userAgent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","height":1080,"width":1920,"pixelDepth":24,"colorDepth":24,"type":"error","message":"Uncaught ReferenceError: tt is not defined","url":"http://127.0.0.1:8888/testError.html","lineNumber":18} captureErrors_v1.js:75
    result_4:{"insert":"ok"}
 
            
            
Javascript code to send log:


		//Public direction of your server
        var SERVER_DIRECTION = "http://127.0.0.1:8888";
		//Version of your application
        var SOFTWARE_VERSION = 1;
		//See log in browser console
        var LOG_CONSOLE_BROWSER =true;
		//Name of data base of errors in mongodb
        var NAME_DATABASE_MONGODB = "TestLog";
		
        var logger = new ServerLog();
        logger.init(SERVER_DIRECTION, SOFTWARE_VERSION, LOG_CONSOLE_BROWSER, NAME_DATABASE_MONGODB);

        function testLog() {
			//Send log to server
            logger.write(document.getElementById('message').value);
        }
            
Javascript file if you want to use:

	https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/master/public/sendLogs_v1.js

Preview console browser message:
    json:{"app":"TestLog","version_app":1,"date":"Thu Jun 19 2014 19:30:04 GMT+0200 (Hora de verano romance)","appCodeName":"Mozilla","appName":"Netscape","appVersion":"5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","language":"es","cookieEnabled":true,"platform":"Win32","product":"Gecko","userAgent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","height":1080,"width":1920,"pixelDepth":24,"colorDepth":24,"type":"log","message":"test"}
    result:{"insert":"ok"}
 
 
 
## Config javascript_server_error.properties


# CONFIGURATION WEB
# Web server port 
port_web = 8888
# Web access user
username = test
# Web acess password
password = test
# Cookie config
key = javacript_server_errors_and_logs
secret = 9nfC0BASM3Ah7UqFO837h7eW2iiA13GC
		
# CONFIGURATION MONGODB
# port mongodb
mongodb_port = 27017
# Ip mongodb
mongodb_ip = localhost
# Name Data base javascript errors and logs
name_database = javascript_server_errors_and_logs


# CONFIGURATION MAIL 
# yes or no if want send email
# when you recive error
send_mail_error = no
# when you recive log
send_mail_log = no

# config connection email server
user_mail= john.smith@gmail.com
password_mail = password_mail
host =smtp.gmail.com
ssl = true

# config email
subject = Javascript Server Errors And Logs
from = javascript_server_error@sinclinal.com
# List emails separate with comma example john@gmail,smith@gmail
to = john.smith@gmail.com


#config date
date_format=YYYY-MM-DD HH:mm:ss
 
 
## Configuration Mongodb

Automatic configuration:

 * Creation of DB automatic
 * Creation collection automatic
 * Independent collections by App

## Access server

 * http://my_server:port_server (and login)

Init web:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/1.jpg)

List apps and page test:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/2.jpg)

Test error:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/4.jpg)

Test log:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/5.jpg)

List errors:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/6.jpg)

List log:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/7.jpg)

Detail:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/8.jpg)

Delete:

![](https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/gh-pages/captures/9.jpg)

## License
( The MIT License )

Copyright (c) 2014 Diego Martin Moreno 

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
