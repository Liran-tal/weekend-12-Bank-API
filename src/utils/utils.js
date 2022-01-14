

const verifyReqBody = (body) => {

	let res = true;

	for (const key in body) {
		switch (key) {
			case "passport":
				if (!verifyPassport(body.passport)) {
					return undefined;
				}
				body.passport = String(body.passport);
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


const verifyPassport = (id) => {
 	if (id.length < 1 || !String(id).match(/^[1-9]\d*$/)) {
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
	verifyPassport: verifyPassport,
	verifyAmount: verifyAmount
}