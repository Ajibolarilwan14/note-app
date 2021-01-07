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
