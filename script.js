const formulario = document.querySelector("form");
const nome = document.querySelector("#nomeCompleto");
const comunidade = document.querySelector("#comunidade");
const tabelaBody = document.querySelector("tbody");

// Função para carregar e exibir os participantes na tabela
function carregarParticipantes() {
  fetch("http://localhost:8080/api/person", {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json()) // Converte a resposta em JSON
    .then((data) => {
      // Limpa a tabela antes de adicionar novos dados
      tabelaBody.innerHTML = "";

      // Adiciona cada participante na tabela
      data.forEach((participant, index) => {
        let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${participant.name}</td>
                    <td>${participant.church}</td>
                    <td>
                      <a href="#" class="btn btn-info btn-sm">Editar</a>
                      <button class="btn btn-danger btn-sm">Excluir</button>
                    </td>
                  </tr>`;
        tabelaBody.innerHTML += row; // Adiciona a linha na tabela
      });
    })
    .catch((error) => {
      console.log("Erro ao carregar participantes: ", error);
    });
}

function cadastrar() {
  fetch("http://localhost:8080/api/person", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: nome.value,
      church: comunidade.value,
    }),
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (res) {
      console.log(res);
    });
}

function limpar() {
  (nome.value = ""), (comunidade.value = "");
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  cadastrar();
  limpar();
});

// Carregar os participantes ao abrir a página
document.addEventListener("DOMContentLoaded", carregarParticipantes);
