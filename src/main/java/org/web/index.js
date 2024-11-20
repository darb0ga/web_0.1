function validate(x, y, r) {
    if (!x) {
        return "x is not defined";
    }

    if (isNaN(x)) {
        return "x must be a number";
    }

    if (parseInt(x) > 3 || parseInt(x) < -5) {
        return "x must be in [-5; 3]";
    }
    if (r.length < 1) {
        return "r is not defined";
    }

    if (!y) {
        return "y is not defined";
    }

    if (r.length > 1) {
        return "choose one value of r";
    }

    return null;
}

function onSubmit() {
    const form = document.querySelector('#table');
    let askForm = new FormData(form);

    let sending = validate(askForm.get('x'), askForm.get('y'), askForm.getAll('r'));
    const queryString = new URLSearchParams(askForm).toString();
    if (!sending) {

        fetch('/fcgi-bin/web.jar?' + queryString, {method: "GET"})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                const responseData = JSON.parse(data);

                if (responseData.code === "200") {
                    addRow(responseData.x, responseData.y, responseData.r, responseData.result, responseData.time, responseData.scriptTime);
                    localStorage.setItem('savedLastTries', JSON.stringify(tableToJson(document.getElementById('results'))));
                } else {
                    console.error("Ошибка:", responseData.result);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    } else {
        alert(sending);
    }
}

async function addRow(x, y, r, result, time, scriptTime) {
    let table = document.getElementById("results");
    let newRow = table.insertRow(-1);

    let cell1 = newRow.insertCell(0);
    cell1.textContent = x;

    let cell2 = newRow.insertCell(1);
    cell2.textContent = y;

    let cell3 = newRow.insertCell(2);
    cell3.textContent = r;

    let cell4 = newRow.insertCell(3);
    cell4.textContent = result;

    let cell5 = newRow.insertCell(4);
    cell5.textContent = time;

    let cell6 = newRow.insertCell(5);
    cell6.textContent = scriptTime;

}

window.addEventListener('load', loadData());

function loadData() {
    let savedMas = JSON.parse(localStorage.getItem('savedLastTries'));
    if (savedMas) {

        let lastTries = document.getElementById('results');
        for (let i = 0; i < savedMas.length; i++) {
            const newRow = lastTries.insertRow(-1);
            const resCell = newRow.insertCell(0)
            const xCell = newRow.insertCell(1);
            const yCell = newRow.insertCell(2);
            const rCell = newRow.insertCell(3);
            const timeCell = newRow.insertCell(4);
            const scriptCell = newRow.insertCell(5);

            resCell.textContent = savedMas[i][0];
            xCell.textContent = savedMas[i][1];
            yCell.textContent = savedMas[i][2];
            rCell.textContent = savedMas[i][3];
            timeCell.textContent = savedMas[i][4];
            scriptCell.textContent = savedMas[i][5];
        }
        return null;
    }
}


function tableToJson(table) {
    let data = [];
    for (let i = 1; i < table.rows.length; i++) {
        let tableRow = table.rows[i];
        let rowData = [];
        for (let j = 0; j < tableRow.cells.length; j++) {
            rowData.push(tableRow.cells[j].innerHTML);
        }
        data.push(rowData);
    }
    return data;
}

function clean(){
    localStorage.clear();
    const table = document.getElementById('results');
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function checkBox(selectedCheckbox){
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(checkbox => {
        if (checkbox !== selectedCheckbox) {
            checkbox.checked = false; // Снимаем отметку у остальных
        }
    });

}
