var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var royalts = require("royalts");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Initialize the app.
var server = app.listen(process.env.PORT || 7000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var doc = [];
function addToArray(value) {
  //doc = doc + ", " + value;
  doc.push(value);
}

app.post("/api", function(req, res) {
  //console.log(req.body);
  if (! req.body.name) {
    handleError(res, "Invalid input", "Must have a document attribute", 400);
  }

  royalts.object("",req.body.name,"RoyalDocument",function (document,docuuid) {
    addToArray(JSON.stringify(document));
    //console.log(JSON.stringify(document));
    for (i=0;i < req.body.document[0].folders[0].folder.length;i++) {
      (function(counter) {
        royalts.object(docuuid, req.body.document[0].folders[0].folder[counter].name, "RoyalFolder", function (folder, folderuuid) {
          addToArray(JSON.stringify(folder));
          //console.log(JSON.stringify(folder));
          for (j = 0; j < req.body.document[0].folders[0].folder[counter].servers.length; j++) {
            var server = req.body.document[0].folders[0].folder[counter].servers[j];
            royalts.object(folderuuid,server.name, "RoyalSSHConnection", function (ssh, sshuuid) {
              addToArray(JSON.stringify(ssh));
              //console.log(JSON.stringify(ssh));
            })
          }
        });
      }(i));
    }
  });

  //royalts.savegenerate('[' + doc.join(', ') + ']', res, req.body.name + '.rtsz');
  console.log(royalts.generate('[' + doc.join(', ') + ']'));
  res.status(200).json({ "status": "ok" });
});

//{
//  "name": "teamnaam",
//    "document": [{
//  "folders": [{
//    "folder": [{
//      "name": "gSesamWA",
//      "servers": [{
//        "name": "lrv1423s",
//        "ip": "lrv1423s.europe.intranet"
//      }]
//    }, {
//      "name": "pPayInitWA",
//      "servers": [{
//        "name": "lrv143k4",
//        "ip": "lrv143k4.europe.intranet"
//      }]
//    }]
//  }]
//}]
//}