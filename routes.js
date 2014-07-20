var log4js = require('log4js');
var logger = log4js.getLogger("routes");

var mongo = require('mongodb');
var async = require('async');
var prop = require('./properties.js');
var moment = require('moment');
var email = require('./email.js');


var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server(prop.mongodbIp, prop.mongodbPort, {auto_reconnect: true, safe:false,journal:true,fsync:true,w:1});
var db= new Db(prop.name_database, server);

db.open(function(err, db) {
  if(!err) {
      logger.info("Connected to DB:"+db.databaseName);
   }
});

// IMPORTANT - Method without security access
// Method to add info from web
exports.addLog = function(req, res) {
  var appid = req.params.appid;
  logger.debug("addLog");
  logger.debug("req.text.length:"+req.text.length);
  logger.debug("req.text:"+JSON.stringify(req.text));
  
  if (req.text.length > 0) {
	  var jsonInfo = JSON.parse(req.text);
	  db.collection(appid, function(err, collection) {
		collection.insert(jsonInfo, {safe:true}, function(err, result) {
		  if (err) {
			logger.error("addLog error:"+err);
			res.send({'error':'An error has occurred'});
		  } else {
			logger.debug("addLog save ok:"+JSON.stringify(result));
			formatDate(result,collection);
            //After insert send email
            email.send(appid,jsonInfo);
			res.send({insert:'ok'});
		  }
		});
	  });
  } else {
      logger.info("Add Log Empty");
  }
  
}

function formatDate(toSave,collection) {
	var doc = toSave[0];
	doc.date = new Date(doc.date);
	collection.update({_id:doc._id },   {
		$set: { 'date': doc.date }
	}, function(err) {
		if (!err) {
            logger.info("Modify date format");
		} else {
            logger.error("Error:"+err);
		}
	});
} 


exports.showLogs = function(req, res) {
   var appid = req.params.appid;
    db.collection(appid, function(err, collection) {
        collection.find().toArray(function(err, items) {
                        res.send(items);
        });
  });

}

// VIEW - /views/listApps.ejs
exports.findAllCollections = function(req, res) {
  db.collectionNames(function(err, names){
	res.render('listApps', {locals: {"list":names,"dbname":prop.name_database}});
  });  
}; 

// VIEW - /views/listLogs.ejs
exports.findAll = function(req, res) {
    var appid = req.params.appid;
    loadListLogs(appid,res);
};

// VIEW - /views/listLogs.ejs
//Function to read appName, userAgent and date in parallel
function loadListLogs(appid,res) {
    var resultSearch = {};
    async.parallel([
        function(callback) {
            db.collection(appid, function(err, collection) {
		    collection.aggregate([
				{ $group : { _id : {appName :"$appName"} , number : { $sum : 1 } } },
				{ $sort : { number : -1 } },
				{ $limit:10 }
		], function(err, result) {
            resultSearch.appName = result;
            callback();
		});
	});
        },        function(callback) {
            db.collection(appid, function(err, collection) {
		    collection.aggregate([
				{ $group : { _id : {userAgent :"$userAgent"} , number : { $sum : 1 } } },
				{ $sort : { number : -1 } },
				{ $limit:10 }
		], function(err, result) {
            resultSearch.user_agent = result;
            callback();
		});
	});
        },
        function(callback) {
			db.collection(appid, function(err, collection) {
				collection.aggregate([
					{ $group : { _id : {year:{$year :"$date"},month:{$month :"$date"}} , number : { $sum : 1 } } },
					{ $sort : { _id : -1 } },
					{ $limit : 10 }
				], function(err, result) {
					resultSearch.dates = result;
					callback();
				});
			});
        },
        function(callback) {        
            db.collection(appid, function(err, collection) {
                collection.find().toArray(function(err, items) {
            		for (var i = 0; i < items.length; i++) {
        				if (items[i].date !== undefined) {
        					items[i].date = moment(items[i].date).format(prop.date_format);
        				}
                    }	
                    resultSearch.logs = items;
    			    callback();
                });
            });
        }
    ], function(err) {
        if (err) {
            logger.error("error loadListLogs:"+err);
        }
        logger.debug("resultSearch:"+JSON.stringify(resultSearch));
        res.render('listLogs', {locals: {"list":resultSearch.logs,"user_agent":resultSearch.user_agent,"appName":resultSearch.appName,"dates":resultSearch.dates,"appid":appid} });
    });
}

// VIEW - /views/delete.ejs
exports.deleteLog = function(req, res) {
    var appid = req.params.appid;
    var id = req.params.id;
    db.collection(appid, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            logger.debug("result delete:"+result);
            res.render('delete', {locals: {"appid":appid,"err":err}});
        });
    });
}


// VIEW - /views/detail.ejs
exports.findByIdDetail = function(req, res) {
  var appid = req.params.appid;
  var id = req.params.id;
  db.collection(appid, function(err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
        res.render('detail', {locals: {"log":item,"appid":appid,"id":id} });
    });
  });
};


//Export detail log of app in json format
exports.findByIdDetailExport = function(req, res) {
    var appid = req.params.appid;
    var id = req.params.id;
    db.collection(appid, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

//Export all logs of app in json format
exports.findAllExport = function(req, res) {
    var appid = req.params.appid;
    db.collection(appid, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

//Logout and delete cookie
exports.logout =  function (req, res) {
    console.log("logout");
    req.session = null;
    res.clearCookie(prop.key);
    res.redirect('/index.html');
}

