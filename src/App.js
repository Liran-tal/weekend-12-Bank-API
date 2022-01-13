const express = require('../node_modules/express');

const {
	addClient,
	depositCash,
	withdrawCash,
	updateCredit,
	transferMoney,
	getUserById,
	getAllUsers
} = require ('./utils/clientsAPI');


const app = express();
app.use(express.json());

const port = 8080;

app.post('/clients', (req, res) => {

	res.send()
});



app.listen(port, () => {console.log("Listening on port: ", port)});