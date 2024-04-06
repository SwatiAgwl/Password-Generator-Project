const slider= document.querySelector("[slider]");
const passwordLength= document.querySelector("[data-length]") // used custom attributes

const uppercase= document.querySelector("#c1")
const lowercase= document.querySelector("#c2")
const numbers= document.querySelector("#c3")
const symb= document.querySelector("#c4")

const generatebtn= document.querySelector(".generate");
const displayPassword= document.querySelector("[data-password-display]")
const allcheckboxes= document.querySelectorAll("input[type=checkbox]")

const copybtn= document.querySelector(".copy-btn");
const copyspan= document.querySelector(".copy-span");
const strengthIndicator= document.querySelector(".strength-indicator")

// initially
slider.value= 10;
passwordLength.textContent= slider.value;
slider.style.background = `linear-gradient(to right, cyan ${((slider.value-slider.min) /(slider.max-slider.min)) * 100}%, #09203f ${(slider.value / slider.max) * 100}%)`;

const symbols= "`~!@#$%^&*()_+-=[{\|/?<>;:''}]"
let password="";

slider.addEventListener("input", (e) => {
    passwordLength.textContent = slider.value;
    
    // const min = slider.min;
    // const max = slider.max;
    // const range = max - min;
    // const value = slider.value - min;
    // const percentage = (value / range) * 100;
    // slider.style.backgroundSize = `${percentage}% 100%`;
    slider.style.background = `linear-gradient(to right, cyan ${((slider.value-slider.min)/ (slider.max-slider.min)) * 100}%, #09203f ${(slider.value / slider.max) * 100}%)`;

});


function getRandInteger( min , max){
    return Math.floor(Math.random()* (max-min)+ min);
}

function getRandUppercase(){
    return String.fromCharCode( getRandInteger(65,91) );
}
function getRandLowercase(){
    return String.fromCharCode(getRandInteger(97,123) );
}
function getRandNumber(){
    return getRandInteger(0,10);
}
function getRandSymbol(){
    return symbols.charAt(getRandInteger(0,symbols.length));
}


let checkedCount = 0;

// allcheckboxes.forEach(checkbox =>{
//     checkbox.addEventListener("change", ()=>{
//         if(checkbox.checked) checkedCount++;
//     })
// })

allcheckboxes.forEach(checkbox =>{
    checkbox.addEventListener("change", () => {
        checkedCount = 0;
        console.log("checking checkbox count")
        allcheckboxes.forEach(checkbox => {
            if (checkbox.checked) checkedCount++;
        });
    });
});

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function generatePassword(){
    console.log("called")
    console.log("printing present checked count",checkedCount)
    if( checkedCount <= 0){
        return ;
    }
    if( slider.value < checkedCount) slider.value= checkedCount;
    let funcArr= [];
    if(uppercase.checked)   funcArr.push(getRandUppercase);
    if(lowercase.checked)   funcArr.push(getRandLowercase);
    if(numbers.checked)   funcArr.push(getRandNumber);
    if(symb.checked)   funcArr.push(getRandSymbol);

    password="";
    for( let i=0; i<funcArr.length; i++){
        password+= funcArr[i]();
    }

    // rem length-count
    for( let i=0; i<slider.value-funcArr.length; i++){
        let index= getRandInteger(0,funcArr.length);
        //console.log(index);
        password+= funcArr[index]();
    }

    // shuffling else starting char(comp addition) ka order to pta chl jaega hmesha
    password= shufflePassword(Array.from(password));

    displayPassword.value= password;
    // strength indi change
    calcStrength();

    console.log("ui add done")
}


console.log("before clicking ")
generatebtn.addEventListener("click", generatePassword);
console.log("after clicking")

async function copycontent(){
    try{
        await navigator.clipboard.writeText(displayPassword.value);
        copyspan.textContent= "copied";
    }
    catch{
        copyspan.textContent= "failed";
    }
    // visible for 2 s
    setTimeout(() => {
        copyspan.textContent="";
    }, 1000);
}
// copy button 
copybtn.addEventListener("click",()=>{
    if( displayPassword.value){
        copycontent();
    }
} )

// calculate strength
function calcStrength(){
    console.log("slider value", slider.value);
    if( slider.value>=8 && checkedCount>=3){
        strengthIndicator.style.backgroundColor= "green";
    }
    else if(slider.value>4 && checkedCount>=3){
        strengthIndicator.style.backgroundColor= "orange";
    }
    else{
        strengthIndicator.style.backgroundColor= "red";
    }
}


// handle if slidervalue < checkedcoutn , done
