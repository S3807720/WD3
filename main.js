var slideIndex = 1;
//https://greensock.com/forums/topic/26001-animate-all-elements-with-a-specific-class-using-scrolltrigger-with-stagger/
const scrollElements = gsap.utils.toArray('.cs');
const form = document.querySelector('.form');
const drawer = document.querySelector('.drawer');
const openButton = drawer.nextElementSibling;
const closeButton = drawer.querySelector('sl-button[type="primary"]');
//drawer for mobile

form.addEventListener('sl-submit', () => document.getElementById('confirmation').innerHTML = "Your message has been received.");
openButton.addEventListener('click', () => drawer.show());
closeButton.addEventListener('click', () => drawer.hide());

scrollElements.forEach(element => {
    gsap.set(element, {
        opacity: 0,
        y: 24
    });

    element.anim = gsap.to(element, {
        paused: true,
        opacity: 1,
        y: 0,
    });
});

function staggerPlayBatch(batch) {
    gsap.to(batch, {
        stagger: {
            each: 1,
            onStart: function() { this.targets()[0].anim.play() }
        }
    })
}

function staggerReverseBatch(batch) {
    gsap.to(batch, {
        stagger: {
            each: 1,
            onStart: function() { this.targets()[0].anim.reverse() }
        }
    })
}
ScrollTrigger.batch(scrollElements, {
    onEnter: staggerPlayBatch,
    onLeave: staggerReverseBatch,
    onEnterBack: staggerPlayBatch,
    onLeaveBack: staggerReverseBatch
});



window.addEventListener('scroll', function(e) {
    const targ = document.querySelectorAll('.description');
    const targ2 = document.querySelectorAll('.hero');

    var scrolled = window.pageYOffset * -0.5;
    var rate = scrolled;

    //targ.style.transform = 'transform3d(0px,' + rate + 'px, 0 px)';
    var index = 0,
        length = targ.length;
    for (index; index < length; index++) {
        targ[index].style.transform = 'translate3d(0px,' + rate + 'px, 0px)';
        targ2[index].style.transform = 'translate3d(0px,' + rate + 'px, 0px)';
    }
    for (var ele of targ) {
        var pos = window.pageYOffset * rate;
        ele.style.transform = 'translate3d(0px,' + rate + 'px, 0px)';
    }
});



showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}