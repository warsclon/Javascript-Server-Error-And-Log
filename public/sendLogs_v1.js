
function ServerLog() {

    var urlServer = "urlServer";
    var version_app = "version_app";
    var DEBUG = "DEBUG";
    var app = "app";

    function logger (info) {
        if (DEBUG) console.log(info);
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
        json.type = "log";
        return json;
    }


    function log(message) {

        var json = infoNavigator();
        //error
        json.message = message;

        //Ajax
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest({mozSystem: true});
        } else  {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (DEBUG) {
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    logger("result:"+xmlhttp.responseText);
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




    function init(urlServerI, versionAppI, debugLogI, appI) {
        urlServer = urlServerI;
        version_app = versionAppI;
        DEBUG = debugLogI;
        app = appI;
    }


    return {init:init,write:log}

}