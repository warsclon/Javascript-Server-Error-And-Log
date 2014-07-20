


function CaptureErrors () {



    var urlServer = "urlServer";
    var version_app = "version_app";
    var DEBUG = "DEBUG";
    var debug_state = "debug_state";
    var app = "app";



    function sendError (message, url, lineNumber) {

        logger(message);

        var json = infoNavigator();
        //error
        json.message = message;
        json.url = url;
        json.lineNumber = lineNumber;

        //Ajax
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest({mozSystem: true});
        } else  {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (DEBUG) {
            xmlhttp.onreadystatechange = function() {
                if (debug_state) {
                    var descState = "";
                    if (xmlhttp.readyState === 1) {
                        descState = "server connection established";
                    } else if (xmlhttp.readyState === 2) {
                        descState = "request received ";
                    } else if (xmlhttp.readyState === 3) {
                        descState = "processing request";
                    } else if (xmlhttp.readyState === 4) {
                        descState = "request finished and response is ready";
                    } else if (xmlhttp.readyState === 0) {
                        descState = "request not initialized";
                    }
                    logger(xmlhttp.readyState+": '"+descState+"' >"+xmlhttp.responseText);
                }
            }
        }

        if("withCredentials" in xmlhttp) {
            xmlhttp.open('POST',urlServer+"/logs/"+app,true);
            //xmlhttp.setRequestHeader('Content-type','application/json');
            //content-type fix problem firefox os mobile
            xmlhttp.setRequestHeader("Content-Type", "text/plain");
            logger("json:"+JSON.stringify(json));
            xmlhttp.send(JSON.stringify(json));
        }
    }

    function infoNavigator() {
        var json = {};
        //configuration
        json.app = app;
        json.version_app = version_app;
        json.date = new Date().toString();
        //navigator
        json.appCodeName = navigator.appCodeName;
        json.appName = navigator.appName;
        json.appVersion = navigator.appVersion;
        json.language= navigator.language;
        json.cookieEnabled = navigator.cookieEnabled;
        json.platform = navigator.platform;
        json.product = navigator.product;
        json.userAgent = navigator.userAgent;
        //window
        json.height = screen.height;
        json.width = screen.width;
        json.pixelDepth = screen.pixelDepth;
        json.colorDepth = screen.colorDepth;
        json.type = "error";
        return json;
    }


    function logger(info) {
        if (DEBUG) console.log(info);
    }

    function init(urlServerI, versionAppI, debugLogI, debugStateI, appI) {

        urlServer = urlServerI;
        version_app = versionAppI;
        DEBUG = debugLogI;
        debug_state = debugStateI;
        app = appI;
        window.onerror = function(message, url, lineNumber) {
            sendError(message, url, lineNumber);
            return true;
        };
    }


    return {init:init}
}