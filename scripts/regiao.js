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

let estados2 = {
    'Norte': [
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
    ],
    'Nordeste': [
        {
            sigla: "AL",
            nome: "Alagoas"
        },
        {
            sigla: "BA",
            nome: "Bahia"
        },
        {
            sigla: "CE",
            nome: "Ceará"
        },
        {
            sigla: "MA",
            nome: "Maranhão"
        },
        {
            sigla: "PB",
            nome: "Paraíba"
        },
        {
            sigla: "PE",
            nome: "Pernambuco"
        },
        {
            sigla: "PI",
            nome: "Piauí"
        },
        {
            sigla: "RN",
            nome: "Rio Grande do Norte"
        },
        {
            sigla: "SE",
            nome: "Sergipe"
        }
    ],
    'Centro-Oeste': [
        {
            sigla: "MT",
            nome: "Mato Grosso"
        },
        {
            sigla: "MS",
            nome: "Mato Grosso do Sul"
        }, ,
        {
            sigla: "GO",
            nome: "Goiás"
        },
    ],
    'Sudeste': [
        {
            sigla: "MG",
            nome: "Minas Gerais"
        },
        {
            sigla: "ES",
            nome: "Espirito Santo"
        },
        {
            sigla: "SP",
            nome: "São Paulo"
        },
        {
            sigla: "RJ",
            nome: "Rio de Janeiro"
        }
    ],
    'Sul': [
        {
            sigla: "PR",
            nome: "Paraná"
        },
        {
            sigla: "SC",
            nome: "Santa Catarina"
        },
        {
            sigla: "RS",
            nome: "Rio Grande do Sul"
        }
    ]
}

let regioes = [
    'Nordeste', 'Norte', 'Centro Oeste', 'Sul', 'Sudeste'
]



function getEquip(regiao) {
    $('.card-header .card-title').html(
        regiao
    );

    $.ajax({
        url: '../scripts/data.json',
        dataType: "json",
        type: 'GET',
        success: function (_data) {
            const filtered = _data.filter(item => item["Região"] === regiao)

            estados2[regiao].forEach(e => {
                var rows = '';

                const equip = filtered.filter(item => item["Estado - UF"] === e.sigla)

                console.log(equip)

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
}

$('.btn-voltar').click(
    function () {
        window.location.href = "../index.html"
    }
)