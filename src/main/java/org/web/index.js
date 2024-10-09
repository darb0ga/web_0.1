const results = document.getElementById('results');


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

    console.log('jjjj');
    const form = document.querySelector('#table');

    let askForm = new FormData(form);

    //форма принимается адекватно


    // Преобразуем данные формы в строку запроса
    //const queryString = new URLSearchParams(askForm).toString();

    // Отправляем данные на сервер с помощью fetch
    fetch('/fcgi-bin/web.jar?' + new URLSearchParams(askForm).toString() ) //авот здесь уже конкретнве проблемы идут у меня с башкой
        .then(response => {
            // Проверяем, успешно ли выполнен запрос
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            }
            return response.text(); // или response.json() для JSON-ответа
        })
        .then(data => {
            // Обрабатываем данные, полученные от сервера
            console.log(data);
        })
        .catch(error => {
            // Обрабатываем ошибки
            console.error('Ошибка:', error);
        });


    var startedTime = new Date().getMilliseconds();
    var xValue = document.querySelector('#x').value; // не берется данные от х
    var yValue = document.querySelector('#y').value;
    var checkboxes = document.querySelectorAll('input[class="r"]:checked');
    var r_values = [];
    checkboxes.forEach((el) => {
        r_values.push(el.name);
    })

    var errorText = validate(xValue, yValue, r_values);
    console.log(errorText);

    if (!errorText) {

        var table = results.querySelectorAll('.results');
        console.log(xValue)
        addRow(xValue, yValue, r_values, response);
    } else {
        console.log(errorText);
        //неверные данные
        //просьба передеоать данные
    }

    //return [x.value, y.value, r_values];
}

async function addRow(x, y, r, response) {

    if (response.ok) {
        const result = await response.json();
        const finish = new Date(result.now).toLocaleString();
        results.execTime = finish + 'ns';
        results.result = result.result.toString();
    } else if (response.status === 400) {
        const result = await response.json();
        results.execTime = "N/A";
        results.result = `error:  400`;
    } else {
        results.time = "N/A";
        results.result = "error"
    }

    console.log(results);
    console.log(results.result.toString())

    var table = document.getElementById("results");
    var rowCount = table.rows.length;
    var newRow = table.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var element1 = document.createElement("output");
    element1.value = x;
    cell1.appendChild(element1);

    var cell2 = newRow.insertCell(1);
    var element2 = document.createElement("output");
    element2.value = y;
    cell2.appendChild(element2);

    var cell3 = newRow.insertCell(2);
    var element3 = document.createElement("output");
    element3.value = r;
    cell3.appendChild(element3);

    var cell4 = newRow.insertCell(3);
    var element4 = document.createElement("output");
    element4.value = results.result;

    element4.value = "";
    cell4.appendChild(element4);

    var cell5 = newRow.insertCell(4);
    var element5 = document.createElement("output");
    element5.value = results.time;
    cell5.appendChild(element5);
}