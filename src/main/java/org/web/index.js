const results = document.getElementById("results");


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

async function onSubmit() {
    var startedTime = new Date().getMilliseconds();
    var x = document.querySelector(".x");
    var y = document.querySelector(".y")
    var checkboxes = document.querySelectorAll('input[class="r"]:checked');
    var r_values = [];
    checkboxes.forEach((el) => {
        r_values.push(el.name);
    })
    var errorText = validate(x.value, y.value, r_values);
    console.log(errorText);
    if(!errorText){
        var table = results.querySelectorAll('.results');
        console.log(r_values[0]);
        addRow(x.value, y.value, r_values[0], startedTime);
         //все хорошо продолжаем работу
        // время ответа?
    }else{
        //неверные данные
        //просьба передеоать данные
    }

    return [x.value, y.value, r_values];
}

function addRow(x, y, r, time){
    var table = document.getElementById("results");
    var rowCount = table.rows.length;
    var newRow = table.insertRow(rowCount-1);

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
    element4.value = "yes";
    //тут обращение к серверу для подсчета
    cell4.appendChild(element4);

    var cell5 = newRow.insertCell(4);
    var element5 = document.createElement("output");
    element5.value = (new Date().getMilliseconds() - time).toString() + 'ms';
    cell5.appendChild(element5);


}