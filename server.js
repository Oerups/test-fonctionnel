const express = require('express');

const { jwt, verify } = require('jsonwebtoken');
const app = express();
app.set('secretKey', 'nodeRestApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/users', users);

app.listen(3000, function () {
    console.log('Node server listening on port 3000');
});

module.exports = app;
  