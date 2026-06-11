var symbols = ["🍬","🍋","🐟","🍓"];
symbols[5] = "🍬";
symbols[-1] = "🍓";
var money = 100;
var chances = [];
var combos = [111,22,222,333,444];
var multipliers = [2,3,10,20,100];

for (let i = 1; i < 100; i++) { // fill the 'chances' array with values, setting chances of numbers occuring
    if (i <= 55) {
        chances.push(1); // 55/100 values are 1, so we have a 56% chance of getting a 1 on any given roll
    }
    else if (i <= 55 + 25) {
        chances.push(2); // 25/100, 28% chance
    }
    else if (i <= 55 + 25 + 15) {
        chances.push(3); // 15/100, 12% chance
    }
    else if (i <= 55 + 25 + 15 + 5) {
        chances.push(4); // 5/100, 4% chance
    }
}

// setup variables /\
// setup functions \/

function resetButtons() { // re-enable all the buttons
    document.getElementById("ten").disabled = false;
    document.getElementById("hund").disabled = false;
    document.getElementById("all").disabled = false;
}

function animate(i1,i2,i3) {
    document.getElementById("ten").disabled = true;
    document.getElementById("hund").disabled = true;
    document.getElementById("all").disabled = true;
    let  max = 0;
    
    if (i1 > max) {
        max = i1;
    }
    if (i2 > max) {
        max = i2;
    }
    if (i3 > max) {
        max = i3;
    }
    let f,s,t;
    f = 0;
    s = 0;
    t = 0; 
    
    for (let i = 0; i < max; i++) {
        if (f < i1) {
            f= (f + 1);
        }
        if (s < i2) {
            s= (s + 1);
        }
        if (t < i3) {
            t= (t + 1);
        }
        setTimeout(function() {output(f%4,s%4,t%4)}, 150 * (i+1))
        // setTimeout(output(f%4,s%4,t%4), 1500);

    }
    // Animation
    setTimeout(function() {resetButtons()}, 150 * max)
}


function output(i1,i2,i3) {
    var string = `<pre>
   ____________________________________________ 
  /* * * * * * * * * * * * * * * * * * * * * * \\ 
  |  L  O  S  E   Y  O  U  R   M  O  N  E  Y ! | 
  \\_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*/
  ______________       ______________________________
| ${symbols[(+i1-1)%4]} | ${symbols[(+i2-1)%4]} | ${symbols[(+i3-1)%4]} |     |🍬🍬🍬 - x2    🍋🍋 - x3   |
|-${symbols[(+i1)%4]}-|-${symbols[(+i2)%4]}-|-${symbols[(+i3)%4]}-|     |🍋🍋🍋 - x10  🐟🐟🐟 - x20 | 
| ${symbols[(+i1+1)%4]} | ${symbols[(+i2+1)%4]} | ${symbols[(+i3+1)%4]} |     |🍓🍓🍓 - x 100              | 
\\---------------/      \\----------------------------/ </pre>`;
    document.getElementById("output").innerHTML = string;
}

function betTen(event) {
    gamble(10);
}
function betHund(event) {
    gamble(100);
}
function allIn(event) {
    gamble(money);
}

function reset(event) {
    document.getElementById("result").innerHTML = "RESET";
    document.getElementById("result").innerHTML = "RESET";
    document.getElementById("output").innerHTML = "RESET";
    document.getElementById("money").innerHTML = "you have " +  String(money) + "$";
    document.getElementById("ten").disabled = false;
    document.getElementById("hund").disabled = false;
    document.getElementById("all").disabled = false;
    money = 100;
}

function gamble(bet) { // main loop
    if (bet > money) {
        return 0; // edge case. :|
    }
    // c,d,e,first,second,third;
    let c = Math.random() * 100;
    let d = Math.random() * 100;
    let e = Math.random() * 100;

    c = (c - c % 1);
    d = (d - d % 1);
    e = (e - e % 1);

    let first = chances[c];
    let second = chances[d];
    let third = chances[e];
    let comb = (String(first+1) + String(second+1) + String(third+1));

    let add = 16;
    animate(first+add,second+add,third+add);
    
    money -= bet;
    document.getElementById("result").innerHTML = "you lost " + bet + " dollars.";
    document.getElementById("money").innerHTML = "you have " +  String(money) + "$";

    for (let i = 0; i < combos.length; i++) {
        if (comb.includes(combos[i])) {
            // match found
            let gain = bet * multipliers[i];
            money += gain + bet;
            document.getElementById("result").innerHTML = "you made " + gain + " dollars!";
            document.getElementById("money").innerHTML = "you have " +  String(money) + "$";
            break;
        }
    }
    if (money < 100) {
        document.getElementById("hund").disabled = true;
    }
    if (money < 10) {
        document.getElementById("ten").disabled = true;
    }
    if (money == 0) {
        document.getElementById("all").disabled = true;
    }
}
// document.getElementById('ten').onclick = betTen;
// document.getElementById('hund').onclick = betHund;
// document.getElementById('all').onclick = allIn;
