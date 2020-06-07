const crypto = require('crypto');

function* raffler(seed, prizes, entries) {
	// for each prize
	for (let i = 0; i < prizes.length; i++) {
		if (entries.length === 0) {
			throw new Error(`Cannot attribute prize ${i}: no entries left`);
		}

		const prize = prizes[i];

		// calculate the hmac using the seed and the current prize number as a string
		const hash = crypto
			.createHmac('sha256', seed)
			.update(i.toString())
			.digest('hex');
		
		// convert the number to a big int
		const num = BigInt(`0x${hash}`);

		// and calculate the winner
		// TODO: this technically has the problem of modulos bias :/
		//        but it shouldn't be a problem
		const winner = num % BigInt(entries.length);
		const entry = entries[winner];

		// remove the entry from the list
		entries = entries.filter((_, index) => BigInt(index) !== winner);

		yield { prize, entry };
	}
}

module.exports = { raffler };
