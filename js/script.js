/* --- Initialization & Base Setup --- */
AOS.init({ once: true, offset: 50, duration: 800, easing: 'ease-out-cubic' });

/* --- Scroll Progress Bar --- */
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '3px';
progressBar.style.backgroundColor = '#00f2fe';
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'width 0.1s';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (winScroll / height) * 100 + "%";
    
    // Navbar Glass effect on scroll
    const nav = document.getElementById('navbar');
    if (winScroll > 50) {
        nav.classList.add('shadow-lg', 'bg-cloud-900/90');
        nav.classList.remove('py-4');
        nav.classList.add('py-2');
    } else {
        nav.classList.remove('shadow-lg', 'bg-cloud-900/90');
        nav.classList.remove('py-2');
        nav.classList.add('py-4');
    }
});

/* --- Custom Cursor --- */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Hide on touch devices
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay for outline
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 50);
    });
}

/* --- Mobile Menu Toggle --- */
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileBtnIcon = mobileBtn.querySelector('i');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    if(mobileMenu.classList.contains('hidden')){
        mobileMenu.classList.add('-translate-x-full');
        mobileBtnIcon.classList.remove('fa-times');
        mobileBtnIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    } else {
        setTimeout(() => mobileMenu.classList.remove('-translate-x-full'), 10);
        mobileBtnIcon.classList.remove('fa-bars');
        mobileBtnIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    }
}
mobileBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

/* --- Typing Effect --- */
const words = ["Cloud Architect", "DevOps Engineer", "Infrastructure Coder", "AWS & Azure Pro"];
let i = 0, timer, wordIdx = 0, isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, i - 1);
        i--;
    } else {
        typewriterEl.textContent = currentWord.substring(0, i + 1);
        i++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && i === currentWord.length) {
        typeSpeed = 1500; // Pause at end
        isDeleting = true;
    } else if (isDeleting && i === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeWriter, typeSpeed);
}
setTimeout(typeWriter, 1000);

/* --- Data Generation: Skills --- */
const skillsData = [
    { name: "Python", icon: "devicon-python-plain" },
    { name: "C++", icon: "devicon-cplusplus-plain" },
    { name: "C", icon: "devicon-c-plain" },
    { name: "Java", icon: "devicon-java-plain" },
    { name: "HTML", icon: "devicon-html5-plain" },
    { name: "CSS", icon: "devicon-css3-plain" },
    { name: "JavaScript", icon: "devicon-javascript-plain" },
    { name: "MySQL", icon: "devicon-mysql-plain" },
    { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
    { name: "Docker", icon: "devicon-docker-plain" }
];

const skillsGrid = document.getElementById('skills-grid');
if (skillsGrid) {
    skillsData.forEach((skill, idx) => {
        const delay = (idx % 5) * 100;
        const progress = Math.floor(Math.random() * 20) + 75; // Random 75-95%
        
        const card = document.createElement('div');
        card.className = "skill-card glass rounded-xl h-32 relative transform-style-3d cursor-pointer shadow-lg";
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', delay);
        card.innerHTML = `
            <div class="skill-inner absolute w-full h-full transition-transform duration-500 transform-style-3d">
                <!-- Front -->
                <div class="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 border border-white/5 rounded-xl bg-gradient-to-br from-white/5 to-transparent">
                    <i class="${skill.icon} text-4xl text-gray-300 group-hover:text-cloud-neon transition-colors mb-2"></i>
                    <span class="font-semibold text-sm drop-shadow-md">${skill.name}</span>
                </div>
                <!-- Back -->
                <div class="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center px-4 rounded-xl glass border border-cloud-neon/50">
                    <p class="text-xs text-center mb-2 font-mono text-cloud-neon">Proficiency</p>
                    <div class="w-full bg-cloud-900 rounded-full h-2 mb-1 border border-white/10">
                        <div class="bg-gradient-to-r from-cloud-glow to-cloud-neon h-full rounded-full w-0 transition-all duration-1000 ease-out" data-progress="${progress}%"></div>
                    </div>
                    <p class="text-right text-xs font-bold text-white">${progress}%</p>
                </div>
            </div>
        `;
        skillsGrid.appendChild(card);
        
        // Trigger progress bar animation on hover
        card.addEventListener('mouseenter', () => {
            const bar = card.querySelector('[data-progress]');
            bar.style.width = bar.getAttribute('data-progress');
        });
        card.addEventListener('mouseleave', () => {
            const bar = card.querySelector('[data-progress]');
            bar.style.width = '0%';
        });
    });
}

/* --- Project Modals Data --- */
const projectsData = [
    {
        title: "Library Tracker",
        img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200",
        desc: "Built an interactive Library Tracker for managing academic events. Added features like month navigation and event highlighting. Delivered a clean, easy-to-use calendar system for students and faculty.",
        tech: ["Java", "HTML", "CSS"],
        demo: "#", github: "https://github.com/vinitrai03/Library-tracker-"
    },
    {
        title: "AWS Serverless Attendance",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
        desc: "Built a cost-efficient serverless attendance system to reduce the usage of database. Automated file processing, scalable design, and real-time monitoring. Delivered a fully automated workflow with secure access.",
        tech: ["AWS S3", "AWS Lambda", "CloudWatch", "IAM", "Python"],
        demo: "#", github: "https://github.com/vinitrai03/AWS-Based-Serverless-Attendance-Automation-"
    }
];

/* --- Modal Logic --- */
const modal = document.getElementById('project-modal');
const modalContentWrap = document.getElementById('modal-content-wrap');
const modalContent = document.getElementById('modal-content');

window.openModal = function(idx) {
    const data = projectsData[idx];
    if(modalContent) {
        modalContent.innerHTML = `
            <div class="h-64 sm:h-80 w-full relative">
                <img src="${data.img}" class="w-full h-full object-cover rounded-t-2xl" alt="${data.title}">
                <div class="absolute inset-0 bg-gradient-to-t from-cloud-900 to-transparent"></div>
                <h3 class="absolute bottom-6 left-6 text-3xl font-bold text-white shadow-sm">${data.title}</h3>
            </div>
            <div class="p-6 sm:p-8">
                <p class="text-gray-300 text-lg mb-6 leading-relaxed">${data.desc}</p>
                <h4 class="text-cloud-neon font-mono text-sm mb-3 uppercase tracking-wider">Tech Stack Breakdown</h4>
                <div class="flex flex-wrap gap-2 mb-8">
                    ${data.tech.map(t => `<span class="bg-white/10 border border-white/20 text-gray-200 px-3 py-1.5 rounded-md text-sm">${t}</span>`).join('')}
                </div>
                <div class="flex gap-4">
                    <a href="${data.github}" class="flex-1 text-center border border-white/30 text-white font-bold py-3 rounded-lg hover:bg-white/10 transition-colors">
                        <i class="fa-brands fa-github mr-2"></i> View Code
                    </a>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('visible');
            modalContentWrap.classList.remove('scale-95');
            modalContentWrap.classList.add('scale-100');
            document.body.style.overflow = 'hidden';
        }, 10);
    }
}

window.closeModal = function() {
    if(modal) {
        modal.classList.remove('visible');
        modalContentWrap.classList.remove('scale-100');
        modalContentWrap.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

/* --- Magnetic Button Logic --- */
const magnetics = document.querySelectorAll('.btn-magnetic');
magnetics.forEach(btn => {
    btn.parentElement.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.parentElement.addEventListener('mouseleave', function() {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

/* --- Contact Form --- */
// Standard HTML form submission is used now via FormSubmit.co

/* --- Minimal Vanilla JS Particles Background --- */
const canvas = document.getElementById('particles-bg');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * -0.5 - 0.1; // Float UP
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) this.y = canvas.height;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
        }
        draw() {
            ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const count = window.innerWidth < 768 ? 40 : 100;
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
}
