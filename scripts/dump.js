for (var property in equip[0]) {
    var sum = equip.reduce((accumulator, currentValue) => accumulator + currentValue[property], 0);

    if (sum != 0 && Number.isInteger(sum)) {
        rows += `
            <tr>
                <td>${property}</td>
                <td></td>
                <td>${sum}</td>
                <td>
                    
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