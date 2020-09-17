function eval() {
    // Do not use eval!!!
    return;
}

const operations = ['/', '*', '+', '-'];
function isBracketsPaired (expr) {
    let counter = 0;
    for(const i of expr) {
        if(i == '(') counter ++;
        if(i == ')') counter --;
        if(counter < 0) return false;
    }
    return counter == 0 ? true : false;
}

function calc(arr) {
    let result = 0;
    let n1 = +arr[0];
    let n2 = +arr[2];
    switch (arr[1]) {
        case '/': if(n2) result = n1 / n2; else throw new TypeError("TypeError: Division by zero."); break;
        case '*': result = n1 * n2; break;
        case '+': result = n1 + n2; break;
        case '-': result = n1 - n2; break;
    }
    return result;
}

function cutExpr(expr) {
    let n = '';
    let arr = [];
    for(const i of expr) {
        if(i.match(/[\d.]/) || (i == '-' && n == ''))
            n += i;
        else if(operations.includes(i)) {
            arr.push(n, i);
            n = '';
        }
    }
    arr.push(n);
    let i = 0;
    let j = 0;
    while(arr.length != 1) {
        if(arr[i] == operations[j] || arr[i] == operations[j + 1]) {
            arr = [...arr.slice(0, i - 1), calc(arr.slice(i - 1, i + 2)), ...arr.slice(i + 2)];
            i--;
        }
        i++;
        if(i >= arr.length) {i = 0; j = 2; }
    }
    return arr[0];
}

function expressionCalculator(expr) {
    if(!isBracketsPaired(expr)) throw new Error ('ExpressionError: Brackets must be paired');
    let n = '';
    while(expr.includes('(')) {
        for(const i of expr) {
            if(i == '(') n = '';
            else if(i == ')' && n.split(' ').length) {expr = expr.replace('(' + n + ')', cutExpr(n)); n = ''}
            else n += i;
        }
    }
    return cutExpr(expr);
}


module.exports = {
    expressionCalculator
}