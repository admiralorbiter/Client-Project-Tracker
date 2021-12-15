const express = require('express');
const app = express();
const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);//First argument is optional, defaults to '/'
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});