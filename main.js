// Typewriter text animation
const typedTextSpan = document.querySelector(".type-anime")
const cursorSpan = document.querySelector(".cursor-anime")
const figIcons = document.getElementById("fig-icons")

const textArray = document.querySelector(".type-anime").getAttribute('data-elements').split(','); //["WEB DEVELOPERS", "CREATIVE", "AMBITIOUS"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0; 

function type(){
    if(charIndex < textArray[textArrayIndex].length){
        if(!cursorSpan.classList.contains('.typing')) cursorSpan.classList.add('.typing')
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else{
        cursorSpan.classList.remove('.typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase(){
    if (charIndex > 0){
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        plusSlides(1);
        if (figIcons.scrollLeft !== figIcons.scrollWidth) {
          figIcons.scrollTo(figIcons.scrollLeft + 100, 0);
        } else {
          console.log("Scroll End")
          figIcons.scrollTo(0, 0);
        }
        setTimeout(type, typingDelay+200);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    if (textArray.length) setTimeout(type,500);
})

//get subscriber email address
const scriptURL = 'https://script.google.com/macros/s/AKfycbyzuywTVWnElInuXtius19e0cn9mmVIS19Ysb2IH6IQLimMj9k/exec'
const form = document.forms['get-email']

  form.addEventListener('submit', e => {
    // e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message));

    alert('Succesfully submitted. Thank you!');
  })

  //Features Description
  function changeZ(id){
    const descriptions = document.getElementsByClassName("feature-desc");
    const imgCont = document.getElementsByClassName("img-cont")
    for (let i=0; i<descriptions.length; i++){
      descriptions[i].style.zIndex= -1;
      imgCont[i].style.boxShadow = "-7px -7px 14px #cbced1, 7px 7px 14px #fff";
    }
    document.getElementById(id + "-desc").style.zIndex = 90;
    document.getElementById(id).style.boxShadow = "inset 6px 6px 10px 0 #cbced1, inset -6px -6px 10px 0 #cbced1";
  }

  //carousel
  var slides = document.getElementsByClassName("slider-image-div");
  var slideIndex = 1;
  showSlides(slideIndex);

  //next/previous controls
  function plusSlides(n){
    slides[slideIndex-1].style.display = "none";
    showSlides(slideIndex += n);
  }

  function currentslide(n){
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    slides[slideIndex-1].style.display = "block";
  }

  //Countdown Timer
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  
  function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
  
  const deadline = 'August 22 2020 10:00:00 GMT+0530';
  // initializeClock('clockdiv', deadline);