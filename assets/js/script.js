import { myPreferit, SearchSquad } from '../funzioni/funzioni.js'
import { stampaCard } from '../funzioni/funzioni.js'
import { listaSquadre } from '../funzioni/funzioni.js'
import { cardPreferit } from '../funzioni/funzioni.js'
const textSquad = document.querySelector('#textSquad')
const btnSearch = document.querySelector('#btnSearch')
const containerCardSearch = document.querySelector('#containerCardSearch')
const containerCardPref = document.querySelector('#containerCardPref')
const spinnerSearch = document.querySelector('#spinnerSearch')

cardPreferit(myPreferit, containerCardPref)

btnSearch.addEventListener('click', async (e) => {
  e.preventDefault();

  const inputUser = textSquad.value.trim();
  if (inputUser === "") return;
  spinnerSearch.classList.remove('d-none');

  await  SearchSquad(inputUser);
  spinnerSearch.classList.add('d-none');
  stampaCard(listaSquadre, containerCardSearch)
})
console.log(myPreferit)