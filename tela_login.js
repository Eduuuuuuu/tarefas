async function validarLogin() {

    const nome = document.getElementById('nome').value
    const senha = document.getElementById('senha').value

    if (nome  == 'João da Silva')
        localStorage.setItem("id", 1)

    else if (nome == 'Maria Salvagni')
        localStorage.setItem("id", 2)

    else if (nome == 'Gabriel Pereira')
        localStorage.setItem("id", 3)

    console.log(nome)

    if (nome == '' || senha == '') {

        alert('Todos os campos são obrigatórios.')
        return false

    }

    try{
        const users = await fetch('http://localhost:5080/usuario')

        const listUsers = await users.json()

        let validaUsuario = false

        listUsers.forEach((user) => {

            if (nome === user.nome && senha === user.senha) {

                alert('Usuário encontrado com sucesso!')
                window.location.href = '../home/home.html'
                validaUsuario = true

            }
        }) 

        if (!validaUsuario) {

            alert('Usuário não encontrado.')

        }

    }catch(error){

        alert('Erro ao acessar a API')
        console.error(error)

    }
}