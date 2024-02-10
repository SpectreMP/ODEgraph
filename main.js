import "https://www.gstatic.com/charts/loader.js";
import { calculateNextStep } from "./rungeKuttaStep";
google.charts.load('current',{'packages':['corechart']});
google.charts.setOnLoadCallback(main);

function main(){
    t=0;
    L=6;
    dt=0.01;
    k = 5;
    T1 = 0.4;
    T2 = 0.1;

    koc = 1;

    s = [0,0];
    ds = 0;
    
    //a_n * d^n y/dt^n + a_n-1 * d^n-1 y/dt^n-1 + ... + a_1 * dy/dt + a_0 * y = b_n * d^n g/dt^n + ... + b_0 * g
    a = [1/(T2*T2), T1/(T2*T2), 1];
    b = [k/(T2*T2), 0, 0];

    var A = new Array(['t', 'Переходная функция', 'Производная?']);

    var i = 1;
    while (t < L) {
        //TODO: rename this variables to be more descreptive
        prevs = s[0];

        s = calculateNextStep(s, a, b, 1, dt);
        ds = s[0]-prevs;

        A[i] = [t, s[0], ds/dt];
        t += dt;
        i++;
    }
    
    var data = google.visualization.arrayToDataTable(A);
    var options = {
        title: 'Моделирование заданного типового звена',
        curveType: 'function',
        hAxis: {
        title: 't'
    },
    vAxis: {
        title: 'h(t)'
    },
    legend: { 
        position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart2'));
    chart.draw(data, options);
}