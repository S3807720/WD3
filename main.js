//set slide index
var slideIndex = 1;
//https://greensock.com/forums/topic/26001-animate-all-elements-with-a-specific-class-using-scrolltrigger-with-stagger/
//set constants for each element required later - scrolling parts for the gsap,
// form for the form submission and confirmation message for
//drawer for the mobile menu & buttons for that
const scrollElements = gsap.utils.toArray('.cs');
const form = document.querySelector('.form');
const drawer = document.querySelector('.drawer');
const openButton = drawer.nextElementSibling;
const closeButton = drawer.querySelector('sl-button[type="primary"]');
//drawer for mobile
//add event listener for the form and buttons
form.addEventListener('sl-submit', () => document.getElementById('confirmation').innerHTML = "Your message has been received.");
openButton.addEventListener('click', () => drawer.show());
closeButton.addEventListener('click', () => drawer.hide());

//for each element that has scrolling enabled, set opacity to 0 and change position
scrollElements.forEach(element => {
    gsap.set(element, {
        opacity: 0,
        y: 24,
    });

    element.anim = gsap.to(element, {
        paused: true,
        opacity: 1,
        y: 0,
    });
});

//play animation to make thingies appear
function staggerPlayBatch(batch) {
    gsap.to(batch, {
        stagger: {
            each: 1,
            onStart: function() { this.targets()[0].anim.play() }
        }
    })
}
//make thingies go away
function staggerReverseBatch(batch) {
    gsap.to(batch, {
        stagger: {
            each: 1,
            onStart: function() { this.targets()[0].anim.reverse() }
        }
    })
}
//thingy to trigger each method
ScrollTrigger.batch(scrollElements, {
    onEnter: staggerPlayBatch,
    onLeave: staggerReverseBatch,
    onEnterBack: staggerPlayBatch,
    onLeaveBack: staggerReverseBatch
});


//method to parallax the home page
window.addEventListener('scroll', function(e) {
    //set elements for description and image
    const targ = document.querySelectorAll('.description');
    const targ2 = document.querySelectorAll('.hero');
    const targ3 = document.getElementById("about");
    //set the position to send it as scrolling
    var scrolled = window.pageYOffset;
    //change to negative so it scrolls up
    var rate = scrolled * -0.1;
    //variables to store index and length of elements array
    var index = 0,
        length = targ.length;
    for (index; index < length; index++) {
        //loop through array, setting elements to move up, giving parallax effect
        targ[index].style.transform = 'translate3d(0px,' + rate + 'px, 0px)';
        targ2[index].style.transform = 'translate3d(0px,' + rate + 'px, 0px)';
    }
    //slowly lower opacity as scrolling to give a fading effect
    targ3.style.opacity = 1 - scrolled / 300;
});


//set default slide
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    //if the number is higher than the slides count, reset to beginning
    if (n > slides.length) { slideIndex = 1 }
    //opposite, send to end if it goes to 0/negative
    if (n < 1) { slideIndex = slides.length }
    //loop through and set everything to hidden
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //and display the right one :)
    slides[slideIndex - 1].style.display = "block";
}