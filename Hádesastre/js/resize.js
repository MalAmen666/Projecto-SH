
window.onresize = checksize;
//window.onload = checksize;
var noticias_lado = "DIREITA"; //BAIXO
var WIDTH_THRESHOLD = 700; // Valor a partir do qual as noticias passam para baixo

function checksize () {
	if (window.innerWidth <= WIDTH_THRESHOLD && noticias_lado == "DIREITA") {
		mover_noticias_baixo();
		noticias_lado = "BAIXO";
	} else if (window.innerWidth > WIDTH_THRESHOLD && noticias_lado == "BAIXO") {
		mover_noticias_direita();
		noticias_lado = "DIREITA";
	}
	//alert(window.innerWidth);
}

function mover_noticias (origem, destino) {
	var elemento_noticias = document.getElementById("noticias");
	var alvo = document.getElementById(destino);
	var outro = document.getElementById(origem);
	if (elemento_noticias == null || alvo == null || outro == null)
		return;
	
	// Copiar o style da direita
	outro.style.display = "none";
	alvo.style.display = "";
	
	alvo.appendChild(elemento_noticias);
}

function mover_noticias_baixo() {
	mover_noticias("cell_noticias_direita", "cell_noticias_baixo");
}

function mover_noticias_direita() {
	mover_noticias("cell_noticias_baixo", "cell_noticias_direita");
}