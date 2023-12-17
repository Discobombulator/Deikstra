let fs = require('fs');
let str1 = parseFloat(fs.readFileSync('intput.txt').toString());


let str = str1.split('')
let i = 0;
let j = 0;

let DeikstraPriority= new Object();
DeikstraPriority['-'] = 0; DeikstraPriority['+'] = 0; DeikstraPriority['*'] = 1; DeikstraPriority['/'] = 1; DeikstraPriority['^'] = 2;DeikstraPriority['('] = -1;

let DeikstraMass = [];
let StrNew = '';

while(i < str.length){
    if(/\StrNew/.test(str[i])){
        StrNew += str[i];
    }
    else{
        if(j == 0){
            DeikstraMass.push(str[i]);
            j++;
        }
        else{
            if(str[i] == '('){
                DeikstraMass.push(str[i]);
                j++;
            }
            else if (str[i] == ')'){

                while(DeikstraMass[j - 1] != '('){
                    StrNew+= DeikstraMass[j - 1];
                    DeikstraMass.pop();
                    j--;
                }

            }
            else if(DeikstraPriority[DeikstraMass[j - 1]] < DeikstraPriority[str[i]]){
                DeikstraMass.push(str[i]);
                j++;
            }
            else if(DeikstraPriority[DeikstraMass[j - 1]] == DeikstraPriority[str[i]]){
                StrNew += DeikstraMass[j - 1];
                DeikstraMass[j - 1] = str[i];
            }
            else if(DeikstraPriority[DeikstraMass[j - 1]] > DeikstraPriority[str[i]]){
                while((DeikstraPriority[DeikstraMass[j - 1]] >= DeikstraPriority[str[i]]) && j != 0){
                    StrNew+=DeikstraMass[j - 1];
                    DeikstraMass.pop();
                    j--;
                }
                DeikstraMass.push(str[i]);
                j++;

            }
        }
    }
    i++;
}

while(j  != 0){
    if(DeikstraMass[j-1] == '('){
        j--;
    }
    else{
        StrNew += DeikstraMass[j-1];
        j--;
    }
}

let NewStr2 = StrNew.split('');
i = 0;

let result= [];

while(i < NewStr2.length){
    
    if(/\StrNew/.test(NewStr2[i])){
       result.push(NewStr2[i]);
       i++;
    }
    else{
        if(NewStr2[i] == '*'){
            result.push(parseInt(result.pop()) * parseInt(result.pop()));
        }
        if(NewStr2[i] == '-'){
            let p1 = parseInt(result.pop());
            let p2 = parseInt(result.pop());
            result.push(p2-p1);
        }
        if(NewStr2[i] == '/'){
            let p1 = parseInt(result.pop());
            let p2 = parseInt(result.pop());
            result.push(p2/p1);
        }
        if(NewStr2[i] == '^'){
            let p1 = parseInt(result.pop());
            let p2 = parseInt(result.pop());
            result.push(p2**p1);
        }
        if(NewStr2[i] == '+'){
            result.push(parseInt(result.pop()) + parseInt(result.pop()));
        }
        i++;
    }
}

fs.writeFileSync('result.txt', result[0]);

console.log(result[0]);

