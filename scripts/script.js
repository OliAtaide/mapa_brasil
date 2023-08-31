
$.ajax({
    url: 'scripts/placeholder.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {
        _data.forEach(dt => {

            $('.row-data').append(
                `
                            <div class="col mt-4">
                                <div class="card data-card">
                                    <div class="card-body py-1">
                                        <h3 class="card-title">
                                            ${dt.valor}
                                        </h3>
                                        <p class="card-text">
                                            ${dt.texto}
                                        </p>
                                    </div>
                                </div>
                            </div>
                `
            )
        });
    }
})

let regioes = [
    'Nordeste', 'Norte', 'Centro-Oeste', 'Sul', 'Sudeste'
]

let equipamentos = {
    "Webcam": 0,
    "Tablet": 0,
    "TV 65\" Smart": 0,
    "Computadores": 0,
    "Monitor Extra": 0,
    "Headset": 0,
    "Condicionador de Energia": 0,
    "Microfone Omnidirecional": 0,
    "Rack de Parede 8U": 0,
    "Switch 24 portas": 0,
    "Telefone VOIP": 0,
    "Ar condicionado 12000 BTUS": 0,
    "Ar condicionado 22000 BTUS": 0,
    "Micropipeta 8 canais": 1,
    "Micropipeta Monocanal": 1,
    "Microsc\u00f3pio \u00d3ptico": 1,
    "Cadeira Grirat\u00f3ria": 0,
    "Cabine Biol\u00f3gica": 1,
    "Freezer -30\u00b0C": 1,
    "C\u00e2mara de Vacina": 1,
    "PCR em Tempo Real": 1,
    "Termociclador": 1,
    "Ultra Freezer -86\u00b0C": 1,
    "NoBreak": 1,
    "Banho Maria": 1,
    "V\u00f3rtex": 1,
    "Sistema de Eletroforese": 1,
    "Sistema de Fotodocumenta\u00e7\u00e3o": 1
}

$.ajax({
    url: 'scripts/data.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {

        regioes.forEach(regiao => {

            const filtered = _data.filter(item => item["Região"] === regiao)

            var cards = '';

            var elts = '', labs = '';

            var total = 0;

            for (var property in filtered[0]) {
                var sum = filtered.reduce((accumulator, currentValue) => accumulator + currentValue[property], 0);

                

                if (sum && Number.isInteger(sum)) {
                    console.log(property, equipamentos[property])

                    total += sum;
                    var card =
                        `
                                    <div class="col mt-4">
                                        <div class="card data-card">
                                            <div class="card-body py-1">
                                                <h3 class="card-title">
                                                    ${sum}
                                                </h3>
                                                <p class="card-text">
                                                    ${property}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                        `;

                    if(!equipamentos[property]){
                        elts += card
                    }
                    else{
                        labs += card
                    }
                }
            }

            $('.map').prepend(
                `
                        <div class="card map-card py-3" id="map${regiao}" style="display: none;">
                            <div class="card-title d-flex card-header">
                                <h3>
                                    ${regiao}
                                    </h3>
                                <button onclick="location.href='regioes/${regiao}.html';" class="btn border ms-auto">
                                    <i class="bi bi-eye"></i>Ver detalhes
                                </button>
                            </div>
                            <div class="card-subheader mx-3">
                            
                                <div class="d-flex align-items-center">
                                    <h5>
                                        Itens doados
                                    </h5>
                                    <h3 class="ms-auto">${total}</h3>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="border botoes">
                                    <nav class="nav nav-tabs flex-row gap-3" id="myTab" role="tablist">

                                        <a class="flex-sm-fill text-center nav-link active btn" id="home-tab"
                                            data-bs-toggle="tab" data-bs-target="#elet-tab-${regiao}" type="button" role="tab"
                                            aria-controls="elet-tab-${regiao}" aria-selected="true">
                                            Eletrônicos
                                        </a>

                                        <a class="flex-sm-fill text-center nav-link btn" id="profile-tab"
                                            data-bs-toggle="tab" data-bs-target="#lab-tab-${regiao}" type="button" role="tab"
                                            aria-controls="lab-tab-${regiao}" aria-selected="false">
                                            Laboratoriais
                                        </a>

                                    </nav>
                                </div>
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="elet-tab-${regiao}" role="tabpanel"
                                        aria-labelledby="home-tab" tabindex="0">
                                        <div class="row row-data">
                                        ${elts}
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="lab-tab-${regiao}" role="tabpanel"
                                        aria-labelledby="profile-tab" tabindex="0">
                                        <div class="row row-data">
                                        ${labs}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                `
            )

        });




    }
})

function unselectByClick() {
    const points = this.getSelectedPoints();
    if (points.length > 0) {
        points.forEach(point => point.select(false));
    }
}

var currentColor;

$.ajax({
    url: 'scripts/map.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {
        var options = {
            type: 'map',
            exporting: { enabled: false },
            title: {
                text: ''
            },
            chart: {
                events: {
                    click: unselectByClick,
                },
            },

            plotOptions: {
                series: {
                    allowPointSelect: true,
                    dataLabels: {
                        enabled: true,
                        color: '#FFFFFF',
                        format: '0{(add y 1)}',
                        padding: 10,
                        borderColor: 'white',
                        borderRadius: '50%',
                        borderWidth: 2,
                        align: 'center',
                        useHTML: true,
                        style: {
                            textOutline: 'none',
                            fontSize: 20,
                            fontWeight: 600,
                            lineHeight: 1
                        },
                    },
                    point: {
                        label: {
                            backgroundColor: 'black'
                        },
                        events: {
                            select: function () {
                                this.update({
                                    color: this.borderColor,
                                    borderColor: 'white',
                                });
                                $('.map-card').hide();
                                $('#map' + this.name).show();
                            },
                            unselect: function () {
                                this.update({
                                    color: '#f9f9f9',
                                });
                            },
                            mouseOver: function () {
                                if (!this.selected) {
                                    this.update({
                                        color: this.borderColor + '80',
                                    });
                                }
                            },
                            mouseOut: function () {
                                if (!this.selected) {
                                    this.update({
                                        color: '#f9f9f9',
                                    });
                                }
                            }
                        },
                    },
                    states: {
                        select: {
                            color: this.borderColor,
                            borderColor: 'white'
                        },
                    }
                },
            },
            series: _data,
        };
        Highcharts.mapChart('mapField', options);

    },
    error: function (request, error) {
        alert(" Can't do because: " + error);
    },
})