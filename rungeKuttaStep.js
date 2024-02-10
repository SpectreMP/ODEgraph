function calculateNextStep(start, a, b, g, dt){
    n =  start.length;
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

export {calculateNextStep};