var symbols = ["🍬", "🍋", "🐟", "🍓"];

var money = 100;
var chances = [];
var combos = ['000', '22', '111', '222', '333'];
var multipliers = [2, 3, 10, 20, 100];

// Fill chances array with exactly 100 entries
for (let i = 0; i < 100; i++) {
    if (i < 55) {
        chances.push(1);
    }
    else if (i < 80) {
        chances.push(2);
    }
    else if (i < 95) {
        chances.push(3);
    }
    else {
        chances.push(4);
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

    let totalFrames = max + add;

    for (let i = 0; i < totalFrames; i++) {

        if (f < i1 + 4) f++;
        if (s < i2 + 8) s++;
        if (t < i3 + 12) t++;

        // Capture values for this frame
        let currentF = f;
        let currentS = s;
        let currentT = t;

        setTimeout(() => {
            output(
                currentF % 4,
                currentS % 4,
                currentT % 4
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
  ______________       ______________________________
| ${symbols[mod(i1 + 1, 4)]} | ${symbols[mod(i2 + 1, 4)]} | ${symbols[mod(i3 + 1, 4)]} |     |🍬🍬🍬 - x2    🐟🐟 - x3   |
|-${symbols[mod(i1, 4)]}-|-${symbols[mod(i2, 4)]}-|-${symbols[mod(i3, 4)]}-|     |🍋🍋🍋 - x10  🐟🐟🐟 - x20 |
| ${symbols[mod(i1 - 1, 4)]} | ${symbols[mod(i2 - 1, 4)]} | ${symbols[mod(i3 - 1, 4)]} |     |🍓🍓🍓 - x100              |
\\---------------/      \\----------------------------/
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
    document.getElementById("money").innerHTML = "you have 100$";

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

            document.getElementById("result").innerHTML =
                "you made " + gain + " dollars!";

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

    if (money === 0) {
        document.getElementById("all").disabled = true;
    }
}
