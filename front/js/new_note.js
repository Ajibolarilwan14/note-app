const inputs = document.querySelectorAll(".form-control");
const form = document.querySelector("form");

form.addEventListener("submit", submit);

async function submit(event) {
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
	const newNote = {
		head: inputs[0].value,
		body: inputs[1].value
	};

	const token = getToken();
	try {
		const data = await fetch("http://localhost:5000/api/notes/new", {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newNote)
		});
		const res = await data.json();
		createResponse(res.msg, "bg-success");
		setTimeout(
			() =>
				(window.location = "http://127.0.0.1:5500/front/dashboard.html" ), //`${window.location.origin}/dashboard.html`
			5000
		);
	} catch (e) {
		console.log(e);
		e.response.body.forEach(msg => createResponse(msg));
	} finally {
		hideLoader(form);
	}
	return;
}
