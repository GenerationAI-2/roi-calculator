// Global state
let currentQuestion = 1;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Setup slider displays
    updateSliderDisplay('time_percent');
    updateSliderDisplay('savings_percent');

    // Add event listeners for sliders
    document.getElementById('time_percent').addEventListener('input', function() {
        updateSliderDisplay('time_percent');
    });

    document.getElementById('savings_percent').addEventListener('input', function() {
        updateSliderDisplay('savings_percent');
    });
});

// Update slider display values
function updateSliderDisplay(sliderId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(sliderId + '_display');
    display.textContent = slider.value;
}

// Start calculator
function startCalculator() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('questions-screen').classList.add('active');
    updateProgress();
}

// Navigation functions
function nextQuestion(questionNum) {
    // Validate current question
    if (!validateCurrentQuestion()) {
        return;
    }

    // Hide current question
    const currentQ = document.querySelector(`.question[data-question="${currentQuestion}"]`);
    currentQ.classList.remove('active');

    // Show next question
    currentQuestion = questionNum;
    const nextQ = document.querySelector(`.question[data-question="${questionNum}"]`);
    nextQ.classList.add('active');

    updateProgress();
}

function prevQuestion(questionNum) {
    // Hide current question
    const currentQ = document.querySelector(`.question[data-question="${currentQuestion}"]`);
    currentQ.classList.remove('active');

    // Show previous question
    currentQuestion = questionNum;
    const prevQ = document.querySelector(`.question[data-question="${questionNum}"]`);
    prevQ.classList.add('active');

    updateProgress();
}

// Validate current question
function validateCurrentQuestion() {
    if (currentQuestion === 1) {
        const people = document.getElementById('people').value;
        if (!people || people < 1 || people > 500) {
            alert('Please enter a valid number of people (1-500)');
            return false;
        }
    }
    return true;
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / 5) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

// Calculate results
function calculateResults() {
    // Get input values
    const people = parseFloat(document.getElementById('people').value);
    const timePercent = parseFloat(document.getElementById('time_percent').value);
    const salary = parseFloat(document.getElementById('salary').value);
    const savingsPercent = parseFloat(document.getElementById('savings_percent').value);
    const aiMonthly = parseFloat(document.getElementById('ai_monthly').value);

    // Validate all inputs
    if (!people || !timePercent || !salary || !savingsPercent || !aiMonthly) {
        alert('Please complete all questions');
        return;
    }

    // Calculate values
    const annualManualCost = people * (timePercent / 100) * salary;
    const annualSavings = annualManualCost * (savingsPercent / 100);
    const annualAiCost = aiMonthly * 12;
    const netBenefit = annualSavings - annualAiCost;
    const paybackMonths = annualAiCost / (annualSavings / 12);
    const roiMultiple = netBenefit / annualAiCost;

    // Display results
    displayResults(annualManualCost, annualAiCost, annualSavings, netBenefit, paybackMonths, roiMultiple);

    // Show results screen
    document.getElementById('questions-screen').classList.remove('active');
    document.getElementById('results-screen').classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Display results
function displayResults(currentCost, aiCost, savings, netBenefit, paybackMonths, roiMultiple) {
    // Format currency
    document.getElementById('result-current-cost').textContent = formatCurrency(currentCost);
    document.getElementById('result-ai-cost').textContent = formatCurrency(aiCost);
    document.getElementById('result-savings').textContent = formatCurrency(savings);
    document.getElementById('result-net-benefit').textContent = formatCurrency(netBenefit);

    // ROI Multiple logic
    let roiText;
    if (roiMultiple > 10) {
        roiText = '10×+';
    } else if (roiMultiple < 0) {
        roiText = 'No ROI';
    } else {
        roiText = roiMultiple.toFixed(1) + '×';
    }
    document.getElementById('result-roi-multiple').textContent = roiText;

    // Payback Period logic
    let paybackText;
    if (netBenefit < 0) {
        paybackText = 'No positive ROI with current inputs';
    } else if (paybackMonths <= 3) {
        paybackText = Math.round(paybackMonths) + ' months - Excellent ROI!';
    } else if (paybackMonths <= 12) {
        paybackText = Math.round(paybackMonths) + ' months - Strong ROI';
    } else if (paybackMonths <= 36) {
        paybackText = Math.round(paybackMonths) + ' months';
    } else {
        paybackText = '3+ years';
    }
    document.getElementById('result-payback').textContent = paybackText;

    // Update styling for negative results
    const netBenefitElement = document.getElementById('result-net-benefit');
    const roiMultipleElement = document.getElementById('result-roi-multiple');

    if (netBenefit < 0) {
        netBenefitElement.classList.add('negative');
        roiMultipleElement.classList.add('negative');
    } else {
        netBenefitElement.classList.remove('negative');
        roiMultipleElement.classList.remove('negative');
    }
}

// Format currency
function formatCurrency(value) {
    return '$' + Math.round(value).toLocaleString('en-NZ');
}

// Reset calculator
function resetCalculator() {
    // Reset form
    document.getElementById('calculator-form').reset();

    // Reset to defaults
    document.getElementById('time_percent').value = 30;
    document.getElementById('savings_percent').value = 20;
    updateSliderDisplay('time_percent');
    updateSliderDisplay('savings_percent');

    // Reset question state
    currentQuestion = 1;
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.querySelector('.question[data-question="1"]').classList.add('active');

    // Show welcome screen
    document.getElementById('results-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');

    // Reset progress
    updateProgress();

    // Scroll to top
    window.scrollTo(0, 0);
}