//Organizing the code for assignment IIFT/ 
	var pokemonRepository = (function() {
		var pokemonList= [];
		var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1050';

// add pokemons to the list 
		function add(pokemon) {
			pokemonList.push(pokemon)
		};
		
		function getAll() {
			return pokemonList;
		};

// add pokemons to HTML
		function addListItem (pokemon){
			let pokemonList = document.querySelector(".pokemon-list");
			let listPokemon = document.createElement('li');
			let button = document.createElement("button");

			pokemonList.append(listPokemon);
			listPokemon.append(button);

			button.innerText = pokemon.name;
			button.classList.add("btn");
			button.classList.add("btn-success");
			button.classList.add("button")


			button.addEventListener("click", function(){showDetails(pokemon);
			});
		};

// Import data from API
		function loadList() {
			return fetch(apiUrl)
				.then(function (response) {
				return response.json();
			})
				.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
					name: item.name,
					detailsUrl: item.url
					};
					add(pokemon);
				});
			})
				.catch(function (e) {
			console.error(e);
			});
		};

// import details for pokemons
		function loadDetails(item) {
			let url = item.detailsUrl;
			return fetch(url)
				.then(function (response) {
				return response.json();
				})
					.then(function (details) {
// Now we add the details to the item
			item.name = details.name;
			item.imageUrl = details.sprites.front_default;
			item.imageUrlB =details.sprites.back_default;
			item.height = details.height;
			item.weight = details.weight;
			item.types = details.types;
			})
			.catch(function (e) {
			console.error(e);
			});
		};
//  Info about pokemons from API
		function showDetails(pokemon) {
			loadDetails(pokemon).then(function () {
			showModal(pokemon);
			});
		};
// Making modals using Bootstrap and jQ
		function showModal(item) {
			
			let modalBody = $('.modal-body');
			let modalHeader = $('.modal-header');
			let modalTitle = $('.modal-title');
			let btnClose = $("#btnClose");

			$('#pokemon-modal').modal('show');

			
			modalHeader.empty();
			modalTitle.empty();
			modalBody.empty();
// Element for name
			let nameElement = $('<h2>' + item.name + '</h2>');

// Element for IMG
			let imgElement = $('<img class="modal-img">');
			imgElement.attr('src', item.imageUrl);
			let imgElementBack = $('<img class="modal-img">');
			imgElementBack.attr('src', item.imageUrlB);
			
// Element(-s) for information
			let hightElement = $('<p>Hight: ' + item.height + ' dm</p>' );

			let weightElement = $('<p>Weight: ' + item.weight + ' hg</p>' );

			let typesElement = document.createElement ('p');
			item.types.forEach(function(el, index){
				if (item.types.length - 2 == index ) {
					typesElement.textContent += 'Type: ' + el.type.name + ', ';
				} else {typesElement.textContent += 'Type: ' + el.type.name;}
			});

//Modal organization
			modalHeader.append(nameElement);
			modalBody.append(imgElement);
			modalBody.append(imgElementBack);
			modalBody.append(typesElement);
			modalBody.append(hightElement);
			modalBody.append(weightElement);
			modalHeader.append(btnClose);
			};

			document.querySelector('button').addEventListener('click', () =>{
				showModal();
			});

		return {
			getAll: getAll,
			add: add,
			addListItem: addListItem,
			loadList: loadList,
			loadDetails: loadDetails,
			showDetails: showDetails,
		};
	})();

// Practising with IIFT call


	pokemonRepository.loadList().then(function() {
// Now the data is loaded!
		pokemonRepository.getAll().forEach(function(pokemon){
		pokemonRepository.addListItem(pokemon);
		});
	});

	// document.querySelector('.button').addEventListener('click', () => {
	// 	showModal(pokemon);
	// });	
