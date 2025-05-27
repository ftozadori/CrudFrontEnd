//para fazer o cadastro
const botao = document.getElementById('btnCadastrar');
const listaUsuariosCadastrados = [];

// cadastrar
botao.addEventListener('click', function (){
    const objUsuario = {
        usuario: document.getElementById('usuario').value(),
        senha: document.getElementById('senha').value
    };
    listaUsuariosCadastrados.push(objUsuario);
    const listaJson = JSON.stringify
    (listaUsuariosCadastrados);
    localStorage.setItem('usuarios', listaJson);
    listar();
}

);

//listar
function listar(){
    const listadeUsuarios = localStorage.JSON.parse(getItem("usuarios")) || [];
    let tabela = document.getElementById('listaUsuarioCadastrados');
    linha.innerHTML = "";
    listadeUsuarios.forEach((objeto, index) => {
        let linha = document.getElementById('tr');
        linha.innerHTML = `
            <td>${objeto.usuario}</td>
            <td>${objeto.senha}</td>
            <td>
                <button>Editar</button>
                <button>Remover</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

listar();
