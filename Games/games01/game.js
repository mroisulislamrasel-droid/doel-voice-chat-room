
const ball = document.getElementById("ball");
const keeper = document.getElementById("keeper");
const powerBar = document.getElementById("power");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const shootBtn = document.getElementById("shootBtn");
const resetBtn = document.getElementById("resetBtn");
const aim = document.getElementById("aim");

let score = 0;
let power = 60;
let charging = true;
let gameLocked = false;

let powerDirection = 1;


/* POWER ANIMATION */

function updatePower() {

  if (!charging) return;

  power += powerDirection * 2;

  if (power >= 100) {
    power = 100;
    powerDirection = -1;
  }

  if (power <= 20) {
    power = 20;
    powerDirection = 1;
  }

  powerBar.style.width = power + "%";

  requestAnimationFrame(updatePower);
}

updatePower();


/* RANDOM KEEPER POSITION */

function moveKeeper() {

  const positions = [
    "15%",
    "30%",
    "50%",
    "70%",
    "85%"
  ];

  const random =
    positions[Math.floor(Math.random() * positions.length)];

  keeper.style.left = random;
}


/* SHOOT */

shootBtn.addEventListener("click", () => {

  if (gameLocked) return;

  gameLocked = true;
  charging = false;
  shootBtn.disabled = true;

  const shotPositions = [
    "18%",
    "32%",
    "50%",
    "68%",
    "82%"
  ];

  const shot =
    shotPositions[Math.floor(Math.random() * shotPositions.length)];

  const keeperPosition =
    parseFloat(keeper.style.left || "50");

  const shotPosition =
    parseFloat(shot);

  /* move ball */

  ball.style.left = shot;

  ball.style.bottom = "300px";

  /* move keeper */

  moveKeeper();

  /* aim line */

  const angle =
    (shotPosition - 50) * 0.65;

  aim.style.transform =
    `translateX(-50%) rotate(${angle}deg)`;


  setTimeout(() => {

    const keeperNow =
      parseFloat(keeper.style.left);

    const distance =
      Math.abs(shotPosition - keeperNow);

    /*
      Higher power + greater distance
      from keeper = higher chance of goal
    */

    const chance =
      power + distance * 1.5;

    if (chance > 70) {

      score += 10;

      scoreText.textContent = score;

      message.textContent =
        "⚽ GOAL! +10 points 🔥";

    } else {

      message.textContent =
        "🧤 SAVED! Try again.";

    }

  }, 550);


  setTimeout(() => {

    ball.style.left = "50%";
    ball.style.bottom = "45px";

    aim.style.transform =
      "translateX(-50%) rotate(0deg)";

    gameLocked = false;
    charging = true;
    shootBtn.disabled = false;

    updatePower();

  }, 1500);

});


/* RESET */

resetBtn.addEventListener("click", () => {

  score = 0;

  scoreText.textContent = "0";

  message.textContent =
    "Choose your power and shoot!";

  ball.style.left = "50%";
  ball.style.bottom = "45px";

  keeper.style.left = "50%";

  aim.style.transform =
    "translateX(-50%) rotate(0deg)";

  gameLocked = false;
  charging = true;

  shootBtn.disabled = false;

  power = 60;
  powerBar.style.width = "60%";

  updatePower();

});
