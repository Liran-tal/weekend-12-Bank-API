const fs = require ('fs');
const { get } = require('http');

const  {
	verifyReqBody,
	verifyPassport,
	verifyAmount

} = require ('./utils.js');


const addClient = () => {

}


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
		const client = clients.find((client) => {
			return id === client.id
		})
	} catch (error) {
		console.error(error);
		return "Client not found";
	}
}


const getAllClients = () => {
	try {
		console.log("enters getAllClients");
		return (
			JSON.parse(fs.readFileSync("DataBase/clientsData.json").toString())
		);
	} catch (error) {
		console.error(error);
		return [];
	}
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