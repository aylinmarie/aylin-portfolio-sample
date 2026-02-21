// Conversion factor: 1 inch = 2.54 cm
// Gauge per inch * 2.54 = gauge per 10 cm  (approximate; standard knitting uses per 10 cm)

const inchesInput = document.getElementById('inches-input');
const cmInput = document.getElementById('cm-input');

inchesInput.addEventListener('input', () => {
  const val = parseFloat(inchesInput.value);
  if (!isNaN(val) && val >= 0) {
    cmInput.value = (val * 2.54).toFixed(1);
  } else {
    cmInput.value = '';
  }
});

cmInput.addEventListener('input', () => {
  const val = parseFloat(cmInput.value);
  if (!isNaN(val) && val >= 0) {
    inchesInput.value = (val / 2.54).toFixed(2);
  } else {
    inchesInput.value = '';
  }
});

// Stitch count adjuster
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('result-text');

calculateBtn.addEventListener('click', () => {
  const patternStitches = parseFloat(document.getElementById('pattern-stitches').value);
  const patternGauge = parseFloat(document.getElementById('pattern-gauge').value);
  const yourGauge = parseFloat(document.getElementById('your-gauge').value);

  if (isNaN(patternStitches) || isNaN(patternGauge) || isNaN(yourGauge)) {
    resultText.textContent = 'Please fill in all three fields.';
    resultDiv.classList.remove('hidden');
    return;
  }

  if (patternGauge <= 0 || yourGauge <= 0 || patternStitches <= 0) {
    resultText.textContent = 'All values must be greater than zero.';
    resultDiv.classList.remove('hidden');
    return;
  }

  // Adjusted stitches = (pattern stitches / pattern gauge) * your gauge
  const adjusted = Math.round((patternStitches / patternGauge) * yourGauge);
  resultText.textContent =
    `Cast on ${adjusted} stitches instead of ${patternStitches} to match the pattern's measurements at your gauge.`;
  resultDiv.classList.remove('hidden');
});
