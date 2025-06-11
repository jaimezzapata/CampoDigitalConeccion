
var fechaObjetivo = new Date("Jun 14, 2025 12:00:00").getTime();


function iniciarConteoRegresivo() {
    var ahora = new Date().getTime();
    var diferencia = fechaObjetivo - ahora; 


    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);


    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;


    if (diferencia < 0) {
        clearInterval(intervalo);
        document.getElementById('dias').textContent = "0";
        document.getElementById('horas').textContent = "0";
        document.getElementById('minutos').textContent = "0";
        document.getElementById('segundos').textContent = "0";
    }
}


var intervalo = setInterval(iniciarConteoRegresivo, 1000);
