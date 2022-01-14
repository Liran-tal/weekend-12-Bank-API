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
	console.log(req.body);
	
	const newClient = verifyReqBody(req.body);
	
	if (newClient) {
		const client = res.send(JSON.stringify(addClient(newClient)));
		if (client === 400) {
			res.status(400).send("Client already exist");
		}
		else if (client === 500) {
			res.status(500).send("Could not complete adding new client");
		}
		else {
			res.send(client);
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
		res.status(400).send('Error: Invalid client passport Id');
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


// 



app.listen(port, () => {console.log("Listening on port: ", port)});