function activate(){
    document.querySelector(".broken").classList.add("active");
}function deactivate(){
    document.querySelector(".broken").classList.remove("active");
}

let slideInterval;
const intervalTime = 10000; // 10 seconds

const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;
let items = document.querySelectorAll(".carousel-item").length;
let itemsPerView = window.innerWidth < 768 ? 1 : 2;
let totalSlides = Math.ceil(items / itemsPerView);

// Function to create dots dynamically
function createDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    totalSlides = Math.ceil(items / itemsPerView); // Recalculate total slides

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goToSlide(i);
            startAutoSlide(); // Reset timer
        });
        dotsContainer.appendChild(dot);
    }
}

// Function to update carousel position and active dot
function updateCarousel() {
    let itemWidth = document.querySelector(".carousel-item").offsetWidth + 
                    parseInt(getComputedStyle(track).gap);
    
    track.style.transform = `translateX(${-index * itemWidth * itemsPerView}px)`;

    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

// Function to navigate to a specific slide
function goToSlide(slideIndex) {
    index = slideIndex;
    updateCarousel();
}

// Next button functionality with looping effect
nextBtn.addEventListener("click", () => {
    if (index < totalSlides - 1) {
        index++;
    } else {
        index = 0; // Loop back to the first slide
    }
    updateCarousel();
    startAutoSlide(); // Reset timer
});

// Previous button functionality with looping effect
prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
    } else {
        index = totalSlides - 1; // Loop back to the last slide
    }
    updateCarousel();
    startAutoSlide(); // Reset timer
});

// Handle window resizing
window.addEventListener("resize", () => {
    itemsPerView = window.innerWidth < 845 ? 1 : 2;
    index = 0; // Reset index to prevent glitches
    createDots(); // Recreate dots based on new viewport size
    updateCarousel();
});

function startAutoSlide() {
    clearInterval(slideInterval); // Clear existing interval
    slideInterval = setInterval(() => {
        nextBtn.click(); // Trigger the next button click
    }, intervalTime);
}

function pauseAutoSlide() {
    clearInterval(slideInterval);
}

// Pause on hover for all carousel items
document.querySelectorAll(".carousel-item").forEach(item => {
    item.addEventListener("mouseenter", pauseAutoSlide);
    item.addEventListener("mouseleave", startAutoSlide);
});

// Initial setup
createDots();
updateCarousel();
startAutoSlide();
