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

app.post('/clients', (req, res) => {
	const newClient = verifyReqBody(req.body);
	if (newClient) {
		res.send(JSON(addClient(newClient)));
	}
	else {
		res.status(400).send(JSON('Error: Invalid client details'));
	}
});

app.get('/clients', (req, res) => {
	res.send(getAllClients());
});

app.get('/clients/:id', (req, res) => {
	const client = getClientById(req.params.id);
	if (typeof(client) === "object") {
		res.send(client);
	}
	else {
		res.status(404).send(client);
	}
});

app.listen(port, () => {console.log("Listening on port: ", port)});