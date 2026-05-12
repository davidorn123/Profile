class Main {
    // Inicializa a classe principal com os dados do currículo e configura a página.
    constructor() {this.init()}

    // Renderiza o conteúdo inicial e adiciona os ouvintes de evento.
    init() {
        const link = document.querySelectorAll(".nl a")[0];
        link.classList.add("active");
        this.configurarFormulario();
        this.configurarMenuMobile();
        this.configurarAnimacoes();
        window.addEventListener("scroll", this.atualizarProgresso);
        window.addEventListener("scroll", this.atualizarNavAtivo);
    }

    // Atualiza a barra de progresso de rolagem com base na posição da página.
    atualizarProgresso() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        document.getElementById("pbar").style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0) + "%";
    }

    // Atualiza o link de navegação ativo conforme o usuário rola a página.
    atualizarNavAtivo() {
        const section = document.querySelectorAll("section");
        const links = document.querySelectorAll(".nl a");
        const scrollY = window.pageYOffset;
        for (const value of section) {
            const topo = value.offsetTop - 80;
            const fundo = topo + value.offsetHeight;
            const condicao = scrollY >= topo && scrollY < fundo;
            if (!condicao) continue;
            for (var j = 0; j < links.length; j++) links[j].classList.remove("active");
            const alvo = document.querySelector('.nl a[href="#' + value.id + '"]');
            if (alvo) alvo.classList.add("active");
        }
    }

    // Configura o formulário de contato para validar campos e exibir confirmação.
    configurarFormulario() {
        const form = document.getElementById("cform");
        const nome = document.getElementById("fn");
        const email = document.getElementById("fe");
        const mensagem = document.getElementById("fm");
        const fb = document.getElementById("fb");

        // Valida o formato básico do e-mail usando uma expressão regular.
        const validarEmail = (valor) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
        };

        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita o envio padrão e permite validação manual.

            // Lê os valores dos campos e remove espaços extras.
            const nomeValidar = nome.value.trim();
            const emailValidar = email.value.trim();
            const mensagemValidar = mensagem.value.trim();

            // Verifica se todos os campos obrigatórios foram preenchidos.
            if (!nomeValidar || !emailValidar || !mensagemValidar) {
                alert("Por favor, preencha todos os campos antes de enviar.");
                return;
            }

            // Verifica se o e-mail informado tem um formato válido.
            if (!validarEmail(emailValidar)) {
                alert("Por favor, informe um e-mail válido no formato usuario@dominio.com.");
                email.focus();
                return;
            }

            // Exibe feedback de sucesso, limpa o formulário e mantém a mensagem por alguns segundos.
            fb.textContent = "Mensagem enviada com sucesso!";
            fb.style.display = "block";
            form.reset();
            alert("Mensagem enviada com sucesso!");
            setTimeout(() => {
                fb.style.display = "none";
            }, 4000);
        });
    }

    // Configura o menu móvel para abrir e fechar usando o botão hambúrguer.
    configurarMenuMobile() {
        const navToggle = document.getElementById("navToggle");
        const navList = document.getElementById("nl");
        const navLinks = document.querySelectorAll(".nl a");

        if (!navToggle || !navList) return;

        const alternarMenu = () => {
            const aberto = navList.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", aberto ? "true" : "false");
        };

        navToggle.addEventListener("click", alternarMenu);

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (navList.classList.contains("open")) {
                    navList.classList.remove("open");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    // Configura animações de entrada para elementos visíveis na rolagem.
    configurarAnimacoes() {
        var els = document.querySelectorAll(".ti, .card, .clink");
        var obs = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add("vis");
                    obs.unobserve(entries[i].target);
                }
            }
        }, { threshold: 0.12 });
        for (var i = 0; i < els.length; i++) obs.observe(els[i]);
    }
}


window.onload = new Main();