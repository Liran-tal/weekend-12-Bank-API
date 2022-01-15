const express = require('../node_modules/express');

const  {
	verifyReqBody,
	verifyPassport,
	verifyAmount

} = require ('./utils/utils.js');

const {
	addClient,
	depositCash,
	withdrawCash,
	updateCredit,
	transferMoney,
	getClientById,
	getAllClients

} = require ('./utils/clientsAPI.js');


const app = express();
app.use(express.json());

const port = 8080;


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
	if (!verifyPassport(req.params.id)) {
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


// depositCash
app.put('/clients/:id/deposit', (req, res) => {
	console.log("depositCash: ", req.body);
	console.log("depositCash: ", req.params);
	if (!verifyPassport(req.params.id)) {
		sendError(res, 400, 'Error: Invalid client Id');
		return;
	}
	if (!verifyAmount(req.body.amount)) {
		sendError(res, 400, 'Error: Invalid amount');
		return;
	}

	const client = depositCash(req.params.id, req.body.amount);
	if (client === 404) {
		sendError(res, 404, "Client not found");
	}
	else if (client === 500) {
		sendError(res, 500, "Server could not retrieve from data base");
	}
	else {
		res.send(client);
	}
});


// 
const sendError = (res, status, message) => {
	res.status(status).send(message);
}


app.listen(port, () => {console.log("Listening on port: ", port)});