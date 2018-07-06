require('dotenv').load();
import express from 'express';
import httpPack from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import gladiateursRouter from './routes/gladiateursRouter';
import typesRouter from './routes/typesRouter';
import battlesRouter from './routes/battlesRouter';
import socketio from 'socket.io';
const app = express();
const http = httpPack.Server(app);
var io = socketio(http);
const port = process.env.PORT;
const db = mongoose.connect(process.env.DB_ADDRESS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/gladiators', gladiateursRouter);
app.use('/types', typesRouter);
app.use('/battles', battlesRouter);


io.on('connection', function(client) {
	console.log('Client connected...');
});

// client.on('join', function(data) {
//     console.log(data);
//     client.emit('messages', 'Hello from server');
// });

http.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
