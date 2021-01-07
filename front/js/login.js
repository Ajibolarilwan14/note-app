const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");

form.addEventListener("submit", submit);

function submit(event) {
	event.preventDefault();
	showLoader(form);

	const errors = [];
	errors.length = 0;
	inputs.forEach(input => {
		const err = validation(input);
		errors.push(...err);
	});

	console.log(errors);

	if (errors.length > 0) {
		errors.forEach(error => createResponse(error));
		setTimeout(() => hideLoader(form), 5000);
		return;
	}

	const user = {
		email: inputs[0].value,
		password: inputs[1].value
	};

	axios
		.post("http://localhost:5000/api/users/signin", user)
		.then(response => {
			saveToken(response.data.token);
			createResponse("User Logged in!", "bg-success");
			setTimeout(
				() =>
					(window.location = "http://127.0.0.1:5500/front/dashboard.html"),
				10000
			);
		})
		.catch(e => e.response.data.forEach(msg => createResponse(msg)))
		.finally(() => hideLoader(form));
}

function createResponse(msg, className = "bg-danger") {
	const div = document.createElement("div");

	div.classList.add("my-1");
	div.classList.add("p-1");
	div.classList.add("text-white");
	div.classList.add("text-center");
	div.classList.add(className);

	div.appendChild(document.createTextNode(msg));
	form.parentNode.insertBefore(div, form);
}

function validation(input) {
	const errors = [];
	if (!input.value) {
		input.classList.add("is-invalid");
		errors.push(`${input.placeholder} is required`);
	}

	if (input.type === "email" && input.value.length > 0) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(input.value)) {
			input.classList.add("is-invalid");
			errors.push(`${input.placeholder} is invalid`);
		}
	}
	return errors;
}

function removeResponse() {
	const divs = document.querySelectorAll(".my-1.p-1.text-white.text-center");

	let time = 5000;

	for (const div of divs) {
		setTimeout(() => div.remove(), time);
		time += 5000;
	}
}

function showLoader(element) {
	const div = document.createElement("div");
	const img = document.createElement("img");

	div.setAttribute("id", "loader");
	div.className = "text-center d-flex p-5";
	div.style.height = "100vh";

	img.style.left = "50%";
	img.style.top = "50%";
	img.setAttribute("src", "./img/loader.gif");

	div.appendChild(img);

	element.style.display = "none";
	element.parentNode.insertBefore(div, element);
}

function hideLoader(element) {
	const loader = document.querySelector("#loader");
	loader.remove();
	element.style.display = "block";
	removeResponse();
}

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
