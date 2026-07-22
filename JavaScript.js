/* ==========================================
   AMRESH PORTFOLIO JAVASCRIPT
   PART 1
   Loader | Greeting | Typing | Dark Mode
========================================== */


/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 1200);

    }

});


/* ==========================================
   GREETING (console only — no popup, since an
   alert() on every visit interrupts the user
   before they've even seen the page)
========================================== */

window.addEventListener("load", () => {

    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12) {

        greeting = "🌞 Good Morning";

    }

    else if (hour < 18) {

        greeting = "☀️ Good Afternoon";

    }

    else {

        greeting = "🌙 Good Evening";

    }

    console.log(greeting + " — Welcome to Amresh Chaurasiya's Portfolio!");

});


/* ==========================================
   TYPING EFFECT
========================================== */

const typingText = [

    "I'm Amresh Chaurasiya",

    "Web Developer",

    "MERN Stack Learner",

    "B.Sc. IT Student",

    "Future Software Engineer"

];

const typing = document.getElementById("typing");

let textIndex = 0;

let letterIndex = 0;

let deleting = false;

function typingAnimation() {

    if (!typing) return;

    let current = typingText[textIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, letterIndex + 1);

        letterIndex++;

        if (letterIndex === current.length) {

            deleting = true;

            setTimeout(typingAnimation, 1500);

            return;

        }

    }

    else {

        typing.textContent = current.substring(0, letterIndex - 1);

        letterIndex--;

        if (letterIndex === 0) {

            deleting = false;

            textIndex++;

            if (textIndex >= typingText.length) {

                textIndex = 0;

            }

        }

    }

    setTimeout(typingAnimation, deleting ? 60 : 120);

}

typingAnimation();


/* ==========================================
   DARK MODE
========================================== */

const themeBtn = document.getElementById("themeBtn");

function enableDarkMode() {

    document.body.classList.add("dark");

    if (themeBtn) {

        themeBtn.innerHTML = "☀️";

    }

    localStorage.setItem("theme", "dark");

}

function enableLightMode() {

    document.body.classList.remove("dark");

    if (themeBtn) {

        themeBtn.innerHTML = "🌙";

    }

    localStorage.setItem("theme", "light");

}

if (localStorage.getItem("theme") === "dark") {

    enableDarkMode();

}

else {

    enableLightMode();

}

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        if (document.body.classList.contains("dark")) {

            enableLightMode();

        }

        else {

            enableDarkMode();

        }

    });

}


/* ==========================================
   CONSOLE
========================================== */

console.log("====================================");
console.log(" Portfolio Loaded Successfully ");
console.log(" Developer : Amresh Chaurasiya ");
console.log("====================================");


/* ==========================================
   AMRESH PORTFOLIO JAVASCRIPT
   PART 2
   Skills | Netflix Carousel
========================================== */


/* ==========================================
   SKILL BAR ANIMATION
========================================== */

const skillBars = document.querySelectorAll(".progress");

const skillObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const bar = entry.target;

            const width = bar.getAttribute("data-width");

            bar.style.width = width;

        }

    });

},{
    threshold:0.5
});

skillBars.forEach(bar=>{

    bar.style.width="0";

    skillObserver.observe(bar);

});


/* ==========================================
   NETFLIX PROJECT CAROUSEL
========================================== */

const carousel = document.getElementById("carousel");

const scrollAmount = 350;


/* ---------- Next ---------- */

function scrollRightProjects(){

    if(!carousel) return;

    carousel.scrollBy({

        left:scrollAmount,

        behavior:"smooth"

    });

}


/* ---------- Previous ---------- */

function scrollLeftProjects(){

    if(!carousel) return;

    carousel.scrollBy({

        left:-scrollAmount,

        behavior:"smooth"

    });

}


/* ==========================================
   AUTO SCROLL
========================================== */

let autoScroll = setInterval(autoMove,3000);

function autoMove(){

    if(!carousel) return;

    if(

        carousel.scrollLeft + carousel.clientWidth

        >=

        carousel.scrollWidth - 5

    ){

        carousel.scrollTo({

            left:0,

            behavior:"smooth"

        });

    }

    else{

        carousel.scrollBy({

            left:scrollAmount,

            behavior:"smooth"

        });

    }

}


/* ==========================================
   PAUSE ON HOVER
========================================== */

if(carousel){

    carousel.addEventListener("mouseenter",()=>{

        clearInterval(autoScroll);

    });

    carousel.addEventListener("mouseleave",()=>{

        autoScroll = setInterval(autoMove,3000);

    });

}


/* ==========================================
   MOUSE WHEEL SCROLL
========================================== */

if(carousel){

    carousel.addEventListener("wheel",(e)=>{

        e.preventDefault();

        carousel.scrollLeft += e.deltaY;

    });

}


/* ==========================================
   TOUCH SWIPE SUPPORT
========================================== */

let startX = 0;

let endX = 0;

if(carousel){

carousel.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});

carousel.addEventListener("touchmove",(e)=>{

    endX = e.touches[0].clientX;

});

carousel.addEventListener("touchend",()=>{

    if(startX - endX > 50){

        scrollRightProjects();

    }

    if(endX - startX > 50){

        scrollLeftProjects();

    }

});

}


/* ==========================================
   CONSOLE
========================================== */

console.log("Netflix Carousel Loaded Successfully");

/* ==========================================
   AMRESH PORTFOLIO JAVASCRIPT
   PART 3A
   Scroll Top | Navbar | Scroll Reveal
========================================== */


/* ==========================================
   SCROLL TO TOP BUTTON
========================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

        topBtn.style.opacity = "1";

    } else {

        topBtn.style.opacity = "0";

        setTimeout(() => {

            if (window.scrollY <= 400) {

                topBtn.style.display = "none";

            }

        }, 300);

    }

});


function topPage() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ==========================================
   SMOOTH NAVIGATION
========================================== */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


/* ==========================================
   ACTIVE NAVBAR
========================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (

            window.scrollY >= sectionTop &&

            window.scrollY < sectionTop + sectionHeight

        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealItems = document.querySelectorAll(

    "section, .card, .project-card, .skill, table"

);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealItems.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition =

        "opacity .8s ease, transform .8s ease";

    revealObserver.observe(item);

});


/* ==========================================
   HEADER SHADOW ON SCROLL
========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.style.boxShadow =

            "0 8px 20px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow =

            "0 2px 10px rgba(0,0,0,.08)";

    }

});


/* ==========================================
   CONSOLE
========================================== */

console.log("Part 3A Loaded Successfully");

/* ==========================================
   AMRESH PORTFOLIO JAVASCRIPT
   PART 3B
   Resume | Contact | Cursor | Keyboard
========================================== */


/* ==========================================
   RESUME DOWNLOAD
========================================== */

const resumeBtn = document.getElementById("resumeBtn");

if (resumeBtn) {

    resumeBtn.addEventListener("click", () => {

        alert("Downloading Resume...");

        window.open("resume.pdf", "_blank");

    });

}


/* ==========================================
   CONTACT BUTTON
========================================== */

function contactMe() {

    window.location.href =
    "mailto:amreshchaurasiya300@gmail.com";

}


/* ==========================================
   CONTACT FORM VALIDATION
========================================== */

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            form.querySelector("input[type='text']");

        const email =
            form.querySelector("input[type='email']");

        const message =
            form.querySelector("textarea");

        if (

            !name.value.trim() ||

            !email.value.trim() ||

            !message.value.trim()

        ) {

            alert("Please fill all fields.");

            return;

        }

        const subject = encodeURIComponent("Portfolio Contact from " + name.value.trim());
        const body = encodeURIComponent(
            "Name: " + name.value.trim() +
            "\nEmail: " + email.value.trim() +
            "\n\n" + message.value.trim()
        );

        window.location.href =
            "mailto:amreshchaurasiya300@gmail.com?subject=" + subject + "&body=" + body;

        alert("✅ Thank You!\nYour email app should now open with your message ready to send.");

        form.reset();

    });

}


/* ==========================================
   CURSOR GLOW EFFECT
========================================== */

const cursor = document.createElement("div");

cursor.className = "cursor-glow";

document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

});


/* ==========================================
   KEYBOARD SHORTCUTS
========================================== */

document.addEventListener("keydown", (e) => {

    switch (e.key.toLowerCase()) {

        case "h":

            document.querySelector("#home")
                ?.scrollIntoView({ behavior: "smooth" });
            break;

        case "a":

            document.querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" });
            break;

        case "e":

            document.querySelector("#education")
                ?.scrollIntoView({ behavior: "smooth" });
            break;

        case "s":

            document.querySelector("#skills")
                ?.scrollIntoView({ behavior: "smooth" });
            break;

        case "p":

            document.querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            break;

        case "c":

            document.querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            break;

        case "t":

            topPage();
            break;

    }

});


/* ==========================================
   PAGE TITLE ANIMATION
========================================== */

const titles = [

    "Amresh Portfolio",

    "B.Sc. IT Student",

    "Web Developer",

    "MERN Stack Learner"

];

let titleIndex = 0;

setInterval(() => {

    document.title = titles[titleIndex];

    titleIndex++;

    if (titleIndex >= titles.length) {

        titleIndex = 0;

    }

}, 2500);


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left =

            e.clientX - rect.left + "px";

        ripple.style.top =

            e.clientY - rect.top + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load", () => {

    console.clear();

    console.log("%cPortfolio Ready ✔",
        "color:green;font-size:18px;font-weight:bold;");

    console.log("%cDesigned by Amresh Chaurasiya",
        "color:#0b5394;font-size:16px;");

});

/* ==========================================
   AMRESH PORTFOLIO JAVASCRIPT
   PART 4
   Advanced Features
========================================== */


/* ==========================================
   ANIMATED COUNTERS
========================================== */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");

        const current = +counter.innerText;

        const increment = Math.ceil(target / 100);

        if(current < target){

            counter.innerText = current + increment;

            setTimeout(updateCounter,20);

        }

        else{

            counter.innerText = target;

        }

    };

    updateCounter();

});


/* ==========================================
   PROJECT IMAGE ZOOM
========================================== */

document.querySelectorAll(".project-card img").forEach(image=>{

    image.addEventListener("click",()=>{

        image.classList.toggle("zoom");

    });

});


/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },500);

    },2500);

}


/* ==========================================
   KEYBOARD SECRET
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.shiftKey && e.key==="A"){

        showToast("👋 Welcome Amresh!");

    }

});


/* ==========================================
   VISITOR INFORMATION
========================================== */

console.log("Browser :",navigator.userAgent);

console.log("Screen :",screen.width+" x "+screen.height);

console.log("Language :",navigator.language);


/* ==========================================
   PAGE PERFORMANCE
========================================== */

window.addEventListener("load",()=>{

    const time = performance.now();

    console.log("Page Loaded in "+time.toFixed(2)+" ms");

});


/* ==========================================
   RANDOM QUOTE
========================================== */

const quotes=[

"Dream Big 🚀",

"Keep Learning 📚",

"Code Every Day 💻",

"Never Give Up 🔥",

"Practice Makes Perfect ⭐"

];

setInterval(()=>{

    console.log(quotes[Math.floor(Math.random()*quotes.length)]);

},5000);