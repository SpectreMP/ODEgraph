function f(g, y, dy, a, b){
    return b*g - a*y + dy;
}
function rungeKuttaStep(start, a, b, g, dt){
    n = a.length-1;

    result = [];
    while (start.length<n){
        start.push(0);
    }

    y = start[0] + b[n] * g;

    k1 = []; k2 = []; k3 = []; k4 = [];
    for (let i = 1; i<=n; i++){
        k1[i] = dt * f(g, y, i==n? 0: start[i], a[n-i], b[n-i]);
    };
    for (let i = 1; i<=n; i++){
        k2[i] = dt * f(g, y + k1[1]/2, i==n? 0: start[i] + k1[i+1] / 2, a[n-i], b[n-i]);
    };
    for (let i = 1; i<=n; i++){
        k3[i] = dt * f(g, y + k2[1]/2, i==n? 0: start[i] + k2[i+1] / 2, a[n-i], b[n-i]);
    };
    for (let i = 1; i<=n; i++){
        k4[i] = dt * f(g, y + k3[1], i==n? 0: start[i] + k3[i+1], a[n-i], b[n-i]);  
    };
    for (let i = 1; i<=n; i++){
        result.push(start[i-1]+(1/6)*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]));
    };
    return result;
}

function main(){
    var t = 0;
    var L = Number(document.getElementById("L").value);
    var dt= Number(document.getElementById("dt").value);
    var k = Number(document.getElementById("k").value);
    var koc = Number(document.getElementById("koc").value);
    eval(document.getElementById("variables").value);

    
    //a_n * d^n y/dt^n + a_n-1 * d^n-1 y/dt^n-1 + ... + a_1 * dy/dt + a_0 * y = b_n * d^n g/dt^n + ... + b_0 * g
    //a = [1/(T2*T2), T1/(T2*T2), 1];
    //b = [k/(T2*T2), 0, 0];
    a=[];
    b=[];
    correction = 0;

    inputs = document.querySelectorAll(".input-item>input")
    outputs = document.querySelectorAll(".output-item>input")

    for (let i = 0; i<outputs.length; i++){
        a[i] = eval(outputs[i].value)
        if (i==outputs.length - 1){
            outputs[i].value = 1;
            outputs[i].setAttribute("disabled", true);
        }
    }
    y = Array(a.length - 1).fill(0);

    for (let i = 0; i<inputs.length; i++){
        b[i] = eval(inputs[i].value)
    }

    A = new Array(['t', 'Переходная функция', 'Производная']);

    var i = 1;
    while (t < L) {
        dy = y[0];

        y = rungeKuttaStep(y, a, b, 1-correction, dt);
        
        dy = y[0] - dy;

        A[i] = [t, y[0], dy/dt];


        correction = (dy/dt)*koc;
        t += dt;
        i++;
    }
    
    var data = google.visualization.arrayToDataTable(A);
    var options = {
        // title: '',
        curveType: 'function',
        hAxis: {
        title: 't'
    },
    vAxis: {
        title: 'y'
    },
    legend: { 
        position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart2'));
    chart.draw(data, options);
}