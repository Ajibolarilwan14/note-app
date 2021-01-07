(() => {
	const token = getToken();

	const { origin, href } = window.location;

	if (!token) {
		if (href.includes("login.html")) {
			return;
		} else {
			return (window.location = `${origin}/login.html`);
		}
	}
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: "aplication/json"
	};

	fetch("http://localhost:5000/api/users/current", { headers })
		.then(response => {
			switch (response.status) {
				case 401: {
					status401(href);
					break;
				}
				case 200: {
					status200(href);
					break;
				}
			}
		})
		.catch(e => {
			if (e instanceof Error) {
				console.log("We caught you");
				return;
			}
			console.log({ e });
			status401(href);
		});
})();

function status401(href) {
	if (href.includes("login.html")) {
		return;
	} else {
		return (window.location = `${origin}/login.html`);
	}
}

function status200(href) {
	if (href.includes("login.html") || href.includes("signup.html"))
		window.location = `${origin}/dashboard.html`;
	else return;
}
