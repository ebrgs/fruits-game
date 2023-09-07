function abrirJogo() {
    const botaoJogar = document.querySelector("#botao_jogar")
    const paginaInicio = document.querySelector(".pagina_inicio")
    const paginaJogo = document.querySelector(".pagina_jogo")

    botaoJogar.addEventListener("click", (event) => {
        paginaInicio.classList.add("pagina_escondida")
        paginaJogo.classList.remove("pagina_escondida")
        removerFrutas()
        removerFrutas()
        aleatorizarFrutas()
    })
}

function voltarInicio() {
    const botaoVoltar = document.querySelector("#botao_inicio")
    const paginaInicio = document.querySelector(".pagina_inicio")
    const paginaJogo = document.querySelector(".pagina_jogo")

    botaoVoltar.addEventListener("click", (event) => {
        paginaInicio.classList.remove("pagina_escondida")
        paginaJogo.classList.add("pagina_escondida")
    })
}

function reiniciarJogo() {
    const botaoReinicio = document.querySelector("#botao_reiniciar")
    const paginaInicio = document.querySelector(".pagina_inicio")
    const paginaJogo = document.querySelector(".pagina_jogo")
    const paginaFinal = document.querySelector(".pagina_final")

    botaoReinicio.addEventListener("click",  (event) => {
        paginaInicio.classList.add("pagina_escondida")
        paginaFinal.classList.add("pagina_escondida")
        paginaJogo.classList.remove("pagina_escondida")
        removerFrutas()
        removerFrutas()
        aleatorizarFrutas()
    })
}

function aleatorizarFrutas() {
    const caixasFrutas = document.querySelectorAll(".caixa_fruta")
    caixasFrutas.forEach(caixa => {
        const topFruit = Math.floor(Math.random() * 400)
        const leftFruit = Math.floor(Math.random() * 900)
        caixa.style.top = `${topFruit}px`
        caixa.style.left = `${leftFruit}px`

    })
}
function removerFrutas() {
    const cestasFrutas = document.querySelectorAll(".cesta")
    const parteJogo = document.querySelector(".parte_jogo")
    cestasFrutas.forEach(cesta => {
        cesta.childNodes.forEach(item => {
            parteJogo.append(item)
        })
    })
}

function movimentarFrutas() {
    const cestasFrutas = document.querySelectorAll(".cesta")
    let frutaPuxada

    document.addEventListener("dragstart", (event) => {
        event.target.classList.add("dragging")
        frutaPuxada = event.target
    })

    document.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging")
        verificarSeConcluiu()
    })

    cestasFrutas.forEach((cesta) => {
        cesta.addEventListener("dragover", (event) => {
            if(frutaPuxada.classList[1] == event.target.classList[1]){
                const dragging = document.querySelector(".dragging")
                const applyAfter = pegarNovaPosicao(cesta, event.clientY)
    
                if(applyAfter) {
                    applyAfter.insertAdjacentElement("afterend", dragging)
                } else {
                    cesta.prepend(dragging)
                }
                
            }
        })
    })
}

function pegarNovaPosicao(cesta, posY) {
    const frutas = cesta.querySelectorAll(".caixa_fruta:not(.dragging)")
    let result

    for (let cesta_referencia of frutas) {
        const box = cesta_referencia.getBoundingClientRect()
        const boxCenterY = box.y + box.height / 2

        if (posY >= boxCenterY) result = cesta_referencia
    }

    return result
}

function verificarSeConcluiu() {
    const cestasFrutas = document.querySelectorAll(".cesta")
    const paginaJogo = document.querySelector(".pagina_jogo")
    const paginaFinal = document.querySelector(".pagina_final")
    let verificador = 0

    cestasFrutas.forEach((cesta) => {
        verificador += cesta.childNodes.length
    })
    if (verificador == 12) {
        paginaJogo.classList.add("pagina_escondida")
        paginaFinal.classList.remove("pagina_escondida")
    }
}

abrirJogo()
voltarInicio()
aleatorizarFrutas()
movimentarFrutas()
reiniciarJogo()
verificarSeConcluiu()