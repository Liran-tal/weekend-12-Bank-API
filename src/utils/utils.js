

const verifyReqBody = (body) => {

	let res = true;

	for (const key in body) {
		switch (key) {
			case "passport":
				if (!verifyPassport(body.passport)) {
					return false;
				}
				break;
			case "cash":
				if (!verifyCash(body.cash)) {
					body.cash = 0;
				}
				break;
			case "credit":
				if (!verifyCredit(body.credit)) {
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
	if (id < 1) {
		return false;
	}

	return true;
}