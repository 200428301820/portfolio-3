let slideIndex = 0; // වත්මන් ස්ලයිඩයේ දර්ශකය
let slideshowInterval; // ස්ලයිඩ්ෂෝව පාලනය කරන interval එක

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');

    // Loader එක ටික වෙලාවක් පෙන්වා ප්‍රධාන අන්තර්ගතය පෙන්වීම
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';

        // සංගීතය වාදනය කිරීම (autoplay policy නිසා user interaction එකක් අවශ්‍ය විය හැක)
        backgroundMusic.volume = 0.4; // ශබ්දය අඩු කරන්න
        backgroundMusic.play().catch(e => {
            console.log("Audio autoplay failed:", e);
        });

        // ස්ලයිඩ්ෂෝව පටන් ගැනීම
        showSlides(); 

    }, 3000); // Loader එක තත්පර 3ක් පෙන්වයි
});

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // සියලු ස්ලයිඩ් සඟවන්න
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // සියලු තිත් සලකුණු non-active කරන්න
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // ඊළඟ ස්ලයිඩය පෙන්වන්න
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    
    // සෑම තත්පර 4කට වරක් ස්ලයිඩය වෙනස් කරන්න
    clearTimeout(slideshowInterval); // පෙර interval එක ඉවත් කරන්න
    slideshowInterval = setTimeout(showSlides, 4000); // 4 seconds
}