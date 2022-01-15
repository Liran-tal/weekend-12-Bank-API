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
	if (getClientIndex ("id", newClient.id, clients) > -1) {
		return 400;
	}

	clients.push(newClient);
	try {
		setAllClients(clients);
		return newClient;
	} catch (error) {
		return 500;
	}
}

// const addClient = (newClient, res) => {
// 	console.log(res);
// 	const clients = getAllClients();
// 	if (getClientIndex ("id", newClient.id, clients) < 0) {
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


const updateCash = (id, amount, isDeposit) => {
	try {
		const clients = getAllClients();
		const clientIndex = getClientIndex ("id", id, clients);
		if (clientIndex < 0) {
			return 404;
		}

		const newAmount = isDeposit 
			? clients[clientIndex].cash + amount
			: clients[clientIndex].cash - amount;

		const editedClient = {
			...clients[clientIndex], 
			cash: newAmount,
		}

		editClientsData(clientIndex, editedClient, clients);
		return editedClient;
	} catch (error) {
		console.error(error);
		return 500;
	}
}


const updateCredit = () => {

}


const transferMoney = () => {

}


const getClientById = (id) => {
	try {
		const clients = getAllClients();
		const clientIndex = getClientIndex ("id", id, clients);
		
		if (clientIndex < 0) {
			return 404;
		}

		return clients[clientIndex];
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
		fs.writeFileSync(clientsDBPath, JSON.stringify(clients)
		// , (error) => {
		// 	if (error) {
		// 		console.error(error);
		// 		throw	error
		// 	}}
		)
	} catch (error) {
		throw error;
	}
}

const getClientIndex = (key, value, dataArray) => {
	return dataArray.findIndex((item) => {
		return value === item[key];
	})
}

const editClientsData = (index, value, dataArray) => {
	dataArray.splice(index, 1, value);
	return setAllClients (dataArray);
}

module.exports = {
	addClient: addClient,
	updateCash: updateCash,
	updateCredit: updateCredit,
	transferMoney: transferMoney,
	getClientById: getClientById,
	getAllClients: getAllClients
}	