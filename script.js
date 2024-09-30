// Selecionando os elementos do formulário e da tabela
const formulario = document.querySelector("#formulario-participante");
const nome = document.querySelector("#nomeCompleto");
const comunidade = document.querySelector("#comunidade");
const contato = document.querySelector("#contato");
const tabelaBody = document.querySelector("#tabela-participantes");

let editandoId = null; // Variável para armazenar o ID do participante sendo editado

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
      tabelaBody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

      // Adiciona cada participante na tabela
      data.forEach((participant, index) => {
        let row = `<tr>
                    <td>${index + 1}</td>
                    <td>${participant.name}</td>
                    <td>${participant.church}</td>
                    <td>${participant.cellphone}</td>
                    <td>
                      <a href="#" class="btn btn-info btn-sm" onclick="editarParticipante(${
                        participant.id
                      })">Editar</a>
                      <button class="btn btn-danger btn-sm" onclick="excluirParticipante(${
                        participant.id
                      })">Excluir</button>
                    </td>
                  </tr>`;
        tabelaBody.innerHTML += row;
      });
    })
    .catch((error) => {
      console.log("Erro ao carregar participantes: ", error);
    });
}

// Função para cadastrar ou atualizar um participante
function salvarParticipante(event) {
  event.preventDefault();

  const url = editandoId
    ? `http://localhost:8080/api/person/${editandoId}`
    : "http://localhost:8080/api/person";

  const method = editandoId ? "PUT" : "POST";

  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify({
      name: nome.value,
      church: comunidade.value,
      cellphone: contato.value,
    }),
  })
    .then((res) => {
      console.log(res);
      carregarParticipantes(); // Atualiza a tabela após salvar
      limparFormulario(); // Limpa o formulário
    })
    .catch((res) => {
      console.log(res);
    });
}

// Função para editar um participante
function editarParticipante(id) {
  fetch(`http://localhost:8080/api/person/${id}`, {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      nome.value = data.name;
      comunidade.value = data.church;
      contato.value = data.cellphone;
      editandoId = id; // Armazena o ID do participante sendo editado
    })
    .catch((error) => {
      console.log("Erro ao carregar dados do participante: ", error);
    });
}

// Função para excluir um participante
function excluirParticipante(id) {
  fetch(`http://localhost:8080/api/person/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log("Participante excluído com sucesso!");
      carregarParticipantes(); // Atualiza a tabela após a exclusão
    })
    .catch((res) => {
      console.log("Erro ao excluir participante: ", res);
    });
}

// Função para limpar o formulário
function limparFormulario() {
  nome.value = "";
  comunidade.value = "";
  contato.value = "";
  editandoId = null; // Reseta o ID do participante após edição
}

// Adiciona evento de submissão ao formulário
formulario.addEventListener("submit", salvarParticipante);

// Carrega os participantes ao abrir a página
document.addEventListener("DOMContentLoaded", carregarParticipantes);
