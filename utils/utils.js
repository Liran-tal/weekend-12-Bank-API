

const verifyReqBody = (body) => {
	for (const key in body) {
		switch (key) {
			case "id":
				if (!verifyId(body.id)) {
					return undefined;
				}
				body.id = String(body.id);
				break;
			case "cash":
				if (!verifyAmount(body.cash)) {
					body.cash = 0;
				}
				break;
			case "credit":
				if (!verifyAmount(body.credit)) {
					body.credit = 0;
				}
				break;
		
			default:
				return undefined;
		}
	}

	return body;
}


const verifyId = (id) => {
 	if (!id || id.length < 1 || !String(id).match(/^[1-9]\d*$/)) {
		return false;
	}

	return true;
}

const verifyAmount = (amount) => {
	if (typeof(amount) !== "number" || amount < 0) {
		return false;
	}

	return true;
}


module.exports = {
	verifyReqBody: verifyReqBody,
	verifyId: verifyId,
	verifyAmount: verifyAmount
}