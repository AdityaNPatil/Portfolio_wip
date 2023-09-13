// SELECTING ELEMENTS
let projbtn = document.querySelectorAll('.projbtn');

// APPLYING SOUND WHENEVER A BUTTON IS CLICKED
for(let i = 0; i <projbtn.length; i++) {
    projbtn[i].addEventListener('click',function(event){
        let audio = new Audio('./sounds/clicksound.mp3');
        audio.play();
    })
}
