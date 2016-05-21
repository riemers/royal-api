RoyalTS API
===========

Get the required files, by doing a:
````
npm install
````

The idea is pretty simple, you can start up this API which will expose a /api url on port 7000.
Then you have to POST a json payload to it in order for it to generate a valid Royal TS document.

It will automatically give you back the document in XML format.

Example data is in the src/server.js at the bottom.

## Methods

On /api you can do a POST with a json object. Or you can do a POST as a form where the data is in the form name 'json'.
You can also go to / in the browser of the app and it will give you a simple input field. Dump your json in there and it will
return you a download.

Please note that the name of the document as content-type filename will be returned as the name of the RoyalDocument (this to
keep from downloading the same file over and over)

## Demo

See it running at [http://royalts.bytework.eu](http://royalts.bytework.eu), limited to 100kb inputs (POST form work + api POST) but i doubt anyone would want
their super secret stuff generated from the internet, but i wont stop you.
