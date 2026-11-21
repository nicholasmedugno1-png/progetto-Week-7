import {prossimiScontri} from '../funzioni/funzioni.js'
import {ultimiScontriGiocati} from '../funzioni/funzioni.js'
import { myPreferit} from '../funzioni/funzioni.js'
import { Team } from '../funzioni/funzioni.js';
const containerCardPref = document.querySelector('#containerCardPref')
const messContainerPref = document.querySelector('#messContainerPref')
function save() {
    localStorage.setItem('squadrePreferite', JSON.stringify(myPreferit));
}

export function cardPreferit(array, contenitorePadre) {
    contenitorePadre.textContent = '';

    array.forEach((item) => {

        const myArt = document.createElement('article');
        myArt.classList.add('col-12', 'col-md-6', 'col-xl-4', 'mb-3');

        const myDivCard = document.createElement('div');
        myDivCard.classList.add('card', 'p-3', 'text-center', 'd-flex', 'flex-column', 'justify-content-between');

        const myDivInterno = document.createElement('div');
        myDivInterno.classList.add('mb-2', 'rounded', 'd-flex', 'justify-content-center', 'align-items-center');
        myDivInterno.style.height = '120px';

        const myImgPro = document.createElement('img');
        myImgPro.classList.add('mw-100', 'mh-100', 'object-fit-contain', 'rounded');
        myImgPro.src = `${item.strBadge}`;
        myImgPro.alt = `${item.strTeam}`;
        myDivInterno.appendChild(myImgPro);

        const myTitleProd = document.createElement('h3');
        myTitleProd.classList.add('fs-5', 'fw-bold', 'mb-1');
        myTitleProd.textContent = `${item.strTeam}`;

        const myDescri = document.createElement('p');
        myDescri.classList.add('text-muted', 'mb-3');
        myDescri.textContent = `${item.strLeague}`;

        const btnElimina = document.createElement('button');
        btnElimina.type = 'button';
        btnElimina.textContent = '🗑️ Rimuovi';
        btnElimina.classList.add('btn', 'btn-personal', 'w-100');

        btnElimina.addEventListener('click', (e) => {
            e.stopPropagation();

            const indice = myPreferit.findIndex(team => team.id === item.id);
            if (indice !== -1) {
                myPreferit.splice(indice, 1);
            }
            
            if (myPreferit.length === 0) {
                messContainerPref ?.classList.remove('d-none');
            } 
            save()
            cardPreferit(myPreferit, contenitorePadre);
        });
        
        myDivCard.append(myDivInterno, myTitleProd, myDescri, btnElimina);
        myArt.appendChild(myDivCard);
        contenitorePadre.appendChild(myArt);


        const myModal = document.createElement('div');
        myModal.classList.add('col-12', 'card', 'text-center', 'd-none', 'my-3',);

        const myModalDialog = document.createElement('div');
        const myModalContent = document.createElement('div');

        const myModalHead = document.createElement('div');
        myModalHead.classList.add('modal-header');

        const myTitleModal = document.createElement('h2');
        myTitleModal.classList.add('modal-title', 'fs-5', 'fw-bold', 'text-primary');
        myTitleModal.textContent = `${item.strTeam}`;

        const myModalBody = document.createElement('div');
        myModalBody.classList.add('row', 'g-3', 'text-start', 'mt-1');

        const mydivAfter = document.createElement('div');
        mydivAfter.classList.add('col-12', 'col-md-6');
        const titeAfter = document.createElement('span');
        titeAfter.classList.add('d-block', 'fw-bold', 'mb-1');
        titeAfter.textContent = 'Prossime partite';
        const myScontriAfter = document.createElement('p');
        myScontriAfter.classList.add('text-muted', 'myClassModal');
        mydivAfter.append(titeAfter, myScontriAfter);

        const mydivBefore = document.createElement('div');
        mydivBefore.classList.add('col-12', 'col-md-6');
        const titeBefore = document.createElement('span');
        titeBefore.classList.add('d-block', 'fw-bold', 'mb-1');
        titeBefore.textContent = 'Ultimi risultati';
        const myScontriBefore = document.createElement('p');
        myScontriBefore.classList.add('text-muted', 'myClassModal');
        mydivBefore.append(titeBefore, myScontriBefore);

        myModal.appendChild(myModalDialog);
        myModalDialog.appendChild(myModalContent);
        myModalContent.append(myModalHead, myModalBody);
        myModalHead.append(myTitleModal);
        myModalBody.append(mydivAfter, mydivBefore);

        myArt.after(myModal);
        let caricato = false;
        myDivCard.addEventListener('click', async (e) => {
            if (e.target.closest('button')) return
            myModal.classList.toggle('d-none')

            if (caricato) return
            caricato = true
            myScontriBefore.textContent = 'Caricamento...';
            const ultimiEventi = await ultimiScontriGiocati(item.idTeam);
              ultimiEventi.length === 0
    ? myScontriBefore.textContent = 'Nessun risultato disponibile'
    :myScontriBefore.replaceChildren(...ultimiEventi.map(creaRigaRisultato))


            const prossimi = await prossimiScontri(item.idTeam);
            myScontriAfter.textContent = prossimi.length === 0
                ? 'Nessuna partita in programma'
                : prossimi
                    .map(event => `${event.dateEvent}: ${event.strEvent}`)
        })
    });
}

export function stampaCard(array, contenitorePadre) {
    contenitorePadre.textContent = ''
    array.forEach((item, i) => {
        const myArt = document.createElement('article');
        myArt.classList.add('col-12', 'col-md-6', 'mb-3')

        const myDivCard = document.createElement('div');
        myDivCard.classList.add('card', 'p-3', 'd-flex', 'row', 'g-1', 'text-center')
        const myDivInterno = document.createElement('div');
        myDivInterno.classList.add('mb-2', 'rounded');
        myDivInterno.style.height = '50%';
        const myImgPro = document.createElement('img');
        myImgPro.classList.add('w-25', 'h-25', 'object-fit-contain', 'rounded');
        myImgPro.src = `${item.strBadge}`
        myDivInterno.appendChild(myImgPro)


        const myTitleProd = document.createElement('h3');
        myTitleProd.classList.add('fs-5', 'fw-bold');
        myTitleProd.textContent = `${item.strTeam}`
        const myDescri = document.createElement('p');
        myDescri.classList.add('text-muted',);
        myDescri.textContent = `${item.strLeague}`
        const btnAggiungi = document.createElement('button');
        btnAggiungi.textContent = 'Aggiungi ai preferiti'
        btnAggiungi.classList.add('btn-personal')
        myDivCard.append(myDivInterno, myTitleProd, myDescri, btnAggiungi);
        myArt.appendChild(myDivCard);
        contenitorePadre.appendChild(myArt)

        btnAggiungi.addEventListener('click', (e) => {
            e.stopPropagation()


            const giaPresente = myPreferit.some(t => t.idTeam === item.idTeam)
            if (giaPresente) return

            myPreferit.push(new Team(item.idTeam, item.strBadge, item.strTeam, item.strLeague, item.strSport))
            messContainerPref?.classList.add('d-none');
            cardPreferit(myPreferit, containerCardPref)
            save();
        })

            const myModal = document.createElement('div')
                     myModal.classList.add('col-12', 'card', 'text-center', 'd-none', 'mt-3', 'p-3')
             
                     const myModalDialog = document.createElement('div');
                     const myModalContent = document.createElement('div');
                     //HEADER
                     const myModalHead = document.createElement('div');
                     myModalHead.classList.add('modal-header');
                     const myTitleModal = document.createElement('h2');
                     myTitleModal.classList.add('modal-title', 'fs-5', 'fw-bold', 'text-primary');
                     myTitleModal.textContent = `${item.strTeam}`;
             
                     const myModalBody = document.createElement('div')
                     myModalBody.classList.add('row', 'g-3', 'text-start', 'mt-1')
             
             
                     const mydivAfter = document.createElement('div');
                     mydivAfter.classList.add('col-12', 'col-md-6');
                     const titeAfter = document.createElement('span')
                     titeAfter.classList.add('d-block', 'fw-bold', 'mb-1')
                     titeAfter.textContent = 'Prossime partite'
                     const myScontriAfter = document.createElement('p');
                     myScontriAfter.classList.add('text-muted', 'myClassModal');
                     mydivAfter.append(titeAfter, myScontriAfter)
             
                     const mydivBefore = document.createElement('div');
                     mydivBefore.classList.add('col-12', 'col-md-6');
                     const titeBefore = document.createElement('span')
                     titeBefore.classList.add('d-block', 'fw-bold', 'mb-1')
                     titeBefore.textContent = 'Ultimi risultati'
                     const myScontriBefore = document.createElement('p');
                     myScontriBefore.classList.add('text-muted', 'myClassModal');
                     mydivBefore.append(titeBefore, myScontriBefore)
                     myModal.appendChild(myModalDialog)
                     myModalDialog.appendChild(myModalContent)
                     myModalContent.append(myModalHead, myModalBody)
                     myModalHead.append(myTitleModal);
                     myModalBody.append(mydivAfter, mydivBefore)
                     myArt.after(myModal);

                     
            let caricato = false
    
            myDivCard.addEventListener('click', async (e) => {
                if (e.target.closest('button')) return
                myModal.classList.toggle('d-none')
    
                if (caricato) return
                caricato = true
                const [ultimiEventi, prossimi] = await Promise.all([
                    ultimiScontriGiocati(item.idTeam),
                    prossimiScontri(item.idTeam)
                ])
       



                ultimiEventi.length === 0
                 ? myScontriBefore.textContent = 'Nessun risultato disponibile'
                 :myScontriBefore.replaceChildren(...ultimiEventi.map(creaRigaRisultato))
             
             
                         myScontriAfter.textContent = prossimi.length === 0
                             ? 'Nessuna partita in programma'
                             : prossimi
                                 .map(event => `${event.dateEvent}: ${event.strEvent}`)
                     })
                 })
             }
             
             function creaRigaRisultato(event) {
                 const riga = document.createElement('div')
                 riga.append(`${event.strEvent}: `)
                 const badge = document.createElement('span')
                 badge.classList.add('badge', 'text-bg-success')
                 badge.textContent = `${event.intHomeScore ?? '-'} - ${event.intAwayScore ?? '-'}`
                 riga.append(badge)
                 return riga
             }
                 
            
                 
             
            


