'use strict';

const express = require('express');
const morgan = require('morgan');
const socketio = require('socket.io');
const { socketConnection } = require('./socket.io');
const PORT = 4000;
const app = express();


app.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(morgan('tiny'));
app.use(express.static('./server/assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/'));

// REST endpoints? 
app.use(require('./routes'));

const expressServer = app.listen(PORT, () => console.info(`Listening on port ${PORT}`));

const io = socketio(expressServer);
io.on('connection', (socket) => socketConnection(io, socket));