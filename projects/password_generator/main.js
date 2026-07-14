const passwordDisplay = document.getElementById('password-display');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const goback = document.getElementById('back-btn')

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

function generatePassword() {
    let length = parseInt(lengthEl.value);
    let allowedChars = '';
    let generatedPassword = '';

    if (length < 8) length = 8;
    if (length > 20) length = 20;
    lengthEl.value = length;

    if (uppercaseEl.checked) allowedChars += uppercaseChars;
    if (lowercaseEl.checked) allowedChars += lowercaseChars;
    if (numbersEl.checked) allowedChars += numberChars;
    if (symbolsEl.checked) allowedChars += symbolChars;

    if (allowedChars === '') {
        passwordDisplay.value = 'Select at least one option!';
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        generatedPassword += allowedChars[randomIndex];
    }

    passwordDisplay.value = generatedPassword;
}

function goBack() {
    window.location.href = '../../'
}

goback.addEventListener('click', goBack)
generateBtn.addEventListener('click', generatePassword);