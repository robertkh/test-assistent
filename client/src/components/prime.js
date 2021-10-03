function prime(n) {
	let ps = [];

	while (n % 2 === 0) {
		ps.push(2);
		n = n / 2;
	}
	// krknel

	let i = 3;
	while (i < Math.sqrt(n)) {
		while (n % i === 0) {
			ps.push(i);
			n = n / i;
		}
		i += 2;
	}
	// krknel i+=2

	if (n > 2) ps.push(n);
	console.log(ps);
}

prime(315448);

//!
function prime(n) {
	let ps = [];

	if (n % 2 === 0) ps.push(2);
	while (n % 2 === 0) {
		n = n / 2;
	}
	// krknel

	let i = 3;
	while (i < Math.sqrt(n)) {
		if (n % i === 0) ps.push(i);
		while (n % i === 0) {
			n = n / i;
		}
		i += 2;
	}
	// krknel i+=2

	if (n > 2) ps.push(n);
	console.log(ps);
}

prime(315);
