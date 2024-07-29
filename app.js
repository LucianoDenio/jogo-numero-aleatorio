document.addEventListener('DOMContentLoaded', () => {
    const numerosSorteados = [];
    let numeroSecreto = gerarNumeroAleatorio();
    let tentativas = 1;

    const input = document.querySelector('.container__input');
    const reiniciarBtn = document.getElementById('reiniciar');
    const chutarBtn = document.getElementById('chutar');

    function exibirTexto(tag, texto) {
        const elemento = document.querySelector(tag);
        elemento.innerHTML = texto;
        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
        } else {
            console.error('responsiveVoice não está carregado.');
        }
    }

    function exibirMensagemInicial() {
        exibirTexto('h1', "Jogo do número secreto");
        exibirTexto('p', "Escolha um número entre 0 e 10");
    }

    function verificarChute() {
        const chute = parseInt(input.value);
        const palavraTentativas = (tentativas !== 1) ? " tentativas!" : " tentativa!";
        const texto = `Parabéns, você acertou! Com ${tentativas}${palavraTentativas}`;

        if (chute === numeroSecreto) {
            exibirTexto('h1', "Parabéns, você acertou!");
            exibirTexto('p', texto);
            reiniciarBtn.removeAttribute('disabled');
        } else if (chute > numeroSecreto) {
            exibirTexto('p', "Errou, o número secreto é menor");
        } else {
            exibirTexto('p', "Errou, o número secreto é maior");
        }
        tentativas++;
        limpaTexto();
    }

    function gerarNumeroAleatorio() {
        let numeroAleatorio;
        do {
            numeroAleatorio = Math.floor(Math.random() * 10) + 1;
        } while (numerosSorteados.includes(numeroAleatorio));
        numerosSorteados.push(numeroAleatorio);
        console.log("Número gerado: ", numeroAleatorio);
        return numeroAleatorio;
    }

    function limpaTexto() {
        input.value = '';
    }

    function reiniciarJogo() {
        numeroSecreto = gerarNumeroAleatorio();
        limpaTexto();
        tentativas = 1;
        exibirMensagemInicial();
        reiniciarBtn.setAttribute('disabled', true);
    }

    chutarBtn.addEventListener('click', verificarChute);
    reiniciarBtn.addEventListener('click', reiniciarJogo);

    exibirMensagemInicial();
});
