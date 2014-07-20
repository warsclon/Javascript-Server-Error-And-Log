Javascript-Server-Error-And-Log
===============================

Server to capture errors and logs of javascript from web with MondoDB.

Javascript code to capture javascrip errors:

    Javascript file:
    https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/master/public/captureErrors_v1.js


    var SERVER_DIRECTION = "http://127.0.0.1:8888";
    var SOFTWARE_VERSION = 1;
    var LOG_CONSOLE_BROWSER = true;
    var DEBUG_HTTP = true;
    var NAME_DATABASE_MONGODB = "TestError";
    
    var captureErrors = CaptureErrors();
    captureErrors.init(SERVER_DIRECTION, SOFTWARE_VERSION, LOG_CONSOLE_BROWSER, DEBUG_HTTP, NAME_DATABASE_MONGODB);
        
Preview console browser message:

    json:{"app":"TestError","version_app":1,"date":"Thu Jun 19 2014 19:38:38 GMT+0200 (Hora de verano romance)","appCodeName":"Mozilla","appName":"Netscape","appVersion":"5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","language":"es","cookieEnabled":true,"platform":"Win32","product":"Gecko","userAgent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","height":1080,"width":1920,"pixelDepth":24,"colorDepth":24,"type":"error","message":"Uncaught ReferenceError: tt is not defined","url":"http://127.0.0.1:8888/testError.html","lineNumber":18} captureErrors_v1.js:75
    result_4:{"insert":"ok"}
            
            
Javascript code to send log:

        Javascript file:
        https://raw.githubusercontent.com/warsclon/Javascript-Server-Error-And-Log/master/public/sendLogs_v1.js

        var SERVER_DIRECTION = "http://127.0.0.1:8888";
        var SOFTWARE_VERSION = 1;
        var LOG_CONSOLE_BROWSER =true;
        var NAME_DATABASE_MONGODB = "TestLog";
        var logger = new ServerLog();
        logger.init(SERVER_DIRECTION, SOFTWARE_VERSION, LOG_CONSOLE_BROWSER, NAME_DATABASE_MONGODB);

        function testLog() {
            logger.write(document.getElementById('message').value);
        }
            


Preview console browser message:

    json:{"app":"TestLog","version_app":1,"date":"Thu Jun 19 2014 19:30:04 GMT+0200 (Hora de verano romance)","appCodeName":"Mozilla","appName":"Netscape","appVersion":"5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","language":"es","cookieEnabled":true,"platform":"Win32","product":"Gecko","userAgent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2054.3 Safari/537.36","height":1080,"width":1920,"pixelDepth":24,"colorDepth":24,"type":"log","message":"test"}
    result:{"insert":"ok"}
