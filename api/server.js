require('dotenv').load();
import express from 'express';
import httpPack from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import gladiateursRouter from './routes/gladiateursRouter';
import typesRouter from './routes/typesRouter';
import battlesRouter from './routes/battlesRouter';
import socketio from 'socket.io';
import cors from 'cors';
const app = express();
const http = httpPack.Server(app);
const io = socketio(http);
const port = process.env.PORT;

const state = { connected: false };

const dbConnect = () => {
	mongoose.connect(process.env.DB_ADDRESS)
	.then(() => {
		console.log("[API] -- Connected to Database");
		state.connected = true;
	})
	.catch(err => {
		console.log("[API] xx Failed to connect to MongoDB : retrying...");
		setTimeout(() => {
			dbConnect();
			// io.emit('No', chat.content);
		}, 5000);
	});
}

dbConnect();

app.use(cors({ origin: 'http://localhost:8080', credentials: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/gladiators', gladiateursRouter);
app.use('/types', typesRouter);
app.use('/battles', function (req, res, next) {
  req.io = io;
  next();
}, battlesRouter);

io.origins(['http://localhost:8080']);
io.on('connection', (client) => {
  client.on('subscribeToTick', () => {
    console.log('[.IO] -> Client is subscribing to tick');
    setInterval(() => {
      client.emit('tick', { state, time: Date.now() });
    }, 1000);
  });
});

http.listen(port, () => {
	console.log(`#### API is up and running at : http://localhost:${port} ####`);
});
