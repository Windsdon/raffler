#!/usr/bin/env node

const fs = require('fs');
const { raffler } = require('../index');

const entries = fs.readFileSync(0, 'utf-8').split('\n').map(u => u.trim()).filter(u => u.length > 0);

if (process.argv.length < 4 || entries.length === 0) {
	console.error(`usage: cat entries.txt | raffler <number of prizes> <seed>`);
	process.exit(1);
}

const seed = process.argv[3];
const prizes = Array(+process.argv[2]).fill().map((_, i) => i + 1);

const winners = [...raffler(seed, prizes, entries)];

for (const { prize, entry } of winners) {
	console.log(`Prize #${prize} goes to ${entry}`);
}
