// Captura o botão com id 'btnCadastrar'
const botao = document.getElementById('btnCadastrar');

// Adiciona um evento de clique ao botão
botao.addEventListener('click', function (){
    // Recupera a lista de usuários do localStorage ou cria um array vazio caso não exista
    const listaUsuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Cria um objeto com os dados do usuário preenchidos nos inputs
    const objUsuario = {
        usuario: document.getElementById('usuario').value, // Pega o valor do input 'usuario'
        senha: document.getElementById('senha').value      // Pega o valor do input 'senha'
    };

    // Captura o valor do campo oculto 'indice', usado para saber se é edição
    let indice = document.getElementById('indice').value;

    if(indice !== ""){
        // Se o campo 'indice' estiver preenchido, é uma edição
        listaUsuariosCadastrados[indice] = objUsuario; // Substitui os dados no índice informado
        document.getElementById('indice').value = "";  // Limpa o campo 'indice' após editar
    } else {
        // Se 'indice' estiver vazio, é um novo cadastro
        listaUsuariosCadastrados.push(objUsuario); // Adiciona o novo usuário ao array
    }

    // Converte a lista de objetos para JSON
    const listaJson = JSON.stringify(listaUsuariosCadastrados);

    // Salva o JSON no localStorage com a chave 'usuarios'
    localStorage.setItem('usuarios', listaJson);

    // Atualiza a tabela exibida na tela
    listar();
});

// Função que lista os usuários na tabela HTML
function listar(){
    // Recupera a lista de usuários do localStorage ou um array vazio se não houver dados
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Pega o corpo da tabela onde os dados serão exibidos
    let tabela = document.getElementById('listaUsuariosCadastrados');
    tabela.innerHTML = ""; // Limpa o conteúdo anterior da tabela

    // Percorre cada usuário da lista
    listaUsuarios.forEach((objeto, index) => {
        let linha = document.createElement('tr'); // Cria uma nova linha na tabela

        // Define o conteúdo HTML da linha com os dados do usuário e botões de editar/remover
        linha.innerHTML = `
            <td>${objeto.usuario}</td>
            <td>${objeto.senha}</td>
            <td>
                <button onclick="editarUsuario(${index})">Editar</button>
                <button onclick="removerUsuario(${index})">Remover</button>
            </td>
        `;

        // Adiciona a linha na tabela
        tabela.appendChild(linha);
    });
}

// Função que remove um usuário da lista
function removerUsuario(index){
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Recupera a lista

    // Confirma com o usuário se deseja realmente excluir
    if(confirm("Você realmente deseja remover o usúario???")){
        listaUsuarios.splice(index, 1); // Remove 1 item a partir do índice
        let listaJson = JSON.stringify(listaUsuarios); // Converte em JSON novamente
        localStorage.setItem("usuarios", listaJson); // Salva no localStorage
        listar(); // Atualiza a tabela
    }
}

// Função que preenche os campos com os dados do usuário para edição
function editarUsuario(index){
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Recupera a lista
    let usuarioEditar = listaUsuarios[index]; // Pega o usuário pelo índice

    // Preenche os campos do formulário com os dados do usuário selecionado
    document.getElementById('usuario').value = usuarioEditar.usuario;
    document.getElementById('senha').value = usuarioEditar.senha;

    // Preenche o campo oculto 'indice' com o índice do usuário, para saber que será editado
    document.getElementById('indice').value = index;
}

// Chama a função listar() ao carregar o script, para exibir os dados salvos anteriormente
listar();
