// galaxy.js

const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
let connectDistance = 100;
let lightnessFactor = 0.5;
let intensityFactor = 1;
let minStars = 500;
let maxStars = 1500;

function adjustParametersForScreenSize() {
  if (window.innerWidth < 1000) {
    // Adjust parameters for smaller screens
    connectDistance = 50 * intensityFactor;
    lightnessFactor = 0.1 * intensityFactor;
    minStars = 200;
    maxStars = 700;
  } else {
    // Default parameters for larger screens
    connectDistance = 100 * intensityFactor;
    lightnessFactor = 0.5 * intensityFactor;
    minStars = 500;
    maxStars = 1500;
  }
}

function createStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 3;
  const color = getRandomLightBlueColor();
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 0.102;
  const phase = Math.random() * Math.PI * 4;

  stars.push({ x, y, radius, color, angle, speed, phase });
}

function getRandomLightBlueColor() {
  const baseColor = [0, 0, 255];
  const variation = 100;
  const r = Math.min(255, baseColor[0] + Math.floor(Math.random() * variation));
  const g = Math.min(255, baseColor[1] + Math.floor(Math.random() * variation));
  const b = Math.min(255, baseColor[2] + Math.floor(Math.random() * variation));

  const lightR = r + (255 - r) * lightnessFactor;
  const lightG = g + (255 - g) * lightnessFactor;
  const lightB = b + (255 - b) * lightnessFactor;

  return `rgba(${lightR}, ${lightG}, ${lightB}, 0.1)`;
}

function createGalaxy() {
  adjustParametersForScreenSize();

  const numberOfStars = Math.floor(Math.random() * (maxStars - minStars + 1) + minStars);

  for (let i = 0; i < numberOfStars; i++) {
    createStar();
  }
}

function drawStars() {
  for (const star of stars) {
    // Calculate glow based on the sine of the phase
    const glow = Math.sin(star.phase);

    // Apply the glow effect
    const glowColor = `rgba(179, 241, 255, ${glow * 0.2})`;
    star.color = glowColor;

    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;
    star.angle += 0.005;
    star.phase += 0.04; // Increase the phase for each frame

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
    ctx.closePath();

    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }
  }

  // Connect stars within a certain distance
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const distance = Math.sqrt(
        Math.pow(stars[i].x - stars[j].x, 2) + Math.pow(stars[i].y - stars[j].y, 2)
      );

      if (distance < connectDistance) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars.length = 0;
  createGalaxy();
});

canvas.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  for (const star of stars) {
    const distance = Math.sqrt(Math.pow(star.x - mouseX, 2) + Math.pow(star.y - mouseY, 2));

    if (distance < 30) {
      star.x += (mouseX - star.x) * 0.02;
      star.y += (mouseY - star.y) * 0.02;
    }
  }
});

createGalaxy();
animate();
