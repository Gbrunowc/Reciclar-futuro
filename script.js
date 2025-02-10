document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const userList = document.getElementById("userList");
    const pesquisaInput = document.getElementById("pesquisa");
    const limparCamposBtn = document.getElementById("limparCampos");
    const limparListaBtn = document.getElementById("limparLista");

    //carregar usuarios do Storage
    function carregarUsuarios() {
        userList.innerHTML = "";
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.forEach((usuario, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="user-name">${usuario.nome}</span> 
                <span class="user-email">${usuario.email}</span> 
                <span class="user-date">${usuario.data}</span>
                <button class="delete-button" onclick="removerUsuario(${index})">Excluir</button>
            `;
            userList.appendChild(li);
        });
    }

    //adicionar usuario
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        if (nome && email) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            usuarios.push({ nome, email, data: new Date().toLocaleString() });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            nomeInput.value = "";
            emailInput.value = "";
            carregarUsuarios();
        }
    });

    //limpar formulario
    limparCamposBtn.addEventListener("click", () => {
        nomeInput.value = "";
        emailInput.value = "";
    });

    //remover usuario
    window.removerUsuario = (index) => {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        carregarUsuarios();
    };

    //limpar toda a lista
    limparListaBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarios");
        carregarUsuarios();
    });

    //pesquisar usuários
    pesquisaInput.addEventListener("input", () => {
        const termo = pesquisaInput.value.toLowerCase();
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        userList.innerHTML = "";
        usuarios.filter(usuario => 
            usuario.nome.toLowerCase().includes(termo) || usuario.email.toLowerCase().includes(termo)
        ).forEach((usuario, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="user-name">${usuario.nome}</span> 
                <span class="user-email">${usuario.email}</span> 
                <span class="user-date">${usuario.data}</span>
                <button class="delete-button" onclick="removerUsuario(${index})">Excluir</button>
            `;
            userList.appendChild(li);
        });
    });

    //carregar storage ao iniciar
    carregarUsuarios();
});