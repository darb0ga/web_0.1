const results = document.getElementById("results");
const data = new FormData(this);

function validate(data) {
    if (!data.x){
        return "x is not defined";
    }

    if (isNaN(data.x)){
        return "x must be a number";
    }

    if(parseInt(data.x) > 3 || parseInt(data.x) < -5){
        return "x must be in [-5; 3]";
    }

    if(!data.r){
        return "choose r, please";
    }

    return null;
}

function check(data) {
    var x = parseInt(data.x);
    var y = parseInt(data.y);
    var r = parseInt(data.r);

    if(x>=0 && x<=r){
        if(y<=0&&y>=(r/2)){
            return true;
        }
        if(y>0){

        }
    }


}

function getValue(){
    var x = document.getElementById("x");

}
