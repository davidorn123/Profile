class Main {
    // Inicializa a classe principal com os dados do currículo e configura a página.
    constructor(dadosFormacao, dadosExperiencia, dadosProjetos, dadosContato) {
        this.dadosFormacao = dadosFormacao;
        this.dadosExperiencia = dadosExperiencia;
        this.dadosProjetos = dadosProjetos;
        this.dadosContato = dadosContato;
        this.init();
    }

    // Renderiza o conteúdo inicial e adiciona os ouvintes de evento.
    init() {
        const link = document.querySelectorAll(".nl a")[0];
        link.classList.add("active");
        this.renderFormacao();
        this.renderExperiencia();
        this.renderProjetos();
        this.renderContato();
        this.configurarFormulario();
        this.configurarAnimacoes();
        window.addEventListener("scroll", this.atualizarProgresso);
        window.addEventListener("scroll", this.atualizarNavAtivo);
    }

    // Cria e insere os elementos da seção de formação no timeline.
    renderFormacao() {
        const divFormacao = document.getElementById("timeline");
        for (const value of this.dadosFormacao) {
            const divItemFormulario = document.createElement("div");
            divItemFormulario.className = "ti";
            divItemFormulario.innerHTML = `
                <p class="yr">${value.ano}</p>
                <h3>${value.titulo}</h3>
                <p>${value.local}</p>`;
            divFormacao.appendChild(divItemFormulario);
        }
    }

    // Cria e insere os elementos da seção de experiência profissional.
    renderExperiencia() {
        const divExperiencia = document.getElementById("timeline2");
        for (const value of this.dadosExperiencia) {
            const divItemExperiencia = document.createElement("div");
            divItemExperiencia.className = "ti";
            divItemExperiencia.innerHTML = `
                <p class="yr">${value.ano}</p>
                <h3>${value.titulo}</h3>
                <p>${value.description}</p>
                <p>${value.local}</p>`;
            divExperiencia.appendChild(divItemExperiencia);
        }
    }

    // Cria e insere os cards de projetos com ícones e tags.
    renderProjetos() {
        const divProjetos = document.getElementById("pgrid");
        for (const value of this.dadosProjetos) {
            let tags = "";
            for (const tag of value.tags) tags += `<span class="tag">${tag}</span>`;
            const divItemProjetos = document.createElement("div");
            divItemProjetos.className = "card";
            divItemProjetos.innerHTML = `
            <div class="card-ico">${value.ico}</div>
            <h3>${value.nome}</h3>
            <p>${value.desc}</p>
            <div class="tags">${tags}</div>`;
            divProjetos.appendChild(divItemProjetos);
        }
    }

    // Cria e insere os links de contato usando elementos <a>.
    renderContato() {
        const divContato = document.getElementById("clinks");
        for (const value of this.dadosContato) {
            const divItemContato = document.createElement("a");
            divItemContato.href = value.href;
            divItemContato.className = "clink";
            divItemContato.target = "_blank";
            divItemContato.innerHTML = '<span class="ico">' + value.ico + '</span>' + value.txt;
            divContato.appendChild(divItemContato);
        }
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

    // Configura o formulário de contato para mostrar feedback e resetar após envio.
    configurarFormulario() {
        const form = document.getElementById("cform");
        const fb = document.getElementById("fb");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!document.getElementById("fn").value.trim()) return;
            fb.style.display = "block";
            form.reset();
            setTimeout(function () { fb.style.display = "none"; }, 4000);
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

const dadosFormacao = [
    { ano: "04/2025 – Cursando", titulo: "Ciência da Computação", local: "Uninter · Online" },
    { ano: "09-2021 - 08/2023", titulo: "Técnico em Eletromecânica", local: "Senai · Pomerode, SC" },
    { ano: "01/2020 – 12/2020", titulo: "Aprendizagem Industrial de Eletricista de Instalações Industriais", local: "Senai · Pomerode, SC" }
];

const dadosExperiencia = [
    { ano: "04/2026 - Altualmente", titulo: "ANDRITZ Separation - Estagio TI · Infra / Suporte", local: "Pomerode · Presencial", description: "Presto suporte aos colaboradores e sou responsável pela infraestrutura da empresa." },
    { ano: "08/2025 - 02/2026", titulo: "Ardatz Tecnologia - Desenvolvedor Júnior", local: "Curitiba · Remoto", description: "Desenvolvimento de plataforma de venda de ingressos com React no front-end e Java no back-end, criando interfaces dinâmicas e mantendo regras de negócio para sistemas de alto fluxo." },
    { ano: "11/2023 - 08/2025", titulo: "Delta Máquinas Têxteis – Desenvolvedor Júnior", local: "Pomerode · Presencial", description: "Desenvolvimento de soluções em JavaScript para automação de máquinas têxteis, com otimização de processos e integração de sistemas com clientes." }
];

const dadosProjetos = [
    { ico: "📈", nome: "Investment-Project (Em Andamento)", desc: "Projeto inspirado no Investidor10 para gerenciar meus investimentos e aprender mais sobre Arquitetura Hexagonal.", tags: ["Backend - TypeScritp", "Frontend - React", "Docker", "Micro-services"] },
    { ico: "📋", nome: "Bill-Project (Em Andamento)", desc: "Projeto para controlar meus gastos mensais e a entrada de dinheiro.", tags: ["Backend - TypeScritp", "Frontend - React", "Docker"] }
];

const dadosContato = [
    { ico: "💼", txt: "linkedin.com/in/davi-dorn-809075287/", href: "https://www.linkedin.com/in/davi-dorn-809075287/" },
    { ico: "🐙", txt: "github.com/Davi473", href: "https://github.com/Davi473" }
];

window.onload = new Main(dadosFormacao, dadosExperiencia, dadosProjetos, dadosContato);