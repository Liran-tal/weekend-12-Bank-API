const express = require('express');
const router = express.Router();

const {
	addClient,
	updateCash,
	updateCredit,
	transferMoney,
	getClientById,
	getAllClients

} = require ('../utils/clientsAPI.js.js');

router.post('/clients', addClient);

router.get('/clients', getAllClients);

router.get('/clients/:id', getClientById);

router.put('/clients/:id/cash/:operation', updateCash);

router.put('/clients/:id/transfer', transferMoney);

router.put('/clients/:id/credit', updateCredit);