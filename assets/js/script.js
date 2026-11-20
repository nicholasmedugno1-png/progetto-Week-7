import { myPreferit, SearchSquad } from '../funzioni/funzioni.js'
import { stampaCard } from '../funzioni/funzioni.js'
import { listaSquadre } from '../funzioni/funzioni.js'
import { cardPreferit } from '../funzioni/funzioni.js'
const messContainerPref = document.querySelector('#messContainerPref')
const textSquad = document.querySelector('#textSquad')
const btnSearch = document.querySelector('#btnSearch')
const containerCardSearch = document.querySelector('#containerCardSearch')
const containerCardPref = document.querySelector('#containerCardPref')
const spinnerSearch = document.querySelector('#spinnerSearch')
const messContainerSearch = document.querySelector('#messContainerSearch')
const btnsFilter = document.querySelectorAll('.btnFilter');

window.addEventListener('load', () => {
    textSquad.value = '';
    cardPreferit(myPreferit, containerCardPref);

    if (myPreferit.length === 0) {
        messContainerPref?.classList.remove('d-none');
    } 
});

let timerRicerca;
let idUltimaRichiesta = 0;
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    clearTimeout(timerRicerca);
    eseguiRicerca(textSquad.value);
});

textSquad.addEventListener('input', () => {
    clearTimeout(timerRicerca);

    const query = textSquad.value.trim();
    if (query === "") {
        containerCardSearch.textContent = '';
        spinnerSearch.classList.add('d-none');
        messContainerSearch.classList.remove('d-none');
        return;
    }
    messContainerSearch?.classList.add('d-none');
    timerRicerca = setTimeout(() => {
        eseguiRicerca(query);
    }, 450);
});




async function eseguiRicerca(inputUser) {
    const inputUtente = inputUser.trim();
    if (inputUtente === "") {
        containerCardSearch.textContent = '';
        spinnerSearch.classList.add('d-none');
        return;
    }

    const richiestaCorrente = ++idUltimaRichiesta;
    spinnerSearch.classList.remove('d-none');

    try {
        await SearchSquad(inputUtente);
        if (richiestaCorrente !== idUltimaRichiesta) return;
        stampaCard(listaSquadre, containerCardSearch);
    } finally {
        if (richiestaCorrente === idUltimaRichiesta) {
            spinnerSearch.classList.add('d-none');
        }
    }
}

const checkNativeSwitch = document.querySelector('#checkNativeSwitch');
checkNativeSwitch.addEventListener('change', (e) => {
    const myIcon = document.querySelector('#toogleDark')
    const myHtml = document.querySelector('html')
    if (myHtml.getAttribute('data-bs-theme') === 'dark') {
        myHtml.setAttribute('data-bs-theme', 'light');
        myIcon.classList.add('fa-moon', 'text-dark');
        myIcon.classList.remove('fa-sun')
    } else {
        myIcon.classList.add('fa-sun')
        myIcon.classList.remove('fa-moon', 'text-dark');
        myHtml.setAttribute('data-bs-theme', 'dark');
    }
});



function aggiornaPreferiti() {
    const squadreFiltrate = sportSelezionato
        ? myPreferit.filter((team) => team.strSport === sportSelezionato)
        : myPreferit;

    cardPreferit(squadreFiltrate, containerCardPref);

    if (!messContainerPref) return;

    if (squadreFiltrate.length === 0) {
        messContainerPref.classList.remove('d-none');
        messContainerPref.textContent = sportSelezionato
            ? `Nessuna squadra preferita per ${sportSelezionato}`
            : 'Nessuna squadra aggiunta ai preferiti';
    } else {
        messContainerPref.classList.add('d-none');
    }
}


let sportSelezionato = null;
btnsFilter.forEach((btn) => {
    btn.addEventListener('click', () => {
        const sport = btn.textContent.trim();

        if (sport !== 'Tutti' && sportSelezionato === sport) {
            return;
        }

btnsFilter.forEach((b) => b.classList.remove('active'));

        if (sport === 'Tutti') {
            sportSelezionato = null;
            btn.classList.add('active');
        } else {
            sportSelezionato = sport;
            btn.classList.add('active');
        }

        aggiornaPreferiti();
    });
});

console.log('myPreferit:', myPreferit);
console.log('sportSelezionato:', sportSelezionato);