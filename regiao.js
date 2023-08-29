let estados = [
    {
        sigla: "AM",
        nome: "Amazonas"
    },
    {
        sigla: "AC",
        nome: "Acre",
    },
    {
        sigla: "AP",
        nome: "Amapá"
    },
    {
        sigla: "PA",
        nome: "Pará"
    },
    {
        sigla: "RR",
        nome: "Roraima"
    },
    {
        sigla: "RO",
        nome: "Rondônia"
    },
    {
        sigla: "TO",
        nome: "Tocantins"
    }
]

let regioes = [
    'Nordeste', 'Norte', 'Centro-Oeste', 'Sul', 'Sudeste'
]

$.ajax({
    url: 'data.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {
        const filtered = _data.filter(item => item["Região"] === 'Norte')

        estados.forEach(e => {
            var rows = '';

            const equip = filtered.filter(item => item["Estado - UF"] === e.sigla)

            equip.forEach(q => {
                for (var property in q) {
                    if (q[property] != 0 && Number.isInteger(q[property])) {
                        rows += `
                            <tr>
                                <td>${property}</td>
                                <td>${q['Projeto']}</td>
                                <td>${q[property]}</td>
                                <td>
                                    ${q['Local de Entrega']}
                                </td>
                                <td>
                                    <div class="btn btn-download">
                                        <i class="bi bi-download"></i>
                                    </div>
                                </td>
                            </tr>
                        `
                    }

                }
            });

            $('.accordion').append(
                `
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${e.sigla}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse${e.sigla}" aria-expanded="false" aria-controls="collapse${e.sigla}">
                                    ${e.nome}
                                </button>
                            </h2>
                            <div id="collapse${e.sigla}" class="accordion-collapse collapse" aria-labelledby="${e.sigla}"
                                data-bs-parent="#accordion${e.sigla}">
                                <div class="accordion-body px-0">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Equipamentos</th>
                                                <th>Projeto</th>
                                                <th>Número</th>
                                                <th>Local de Entrega</th>
                                                <th>Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${rows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                `
            )
        });
    }
})