		//div onde será listado os cards
		const div = document.getElementById('cards');
		//elemento de paginação
		const pagination = document.getElementById('pagination');

		//variável representante da página atual
		let paginaAtual = 1;
		//variável limitadora de objetos por página
		let objetos = 4;

		//função que recebe uma lista, o local aonde colocar a lista, a quantidade de objetos por página e a página atual 
		function ListagemTela(listaItens, elementoHtml, objetosPorPagina, pagina) {
			//inicializando a div
			elementoHtml.innerHTML = "";
			//subtraindo 1 da página (perceba que na primeira vez ele vai ser 0)
			pagina--;

			//variável de início que é a quantidade de objetos multiplicado pela página atual
			let inicio = objetosPorPagina * pagina;
			//o fim vai acrescer a quantidade de objetos por página definidos acima
			let fim = inicio + objetosPorPagina;
			//dividindo os objetos
			let itensPaginados = listaItens.slice(inicio, fim);

			//iniciando a variável html
			let html = ``;

			//percorrendo a lista recebida
			for (let i = 0;	i < itensPaginados.length; i++) {
					//atribuindo os objetos a uma variável
					let item = itensPaginados[i];
						//criando o html da página, junto com o objeto e suas propriedades
						html += `<div class = "card" style = "width: 18rem;">`;
						html +=   `<img class = "card-img-top" src="${item.photo}" alt = "${item.property_type}">`
						html +=   `<div class = "card-body">`
						html +=      `<h5 class = "card-title">${item.property_type}</h5>`
						html +=      `<p class = "card-text">${item.name}</p>`
						html +=      `<h4 class = "card-price">R$${item.price}</h4>`
						html +=    `</div>`
						html += `</div>`;

					
			}
			//colocando o html no elemento definido
			elementoHtml.innerHTML = html;
		}
		//criando a função para o elemento de paginação
		function SetupPagination(listaItens, elementoHtml, objetosPorPagina){
			elementoHtml.innerHTML = "";

			let contadorPaginas = Math.ceil(listaItens.length / objetosPorPagina);
			for (let i = 1; i < contadorPaginas + 1; i++) {
				let btn = BotaoPaginacao(i, listaItens);
				elementoHtml.appendChild(btn);
			}
		}

		function BotaoPaginacao(pagina, listaItens) {
			let botao = document.createElement('button');
			botao.innerText = pagina;

			if(paginaAtual == pagina) {
				botao.classList.add('active');
			}

			botao.addEventListener('click', function () {
				paginaAtual = pagina;
				ListagemTela(listaItens, div, objetos, paginaAtual);

				let current_btn = document.querySelector('.pagenumbers button.active');
				current_btn.classList.remove('active');

				botao.classList.add('active');
			});

			return botao;
		}
		//pegando a url informada pelo servidor
		let url = new URL("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72");
		//criando uma nova requisição
		let request = new XMLHttpRequest();
		//abrindo a requisição com o método get e passando a url
		request.open('GET', url);
		//definindo o tipo da resposta
		request.responseType = 'json';
		//enviando a requisição
		request.send();
		//função para quando receber a resposta
		request.onload = () =>{
			//atribuindo a resposta (Que é uma lista de json) a uma variável
			const alugueisDisponiveis = request.response;
			//chamando a função de paginação
			ListagemTela(alugueisDisponiveis, div, objetos, paginaAtual);
			SetupPagination(alugueisDisponiveis, pagination, objetos);
		}