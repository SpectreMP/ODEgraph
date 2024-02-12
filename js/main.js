function calculateNextStep(start, a, b, g, dt){
    n = start.length;
    start.push(0);

    result = [];
    y = start[0] + b[n] * g;

    k1 = []; k2 = []; k3 = []; k4 = [];
    for (let i = 1; i<=n; i++){
        k1[i] = dt * (b[n-i] * g - a[n-i] * y + start[i]);
        k2[i] = dt * (b[n-i] * g - a[n-i] * (y+k1[i]/2) + start[i]);
        k3[i] = dt * (b[n-i] * g - a[n-i] * (y+k2[i]/2) + start[i]);
        k4[i] = dt * (b[n-i] * g - a[n-i] * (y+k3[i]) + start[i]);
        
        result.push(start[i-1]+(1/6)*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]))
    }
    
    return result;
}

function main(){
    var t = 0;
    var L = Number(document.getElementById("L").value);
    var dt= Number(document.getElementById("dt").value);
    var k = Number(document.getElementById("k").value);
    eval(document.getElementById("variables").value);

    y = [0,0];
    
    //a_n * d^n y/dt^n + a_n-1 * d^n-1 y/dt^n-1 + ... + a_1 * dy/dt + a_0 * y = b_n * d^n g/dt^n + ... + b_0 * g
    a = [1/(T2*T2), T1/(T2*T2), 1];
    b = [k/(T2*T2), 0, 0];

    inputs = document.querySelectorAll(".input-item>input")
    outputs = document.querySelectorAll(".output-item>input")

    for (let i = 0; i<outputs.length; i++){
        a[i] = outputs[i].value
    }

    for (let i = 0; i<inputs.length; i++){
        b[i] = inputs[i].value
    }

    var A = new Array(['t', 'Переходная функция', 'Производная']);

    var i = 1;
    while (t < L) {
        dy = y[0];

        y = calculateNextStep(y, a, b, 1, dt);
        dy = y[0] - dy;

        A[i] = [t, y[0], dy/dt];

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