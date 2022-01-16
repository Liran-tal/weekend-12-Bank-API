const express = require('../node_modules/express');
const cors = require('../node_modules/cors');
require('../node_modules/dotenv').config();

const  {
	verifyReqBody,
	verifyId,
	verifyAmount

} = require ('./utils/utils.js');

const {
	addClient,
	updateCash,
	withdrawCash,
	updateCredit,
	transferMoney,
	getClientById,
	getAllClients

} = require ('./utils/clientsAPI.js');


const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send("OK");
})

// addClient
app.post('/clients', (req, res) => {
	const newClient = verifyReqBody(req.body);
	
	if (newClient) {
		const client = addClient(newClient);
		if (client === 400) {
			res.status(400).send("Client already exist");
		}
		else if (client === 500) {
			res.status(500).send("Could not complete adding new client");
		}
		else {
			res.res.send(JSON.stringify(client));
		}
	}
	else {
		res.status(400).send('Error: Invalid client details');
	}
});


// getAllClients
app.get('/clients', (req, res) => {
	res.send(getAllClients());
});


// getClientById
app.get('/clients/:id', (req, res) => {
	if (!verifyId(req.params.id)) {
		res.status(400).send('Error: Invalid client Id');
		return;
	}

	const client = getClientById(req.params.id);
	if (client === 404) {
		res.status(404).send("Client not found");
	}
	else if (client === 500) {
		res.status(500).send("Server could not retrieve from data base");
	}
	else {
		res.send(client);
	}
});


// updateCash
app.put('/clients/:id/cash/:operation', (req, res) => {
	let client;
	let message = "";
	if (!verifyId(req.params.id)) {
		message = "Invalid client Id";
	}
	if (!verifyAmount(req.body.amount)) {
		message = "Invalid amount number";
	}	
	if (req.params.operation !== "deposit" 
			&& req.params.operation !== "withdraw") {
		message = "Invalid operation for \"Cash\"";
	}	
	if (message) {
		sendError(res, 400, message);
		return;
	}

	if (req.query.operation === "deposit") {
		client = updateCash(req.params.id, req.body.amount, true);
	}
	else {
		client = updateCash(req.params.id, req.body.amount, false);
	}

	if (client === 404) {
		sendError(res, 404, "Client not found");
	}
	else if (client === 500) {
		sendError(res, 500, "Server could not retrieve from data base");
	}
	else if (client === 400) {
		sendError(res, 400, "Client credit not big enough");
	}
	else {
		res.send(client);
	}
});


// transferMoney
app.put('/clients/:id/transfer', (req, res) => {
	let client;
	let message = "";
	if (!verifyId(req.params.id)) {
		message = "Invalid client Id";
	}
	if (!verifyId(req.body.targetId)) {
		message = "Invalid target Id";
	}
	if (!verifyAmount(req.body.amount)) {
		message = "Invalid amount number";
	}	
	
	if (message) {
		sendError(res, 400, message);
		return;
	}

	client = transferMoney(req.params.id, req.body.targetId, req.body.amount);

	if (client === 404) {
		sendError(res, 404, "Id not found. Tip: confirm Id as String");
	}
	else if (client === 500) {
		sendError(res, 500, "Server could not retrieve from data base");
	}
	else if (client === 400) {
		sendError(res, 400, "Client credit not big enough");
	}
	else {
		res.send(client);
	}
});


//updateCredit
app.put('/clients/:id/credit', (req, res) => {
	let client;
	let message = "";
	if (!verifyId(req.params.id)) {
		message = "Invalid client Id";
	}
	if (!verifyAmount(req.body.amount)) {
		message = "Invalid amount number";
	}	
	if (message) {
		sendError(res, 400, message);
		return;
	}

	client = updateCredit(req.params.id, req.body.amount, res);

	// if (client === 404) {
	// 	sendError(res, 404, "Client not found");
	// }
	// else if (client === 500) {
	// 	sendError(res, 500, "Server could not retrieve from data base");
	// }
	// else {
	// 	res.send(client);
	// }
});


// 
const sendError = (res, status, message) => {
	res.status(status).send(message);
}


app.listen(port, () => {console.log("Listening on port: ", port)});