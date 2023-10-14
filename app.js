const button = document.querySelector('#button'),
	input = document.querySelector('#password'),
	separator = [
		',',
		'.',
		'!',
		'?',
		';',
		':',
		'-',
		'/',
		'\\',
		'|',
		'_',
		'@',
		'#',
		'$',
		'%',
		'&',
		'*',
	],
	pokeball = document.querySelector('#copy-icon')

button.addEventListener('click', async function (e) {
	e.preventDefault

	try {
		var { name, move } = await fetchData()
		const separatorToUse =
			separator[Math.floor(Math.random() * separator.length)]
		const firstUppercase = Math.random() < 0.5

		if (firstUppercase) {
			name = name.toUpperCase()
		} else {
			move = move.toUpperCase()
		}
		const password =
			name +
			separatorToUse +
			move +
			separatorToUse +
			Math.floor(Math.random() * 999)

		input.innerText = password
	} catch (e) {
		console.log(e)
	}
})

async function fetchData() {
	button.disabled = true
	pokeball.style.display = 'none'
	button.innerHTML = '<span class="loader"></span>'
	const totalPokedexNumber = document.querySelector('#generation').value || 1017
	const randomPokedexIndex = Math.floor(
		Math.random() * totalPokedexNumber + 1 + 1
	)
	const response = await fetch(pokeApiUrl(`/pokemon/${randomPokedexIndex}`))
	const pokemon = await response.json()

	const pokemonName = pokemon.name
	const pokemonMove = pokemon.moves

	button.disabled = false
	button.innerHTML = 'Generate a new password'
	pokeball.style.display = 'flex'

	return {
		name: pokemonName,
		move: pokemonMove[Math.floor(Math.random() * pokemonMove.length)].move.name,
	}
}

function pokeApiUrl(params = '/') {
	const baseUrl = 'https://pokeapi.co/api/v2'
	return baseUrl + params
}

function copyPasswordToClipboard() {
	const passwordText = document.getElementById('password')
	const tempInput = document.createElement('input')
	tempInput.value = passwordText.textContent
	document.body.appendChild(tempInput)
	tempInput.select()
	document.execCommand('copy')
	document.body.removeChild(tempInput)

	alert('Password copied to clipboard')
}
