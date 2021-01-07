const input = document.querySelector("input");
const textarea = document.querySelector("textarea");

function getNote() {
	const token = getToken();

	const headers = {
		Authorization: `Bearer ${token}`
	};

	const { search } = window.location;

	const id = search.replace(/\?id=/, "");

	axios
		.get(`http://localhost:5000/api/notes/${id}`, { headers })
		.then(res => {
			console.log(res);
			input.value = res.data.head;
			textarea.value = res.data.body;
		})
		.catch(e => {
			// TODO: If its a 404 error show note not found error then redirect ut of the page
			console.log(e);
		});
}

getNote();
