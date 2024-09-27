const formulario = document.querySelector("form");
const nome = document.querySelector("#nomeCompleto");
const comunidade = document.querySelector("#comunidade");

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
