const containerCards = document.getElementById('cards')
const button = document.getElementById('criarTarefas')
const btnDelete = document.getElementById('excluirTarefas')
const btnEdit = document.getElementById('modificarTarefas')

//console.log(localStorage.getItem("id"))

async function getTarefas() {

    let url = 'http://localhost:5080/tarefas'

    const responseTarefas = await fetch(url)
    const listTarefas = await responseTarefas.json()

    listTarefas.forEach((tarefa) => {

        if (localStorage.getItem("id") == tarefa.idUsuario) {

            const container = document.createElement('div');
            container.className = 'card';

            console.log(tarefa.descrição)
            container.innerHTML = 

            `
                <h2>${tarefa.descrição}</h2>
                <p>${tarefa.dataConclusão}</p>
                <p class="id">ID: ${tarefa.id}</p>
            `
            
            containerCards.appendChild(container)

        }
    })
}

window.onload = () => {

    getTarefas()

}

async function modificarTarefas() {

    const id = prompt('Digite o ID da tarefa que você deseja editar')
    const descrição = prompt('Digite o novo título da tarefa')
    const dataConclusão = prompt('Digite a nova data de conclusão da tarefa')
    const idUsuario = localStorage.getItem("id")

    const tarefaAtualizada = {
        
        descrição,
        dataConclusão,
        idUsuario

    }

    const url = `http://localhost:5080/tarefas/${id}`

    const options = {

        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefaAtualizada)

    }

    await fetch(url, options)
    window.location.reload()

}

async function criarTarefas() {

    const descrição = prompt('Digite o título da tarefa')
    const dataConclusão = prompt('Digite quando a tarefa foi finalizada')
    const idUsuario = localStorage.getItem("id")

    const newTarefa = {

        descrição,
        dataConclusão,
        idUsuario

    }

    const url = 'http://localhost:5080/tarefas'

    const options = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTarefa)

    }
    
    await fetch(url, options)
    window.location.reload()

}

async function excluirTarefas() {

    const id = prompt('Digite o ID da tarefa que você deseja deletar')
    const url = `http://localhost:5080/tarefas/${id}`

    const options = {

        method:'DELETE'

    }

    await fetch(url, options)
    window.location.reload()

}

button.addEventListener('click', criarTarefas)
btnDelete.addEventListener('click', excluirTarefas)
btnEdit.addEventListener('click', modificarTarefas)