document.addEventListener("DOMContentLoaded", function () {
    const chatlogs = document.getElementById("chatlogs");
    const userInput = document.getElementById("userInput");
    const speechSynthesis = window.speechSynthesis;
    let step = 1;
    let voicesLoaded = false;  // Adicione esta linha
    const user = {};
    let pacote = [];
    let respostas = [];

    function selectVoice() {
        let voices = window.speechSynthesis.getVoices();
        let ptVoices = voices.filter(voice => voice.lang.includes('pt-BR'));
        if (ptVoices.length > 4) {
            selectedVoice = ptVoices[4];  // Use a primeira voz em português disponível
        }
    }

    window.speechSynthesis.onvoiceschanged = function() {
        if (!voicesLoaded) {  // Adicione esta linha
            selectVoice();
            showMainMenu();  // Chame showMainMenu aqui
            voicesLoaded = true;  // Adicione esta linha
        }
    };

    function speakMessage(message) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.1;
        utterance.voice = selectedVoice;
        synth.speak(utterance);
    }

    
    function appendMessage(who, message) {
        const chat = document.createElement("div");
        chat.classList.add("chat", who);
        chat.innerHTML = `
            <div class="user-photo"></div>
            <p class="chat-message">${message}</p>
        `;
        chatlogs.appendChild(chat);
        chatlogs.scrollTop = chatlogs.scrollHeight;

        if (who === "bot") {
            speakMessage(message);
        }
    }

      // Crie uma nova instância de SpeechSynthesisUtterance
let utterance = new SpeechSynthesisUtterance();

// Obtenha a lista de vozes disponíveis
let voices = window.speechSynthesis.getVoices();

// Filtrar as vozes para apenas as vozes em português
let ptVoices = voices.filter(voice => voice.lang.includes('pt-BR'));

// Escolha a voz que você quer usar pelo índice
let selectedVoice = ptVoices[3];  // Substitua 3 pelo índice da voz que você quer

// Defina a voz da utterance para a voz selecionada
utterance.voice = selectedVoice;

// Adicione um ouvinte de eventos ao campo de entrada do usuário
userInput.addEventListener('input', function(event) {
    // Obtenha o valor atual do campo de entrada
    let text = event.target.value;

    // Defina o texto da utterance para o valor atual do campo de entrada
    utterance.text = text;

    // Fale o texto
    window.speechSynthesis.speak(utterance);
});



    function storeUserData() {
        // Armazena os dados do usuário na lista
        user.name = appendMessage("user").value;
        user.age = appendMessage("user").value;
        user.contact = appendMessage("user").value;
        user.sex = appendMessage("user").value;
        user.email = appendMessage("user").value;
        user.confirmPassword = appendMessage("user").value;
      }
    

    function validateForms(qt) {
        // Aceita letras, números, espaços e pontuações Unicode
        const regex = /^[\p{L}0-9\s\p{P}]+$/u;
        return regex.test(qt);
    }
    
    function validateName(name) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(name);
    }

    function validateAge(age) {
        const num = parseInt(age);
        return !isNaN(num) && num >= 18 && num <= 100;
    }

    function validateSex(sex) {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(sex);
    }

    function validateContact(contact) {
        const regex = /^\d{11,11}$/;
        return regex.test(contact);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showMainMenu() {
        appendMessage("bot", "Olá, bem-vindo a Laços, eu sou a Isabella, a assistente virtual da Laços, é um prazer ter você aqui.");
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 se você tem baixa visão ou cegueira total, e necessita usar a assistente virtual.");
        appendMessage("bot", "Digite 2 se você não possui baixa visão ou cegueira total, e deseja ir para as páginas do sistema Laços.");
        step = 1;
    }

    function showSecondMenu() {
        appendMessage("bot", "Ótimo, irei te auxiliar com minha voz para uma melhor experiência.");
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 para conhecer a laços.");
        appendMessage("bot", "Digite 2 para se cadastrar ou fazer login.");
        appendMessage("bot", "Digite 3 para conhecer nossos pacotes de casamento.");
        appendMessage("bot", "Digite 4 para saber nosso contato, como e-mail e telefone.");
        appendMessage("bot", "Digite 5 para reproduzir as opções novamente.");
        step = 2;
    }

    function showThirdMenu() {
        appendMessage("bot", "A Laços é um projeto inovador dedicado a celebrar casamentos com inclusão e acessibilidade em mente, tornando o grande dia memorável para pessoas com deficiência visual, como baixa visão, cegueira e daltonismo. Nosso compromisso é criar experiências matrimoniais únicas, onde o amor se traduz em todos os sentidos, tornando o dia especial verdadeiramente inesquecível.");
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 para reproduzir a explicação novamente");
        appendMessage("bot", "Digite 2 para voltar ao menu anterior");
        step = 3;
    }

    function showFourthMenu() {
        appendMessage("bot", "Ótimo, escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 se você já possui cadastro e gostaria de fazer login em sua conta.");
        appendMessage("bot", "Digite 2 se você ainda não é cadastrado, mas gostaria de criar uma conta.");
        appendMessage("bot", "Digite 3 para reproduzir as opções novamente.");
        appendMessage("bot", "Digite 4 para voltar ao menu anterior.");
        step = 4;
    }

    function showFiveMenu() {
        appendMessage("bot", "Perfeito, você está na área de pacotes. Chegou a hora das escolhas para seu casamento.");
        appendMessage("bot", "Digite 1 para prosseguir com a personalização do pacote de seu casamento");
        appendMessage("bot", "Digite 2 para voltar ao menu anterior.");
        appendMessage("bot", "Digite 3 reproduzir a explicação e as opções novamente.");
        step = 5;
    }

    function showSixMenu() {
        appendMessage("bot", "Ótimo, nosso e-mail é o laços@casamento.com, e nosso telefone é o número 11 9584545112.");
        appendMessage("bot", "Digite 1 para reproduzir os contatos novamente.");
        appendMessage("bot", "Digite 2 para voltar ao menu anterior");
        step = 6;
    }

    function showSevenMenu() {
        appendMessage("bot", "Para acessar a área de cadastro precisamos informar que iremos solicitar alguns dados necessários, como por exemplo seu número de contato e seu e-mail.");
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 se você deseja se cadastrar.");
        appendMessage("bot", "Digite 2 se você deseja voltar ao menu anterior.");
        appendMessage("bot", "Digite 3 se deseja repetir a explicação e as opções");
        step = 7;
    }

    function showEightMenu() {
        appendMessage("bot", "Você está na área de cadastro. Por favor, digite seu nome: ");
        step = 8;
    }

    function showNineMenu() {
        appendMessage("bot", "Ótimo! Agora, por favor, digite sua idade: ");
        step = 9;
    }

    function showTenMenu() {
        appendMessage("bot", "Excelente! Agora, por favor, digite seu contato: ");
        step = 10;
    }

    function showElevenMenu() {
        appendMessage("bot", "Agora, por favor, digite seu sexo: ");
        step = 11;
    }

    function showTwelveMenu() {
        appendMessage("bot", "Ótimo! Agora, por favor, digite seu e-mail: ");
        step = 12;
    }

    function showThirteenMenu() {
        appendMessage("bot", "Excelente! Agora, por favor, digite sua senha: ");
        step = 13;
    }

    function showFourteenMenu() {
        userInput.previousPassword = userInput.value;
        appendMessage("bot", "Por favor, confirme sua senha: ");
        step = 14;
    }
    function showFivetennMenu() {
        appendMessage("bot", "termos de uso...")
        appendMessage("bot", "Digite 1 se você aceita os termos de uso.");
        appendMessage("bot", "Digite 2 se você não aceita os termos de uso.");
        appendMessage("bot", "Digite 3 para reproduzir os termos de uso, e as opções novamente.");
        step = 15;
    }
    function showSixtennMenu() {
        appendMessage("bot", "Sinto muito, mas para concluir o cadastro preciso que você aceite os termos de uso.");
        appendMessage("bot", "Digite 1 para voltar aos termos de uso.");
        appendMessage("bot", "Digite 2 para voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 16;
    }
    function showSeventennMenu() {
        appendMessage("bot", "Perfeito! Seu cadastro foi concluido com sucesso.");
        appendMessage("bot", "Digite 1 para ir para a página de login para entrar em sua conta.");
        appendMessage("bot", "Digite 2 para voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 17;
    }
    function showEighteenMenu() {
        appendMessage("bot", "Você está na área de login. Por favor, digite seu e-mail: ");
        step = 18;
    }
    function showNinetennMenu() {
        appendMessage("bot", "Perfeito! Agora digite sua senha: ");
        step = 19;
    }
    function showtwentyMenu() {
        appendMessage("bot", "Ótimo! Seu login foi concluido com sucesso.");
        appendMessage("bot", "Digite 1 para acessar seu perfil.");
        appendMessage("bot", "Digite 2 para voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 20;
    }
    function showtwentyOneMenu() {
        appendMessage("bot", "Erro ao fazer login, email ou senha incorretos.");
        appendMessage("bot", "Digite 1 para nova tentativa de login.");
        appendMessage("bot", "Digite 2 para voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 21;
    }

    function showTwentyTwoMenu() {
        appendMessage("bot", "Você está no menu principal.");
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 para conhecer a Laços.");
        appendMessage("bot", "Digite 2 para se cadastrar ou fazer login.");
        appendMessage("bot", "Digite 3 para conhecer nossos pacotes de casamento.");
        appendMessage("bot", "Digite 4 para saber nosso contato, como e-mail e telefone.");
        appendMessage("bot", "Digite 5 para reproduzir as opções novamente.");
        step = 22;
    }
    function showtwentyThreeMenu() {
        appendMessage("bot", "Ótimo, você está no menu principal.");
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 para conhecer a Laços.");
        appendMessage("bot", "Digite 2 para acessar seu perfil");
        appendMessage("bot", "Digite 3 para conhecer nossos pacotes de casamento.");
        appendMessage("bot", "Digite 4 para saber nosso contato, como e-mail e telefone.");
        appendMessage("bot", "Digite 5 para reproduzir as opções novamente.");
        step = 23;
    }
    function showtwentyFourMenu() {
        appendMessage("bot", "Ótimo, você está no menu de perfil");
        appendMessage("bot", "Digite 1 para acessar seu formulário de requisitos.");
        appendMessage("bot", "Digite 2 para acessar seu pacote.");
        appendMessage("bot", "Digite 3 para se desconectar de sua conta.");
        appendMessage("bot", "Digite 4 para voltar ao menu principal");
        appendMessage("bot", "Digite 5 para reproduzir a explicação e as opções novamente.");
        step = 24;
    }
    function showtwentyFiveMenu() {
        appendMessage("bot", "Erro ao fazer ao cadastro");
        appendMessage("bot", "Digite 1 tentar se cadastrar novamente.");
        appendMessage("bot", "Digite 2 para voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 25;
    }
    function showtwentySixMenu() {
        appendMessage("bot", "Para ter acesso ao pacotes Laços é necessário estar logado.");
        appendMessage("bot", "Digite 1 para ir ao menu de login.");
        appendMessage("bot", "Digite 2 para voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 26;
    }
    function showtwentySevenMenu() {
        appendMessage("bot", "Excelente, vamos começar pelos profissionais que irão animar seu casamento.");
        appendMessage("bot", "Como primeira opção temos a banda New Dance, que tocam músicas do gênero rock, com músicas que são bem animadas e empolgantes. Valor: quatrocentos e vinte reais.");
        appendMessage("bot", "Como segunda opção temos a banda Jona’s, que tocam músicas do gênero bossa nova, com músicas tranquilas e alegres. Valor: trezentos e cinquenta e seis reais.");
        appendMessage("bot", "Como terceira opção temos o grupo de violinistas Violinist Eventos, que tocam músicas clássicas e românticas. Valor: novecentos e noventa e dois reais.");
        appendMessage("bot", "Escolha uma das opções:");
        appendMessage("bot", "Digite 1 se você quer que a banda New Dance toque em seu casamento.");
        appendMessage("bot", "Digite 2 se você quer que a banda Jona’s toque em seu casamento.");
        appendMessage("bot", "Digite 3 se você quer o grupo Violinist Eventos toque em seu casamento.");
        appendMessage("bot", "Digite 4 para reproduzir a explicação e as opções novamente.");
        step = 27;
    }
    function showtwentyEightMenu() {
        appendMessage("bot", "Perfeito, agora vamos decidir os profissionais na área de buffet.");
        appendMessage("bot", "Como primeira opção temos o Buffet Esperança, um verdadeiro paraíso para os amantes de entradas refinadas, que tem como especialidade antepastos, bruschettas,  canapés e patês. Valor: mil setecentos e sete reais.");
        appendMessage("bot", "Como segunda opção temos o Rocha’s Eventos, que são especialistas em massas, trazendo pratos do mais alto padrão como ravioles recheados, fettuccine ao molho alfredo, Gnocchi de Batata e Tortellini Fresco. Valor: mil oitocentos e cinquenta e sete reais.");
        appendMessage("bot", "Como terceira opção temos o MW Eventos,especializada em proporcionar experiências culinárias excepcionais para eventos, com foco principal em banquete nupcial, trazendo pratos como frutos do mar, carnes grelhadas, massas e  finger foods. Valor: dois mil e cem reais.");
        appendMessage("bot", "Escolha uma das opções:");
        appendMessage("bot", "Digite 1 se você quer que a Buffet Esperança prepare o buffet de seu casamento.");
        appendMessage("bot", "Digite 2 se você quer que a Rocha’s Eventos prepare o buffet de seu casamento.");
        appendMessage("bot", "Digite 3 se você quer que a  MW Eventos prepare o buffet de seu casamento.");
        appendMessage("bot", "Digite 4 para reproduzir a explicação e as opções novamente.");
        step = 28;
    }
    function showtwentyNineMenu() {
        appendMessage("bot", "Ótimo, agora vamos decidir quem fará a cerimônia do seu casamento.");
        appendMessage("bot", "Como primeira opção temos o pastor Jorge José, que é mestre de cerimônias especializado em unir casais em matrimônio de maneira única e emocionante. Valor: quinhentos e vinte reais.");
        appendMessage("bot", "Como segunda opção temos o Luiz Cardoso, que destaca-se como um mestre de cerimônias extraordinário, cujo encanto e talento transforma o casamento em eventos verdadeiramente memoráveis. Valor: quinhentos e quinze reais.");
        appendMessage("bot", "Como terceira opção temos o Pedro Mota, além de exercer sua vocação sacerdotal, é um mestre de cerimônias dedicado, especializado em conduzir casamentos com uma abordagem espiritual única. Valor: quinhentos e trinta e três reais.");
        appendMessage("bot", "Escolha uma das opções:");
        appendMessage("bot", "Digite 1 se você quer que o mestre de cerimônia de seu casamento seja o Jorge José.");
        appendMessage("bot", "Digite 2 se você quer que o mestre de cerimônia de seu casamento seja o Luiz Cardoso.");
        appendMessage("bot", "Digite 3 se você quer que o mestre de cerimônia de seu casamento seja o Pedro Mota.");
        appendMessage("bot", "Digite 4 para reproduzir a explicação e as opções novamente.");
        step = 29;
    }
    function showThirtyMenu() {
        appendMessage("bot", "Excelente, agora vamos decidir o profissional responsável pela maquiagem e cabelo social de seu casamento.");
        appendMessage("bot", "Como primeira opção temos a Luiza Vasconcelos, que se destaca especialmente em criar maquiagens personalizadas que realçam a beleza única de cada cliente. Valor: mil e duzentos reais.");
        appendMessage("bot", "Como segunda opção temos a Torres Eventos, que são especialistas na inclusão de serviços de beleza, com profissionais dedicados à maquiagem e ao corte de cabelo tanto para mulheres quanto para homens. Valor: dois mil e quinhentos reais.");
        appendMessage("bot", "Como terceira opção temos o Rogerio Peregrini, que é uma referência no mundo da maquiagem, sendo reconhecido como um especialista em maquiagem. Seu talento se destaca especialmente em eventos importantes e exclusivos, nos quais sua habilidade excepcional e atenção aos detalhes fazem toda a diferença. Valor: mil trezentos e cinquenta e cinco reais.");
        appendMessage("bot", "Escolha uma das opções:");
        appendMessage("bot", "Digite 1 se você quer que a Luiza Vasconcelos fique responsável pela maquiagem de seu casamento.");
        appendMessage("bot", "Digite 2 se você quer que a torre eventos fique responsável pela maquiagem e cortes de cabelo de seu casamento.");
        appendMessage("bot", "Digite 3 se você quer que o Rogerio Peregrini fique responsável pela maquiagem de seu casamento.");
        appendMessage("bot", "Digite 4 para reproduzir a explicação e as opções novamente.");
        step = 30;
    }
    function showThirtyOneMenu() {
        appendMessage("bot", "Perfeito, agora vamos decidir os profissionáis que ficarão responsáveis pela decoração de seu casamento.");
        appendMessage("bot", "Como primeira opção temos o Deniss Flores e Decorações, que é uma empresa renomada e altamente especializada no cenário de decoração de casamentos. Com uma equipe dedicada de profissionais apaixonados por design e detalhes. Valor: quatro mil duzentos e cinquenta reais.");
        appendMessage("bot", "Como segunda opção temos a Verrotti Eventos, que é uma empresa distinta e altamente respeitada no campo da decoração de casamentos. Reconhecida por sua criatividade excepcional e atenção meticulosa aos detalhes, a Verroti Eventos tornou-se uma escolha preferida para casais que buscam uma experiência única e personalizada em seu grande dia. Valor: dois mil setecentos e cinquenta reais.");
        appendMessage("bot", "Como terceira opção temos a Romeus Eventos , que é uma empresa líder no segmento de decoração de casamentos e eventos, conhecida por sua criatividade excepcional e por transformar espaços com elegância e originalidade. Valor: quatro mil cento e trinta e seis reais.");
        appendMessage("bot", "Escolha uma das opções:");
        appendMessage("bot", "Digite 1 se você quer que a Deniss Flores fique responsável pela decoração de seu casamento.");
        appendMessage("bot", "Digite 2 se você quer que a Verrotti Eventos fique responsável pela decoração de seu casamento.");
        appendMessage("bot", "Digite 3 se você quer que a Romeus Eventos fique responsável pela decoração de seu casamento.");
        appendMessage("bot", "Digite 4 para reproduzir a explicação e as opções novamente.");
        step = 31;
    }
    function showThirtyTwoMenu() {
        appendMessage("bot", "Ótimo, agora vamos decidir o local de seu casamento.");
        appendMessage("bot", "Como primeira opção temos a Casa das Rosas, é um local encantador e romântico, perfeito para casamentos, envolto pela beleza natural de flores e folhas verdes. Este espaço deslumbrante oferece um cenário idílico para casais que buscam uma atmosfera única e romântica para celebrar seu amor. Está localizado em Tapecerica da Serra, São Paulo. Valor: três mil cento e vinte reais");
        appendMessage("bot", "Como segunda opção temos o Gramados Eventim, O Gramados Eventim é um local encantador e exclusivo, projetado especialmente para casamentos, onde a beleza da natureza se encontra com o romance das celebrações matrimoniais. Este oásis verde é um local espetacular cercado por uma abundância de folhas verdes, proporcionando um cenário verdadeiramente mágico para casais apaixonados. Está localizado em São Bernardo do Campo, São Paulo. Valor: dois mil setecentos e cinquenta reais");
        appendMessage("bot", "Como terceira opção temos a Casa Persa, que é um local encantador e iluminado, projetado para criar uma atmosfera mágica, especialmente para casamentos noturnos. Este espaço único oferece uma fusão de elegância, luzes suaves e uma atmosfera envolvente, proporcionando o cenário perfeito para casais que desejam uma celebração romântica sob as estrelas. Está localizado em Embu, São Paulo. Valor: três mil setecentos e trinta e seis reais");
        appendMessage("bot", "Escolha uma das opções:");
        appendMessage("bot", "Digite 1 se você quer se casar na Casa das Rosas.");
        appendMessage("bot", "Digite 2 se você quer se casar no Gramados Eventim.");
        appendMessage("bot", "Digite 3 se você quer se casar na Casa Persa.");
        appendMessage("bot", "Digite 4 para reproduzir a explicação e as opções novamente.");
        step = 32;
    }
    function showThirtyThreeMenu() {
        appendMessage("bot", "Excelente, você preencheu todos os campos para a criação do seu pacote de casamento.");
        appendMessage("bot", "Escolha uma das opções a seguir.");
        appendMessage("bot", "Digite 1 para confirmar os dados preenchidos do pacote.");
        appendMessage("bot", "Digite 2 voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 33;
    }
    function showThirtyFourMenu() {
        appendMessage("bot", "Perfeito, seu pacote já foi encaminhado para nós da laços e em breve iremos entrar em contato com você, passando o valor do pacote e confirmando todas as informações");
        appendMessage("bot", "Agora precisamos que você preencha o formulário de requisitos, caso ja tenha preenchido não será necessário preencher de novamente.");
        appendMessage("bot", "Digite 1 para preencher formulário de requisitos.");
        appendMessage("bot", "Digite 2 voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 34;
    }
    function showThirtyFiveMenu() {
        appendMessage("bot", "Você já envio seu pacote personalizado para nós. Ele pode ser visualizado em seu perfil. Aguarde que em breve entraremos em contato para maracarmos o grande dia de seu casamento.");
        appendMessage("bot", "Digite 1 para acessar seu perfil.");
        appendMessage("bot", "Digite 2 voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 35;
    }
    function showThirtySixMenu() {
        appendMessage("bot", "Erro a confirmar dados do pacote");
        appendMessage("bot", "Digite 1 para criar seu pacote novamente.");
        appendMessage("bot", "Digite 2 voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 36;
    }
    function showThirtySevenMenu() {
        appendMessage("bot", "Erro ao entrar no menu dos pacotes");
        appendMessage("bot", "Digite 1 para tentar acessar o menu de pacotes novamente.");
        appendMessage("bot", "Digite 2 voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 37;
    }
    function showThirtyEightMenu() {
        appendMessage("bot", "Excelente, você está no menu do formulário de requisitos");
        appendMessage("bot", "Digite 1 para preencher o formulário de requisitos.");
        appendMessage("bot", "Digite 2 voltar ao menu principal.");
        appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
        step = 38;
    }
    function showThirtyNineMenu() {
        appendMessage("bot", "Excelente, Temos opções de decoração que variam de simples a mais detalhadas. Qual estilo você prefere para o seu casamento?");
        step = 39;
     }
     function showFortyMenu() {
        appendMessage("bot", "Ótimo, Quanto de orçamento você tem disponivel para este evento?");
        step = 40;
     }
     function showFortyOneMenu() {
        appendMessage("bot", "Perfeito, Qual é o tipo específico de deficiência visual? digite para um cegueira total, dois para cegueira parcial ou três para daltonismo");
        step = 41;
     }
     function showFortyTwoMenu() {
        appendMessage("bot", "Excelente, Qual é o grau de visão residual? grau de cegueira parcial ou tipos de daltonismo");
        step = 42;
     }
     function showFortyThreeMenu() {
        appendMessage("bot", "Ótimo, Você é sensível a luz?");
        step = 43;
     }
     function showFortyFourMenu() {
        appendMessage("bot", "Perfeito, em média quantas serão convidade para o casamento?");
        step = 44;
     }
     function showFortyFiveMenu() {
        appendMessage("bot", "Excelente, há alguma preferência específica em relação à música ou entretenimento durante o casamento? Se sim, qual?");
        step = 45;
     }
     function showFortySixMenu() {
        appendMessage("bot", "Ótimo, existem restrições alimentares ou preferências específicas que devem ser consideradas no cardápio? Se sim, qual?");
        step = 46;
     }
     function showFortySevenMenu() {
        appendMessage("bot", "Perfeito, como você prefere receber informações, digite um para braille, dois para áudio ou três para texto ampliado?");
        step = 47;
     }
     function showFortyEightMenu() {
        appendMessage("bot", "Excelente, o local precisa ser acessível para cadeira de rodas?");
        step = 48;
     }
     function showFortyNineMenu() {
        appendMessage("bot", "Ótimo, é necessário o uso do piso tátil?");
        step = 49;
     }
     function showFiftyMenu() {
        appendMessage("bot", "Perfeito, é necessário o cardápio ser em braille?");
        step = 50;
     }
     function showFiftyOneMenu() {
        appendMessage("bot", "Excelente, qual é o nome do seu parceiro?");
        step = 51;
     }
     function showFiftyTwoMenu() {
        appendMessage("bot", "Ótimo, qual tipo de vestido de noiva você mais gosta?");
        step = 52;
     }
     function showFiftyThreeMenu() {
        appendMessage("bot", "Perfeito, qual é a data da sua cerimonia? Digite o dia, mês e ano.");
        step = 53;
     }
     function showFiftyFourMenu() {
        appendMessage("bot", "Excelente, que horas você gostaria de realizar sua cerimônia?");
        step = 54;
     }
     function showFiftyFiveMenu() {
        appendMessage("bot", "Ótimo, onde você mora dentro da Grande São Paulo?");
        step = 55;
     }
     function showFiftySixMenu() {
        appendMessage("bot", "Perfeito, como você imagina a cerimônia? Alguma preferência específica para a troca de votos, leituras ou rituais? Se sim, qual?");
        step = 56;
     }
     function showFiftySevenMenu() {
        appendMessage("bot", "Excelente, você tem preferências específicas em relação à decoração que envolvam texturas, aromas ou elementos táteis? Se sim, qual?");
        step = 57;
     }
     function showFiftyEightMenu() {
        appendMessage("bot", "Ótimo, existe uma paleta de cores que você prefere ou que seja mais acessível para daltonianos? Se sim, qual?");
        step = 58;
     }
     function showFiftyNineMenu() {
        appendMessage("bot", "Perfeito, você gostaria de alguma indicação tátil na pista de dança? Se sim, qual?");
        step = 59;
     }
     function showSixtyMenu() {
         appendMessage("bot", "Excelente, como podemos garantir que a pista de dança seja segura e acessível?");
         step = 60;
     }
     function showSixtyOneMenu() {
         appendMessage("bot", "Alguma preferência para o estilo de fotografia ou videografia que facilite a experiência para pessoas com deficiência visual?");
         step = 61;
     }
     function showSixtyTwoMenu() {
         appendMessage("bot", "Você gostaria de ter descrições verbais ou táteis das fotos?");
         step = 62;
     }
     function showSixtyThreeMenu() {
         appendMessage("bot", "Como você prefere organizar os assentos para garantir conforto e acessibilidade?");
         step = 63;
     }
     function showSixtyFourMenu() {
         appendMessage("bot", "Há alguma consideração especial para os arranjos de assentos em relação aos convidados com deficiência ");
         step = 64;
     }
     function showSixtyFiveMenu() {
         appendMessage("bot", "Existe alguma adaptação que gostaria de fazer na programação para acomodar suas necessidades?");
         step = 65;
     }
     function showSixtySixMenu() {
         appendMessage("bot", "Durante o planejamento e organização, como podemos garantir que suas necessidades específicas sejam atendidas?");
         step = 66;
     }
     function showSixtySevenMenu() {
         appendMessage("bot", "Gostaria de falar mais alguma coisa?");
         step = 67;
     }
     function showSixtyEightMenu() {
         appendMessage("bot", "Excelente, você preencheu todos os campos do formulário de requisitos.");
         appendMessage("bot", "Digite 1 para voltar ao seu perfil.");
         appendMessage("bot", "Digite 2 para voltar ao menu principal.");
         appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
         step = 68;
     }
     function showSixtyNineMenu() {
         appendMessage("bot", "Erro no formulário de requisitos.");
         appendMessage("bot", "Digite 1 para acessar o formulário de requisitos novamente");
         appendMessage("bot", "Digite 2 para voltar ao menu principal.");
         appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
         step = 69;
     }
     function showSeventyTwoMenu() {
         appendMessage("bot", "Ótimo, você ja enviou seu formulário de requisitos, em breve entraremos em contato confirmando a informações de seu pacote e de seu formulário de requisitos.");
         appendMessage("bot", "Digite 1 para voltar ao menu do seu perfil");
         appendMessage("bot", "Digite 2 para voltar ao menu principal.");
         appendMessage("bot", "Digite 3 para reproduzir a explicação e as opções novamente.");
         step = 72;
     }
     function showSeventyThreeMenu() {
         appendMessage("bot", "Você foi deslogado");
         step = 73;
     }
     function showSeventyFourMenu() {
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 para voltar ao seu perfil");
        appendMessage("bot", "Digite 2 para voltar ao menu principal.");
        step = 74;
    }
    function showSeventyFiveMenu() {
        appendMessage("bot", "A Laços é um projeto inovador dedicado a celebrar casamentos com inclusão e acessibilidade em mente, tornando o grande dia memorável para pessoas com deficiência visual, como baixa visão, cegueira e daltonismo. Nosso compromisso é criar experiências matrimoniais únicas, onde o amor se traduz em todos os sentidos, tornando o dia especial verdadeiramente inesquecível.");
        appendMessage("bot", "Escolha uma das opções a seguir:");
        appendMessage("bot", "Digite 1 para voltar ao menu principal");
        appendMessage("bot", "Digite 2 para reproduzir a explicação e as opções novamente");
        
        step = 75;
    }


     
    

    
    function handleUserInput(input) {
        speechSynthesis.cancel();

        if (step !== 8 && step !== 9 && step !== 10 && step !== 11 && step !== 12 && step !== 13 && step !== 14 && step !== 18 && step !== 19 && step !== 39 && step !== 40 && step !== 41 && step !== 42 && step !== 43
            && step !== 44 && step !== 45 && step !== 47 && step !== 48 && step !== 49 && step !== 50 && step !== 51 && step !== 52 && step !== 53 && step !== 54 && step !== 55 && step !== 56 && step !== 57
            && step !== 58 && step !== 59 && step !== 60 && step !== 61 && step !== 62 && step !== 63 && step !== 64 && step !== 65 && step !== 66 && step !== 67) {
            appendMessage("user", input);
        }


        switch (step) {
            case 1:
                if (input === "1") {
                    showSecondMenu();
                } else if (input === "2") {
                    window.location.href = "outra_pagina.html";
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1 ou 2.");
                }
                break;
            case 2:
                if (input === "1") {
                    showThirdMenu();
                } else if (input === "2") {
                    showFourthMenu();
                } else if (input === "3") {
                    showtwentySixMenu();
                } else if (input === "4") {
                    showSixMenu();
                } else if (input === "5") {
                    showSecondMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2, 3, 4 ou 5.");
                }
                break;
            case 3:
                if (input === "1") {
                    showThirdMenu();
                } else if (input === "2") {
                    showTwentyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1 ou 2.");
                }
                break;
            case 4:
                if (input === "1") {
                    showEighteenMenu();
                } else if (input === "2") {
                    showSevenMenu();
                } else if (input === "3") {
                    showFourthMenu();
                } else if (input === "4") {
                    showTwentyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2, 3 ou 4.");
                }
                break;
            case 5:
                if (input === "1") {
                    showtwentySevenMenu();
                } 
                else if (input === "2") {
                    showTwentyTwoMenu();
                } 
                else if (input === "2") {
                    showFiveMenu();
                } 
                else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 6:
                if (input === "1") {
                    showSixMenu();
                } else if (input === "2") {
                    showTwentyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1 ou 2.");
                }
                break;
            case 7:
                if (input === "1") {
                    showEightMenu();
                } else if (input === "2") {
                    showTwentyTwoMenu();
                } else if (input === "3") {
                    showSevenMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 8:
                if (validateName(input)) {
                    user.name = input;
                    showNineMenu();
                } else {
                    appendMessage("bot", "Por favor, digite um nome válido (apenas letras).");
                }
                break;
                case 9:
                if (validateAge(input)) {
                    user.age = input;
                    showTenMenu();
                } else {
                    appendMessage("bot", "Por favor, digite uma idade válida de 18 a 100 anos.");
                }
                break;
            case 10:
                if (validateContact(input)) {
                    user.contact = input;
                    showElevenMenu();
                } else {
                    appendMessage("bot", "Por favor, digite um contato válido.");
                }
                break;
                case 11:
                if (validateSex(input)) {
                    user.sex = input;
                    showTwelveMenu();
                } else {
                    appendMessage("bot", "Por favor, digite um sexo válido (apenas letras).");
                }
                break;
            case 12:
                if (validateEmail(input)) {
                    user.email = input;
                    showThirteenMenu();
                } else {
                    appendMessage("bot", "Por favor, digite um e-mail válido.");
                }
                break;
            case 13:
                if (validatePassword(input)) {
                    // O usuário aceitou os termos de uso, então não há necessidade de armazenar a senha
                    user.password = input;
                    showFourteenMenu();
                } else {
                    appendMessage("bot", "Por favor, digite uma senha válida (mínimo de 6 caracteres).");
                }
                break;
            case 14:
                const previousPassword = userInput.previousPassword; 
                if (input === previousPassword) {
                    showFivetennMenu();
                } else {
                    appendMessage("bot", "As senhas não coincidem. Por favor, tente novamente.");
                    showFourteenMenu();
                }
                break;
                case 15:
                    if (input === "1") {
                        userInput.value = "";   
                        showSeventennMenu();
                        storeUserData();
                    }else if (input === "2") {
                        showSixtennMenu();
                    } else if (input === "3") {
                        showSeventennMenu();
                    } else {
                        appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                    }
                    break;
            case 16:
                if (input === "1") {
                    showFivetennMenu();
                } else if (input === "2") {
                    showTwentyTwoMenu();
                } 
                else if (input === "3") {
                    showSixtennMenu();
                }
                else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 17:
                if (input === "1") {
                    showEighteenMenu();
                } else if (input === "2") {
                    showTwentyTwoMenu();
                } else if (input === "3") {
                    showSeventennMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 18:
                if (validateEmail(input)) {
                    emailInput = input;
                    showNinetennMenu();
                } else {
                    appendMessage("bot", "Por favor, digite um e-mail válido.");
                }
                break;
                case 19:
                    if (validatePassword(input)) {
                        // Verifique se o e-mail e a senha do usuário estão armazenados na lista
                        if (user.email === emailInput && user.password === input) {
                            showtwentyMenu();
                        } else {
                            showtwentyOneMenu();
                        }
                    } else {
                        appendMessage("bot", "Por favor, digite uma senha válida (mínimo de 6 caracteres).");
                    }
                    break;
                    
            case 20:
                if (input === "1") {
                       showtwentyFourMenu();
                  } else if (input === "2") {
                       showtwentyThreeMenu();
                  } 
                else if (input === "3") {
                       showtwentyMenu();
                  }
                else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 21:
                if (input === "1") {
                       showEighteenMenu();
                  } else if (input === "2") {
                       showTwentyTwoMenu();
                  } 
                else if (input === "3") {
                       showtwentyOneMenu();
                  }
                else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
             case 22:
                if (input === "1") {
                    showThirdMenu();
                } else if (input === "2") {
                    showFourthMenu();
                } else if (input === "3") {
                    showtwentySixMenu();
                } else if (input === "4") {
                    showSixMenu();
                } else if (input === "5") {
                    showTwentyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2, 3, 4 ou 5.");
                }
                break;
             case 23:
                if (input === "1") {
                    showSeventyFiveMenu();
                } else if (input === "2") {
                    showtwentyFourMenu();
                } 
                else if (input === "3") {
                    // Verificação do pacote 
                    if (pacote.length === 0) {
                        // Se a lista 'pacote' estiver vazia
                        showFiveMenu();
                    } else {
                        // Se a lista 'pacote' não estiver vazia
                        showThirtyFiveMenu();
                }
                }else if (input === "4") {
                    showSixMenu();
                } else if (input === "5") {
                    showTwentyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2, 3, 4 ou 5.");
                }
                break;
                case 24:
                    if (input === "1") {
                        // Verificação das respostas 
                        if (respostas.length === 0) {
                            // Se a lista 'respostas' estiver vazia
                            showThirtyEightMenu();
                        } else {
                            // Se a lista 'respostas' não estiver vazia
                            showSeventyTwoMenu();
                        }
                        } else if (input === "2") {
                            // Verificação do pacote 
                            if (pacote.length === 0) {
                                // Se a lista 'pacote' estiver vazia
                                showFiveMenu();
                            } else {
                                // Se a lista 'pacote' não estiver vazia
                                appendMessage("bot", "Aqui estão os detalhes do seu pacote:");
                                for (let i = 0; i < pacote.length; i++) {
                                    appendMessage("bot", pacote[i]);
                                }
                                showSeventyFourMenu();
                            }
                    } else if (input === "3") {
                        // Limpar as listas 'pacote' e 'respostas'
                        pacote = [];
                        respostas = [];
                        // Informar ao usuário que ele foi deslogado
                        appendMessage("bot", "Você foi deslogado de sua conta");
                        // Ir para showTwentyTwoMenu()
                        showTwentyTwoMenu();
                    } else if (input === "4") {
                        // Voltar ao menu principal
                        showtwentyThreeMenu();
                    } else if (input === "5") {
                        // Reproduzir a explicação e as opções novamente
                        showtwentyFourMenu();
                    } else {
                        appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2, 3, 4 ou 5.");
                    }
                    break;
             case 25:
                if (input === "1") {
                    showEightMenu();
                } else if (input === "2") {
                    showTwentyTwoMenu();
                } else if (input === "3") {
                    showTwentyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2");
                }
                break;
             case 26:
                if (input === "1") {
                    showEighteenMenu();
                } else if (input === "2") {
                    showTwentyTwoMenu();
                } else if (input === "3") {
                    showtwentySixMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3");
                }
                break;
            case 27:
                if (input === "1" || input === "2" || input === "3") {
                    // Adicione a opção escolhida à lista do pacote
                    pacote.push(input === "1" ? "Banda escolhida: New Dance" : input === "2" ? "Banda escolhida: Jona’s" :  " Banda escolhida, Grupo Violinist Eventos");
                    showtwentyEightMenu();
                }
                else if (input === "4") {
                    showtwentySevenMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2, 3 e 4.");
                }
                break;
            case 28:
                if (input === "1" || input === "2" || input === "3") {
                    pacote.push( input === "1" ? "Buffet escolhido, Buffet Esperança" : input === "2" ? "Buffet escolhido: Rocha’s Eventos" : "Buffet escolhido: MW Eventos");
                    showtwentyNineMenu();
                } 
                else if (input === "4") {
                    showtwentyEightMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 29:
                if (input === "1" || input === "2" || input === "3") {
                    pacote.push( input === "1" ? "Quem fará a cerimonia de seu casamento: Jorge José" : input === "2" ? "Quem fará a cerimonia de seu casamento: Luiz Cardoso" : "Quem fará a cerimonia de seu casamento: Pedro Mota");
                    showThirtyMenu();
                } else if (input === "4") {
                    showtwentyNineMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 30:
                if (input === "1" || input === "2" || input === "3") {
                    pacote.push( input === "1" ? "Maquiadora ou maquiador escolhido: Luiza Vasconcelos" : input === "2" ? "Maquiadora ou maquiador escolhido: Torres Eventos" : "Maquiadora ou maquiador escolhido: Rogerio Peregrini");
                    showThirtyOneMenu();
                } else if (input === "4") {
                    showThirtyMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 31:
                if (input === "1" || input === "2" || input === "3") {
                    pacote.push( input === "1" ? "Quem cuidará da decoração de seu casamento: Deniss Flores e Decorações" : input === "2" ? "Quem cuidará da decoração de seu casamento: Verrotti Eventos" : "Quem cuidará da decoração de seu casamento: Romeus Eventos");
                    showThirtyTwoMenu();
                } else if (input === "4") {
                    showThirtyOneMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 32:
                if (input === "1" || input === "2" || input === "3") {
                    pacote.push( input === "1" ? "Local do seu casamneto: Casa das Rosas" : input === "2" ? "Local do seu casamneto: Gramados Eventim" : "Local do seu casamento: Casa Persa");
                    showThirtyThreeMenu();
                }
                else if (input === "4") {
                    showThirtyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 33:
                if (input === "1") {
                    // As opções do pacote estão agora armazenadas na lista 'pacote'
                    console.log(pacote);
                    showThirtyFourMenu(); // Sucesso no armazenamento
                   
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showThirtyThreeMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
                case 34:
                    if (input === "1") {
                       // Verificação das respostas 
                       if (respostas.length === 0) {
                        // Se a lista 'respostas' estiver vazia
                        showThirtyEightMenu();
                    } else {
                        // Se a lista 'respostas' não estiver vazia
                        showSeventyTwoMenu();
                    }
                    } else if (input === "2") {
                        showtwentyThreeMenu();
                    } else if (input === "3") {
                        showThirtyFourMenu();
                    } else {
                        appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2, 3 ou 4.");
                    }
                    break;
            case 35:
                if (input === "1") {
                    showtwentyFourMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showThirtyFiveMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 36:
                if (input === "1") {
                        showFiveMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showThirtySixMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 37:
                if (input === "1") {
                    showThirtyFiveMenu(); // O usuário tem um pacote cadastrado, mostra o menu 35                    
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showThirtySevenMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 38:
                if (input === "1") {
                    showThirtyNineMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showThirtyEightMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break
            case 39:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 40:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyOneMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 41:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyTwoMenu();
                } else {
                    appendMessage("bot","Por favor, uma resposta válida.");
                }
                break;
            case 42:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyThreeMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 43:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyFourMenu();
                } else {
                    appendMessage("bot","Por favor, uma resposta válida.");
                }
                break;
            case 44:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyFiveMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 45:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortySixMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 46:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortySevenMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 47:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyEightMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 48:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFortyNineMenu();
                } else {
                    appendMessage("bot","Por favor, uma resposta válida.");
                }
                break;
            case 49:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 50:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyOneMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 51:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyTwoMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 52:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyThreeMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 53:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyFourMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 54:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyFiveMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 55:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftySixMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 56:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftySevenMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 57:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyEightMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 58:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showFiftyNineMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 59:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtyMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 60:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtyOneMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 61:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtyTwoMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 62:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtyThreeMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 63:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtyFourMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 64:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtyFiveMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 65:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtySixMenu();
                } else {
                    appendMessage("bot", "Por favor, uma resposta válida.");
                }
                break;
            case 66:
                if (validateForms(input)) {
                    appendMessage("user", input);
                    showSixtySevenMenu();
                } else {
                    appendMessage("bot","Por favor, uma resposta válida.");
                }
                break;
                case 67:
                    if (validateForms(input)) {
                        // Adicione a resposta do usuário à lista 'respostas'
                        respostas.push(input);
                        appendMessage("user", input);
                        showSixtyEightMenu();
                    }
                    break;
            case 68:
                if (input === "1") {
                    showtwentyFourMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showSixtyEightMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 69:
                if (input === "1") {
                    showThirtyEightMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showSixtyNineMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 70:
                if (input === "1") {
                    showtwentyFourMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showDadosPacote();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 71:
                if (input === "1") {
                    showtwentyFourMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showDadosPacote();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 72:
                if (input === "1") {
                    showtwentyFourMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else if (input === "3") {
                    showSeventyTwoMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1, 2 ou 3.");
                }
                break;
            case 74:
                if (input === "1") {
                    showtwentyFourMenu();
                } else if (input === "2") {
                    showtwentyThreeMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1 ou 2.");
                }
                break;
            case 75:
                if (input === "1") {
                    showtwentyThreeMenu();
                } else if (input === "2") {
                    showSeventyFiveMenu();
                } else {
                    appendMessage("bot", "Opção inválida. Por favor, escolha 1 ou 2.");
                }
                break;
            
                
                
        }

        userInput.value = "";
    }

    userInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const userMessage = userInput.value;
            handleUserInput(userMessage);
            userInput.value = "";
        }
    });
});