// InTurn Survey App Logic
window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    const screen1 = document.getElementById('screen1');
    // const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');
    // const summary = document.getElementById('summary');
    let userName = '';

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            userName = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const skills = document.getElementById('skills').value.trim();
            // Show loading screen for 3 seconds, then go to screen3
            if (screen1) screen1.style.display = 'none';
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) loadingScreen.style.display = 'flex';
            setTimeout(() => {
                if (loadingScreen) loadingScreen.style.display = 'none';
                afterSubmitShowScreen3();
                setTimeout(showCards, 350); // slight delay for effect
            }, 3000);
        });
    }

    function showCards() {
        const stack = document.getElementById('cardStack');
        if (!stack) return;
        stack.style.opacity = 0;
        stack.style.display = 'flex';
        setTimeout(() => {
            stack.style.transition = 'opacity 0.5s';
            stack.style.opacity = 1;
        }, 50);
        setupCardStackEvents();
    }

    function setupCardStackEvents() {
        const cards = Array.from(document.querySelectorAll('.card'));
        let current = 0;
        const msg = document.getElementById('selectedCardMsg');
        function showCard(idx) {
            cards.forEach((card, i) => {
                if (i === idx) {
                    card.classList.remove('hide');
                    card.classList.add('selected');
                    card.focus();
                } else {
                    card.classList.add('hide');
                    card.classList.remove('selected');
                }
            });
        }
        function removeCard(idx) {
            if (cards[idx]) {
                cards[idx].classList.add('hide');
                cards[idx].classList.remove('selected');
            }
        }
        function printCard(idx) {
            if (msg) {
                const logo = cards[idx].querySelector('.card-logo');
                msg.innerHTML += `<div style='margin:1.1em auto;display:flex;flex-direction:column;align-items:center;'><img src='${logo.src}' alt='Microsoft' style='width:48px;height:48px;display:block;margin-bottom:0.5em;'><span style='color:#ff512f;font-size:1.3em;font-weight:700;'>Bam</span></div>`;
            }
        }
        showCard(current);
        document.addEventListener('keydown', onKey);
        function onKey(e) {
            if (screen3 && screen3.style.display !== 'block') return;
            if (cards.filter(c => !c.classList.contains('hide')).length === 0) return;
            if (e.key === 'ArrowRight') {
                printCard(current);
                removeCard(current);
                current++;
                if (current < cards.length) {
                    showCard(current);
                }
            } else if (e.key === 'ArrowLeft') {
                removeCard(current);
                current++;
                if (current < cards.length) {
                    showCard(current);
                }
            }
        }
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
