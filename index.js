const express = require('express');
const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})