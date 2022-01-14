const fs = require ('fs');
const { get } = require('http');

const  {
	verifyReqBody,
	verifyPassport,
	verifyAmount

} = require ('./utils.js');

const clientsDBPath = "DataBase/clientsData.json";


const addClient = (newClient) => {
	const clients = getAllClients();
	if (isClient ("id", newClient.passport, clients)) {
		return 400;
	}

	clients.push(newClient);
	try {
		setAllClients(clients);
	} catch (error) {
		return 500;
	}
}

// const addClient = (newClient, res) => {
// 	console.log(res);
// 	const clients = getAllClients();
// 	if (isClient ("id", newClient.passport, clients)) {
// 		// return 400;
// 		res.status(400).send("Client already exist");
// 	}

// 	clients.push(newClient);
// 	try {
// 		setAllClients(clients)
// 		.then((newClient, res) => {
// 			res.send(JSON.stringify(newClient));
// 		})
// 	} catch (error) {
// 		// return 500;
// 		res.status(500).send("Could not complete adding new client");
// 	}
// }


const depositCash = () => {

}


const withdrawCash = () => {

}


const updateCredit = () => {

}


const transferMoney = () => {

}


const getClientById = (id) => {
	try {
		const clients = getAllClients();
		const client = isClient ("id", id, clients);
		
		if (!client) {
			return 404;
		}

		return client;
	} catch (error) {
		console.error(error);
		return 500;
	}
}


const getAllClients = () => {
	try {
		return JSON.parse(fs.readFileSync(clientsDBPath).toString());
	} catch (error) {
		console.error(error);
		return [];
	}
}
 
const setAllClients = (clients) => {
	try {
		fs.writeFileSync(clientsDBPath, JSON.stringify(clients), (error) => {
			if (error) {
				console.error(error);
				throw	error
			}
		})
	} catch (error) {
		throw error;
	}
}

const isClient = (key, value, dataArray) => {
	const client = dataArray.find((item) => {
		return value === item[key];
	})
}

module.exports = {
	addClient: addClient,
	depositCash: depositCash,
	withdrawCash: withdrawCash,
	updateCredit: updateCredit,
	transferMoney: transferMoney,
	getClientById: getClientById,
	getAllClients: getAllClients
}	