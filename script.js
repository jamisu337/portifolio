document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfólio carregado com sucesso!");

    // -------------------------------------------------------
    // EFEITO NOS CARDS

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#2ecc71';
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#1a2530';
        });
    });

    // -------------------------------------------------------
    // CARROSSEL

    // Verifica se o slider existe na página para evitar erros
    const sliderBg = document.getElementById('slider-bg');

    if (sliderBg) {
        const slides = [
            {
                tag: "CSS TRICKS",
                title: "Advanced CSS Loaders",
                desc: "Copie e cole loaders modernos de alta performance feitos com apenas uma div.",
                img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", 
                link: "blogs/blog-loader.html"
            },
            {
                tag: "DESIGN",
                title: "Magic Navigation Menu",
                desc: "Recriando a famosa barra de navegação com indicador flutuante e efeitos de luz.",
                img: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                link: "blogs/side-bar.html"
            },
            {
                tag: "TUTORIAL",
                title: "Animações Fluídas com CSS",
                desc: "Aprenda a criar micro-interações que encantam o usuário sem pesar o site.",
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                link: "blogs/animacoes-divs.html"
            }
        ];

        // Elementos do HTML
        const sliderTag = document.getElementById('slider-tag');
        const sliderTitle = document.getElementById('slider-title');
        const sliderDesc = document.getElementById('slider-desc');
        const sliderBtn = document.getElementById('slider-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const dots = document.querySelectorAll('.dot-control');

        let currentSlide = 0;
        let slideInterval; // Variável para guardar o temporizador

        // Função Principal de Atualização
        function updateSlider() {
            const slide = slides[currentSlide];

            // Feedback visual (transição suave)
            sliderBg.style.opacity = 0.3;

            setTimeout(() => {
                sliderBg.style.background = `linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%), url('${slide.img}') center/cover`;
                sliderTag.innerText = slide.tag;
                sliderTitle.innerText = slide.title;
                sliderDesc.innerText = slide.desc;
                sliderBtn.onclick = () => window.location.href = slide.link;

                sliderBg.style.opacity = 1;
            }, 200);

            // Atualiza as bolinhas
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        // Função para Avançar o Slide (usada pelo clique e pelo timer)
        function nextSlide() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            updateSlider();
        }

        // Lógica do Autoplay
        function startAutoPlay() {
            slideInterval = setInterval(nextSlide, 7000); // tempo de 7 segundos
        }

        function resetTimer() {
            // Para o timer atual e inicia um novo
            // Isso vai impedir que o slide mude logo depois de você clicar
            clearInterval(slideInterval);
            startAutoPlay();
        }

        // Inicia o Autoplay assim que carrega
        startAutoPlay();

        // Eventos de Clique (com reset do timer)
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetTimer(); // Reinicia a contagem
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = slides.length - 1;
                }
                updateSlider();
                resetTimer(); // Reinicia a contagem
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (index !== null) {
                    currentSlide = parseInt(index);
                    updateSlider();
                    resetTimer(); // Reinicia a contagem
                }
            });
        });
    }

    // -----------------------------------------------------------------------
    // SCROLL REVEAL

    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();
    
});

// dark mode ---------------------------------------------------------------
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se o usuário já tem uma preferência salva ao carregar
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true; // Força o switch a ficar ligado
}

// Função de mudança
themeToggle.addEventListener('change', () => {
    
    if (themeToggle.checked) {
        //Dark Mode
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        //Light Mode
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
    
});
// dark mode ---------------------------------------------------------------

//------------------------------------------- MAGNETIC / PARALLAX EFFECT ---
const bannerContainer = document.getElementById('magnetic-container');

if (bannerContainer) {
    bannerContainer.addEventListener('mousemove', (e) => {
        const shapes = bannerContainer.querySelectorAll('.shape, .center-anchor');
        
        // Pega as dimensões do container
        const rect = bannerContainer.getBoundingClientRect();
        
        // Calcula a posição do mouse relativa ao centro do container
        // (0,0 será o centro exato)
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        shapes.forEach(shape => {
            // Pega a velocidade definida no HTML
            const speed = shape.getAttribute('data-speed');
            
            // Calcula o deslocamento
            const xOffset = x * speed;
            const yOffset = y * speed;
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Quando o mouse sai, as formas voltam ao centro suavemente
    bannerContainer.addEventListener('mouseleave', () => {
        const shapes = bannerContainer.querySelectorAll('.shape, .center-anchor');
        shapes.forEach(shape => {
            shape.style.transform = `translate(0px, 0px)`;
        });
    });
}
