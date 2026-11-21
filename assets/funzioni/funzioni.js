


const myError = document.querySelector('#error')
const urlApi = "https://www.thesportsdb.com/api/v1/json/123";
export const listaSquadre = [];
export const myPreferit = []

export class Team {
    constructor(_idTeam, _strBadge, _strTeam, _strLeague, _strSport, _id) {
        this.id = _id ?? crypto.randomUUID()
        this.idTeam = _idTeam
        this.strBadge = _strBadge
        this.strTeam = _strTeam
        this.strLeague = _strLeague
        this.strSport = _strSport
    }
}
const salvati = JSON.parse(localStorage.getItem('squadrePreferite')) ?? []
myPreferit.push(
    ...salvati.map(squad => new Team(squad.idTeam, squad.strBadge, squad.strTeam, squad.strLeague, squad.strSport, squad.id))
)

export const SearchSquad = async (inputUser) => {
    try {
        const response = await fetch(`${urlApi}/searchteams.php?t=${encodeURIComponent(inputUser)}`);

        if (!response.ok) {
            const errore = new Error("Errore HTTP: " + response.status);
            errore.status = response.status;
            throw errore;
        }

        const dati = await response.json();

        listaSquadre.length = 0;
        listaSquadre.push(...dati.teams ?? []);
    } catch (errore) {
        listaSquadre.length = 0;
        myError.classList.remove('d-none');

         if (errore.status === 404) {
            myError.textContent = 'Risorsa non trovata';
        } else if (errore.status === 400) {
            myError.textContent = 'Richiesta non valida';
        } else if (errore.status >= 500) {
            myError.textContent = 'Errore del server: riprova più tardi';
        }else if (errore instanceof TypeError) {
            myError.textContent = 'Troppe richieste o server non raggiungibile: riprova tra un minuto';
        } else {
            myError.textContent = 'Problema nel caricamento delle squadre';
        }
    }
};


export const ultimiScontriGiocati = async (idTeam) => {
    try {
        const response = await fetch(`${urlApi}/eventslast.php?id=${idTeam}`);

        if (!response.ok) {
            throw new Error("Errore HTTP: " + response.status);
        }

        const dati = await response.json();
        return dati.results ?? [];
    } catch (errore) {
        myError.classList.remove('d-none')
        myError.textContent = 'Problema nel caricamento delle squadre';
        return [];
    }
};

export const prossimiScontri = async (idTeam) => {
    try {
        const response = await fetch(`${urlApi}/eventsnext.php?id=${idTeam}`);

        if (!response.ok) {
            throw new Error("Errore HTTP: " + response.status);
        }

        const dati = await response.json();
        return dati.events ?? [];
    } catch (errore) {
        myError.classList.remove('d-none')
        myError.textContent = 'Problema nel caricamento delle squadre';
        return [];
    }
};












