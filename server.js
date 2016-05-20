import express from 'express';
import bodyParser from 'body-parser';
import royalts from 'royalts';

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

// Initialize the app.
const server = app.listen(process.env.PORT || 7000, () => {
  const port = server.address().port;
  console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log(`ERROR: ${reason}`);
  res.status(code || 500).json({"error": message});
}

const jsonObj = { "KeyValuePairs": [ ] };
function addToJson(keypairs, uuid) {
  for (i=0; i < keypairs.length; i++) {
    //console.log(keypairs[i])
    jsonObj.KeyValuePairs.push ({ "ObjectID": uuid, "Key": keypairs[i].name, "Value": keypairs[i].value });
  }
}

app.post("/api", (req, res) => {
  //console.log(req.body);
  if (! req.body.name) {
    handleError(res, "Invalid input", "Must have a document attribute", 400);
  }

  royalts.object("",req.body.name,"RoyalDocument",(document, docuuid) => {
    addToJson(document, docuuid);
    //console.log(document);
    for (i=0;i < req.body.document[0].folders[0].folder.length;i++) {
      ((counter => {
        royalts.object(docuuid, req.body.document[0].folders[0].folder[counter].name, "RoyalFolder", (folder, folderuuid) => {
          addToJson(folder, folderuuid);
          //console.log(folder);
          for (j = 0; j < req.body.document[0].folders[0].folder[counter].servers.length; j++) {
            const server = req.body.document[0].folders[0].folder[counter].servers[j];
            royalts.object(folderuuid,server.name, "RoyalSSHConnection", (ssh, sshuuid) => {
              addToJson(ssh, sshuuid);
              //console.log(ssh);
            })
          }
        });
      })(i));
    }
  });

  console.log(royalts.savegenerate(jsonObj, res, req.body.name));
  res.status(200).json({ "status": "ok" });
});

//{
//  "name": "teamnaam",
//    "document": [{
//  "folders": [{
//    "folder": [{
//      "name": "prodcution",
//      "servers": [{
//        "name": "servername",
//        "ip": "somewhere.internet.com"
//      }]
//    }, {
//      "name": "servername2",
//      "servers": [{
//        "name": "servername2",
//        "ip": "somewhere2.internet.com"
//      }]
//    }]
//  }]
//}]
//}