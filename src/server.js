import express from 'express';
import bodyParser from 'body-parser';
import RoyalDocument from 'royalts';

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
  res.status(code || 500).json({ "error": message });
}

app.post('/api', (req, res) => {
  const newRoyalDoc = new RoyalDocument(req.body);

  try {
    res.set('Content-Type', 'text/xml');
    res.send(newRoyalDoc.toString());
  } catch (e) {
    res.status(400);
    res.json({ error: e.message });
  }
});

// folders
// folder
// terminal <-> servers

// const stuff = {
//   Type: 'RoyalDocument',
//   Name: 'Document Name',
//   Children: [
//     {
//       Type: 'RoyalFolder',
//       Name: 'production',
//       Children: [
//         {
//           Type: 'RoyalSSHConnection',
//           Name: 'coolserver',
//           URI: '10.20.30.40',
//         },
//       ],
//     },
//
//     {
//       Type: 'RoyalFolder',
//       Name: 'shitstick',
//       Children: [
//         {
//           Type: 'RoyalFolder',
//           Name: 'rgdfgdfg',
//           Children: [
//             {
//               Type: 'RoyalSSHConnection',
//               Name: 'harro',
//               URI: '10.20.30.47',
//             },
//           ],
//         },
//         {
//           Type: 'RoyalFolder',
//           Name: 'ssh',
//         },
//       ],
//     },
//
//     {
//       Type: 'RoyalFolder',
//       Name: 'dev',
//       Children: [
//         {
//           Type: 'RoyalFolder',
//           Name: 'secret stuff',
//           Children: [
//             {
//               Type: 'RoyalSSHConnection',
//               Name: 'secretServer',
//               URI: '10.20.30.47',
//             },
//           ],
//         },
//         {
//           Type: 'RoyalFolder',
//           Name: 'test',
//           Children: [{
//             Type: 'RoyalFolder',
//             Name: 'shitstick',
//             Children: [
//               {
//                 Type: 'RoyalFolder',
//                 Name: 'rgdfgdfg',
//                 Children: [
//                   {
//                     Type: 'RoyalSSHConnection',
//                     Name: 'harro',
//                     URI: '10.20.30.47',
//                   },
//                 ],
//               },
//               {
//                 Type: 'RoyalFolder',
//                 Name: 'ssh',
//               },
//             ],
//           }],
//         },
//       ],
//     },
//   ],
// };
