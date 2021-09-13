/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;



// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const marcador = document.querySelectorAll('h1 > small');
const playerCards = document.querySelector('#jugador-cartas');
const computerCards = document.querySelector('#computadora-cartas');

let newBtnPedir, newBtnDetener;

// Esta función crea un nuevo deck
const crearDeck = () => {

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
    // console.log(deck);

    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}


crearDeck();


// Esta función me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.shift();

    // console.log(deck);
    // console.log(carta); // Carta debe de ser de la baraja
    return carta;
}

// pedirCarta();

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

// Turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    do {
        
        const carta = pedirCarta()

        puntosComputadora = puntosComputadora + valorCarta(carta);
        marcador[1].innerText = puntosComputadora;

        const newCard = document.createElement('img');
        newCard.classList.add('carta');
        newCard.src = `assets/cartas/${carta}.png`
        computerCards.append(newCard);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

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



const disableButtonPedir = () => {
    btnPedir.disabled = true;
    // element.replaceWith(element.cloneNode(true));
    // newBtnPedir = btnPedir.cloneNode(true);
    // btnPedir.parentNode.replaceChild(newBtnPedir, btnPedir);
}

const disableButtonDetener = () => {
    btnDetener.disabled = true;
    // element.replaceWith(element.cloneNode(true));
    // newBtnDetener = btnDetener.cloneNode(true);
    // btnDetener.parentNode.replaceChild(newBtnDetener, btnDetener);
}

// Eventos




const btnPedirEvent = () => {

    const carta = pedirCarta()

    puntosJugador = puntosJugador + valorCarta(carta);
    marcador[0].innerText = puntosJugador;

    const newCard = document.createElement('img');
    newCard.classList.add('carta');
    newCard.src = `assets/cartas/${carta}.png`
    playerCards.append(newCard);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        disableButtonPedir();
        btnPedir.removeEventListener('click',btnPedirEvent);
        disableButtonDetener()
        btnDetener.removeEventListener('click',btnDetenerEvent);
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21){
        console.warn('21, genial!')
        disableButtonPedir();
        btnPedir.removeEventListener('click',btnPedirEvent);
        disableButtonDetener();
        btnDetener.removeEventListener('click',btnDetenerEvent);
        turnoComputadora(puntosJugador);
    }
}

const btnDetenerEvent = () => {
    disableButtonPedir();
    btnPedir.removeEventListener('click',btnPedirEvent);
    turnoComputadora(puntosJugador);
    disableButtonDetener();
    btnDetener.removeEventListener('click',btnDetenerEvent);
    
}

btnPedir.addEventListener('click',btnPedirEvent);
btnDetener.addEventListener('click',btnDetenerEvent);

btnNuevo.addEventListener('click', () => {

    console.clear()

    deck = [];
    crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0; 
    marcador[0].innerText = 0;
    marcador[1].innerText = 0;

    for(img of document.querySelectorAll('img')) {
        img.remove()   
    }
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
    btnPedir.addEventListener('click',btnPedirEvent);
    btnDetener.addEventListener('click',btnDetenerEvent);
});