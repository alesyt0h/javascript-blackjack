const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"];let r=[];const o=document.querySelector("#btnPedir"),l=document.querySelector("#btnDetener"),s=document.querySelector("#btnNuevo"),c=document.querySelectorAll("h1 > small"),a=document.querySelectorAll(".divCartas"),i=(t=2)=>{e=d(),r=[];for(let e=0;e<t;e++)r.push(0);c.forEach(e=>e.innerText=0),a.forEach(e=>e.innerHTML=""),o.disabled=!1,l.disabled=!1,o.addEventListener("click",p),l.addEventListener("click",L)},d=()=>{e=[];for(let n=2;n<=10;n++)for(let r of t)e.push(n+r);for(let r of t)for(let t of n)e.push(t+r);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},h=(e,t)=>(r[t]=r[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),c[t].innerText=r[t],r[t]),m=(e,t)=>{const n=document.createElement("img");n.classList.add("carta"),n.src=`assets/cartas/${e}.png`,a[t].append(n)},f=()=>{o.disabled=!0,l.disabled=!0},v=()=>{o.removeEventListener("click",p),l.removeEventListener("click",L)},E=e=>{let t=0;do{const e=u();t=h(e,r.length-1),m(e,r.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=r;setTimeout(()=>{t===e?alert("Empate!"):e>21?alert("Perdiste!"):t>21?alert("Ganaste!"):alert("Perdiste")},100)})()},p=()=>{const e=u(),t=h(e,0);m(e,0),t>21?(console.warn("Lo siento mucho, perdiste"),f(),v(),E(t)):21===t&&(console.warn("21, genial!"),f(),v(),E(t))},L=()=>{f(),v(),E(r[0])};return o.addEventListener("click",p),l.addEventListener("click",L),s.addEventListener("click",()=>{i()}),{nuevoJuego:i}})();