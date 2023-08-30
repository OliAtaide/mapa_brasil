
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

$.ajax({
    url: 'scripts/data.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {

        regioes.forEach(regiao => {

            const filtered = _data.filter(item => item["Região"] === regiao)

            var cards = '';

            for (var property in filtered[0]) {
                var sum = filtered.reduce((accumulator, currentValue) => accumulator + currentValue[property], 0);

                if (sum && Number.isInteger(sum)) {
                    cards +=
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
                }
            }

            $('.map').prepend(
                `
                        <div class="card map-card" id="map${regiao}" style="display: none;">
                            <div class="card-title d-flex card-header">
                                <h3>
                                    ${regiao}
                                    </h3>
                                <a href="regioes/${regiao}.html" type="button" class="btn border ms-auto">
                                    <i class="bi bi-eye"></i>Ver detalhes
                                </a>
                            </div>
                            <div class="card-subheader mx-3">
                            
                                <div class="d-flex align-items-center">
                                    <h5>
                                        Itens doados
                                    </h5>
                                    <h3 class="ms-auto">172.288.478</h3>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="border botoes">
                                    <div class="row">
                                        <div class="col">
                                            <button type="button" class="btn bg-black text-white w-100">
                                                Eletrônicos
                                            </button>
                                        </div>
                                        <div class="col">
                                            <button type="button" class="btn border w-100">
                                                Laboratoriais
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row row-data">
                                    ${cards}
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