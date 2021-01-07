function getToken() {
	let login;
	const data = window.localStorage.getItem("login");
	if (!data) {
		return;
	}
	login = JSON.parse(data);

	return login.token;
}

function saveToken(token) {
	const login = {
		token,
		isAuth: true
	};

	window.localStorage.setItem("login", JSON.stringify(login));
	return;
}

function clearToken() {
	window.localStorage.setItem("login", undefined);
}
