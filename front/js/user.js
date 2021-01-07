const img = document.querySelector("img");
const h1 = document.querySelector("h1");
(function() {
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
		Authorization: `Bearer ${token}`
	};

	axios
		.get("http://localhost:5000/api/users/current", { headers })
		.then(res => {
			const { avatar, name } = res.data;
			img.setAttribute("src", avatar);
			h1.innerText = `Welcome, ${name}`;
		})
		.catch(e => console.log(e));
})();
