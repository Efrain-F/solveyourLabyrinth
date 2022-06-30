import { modificarTabla,crearPareder,crearObjetivo,crearPuntoInical,resolverLaberindo ,Borrar} from "./eventos.js"

// CONTROLES DE CONFIGURACION DE LA MATRIZ
const btnPared = document.querySelector(".btn-pared"),
btnObjetivo = document.querySelector(".btn-objetivo"),
btnPuntoInicio = document.querySelector(".btn-punto-inicio"),
btnEmpezar = document.querySelector(".btn-enpezar"),
btnBorrar = document.querySelector(".btn-borrar")

const ColRow = document.getElementById("numTabla")
ColRow.addEventListener("change",(e)=>{
    if(ColRow.value<=20){
        modificarTabla(ColRow.value)
    }else{
        alert("esta intentando crear una tabla demasiado grande")
        ColRow.value = 10
        modificarTabla(ColRow.value)
    }
})
btnPared.addEventListener("click",()=>{
    crearPareder()
})
btnObjetivo.addEventListener("click",()=>{
    crearObjetivo()
})
btnPuntoInicio.addEventListener("click",()=>{
    crearPuntoInical()
})
btnEmpezar.addEventListener("click",()=>{
    resolverLaberindo()
})
btnBorrar.addEventListener("click",()=>{
    Borrar()
})

