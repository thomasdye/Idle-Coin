let coins = 0;
let upgradeCost = 10;
let fillRate = 1; // % per interval
let progress = 0; // % of the progress bar
let isFilling = true;

// Element references
const coinCountElement = document.getElementById('coinCount');
const progressBar = document.getElementById('progressBar');
const upgradeButton = document.getElementById('upgradeButton');

// Update display
function updateDisplay() {
    coinCountElement.textContent = coins;
    progressBar.style.width = progress + '%';
    upgradeButton.disabled = coins < upgradeCost;
}

// Fill progress bar
function fillProgressBar() {
    if (!isFilling) return;  // If it's not filling, just return without doing anything

    progress += fillRate;

    if (progress >= 100) {
        // Set isFilling to false to stop updating progress and coins during the transition
        progressBar.style.width = '100%'; // Ensure the bar is visually full
        isFilling = false;

        // Fade out progress bar
        progressBar.style.opacity = 0;
        
        setTimeout(() => {
            coins++;
            progress = 0; // =\eset progress bar width
            progressBar.style.width = progress + '%';
            updateDisplay();

            // Wait a bit after the fade-out, then start refilling
            setTimeout(() => {
                progressBar.style.opacity = 1;
                // Set isFilling back to true after the transition so the bar can start refilling
                isFilling = true;
            }, 200); // 200ms delay after the fade-out

        }, 300); // match the duration of the opacity transition in CSS
    } else {
        progressBar.style.width = progress + '%';
    }
}

// Upgrade action
upgradeButton.addEventListener('click', function() {
    if (coins >= upgradeCost) {
        coins -= upgradeCost;
        fillRate *= 1.5; // increase the fill rate by 50%
        updateDisplay();
    }
});

setInterval(fillProgressBar, 100); // update every 100ms

updateDisplay(); // Initial display update
