const tabla = document.querySelector(".tabla")
const itemTabla = document.querySelectorAll(".itemTabla")
const tablaFila = document.querySelectorAll(".tabla-fila")
const tablaBody = document.querySelectorAll(".tabla-body")

// para comenzar a resolver el laberinto necesitamos asegurarnos que tengamos un punto de inicio y un final
let objetivoSeleccionado = false,
PuntoInicioSeleccionado = false;

//modificarTabla(10)
// agrander o reducir el tamaño de la tabla
export function modificarTabla(num){
    tablaBody.innerHTML = ""
    tabla.innerHTML = ""
    for(let r=0;r<num;r++){
        let fila = document.createElement("tr")
        for(let c=0;c<num;c++){
            fila.innerHTML += `<td class="itemTabla" r=${r} c=${c} value=[3]>0</td></tr>`
        }
        tablaBody.innerHTML += `<tr class="tabla-fila">${fila.innerHTML}</tr>`
    }
    tabla.innerHTML = tablaBody.innerHTML
    objetivoSeleccionado = false
    PuntoInicioSeleccionado = false
}

// esta funcion se modificar dependiendo de lo que queremos hacer en el evento click
let funcionEvento = (e)=>{}

export function crearPareder(){
    funcionEvento = (e)=>{
        e.path[0].style.setProperty("background-color","#8FDDE7")
        e.path[0].innerText = "P"
    }
}
let puntoObjetivoSeleccionado ;
export function crearObjetivo(){
    funcionEvento = (e)=>{
        if(puntoObjetivoSeleccionado){
            puntoObjetivoSeleccionado.style.setProperty("background-color","transparent");
            puntoObjetivoSeleccionado.innerText = 0
        }
        puntoObjetivoSeleccionado = e.path[0]
        e.path[0].style.setProperty("background-color","#B6E5D8")
        e.path[0].innerText = "O"
        let row= e.path[0].attributes.r.value
        let colm= e.path[0].attributes.c.value
        // en este caso, yo me asegure que el orden de las clases esten asignadas
        objetivoSeleccionado = [parseInt(row),parseInt(colm)]
    }
}
let puntoInicialSeleccionado ;
export function crearPuntoInical(){
    funcionEvento =  (e)=>{
        if(puntoInicialSeleccionado){
            puntoInicialSeleccionado.style.setProperty("background-color","transparent");
            puntoInicialSeleccionado.innerText = 0
        }
        puntoInicialSeleccionado = e.path[0]
        e.path[0].style.setProperty("background-color","#FBE5C8")
        e.path[0].innerText = "I"
        let row= e.path[0].attributes.r.value
        let colm= e.path[0].attributes.c.value
        // en este caso, yo me asegure que el orden de las clases esten asignadas
        PuntoInicioSeleccionado = [parseInt(row),parseInt(colm)]
    }
}

tabla.addEventListener("click",(e)=>{
    if(e.path[0].innerText.length <9){
        funcionEvento(e)
    }
})

export function Borrar(){
    funcionEvento = (e)=>{
        if(e.path[0].innerText == "I"){
            PuntoInicioSeleccionado = false;
            puntoInicialSeleccionado.style.setProperty("background-color","transparent");
            puntoInicialSeleccionado.innerText = 0
        }
        else if(e.path[0].innerText == "O"){
            objetivoSeleccionado = false
            puntoObjetivoSeleccionado.style.setProperty("background-color","transparent");
            puntoObjetivoSeleccionado.innerText = 0
        }
        else if(e.path[0].innerText == "P"){
            e.path[0].style.setProperty("background-color","transparent")
        e.path[0].innerText = 0
        }
    }
}

let btnEmpezar = document.querySelector(".btn-enpezar")
export function resolverLaberindo(){
    if(objetivoSeleccionado != false && PuntoInicioSeleccionado != false){
        if(btnEmpezar.innerText == "Iniciar"){
            btnEmpezar.innerText = "Reiniciar"
            soluctionLaberinto(PuntoInicioSeleccionado)
        }else{
            btnEmpezar.innerText = "Iniciar"
            modificarTabla(10)
        }
    }else{
        alert("Lo siento debe de PINTAR UN OBJETIVO y un PUNTO INICIAL")
    }
    
}
function soluctionLaberinto(Pinicio){
    // "P" = una pared
    // "O" = objetivo
    // (lista init) = punto inicial
    const matriz = tabla.children[0].rows
    const rowsColum = matriz.length // es una matriz cuadrada

    let caminos = []
    let objetivoEncontrado;
    let evitarRepeticiones = 0 // para evitar llamar varias veces la misma funcion
    const pintarCamino= (cam)=>{
        cam.forEach(e => {
            matriz[e[0][0]].children[e[0][1]].style.setProperty("background-color","#FFAEBC")
        });
    }
    const caminoMasCorto = () =>{
        let camC = []
        const revisar = (num,pos)=>{
            if(num == 1){
                // pintamos el camino para verlo en el grafico
                pintarCamino(camC)
                return true
            }else{
                let cC = caminos.filter(e=>e[1]==num-1)
                cC = cC.filter(e=>`${e[0]}`==`${[pos[0]-1,pos[1]]}` || e[0]==`${[pos[0]+1,pos[1]]}` || e[0]==`${[pos[0],pos[1]-1]}` || e[0]==`${[pos[0],pos[1]+1]}`)
                // agregamos al camico corto unico
                camC = [...camC,cC[0]]
                revisar(num-1,cC[0][0])
            }
        }
        revisar(objetivoEncontrado[1],objetivoEncontrado[0])
    }
    const pintar = (pst,u)=>{
        // cambiamos y personalizamos la matriz
        matriz[pst[0]].children[pst[1]].innerText = u
        matriz[pst[0]].children[pst[1]].style.setProperty("background-color","#FBE5C8")
        // agregamo a los posibles caminos
        caminos.push([pst,u])
        setTimeout(()=>{
            expancion(pst,u+1)
        },400)
    }
    const expancion = (pst,u)=>{
        if(objetivoEncontrado){
            // debido a que el codigo es asincronico debemos de cancelar todos los procesos para no esta llamando a la misma funcion varias veces
            // esta es la unica forma que se me ocurrio para evitar ese problema
            evitarRepeticiones +=1
            if(evitarRepeticiones<=1) caminoMasCorto()
        }else{
            validacion([pst[0],pst[1]+1],u) // derecha
            validacion([pst[0]+1,pst[1]],u) // abajo
            validacion([pst[0],pst[1]-1],u) // izquieda
            validacion([pst[0]-1,pst[1]],u) // arriba
        }
    }
    const validacion = async (pst,u)=>{
        // no se salga de los limites de la matriz
        if(pst[0]>=rowsColum || pst[1]>=rowsColum || pst[0]<0 || pst[1]<0) return false
        else{
            let indic = matriz[pst[0]].children[pst[1]]
            // si encontramos el objetivo
            if(indic.innerText == "O"){
                objetivoEncontrado = [pst,u]
                caminos.push([pst,u])
                expancion(pst,u)
                return true
            }
            // si chocamos con una pared
            else if(indic.innerText == "P") return false
            // continuar
            // si en la posicion actual tenemos ya un camico difinido mas largo lo remplazamo o si esta vacia ("0")
            else if(indic.innerText > u || indic.innerText== "0" || indic.innerText== "I") pintar(pst,u);
        }
    }

    validacion(Pinicio,1)
    //console.log(matriz[8].children[3].innerText)
}