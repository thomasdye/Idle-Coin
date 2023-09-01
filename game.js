const coinDisplay = document.getElementById("coinCount");
const copperBar = document.getElementById("copperBar");
const silverBar = document.getElementById("silverBar");

let coins = 0;
let copperProgress = 0;
let silverProgress = 0;
const fillRate = 1;
let isCopperFilling = true;
let isSilverFilling = false;

function updateDisplay() {
    coinDisplay.textContent = "Coins: " + coins;
    if (coins >= 50 && !isSilverFilling) {
        isSilverFilling = true;
        // Once unlocked, don't check again
        coins -= 50; // Spend 50 coins to unlock
    }
}

function fillProgressBar() {
    if (isCopperFilling) {
        copperProgress += fillRate;
        if (copperProgress >= 100) {
            copperProgress = 0;
            coins++;
        }
        copperBar.style.width = copperProgress + '%';
    }

    if (isSilverFilling) {
        silverProgress += fillRate / 5; // To make silver 5 times slower
        if (silverProgress >= 100) {
            silverProgress = 0;
            coins += 5;
        }
        silverBar.style.width = silverProgress + '%';
    }

    updateDisplay();
}

setInterval(fillProgressBar, 100);
