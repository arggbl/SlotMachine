var symbols = ["🍎", "🍋", "🐟", "🍓", "💩"];
console.log(symbols);

var money = 100;
var chances = [];
var combos = ['4','000', '22', '111', '222', '333', '3'];
var multipliers = [-1, 2, 3, 10, 20, 100, 1];

// Fill chances array with exactly 100 entries
for (let i = 0; i < 100; i++) {
    if (i < 60) {
        chances.push(0);
    }
    else if (i < 70) {
        chances.push(4);
    }
    else if (i < 75) {
        chances.push(1);
    }
    else if (i < 95) {
        chances.push(2);
    }
    else {
        chances.push(3);
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function resetButtons() {
    document.getElementById("ten").disabled = false;
    document.getElementById("hund").disabled = false;
    document.getElementById("all").disabled = false;
}

function animate(i1, i2, i3) {
    document.getElementById("ten").disabled = true;
    document.getElementById("hund").disabled = true;
    document.getElementById("all").disabled = true;

    let max = Math.max(i1, i2, i3);

    let f = 0;
    let s = 0;
    let t = 0;

    let totalFrames = max + 16;

    for (let i = 0; i < totalFrames; i++) {

        if (f < i1 + 5) f++;
        if (s < i2 + 10) s++;
        if (t < i3 + 15) t++;

        // Capture values for this frame
        let currentF = f;
        let currentS = s;
        let currentT = t;

        setTimeout(() => {
            output(
                currentF % 5,
                currentS % 5,
                currentT % 5
            );
        }, 100 * i); // faster animation (100ms per frame)
    }

    setTimeout(resetButtons, 100 * totalFrames);
}

function output(i1, i2, i3) {

    var string = `<pre>
     ____________________________________________ 
    /* * * * * * * * * * * * * * * * * * * * * * \\ 
    |  L  O  S  E   Y  O  U  R   M  O  N  E  Y ! |
    \\_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*/
  ______________       ____________________________________________
| ${symbols[mod(i1 + 1, 5)]} | ${symbols[mod(i2 + 1, 5)]} | ${symbols[mod(i3 + 1, 5)]} |     | 🍎🍎🍎 - x2    🐟🐟 - x3    💩 - LOSE  |
|-${symbols[mod(i1, 5)]}-|-${symbols[mod(i2, 5)]}-|-${symbols[mod(i3, 5)]}-|     | 🍋🍋🍋 - x10  🐟🐟🐟 - x20             |
| ${symbols[mod(i1 - 1, 5)]} | ${symbols[mod(i2 - 1, 5)]} | ${symbols[mod(i3 - 1, 5)]} |     | 🍓🍓🍓 - x100  🍓 - MONEY BACK          |
\\---------------/      \\------------------------------------------/
</pre>`;

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
    money = 100;

    document.getElementById("result").innerHTML = "RESET";
    document.getElementById("output").innerHTML = "RESET";
    document.getElementById("money").innerHTML = "RESET";

    resetButtons();
}

function gamble(bet) {

    if (bet > money) {
        return;
    }

    let c = Math.floor(Math.random() * 100);
    let d = Math.floor(Math.random() * 100);
    let e = Math.floor(Math.random() * 100);

    let first = chances[c];
    let second = chances[d];
    let third = chances[e];

    let comb = String(first) + String(second) + String(third);
    console.log(first,second,third);
    animate(first, second, third);

    money -= bet;

    document.getElementById("result").innerHTML =
        "you lost " + bet + " dollars.";

    document.getElementById("money").innerHTML =
        "you have " + money + "$";

    for (let i = 0; i < combos.length; i++) {
        if (comb.includes(String(combos[i]))) {

            let gain = bet * multipliers[i];

            money += gain + bet;
            if (gain < 0) {
                document.getElementById("result").innerHTML =
                    "you made " + gain + " dollars!";
            }
            document.getElementById("money").innerHTML =
                "you have " + money + "$";

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
