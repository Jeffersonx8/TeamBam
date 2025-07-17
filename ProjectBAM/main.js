// InTurn Survey App Logic
window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');
    const summary = document.getElementById('summary');
    let userName = '';

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            userName = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const skills = document.getElementById('skills').value.trim();
            // Show summary on screen2
            if (summary) {
                summary.innerHTML =
                    `<strong>Name:</strong> ${userName ? userName : '-'}<br>` +
                    `<strong>Age:</strong> ${age ? age : '-'}<br>` +
                    `<strong>Skills:</strong><br><pre style="background:#f3f6fa;padding:0.7em 1em;border-radius:7px;font-size:1em;">${skills ? skills : '-'}</pre>`;
            }
            if (screen1) screen1.style.display = 'none';
            if (screen2) screen2.style.display = 'block';
            setTimeout(() => {
                if (screen2) screen2.style.display = 'none';
                afterSubmitShowScreen3();
            }, 1200);
        });
    }

    // Sliding screens logic
    const screenNames = ['briefcase', 'pin', 'video'];
    let currentScreen = 0;

    function renderScreen3Slides() {
        const content = document.getElementById('screen3-content');
        if (!content) return;
        const heyMsg = `Hey${userName ? ' ' + userName : ''}`;
        content.innerHTML = `
          <div class=\"hey-bar\"><div><span class=\"hey-user\">${heyMsg}</span><span class=\"hey-underline\" style=\"width:${Math.max(40, Math.min(180, heyMsg.length*10))}px\"></span></div></div>
          <div class=\"screen3-slider\">
            <div class=\"screen3-slide\" id=\"slide-briefcase\"></div>
            <div class=\"screen3-slide\" id=\"slide-pin\"></div>
            <div class=\"screen3-slide\" id=\"slide-video\"></div>
          </div>
        `;
        updateSlides();
    }


    function updateSlides(prevScreen) {
        const slides = [
            document.getElementById('slide-briefcase'),
            document.getElementById('slide-pin'),
            document.getElementById('slide-video')
        ];
        slides.forEach((slide, idx) => {
            if (!slide) return;
            slide.className = 'screen3-slide';
            if (idx === currentScreen) {
                slide.classList.add('active');
            } else if (prevScreen !== undefined && idx === prevScreen) {
                slide.classList.add(prevScreen > currentScreen ? '' : 'left');
            } else if (idx < currentScreen) {
                slide.classList.add('left');
            }
        });
        // Content for each slide
        if (slides[0]) slides[0].innerHTML = '';
        if (slides[1]) slides[1].innerHTML = '';
        if (slides[2]) slides[2].innerHTML = '';
    }

    function slideTo(idx) {
        if (idx === currentScreen) return;
        const prev = currentScreen;
        currentScreen = idx;
        updateSlides(prev);
    }

    function showBriefcaseScreen() { slideTo(0); }
    function showPinScreen() { slideTo(1); }
    function showVideoScreen() { slideTo(2); }

    // Initial render
    function showScreen3() {
        renderScreen3Slides();
    }

    setTimeout(() => {
        const navBriefcase = document.getElementById('nav-briefcase');
        const navPin = document.getElementById('nav-pin');
        const navVideo = document.getElementById('nav-video');
        if (navBriefcase) navBriefcase.onclick = showBriefcaseScreen;
        if (navPin) navPin.onclick = showPinScreen;
        if (navVideo) navVideo.onclick = showVideoScreen;
    }, 0);

    // Replace showBriefcaseScreen call after submit
    function afterSubmitShowScreen3() {
        if (screen3) {
            screen3.style.display = 'block';
            showScreen3();
        }
    }
});
