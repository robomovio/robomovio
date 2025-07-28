// mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Collapsible sections
document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', () => {
        const collapsible = header.parentElement;
        collapsible.classList.toggle('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize map
function initMap() {
    const memberMap = L.map('member_map', { 
        center: [49.005, 12.12], 
        zoom: 12, 
        maxBounds: [[-90, -180], [90, 180]], 
        maxBoundsViscosity: 0.8, 
        zoomControl: true, 
        attributionControl: true 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(memberMap);

    const markers = [
        {
            lat: 49.0001171,
            lng: 12.1041891,
            title: "MINT-Labs",
            popup: "<div style='text-align: center; padding: 10px;'><h3 style='margin: 0 0 10px 0; color: #6366f1;'>MINT-Labs</h3><p style='margin: 0; color: #64748b;'>Our main meeting point</p></div>"
        },
        {
            lat: 49.00844192504883,
            lng: 12.14494800567627,
            title: "Continental / Aumovio",
            popup: "<div style='text-align: center; padding: 10px;'><h3 style='margin: 0 0 10px 0; color: #8b5cf6;'>Continental / Aumovio</h3><p style='margin: 0; color: #64748b;'>Our secondary meeting point</p></div>"
        }
    ];

    markers.forEach((marker, index) => {
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background: ${index === 0 ? '#6366f1' : '#8b5cf6'};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
            ">${index + 1}</div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        L.marker([marker.lat, marker.lng], { icon: customIcon })
            .addTo(memberMap)
            .bindPopup(marker.popup)
            .bindTooltip(marker.title, {
                permanent: false,
                direction: 'top',
                offset: [0, -20]
            });
    });
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Delay map initialization to ensure proper loading
    setTimeout(initMap, 500);
});

// Add some initial animations
window.addEventListener('load', () => {
    document.querySelector('.hero-content').classList.add('visible');
});


// contact form w ith EmailJS
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('contact-status');
    status.textContent = 'Sending...';

    emailjs.sendForm('service_lmzfqas', 'template_bw0zk5n', this)
        .then(() => {
            status.style.color = 'var(--success)';
            status.textContent = 'Message sent successfully!';
            this.reset();
        }, (err) => {
            status.style.color = 'var(--error)';
            status.textContent = 'Failed to send. Try again later.';
            console.error('EmailJS error:', err);
        });
});
