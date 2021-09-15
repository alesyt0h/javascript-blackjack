# BlackJack

<h3 align="center">Previews</h3>
<p align="center">
  <img src="https://github.com/alesyt0h/javascript-blackjack/blob/main/Blackjack%20Preview%20Lost.jpg?raw=true" style="width:330px" alt="Lost"/>
  <img src="https://github.com/alesyt0h/javascript-blackjack/blob/main/Blackjack%20Preview%20Won.jpg?raw=true" style="width:330px" alt="Won"/>
</p>

## Lógica y creación del juego

* Librería externa usada: [UnderScore](https://underscorejs.org/)
* Trabajar con arreglos y randomizar los valores gracias a UnderScore con `_.shuffle`
* Métodos `isNaN` y `substring`
* Convertir string a número de manera rápida y eficaz: `numeroString * 1`
* Manipulación del DOM - `append` `createElement` `addEventListener` `removeEventListener` `cloneNode` `replaceChild`
* Crear imágenes dinámicamente gracias a la manipulación del DOM
* Realizar la lógica para implementar un competidor de cartas
* Eventos

---

## Optimizaciones y protección del código (Patrón módulo)

* **use strict**
* Patrón módulo - Para proteger todas las variables creadas hay que ejecutar todo el código dentro de una función anónima autoejecutable:
```javascript
(() => {

    // Code goes here

})();
```
* Minimizar el código de forma manual con [JavaScript Minifier](https://javascript-minifier.com/)
* Optimizaciones
