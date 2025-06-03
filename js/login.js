//para fazer login
const entrar = document.getElementById('entrar');

entrar.addEventListener('click', 
    function (){
        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios'));

        let login = document.getElementById('usuario');
        let senha = document.getElementById('senha');

        let valido = usuariosCadastrados.find(
            //function ()
            // () => {}
            user => user.usuario === login && user.senha === senha
        );
    }
);