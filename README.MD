Royal TS API
------------

Get the required files, by doing a:
````
npm install
````

The idea is pretty simple, you can start up this API which will expose a /api url on port 7000.
Then you have to PUT a json payload to it in order for it to generate a valid Royal TS document

Example:

````
[
  {
    "type" : "folder",
    "servers": [
      {
        "type": "ssh",
        "rn10323": "someserver.domain.com",
        "color": "blue"
      }
    ],
    "credentials": "Unix",
    "Exception": "no error",
    "Filename": "savedfile.rtsz"
  }
]

````

This will generate a folder in your document called "servers" and in there you will have 1 ssh terminal.
