// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for Reveal Animations
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Performance Dashboard Simulation
function setProgress(circleId, textId, percent) {
    const circle = document.getElementById(circleId);
    const text = document.getElementById(textId);
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
    
    text.textContent = `${Math.round(percent)}%`;
}

let cpuVal = 0;
let ramVal = 48;
let diskVal = 62;

function animateDashboard() {
    // Randomize CPU a bit more frequently
    cpuVal += (Math.random() * 10 - 5);
    if (cpuVal < 5) cpuVal = 5;
    if (cpuVal > 95) cpuVal = 95;
    
    // RAM and Disk change slowly
    ramVal += (Math.random() * 2 - 1);
    if (ramVal < 40) ramVal = 40;
    if (ramVal > 55) ramVal = 55;
    
    setProgress('cpu-ring', 'cpu-value', cpuVal);
    setProgress('ram-ring', 'ram-value', ramVal);
    setProgress('disk-ring', 'disk-value', diskVal);
    
    requestAnimationFrame(() => {
        // Slow down the animation loop for readability
        setTimeout(animateDashboard, 100);
    });
}

// Start dashboard animation when visible
const dashboardSection = document.getElementById('performance');
const dashboardObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateDashboard();
    }
}, { threshold: 0.1 });

dashboardObserver.observe(dashboardSection);

// Copy to Clipboard Functionality
function copyCode(btn) {
    const code = btn.nextElementSibling.querySelector('pre code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.background = 'var(--accent-green)';
        btn.style.color = 'var(--bg-darker)';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = 'var(--glass-border)';
            btn.style.color = 'var(--text-gray)';
        }, 2000);
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
