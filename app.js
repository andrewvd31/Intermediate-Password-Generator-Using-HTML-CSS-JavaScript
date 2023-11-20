const passwordRange = document.getElementById('password-range')
const generateBtn = document.getElementById('generate-password')
const checkBoxBtn = document.querySelectorAll('.checkbox input')
const passIndicator = document.querySelector('.password-strength-bar')
const copyBtn = document.querySelector('.input-box i')
const inputTextBox = document.getElementById('input-text-box')

const character = 
{
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "~`!@#$%^&*()_-+={[}]|;<,>.?/"
}

passwordRange.addEventListener('input',passwordRangeFunction)

function passwordRangeFunction(){
    document.querySelector('.input-password-box span').textContent = passwordRange.value
    if (passwordRange.value > 15){
        passIndicator.id = "strong"
    }
    else if (passwordRange.value > 8){
        passIndicator.id = "medium"
    }
    else{
        passIndicator.id = "password-strength-bar"
    }
    // passIndicator.id = passwordRange.value > 15 ? "strong" : passwordRange.value > 8 ? "medium" : "password-strength-bar"
}

generateBtn.addEventListener('click',generateBtnFunction)

function generateBtnFunction(){
    let staticPassword = ""
    let randomPassword = ""
    let excludeDuplicate = false
    checkBoxBtn.forEach(function(data){
        if(data.checked){
            data.id !== "duplicates" && data.id !== "spaces" ? staticPassword += character[data.id] 
            : data.id === "spaces" ? staticPassword = ` ${staticPassword} ` 
            : excludeDuplicate = true
        }
    })
    for (let i=0; i<passwordRange.value; i++){
        let randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)]
        if (excludeDuplicate){
            randomPassword.includes(randomChar) ? i-- : randomPassword += randomChar
        }
        else{
            randomPassword += randomChar
        }
    }   
    inputTextBox.value = randomPassword
}

copyBtn.addEventListener('click',copyBtnFunction)

function copyBtnFunction(){
    if (inputTextBox.value){
        navigator.clipboard.writeText(inputTextBox.value);
        copyBtn.classList.add("fa-circle-check")
        copyBtn.classList.remove("fa-copy")    
        setTimeout(function(){
            copyBtn.classList.add("fa-copy")    
            copyBtn.classList.remove("fa-circle-check")
        },1200)
    }
}