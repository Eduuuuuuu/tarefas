async function validarLogin() {

    const nome = document.getElementById('nome').value
    const senha = document.getElementById('senha').value

    console.log(nome)

    if (nome == '' || senha == '') {
        alert('Todos os campos são obrigatórios.')
        return false
    }

    try{
        const users = await fetch('http://localhost:8080/usuario')

        const listUsers = await users.json()

        let validaUsuario = false

        listUsers.forEach((user) => {
            if (nome === user.nome && senha === user.senha) {

                alert('Usuário encontrado com sucesso, redirecionando para a página de tarefas.')

                localStorage.setItem("id",user.id)
                localStorage.setItem("nome",user.nome)
                localStorage.setItem("premium",user.premium)

                window.location.href = './home/home.html'
                validaUsuario = true
            }
        }) 

        if (!validaUsuario) {
            alert('ERRO: Usuário não encontrado.')
        }
        
    }catch(error) {
        alert('ERRO: Não foi possível acessar a API')
        console.error(error)
    }
}