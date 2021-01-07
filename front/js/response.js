function removeResponse() {
	const divs = document.querySelectorAll(".my-1.p-1.text-white.text-center");

	let time = 5000;

	for (const div of divs) {
		setTimeout(() => div.remove(), time);
		time += 5000;
	}
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
