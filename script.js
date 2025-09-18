document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("textinput");
  const resultados = document.getElementById("resultados");
  const detalhes = document.getElementById("detalhes-carro");
  const detalhesConteudo = document.getElementById("detalhes-conteudo");
  const fecharDetalhes = document.getElementById("fechar-detalhes");

  let carros = [];

  // Carregar o JSON
  fetch('cars.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erro ao carregar carros.json: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      carros = data;
      console.log("Dados carregados:", carros);
    })
    .catch(error => {
      console.error("Erro ao carregar o arquivo carros.json:", error);
    });

  // Função de busca
  function buscarCarros(termo) {
    resultados.innerHTML = "";

    if (termo === "") return;

    const filtrados = carros.filter(carro =>
      carro.modelo.toLowerCase().includes(termo) ||
      carro.marca.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
      resultados.innerHTML = "<li>Nenhum carro encontrado.</li>";
    } else {
      filtrados.forEach(carro => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${carro.modelo}</strong> (${carro.ano})<br>
          Combustível: ${carro.combustivel}<br>
          País de origem: ${carro.pais_origem}<br>
        `;
        li.addEventListener("click", () => mostrarDetalhes(carro));
        resultados.appendChild(li);
      });
    }
  }

  // Mostrar detalhes do carro
  function mostrarDetalhes(carro) {
    detalhesConteudo.innerHTML = `
      <h3>${carro.marca} ${carro.modelo}</h3>
      <h4><strong>Ano:</strong> ${carro.ano}</h4>
      <h4><strong>Combustível:</strong> ${carro.combustivel}</h4>
      <h4><strong>País de origem:</strong> ${carro.pais_origem}</h4>
      <h4><strong>Detalhes:</strong> ${carro.detalhes || "Sem detalhes disponíveis."}</h4>
      ${carro.imagem ? `<img src="${carro.imagem}" alt="${carro.modelo}" style="max-width: 100%; height: auto;">` : ""}
    `;
    detalhes.style.display = "block";
  }

  fecharDetalhes.addEventListener("click", () => {
    detalhes.style.display = "none";
  });

  input.addEventListener("input", () => {
    const termo = input.value.trim().toLowerCase();
    buscarCarros(termo);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const termo = input.value.toLowerCase().trim();
      buscarCarros(termo);
    }
  });
});
