const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");

form.addEventListener("submit", submit);

axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";
function submit(event) {
	event.preventDefault();
	showLoader(form);

	const errors = [];
	errors.length = 0;
	inputs.forEach(input => {
		const err = validation(input);
		errors.push(...err);
	});

	if (errors.length > 0) {
		errors.forEach(error => createResponse(error));
		setTimeout(() => hideLoader(form), 5000);
		return;
	}
	const newUser = {
		name: inputs[0].value,
		email: inputs[1].value,
		password: inputs[2].value,
		password2: inputs[3].value
	};

	axios
		.post("http://localhost:5000/api/users/register", newUser)
		.then(response => {
			createResponse(response.data.msg, "bg-success");
			setTimeout(
				() => (window.location = "http://127.0.0.1:5500/front/login.html"),
				10000
			);
		})
		.catch(e => e.response.data.forEach(msg => createResponse(msg)))
		.finally(() => hideLoader(form));
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
