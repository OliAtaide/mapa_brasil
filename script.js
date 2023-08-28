
$.ajax({
    url: 'placeholder.json',
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
    url: 'data.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {
        console.log(_data);

        regioes.forEach(regiao => {

            const filtered = _data.filter(item => item["Região"] === regiao)
            console.log(filtered);

            var cards = '';

            for (var property in filtered[0]) {
                var sum = filtered.reduce((accumulator, currentValue) => accumulator + currentValue[property], 0);

                if (sum && Number.isInteger(sum)) {
                    console.log(property + ': ' + sum)
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

            $('.container').append(
                `
                <div class="map" id="map">
                        <div class="card map-card">
                            <div class="card-title d-flex card-header">
                                <h3>
                                    ${regiao}
                                <button type="button" class="btn border ms-auto">
                                    <i class="bi bi-eye"></i>Ver detalhes
                                </button>
                            </div>
                            <div class="card-body">
    
                                <div class="d-flex align-items-center">
                                    <h5>
                                        Itens doados
                                    </h5>
                                    <h3 class="ms-auto">172.288.478</h3>
                                </div>
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
    url: './map.json',
    dataType: "json",
    type: 'GET',
    success: function (_data) {
        console.log(_data[0]);
        var options = {
            type: 'map',
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
                    point: {
                        events: {
                            select: function () {
                                this.update({
                                    color: this.borderColor,
                                    borderColor: 'white',
                                });
                                console.log(this)
                            },
                            unselect: function () {
                                this.update({
                                    color: '#f9f9f9',
                                });
                                console.log(this)
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
        console.log(error);
        alert(" Can't do because: " + error);
    },
})