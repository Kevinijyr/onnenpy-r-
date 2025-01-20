const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const messageDiv = document.getElementById('message');
const choicesInput = document.getElementById('choices-input');
const updateChoicesButton = document.getElementById('update-choices-button');
const clearChoicesButton = document.getElementById('clear-choices-button');

canvas.width = 350;
canvas.height = 350;

let choices = ["Koira", "Kissa", "Auto", "Lentokones", "Juna"];
let spinning = false;
let currentRotation = 0;

function drawWheel() {
    const segmentCount = choices.length;
    const segmentAngle = (2 * Math.PI) / segmentCount;
    const colors = ["#ffb3d9", "#ff99cc", "#ff80bf", "#ff66b3", "#ff4da6"];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); // Siirretään pyörän keskelle

    for (let i = 0; i < segmentCount; i++) {
        // Draw segment
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, canvas.width / 2, i * segmentAngle, (i + 1) * segmentAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
        // Draw text
        ctx.save();
        ctx.rotate(i * segmentAngle + segmentAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.fillText(choices[i], canvas.width / 2 - 20, 10);
        ctx.restore();
    }

    ctx.restore();
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    const randomDegree = Math.random() * 360 + 720;
    currentRotation += randomDegree;
    canvas.style.transition = "transform 3s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        spinning = false;
        canvas.style.transition = "none";
        const normalizedDegree = currentRotation % 360;
        const segmentIndex = Math.floor(((360 - normalizedDegree) / (360 / choices.length)) % choices.length);
        const winner = choices[segmentIndex];
        messageDiv.textContent = `Voitit: ${winner}`;
    }, 3000);
}

function updateChoices() {
    const newChoices = choicesInput.value.split(",").map(choice => choice.trim()).filter(choice => choice);
    if (newChoices.length > 0) {
        choices = newChoices;
        drawWheel();
    } else {
        alert("Anna vähintään yksi vaihtoehto!");
    }
}

function clearChoices() {
    choicesInput.value = '';
    choices = [];
    drawWheel();
}

spinButton.addEventListener('click', spinWheel);
updateChoicesButton.addEventListener('click', updateChoices);
clearChoicesButton.addEventListener('click', clearChoices);

drawWheel();
