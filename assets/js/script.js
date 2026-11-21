import { myPreferit } from '../funzioni/funzioni.js'
import { SearchSquad } from '../funzioni/funzioni.js'
import { stampaCard } from '../creatElement/creatElement.js'
import { listaSquadre } from '../funzioni/funzioni.js'
import { cardPreferit } from '../creatElement/creatElement.js'
const messContainerPref = document.querySelector('#messContainerPref')
const textSquad = document.querySelector('#textSquad')
const btnSearch = document.querySelector('#btnSearch')
const containerCardSearch = document.querySelector('#containerCardSearch')
const containerCardPref = document.querySelector('#containerCardPref')
const spinnerSearch = document.querySelector('#spinnerSearch')
const messContainerSearch = document.querySelector('#messContainerSearch')
const btnsFilter = document.querySelectorAll('.btnFilter');
const myIcon = document.querySelector('#toogleDark');
const myError = document.querySelector('#error');
const btnClear = document.getElementById('btnClear');

window.addEventListener('load', () => {
    textSquad.value = '';
    cardPreferit(myPreferit, containerCardPref);
    applicaTema(localStorage.getItem('tema') ?? 'light');
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
    }else {
        myError.classList.add('d-none');
    }
    
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
         const erroreDiRete = !myError.classList.contains('d-none');
        if (listaSquadre.length === 0 && !erroreDiRete) {
            myError.textContent = `La squadra "${inputUtente}" non è stata trovata`;
            myError.classList.remove('d-none');
    }
    } finally {
        if (richiestaCorrente === idUltimaRichiesta) {
            spinnerSearch.classList.add('d-none');
        }
    }
}



const checkNativeSwitch = document.querySelector('#checkNativeSwitch');

checkNativeSwitch.addEventListener('change', () => {
    const tema = checkNativeSwitch.checked ? 'dark' : 'light';
    localStorage.setItem('tema', tema);
    applicaTema(tema);
});

function applicaTema(tema) {
    document.documentElement.setAttribute('data-bs-theme', tema);
    checkNativeSwitch.checked = tema === 'dark';
    myIcon.classList.toggle('fa-moon', tema === 'light');
    myIcon.classList.toggle('fa-sun', tema === 'dark');
    myIcon.classList.toggle('text-dark', tema === 'light');
}


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

const toggleClearButton = () => {
    btnClear.classList.toggle('d-none', textSquad.value.trim() === '');
}; 

textSquad.addEventListener('input', toggleClearButton);

btnClear.addEventListener('click', () => {
    textSquad.value = '';
    toggleClearButton();
    textSquad.focus();
    myError.classList.add('d-none');
    listaSquadre.length = 0;
});
