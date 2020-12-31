var digits = [
  `000000
00  00
00  00
00  00
000000`,
  `1111
  11
  11
  11
111111`,
  `222222
     2
222222
2
222222`,
  `333333
    33
333333
    33
333333`,
  `44  44
44  44
444444
    44
    44`,
  `555555
55
555555
    55
555555`,
  `666666
66
666666
66  66
666666`,
  `777777
    77
    77
    77
    77`,
  `888888
88  88
888888
88  88
888888`,
  `999999
99  99
999999
    99
999999`,
];

const duration = 1000;
const numDigits = 4;
const container = document.querySelector(".container");
const grid = [6, 5];
const col = grid[0];
const row = grid[1];
const numberOfElements = col * row;

const digitFragment = document.createDocumentFragment();
for (let i = 0; i < numDigits; i++) {
  const digit = document.createElement("div");
  digit.className = "digit";
  const boxFragment = document.createDocumentFragment();
  for (let i = 0; i < numberOfElements; i++) {
    boxFragment.appendChild(document.createElement("div"));
  }
  digit.appendChild(boxFragment);
  digitFragment.appendChild(digit);
}

container.appendChild(digitFragment);

function playAnimation() {
  anime({
    targets: ".digit div:not(.target)",
    easing: "easeInOutSine",
    duration: duration / 3,
    rotateY: 0,
    rotateX: 0,
  });
  anime({
    targets: ".digit div.target",
    easing: "easeInOutSine",
    duration: duration / 3,
    rotateY: 90,
    rotateX: 90,
    delay: anime.stagger(4, { from: "center" }),
  });
}

var newYearDate = new Date(2021, 0, 1);

var countdownInterval = function () {
  var countdownNow = countdown(newYearDate);
  // console.log(countdownNow.hours, countdownNow.minutes, countdownNow.seconds);
  let countDownSecString = String(Math.abs(countdownNow.value / 1000) | 0);
  countDownSecString = countDownSecString.substr(-numDigits);
  container.childNodes.forEach((digitElem, digitElem_i) => {
    if (countDownSecString[digitElem_i]) {
      digits[countDownSecString[digitElem_i]].split("\n").forEach((r, r_i) => {
        r.split("").forEach((c, c_i) => {
          if (c != " ") {
            digitElem.childNodes[r_i * col + c_i].classList.add("target");
          }
        });
      });
      playAnimation();
      digitElem.childNodes.forEach((n) => {
        n.classList = "";
      });
    }
  });
};

setInterval(countdownInterval, duration);
