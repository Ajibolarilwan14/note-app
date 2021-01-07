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
