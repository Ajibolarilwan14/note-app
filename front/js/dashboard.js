const section = document.querySelector("#notes");
function createNote({ head, body, _id }) {
	const { origin } = window.location;
	const card = `<section class="mt-3">
	        <div class="card">
	          <div class="card-body">
	            <h5 class="card-title">${head}</h5>
	            <p class="card-text">
	              ${body}
	            </p>
	            <div class="d-flex flex-row justify-content-between">
	              <a href=${origin}/note/edit.html?id=${_id} class="text-warning p-2">Edit</a>
	              <a href=localhost:5000/api/notes/delete/${_id} class="text-danger p-2">Delete</a>
	            </div>
	          </div>
	        </div>
	      </section>`;
	return card;
}
(function() {
	const token = this.getToken();
	console.log("here ");
	const headers = {
		Authorization: `Bearer ${token}`
	};
	axios
		.get("http://localhost:5000/api/notes/all", { headers })
		.then(({ data }) => {
			console.log(data);
			data.map(note => (section.innerHTML += createNote(note)));
		})
		.catch(e => console.log(e));
})();
