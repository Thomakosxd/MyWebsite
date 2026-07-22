const killsInput = document.getElementById('kills');
const assistsInput = document.getElementById('assists');
const deathsInput = document.getElementById('deaths');
const resultParagraph = document.getElementById('result');
const calculateButton = document.getElementById('calculate');
const goback = document.getElementById('back-btn')

calculateButton.addEventListener('click', calculateKDA);
goback.addEventListener('click', goBack)

function calculateKDA() {
  const kills = parseInt(killsInput.value);
  const assists = parseInt(assistsInput.value);
  const deaths = parseInt(deathsInput.value);

  if (deaths === 0) {
    resultParagraph.textContent = "Cannot divide by zero!";
  } else {
    const kda = (kills + assists) / deaths;

    resultParagraph.textContent = `KDA Ratio: ${kda.toFixed(2)}`;
  }
}

function goBack() {
    window.location.href = '../../'
}

