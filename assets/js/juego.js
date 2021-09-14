const miModulo = (() => {
    'use strict';
    
    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];
    
    // let puntosJugador     = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];
    
    // Referencias del HTML
    const btnPedir            = document.querySelector('#btnPedir'),
          btnDetener          = document.querySelector('#btnDetener'),
          btnNuevo            = document.querySelector('#btnNuevo'),
          marcador            = document.querySelectorAll('h1 > small'),
          divCartasJugadores  = document.querySelectorAll('.divCartas');
          
        //   playerCards   = document.querySelector('#jugador-cartas'),
        //   computerCards = document.querySelector('#computadora-cartas');
    

    // Esta función inicializa el juego      
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        marcador.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
        btnPedir.addEventListener('click',btnPedirEvent);
        btnDetener.addEventListener('click',btnDetenerEvent);
    }

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        deck = [];

        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial + tipo);
            }
        }
    
        return _.shuffle(deck);
    }
    
    // Esta función me permite tomar una carta
    const pedirCarta = () => {
    
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
    
        // console.log(deck);
        // console.log(carta); // Carta debe de ser de la baraja
        return deck.pop();
    }
    
    const valorCarta = (carta) => {
    
        // const valor = carta[0]; // Todos los STRINGS en JavaScript se pueden trabajar como arreglos, haciendo referencia a carta[0] extraeriamos el primer caracter de la carta ej. 2D => 2 , 5C => 5 ---  Pero esto no funcionaria para el 10 al ser dos numeros nos devolveria solo el primero: 1
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor))  ? 
               (valor === 'A') ? 11 : 10
               : valor * 1;
    
        // let puntos = 0;
        // if (isNaN(valor)){
        //     puntos = (valor === 'A') ? 11 : 10;
        // } else {
        //     puntos = valor * 1;
        // }
    
        console.log({puntos});
    }

    // Turno: 0 = Primer Jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcador[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno]
    }

    const crearCarta = (carta, turno) => {
        const newCard = document.createElement('img');
        newCard.classList.add('carta');
        newCard.src = `assets/cartas/${carta}.png`
        divCartasJugadores[turno].append(newCard);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Empate!')
            } else if (puntosMinimos > 21) {
                alert('Perdiste!')
            } else if (puntosComputadora > 21) {
                alert('Ganaste!');
            } else {
                alert('Perdiste');
            }
        }, 100);
    }

    const disableButtons = () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        // element.replaceWith(element.cloneNode(true));
        // newBtnPedir = btnPedir.cloneNode(true);
        // btnPedir.parentNode.replaceChild(newBtnPedir, btnPedir);
    }
    
    const removeEvents = () => {
        btnPedir.removeEventListener('click',btnPedirEvent);
        btnDetener.removeEventListener('click',btnDetenerEvent);
    }
    
    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
    
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta()
    
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)
    
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
        determinarGanador();

    }
    
    // Eventos
    const btnPedirEvent = () => {
    
        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0)

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            disableButtons();
            removeEvents()
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
            console.warn('21, genial!')
            disableButtons();
            removeEvents()
            turnoComputadora(puntosJugador);
        }
    }
    
    const btnDetenerEvent = () => {
        disableButtons();
        removeEvents()
        turnoComputadora(puntosJugadores[0]);
    }
    
    btnPedir.addEventListener('click',btnPedirEvent);
    btnDetener.addEventListener('click',btnDetenerEvent);
    
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();

