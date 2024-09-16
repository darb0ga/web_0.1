const results = document.getElementById("results");

const date = new Date();

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
    const startedTime = date.getTime();
    var x = document.querySelector(".x");
    var y = document.querySelector(".y")
    var checkboxes = document.querySelectorAll('input[class="r"]:checked');
    var r_values = [];
    checkboxes.forEach((el) => {
        r_values.push(el.name);
    })
    var errorText = validate(x.value, y.value, r_values);
    if(!errorText){
         //все хорошо продолжаем работу
        // время ответа?
        // заполнить форму с резами
    }else{
        //неверные данные
        //просьба передеоать данные
    }

    return [x.value, y.value, r_values];
}