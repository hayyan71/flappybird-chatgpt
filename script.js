const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bird = {
  x: 20,
  y: canvas.height / 2,
  size: 20,
  speed: 5,
  gravity: 0.5,
  velocity: 0,
};

const pipe = {
  x: canvas.width,
  gap: 100,
  width: 50,
  topHeight: 0,
  bottomHeight: 0,
  speed: 5,
};

let score = 0;
let highestScore = 0;
let isGameOver = false;

function drawBird() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
}

function drawPipe() {
  ctx.fillStyle = 'green';
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
  ctx.fillRect(pipe.x, pipe.bottomHeight, pipe.width, canvas.height - pipe.bottomHeight);
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Highest Score: ${highestScore}`, 10, 60);
}

function checkCollision() {
  if (bird.y < 0 || bird.y + bird.size > canvas.height) {
    return true;
  }

  if (bird.x + bird.size > pipe.x && bird.x < pipe.x + pipe.width) {
    if (bird.y < pipe.topHeight || bird.y + bird.size > pipe.bottomHeight) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  isGameOver = false;
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  score = 0;
  pipe.x = canvas.width;
  pipe.topHeight = Math.random() * (canvas.height - pipe.gap);
  pipe.bottomHeight = pipe.topHeight + pipe.gap;
  document.getElementById('reset-button').style.display = 'none';
}

function update() {
  if (isGameOver) {
    if (score > highestScore) {
      highestScore = score;
      document.getElementById('highest-score').innerText = highestScore;
    }
    return;
  }

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  pipe.x -= pipe.speed;

  if (pipe.x + pipe.width < 0) {
    pipe.x = canvas.width;
    pipe.topHeight = Math.random() * (canvas.height - pipe.gap);
    pipe.bottomHeight = pipe.topHeight + pipe.gap;
    score++;
    document.getElementById('score').innerText = score;
  }

  if (checkCollision()) {
    isGameOver = true;
    document.getElementById('reset-button').style.display = 'block';
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipe();
  drawScore();
  
  requestAnimationFrame(update);
  }
  
  document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
  if (isGameOver) {
  document.getElementById('reset-button').click();
  } else {
  bird.velocity = -bird.speed;
  }
  }
  });
  
  document.getElementById('reset-button').addEventListener('click', function () {
  resetGame();
  update();
  });
  
  update();