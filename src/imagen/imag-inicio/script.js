// Fecha objetivo a la que queremos contar regresivamente (Año, Mes, Día, Hora, Minuto, Segundo)
var fechaObjetivo = new Date("Dec 14, 2024 12:00:00").getTime();

// Función que actualiza el conteo regresivo
function iniciarConteoRegresivo() {
    var ahora = new Date().getTime(); // Obtiene el tiempo actual
    var diferencia = fechaObjetivo - ahora; // Calcula la diferencia en milisegundos

    // Calcula el tiempo restante en días, horas, minutos y segundos
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Muestra el tiempo restante en los elementos correspondientes
    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;

    // Si el tiempo ha expirado, muestra "¡Tiempo agotado!"
    if (diferencia < 0) {
        clearInterval(intervalo);
        document.getElementById('dias').textContent = "0";
        document.getElementById('horas').textContent = "0";
        document.getElementById('minutos').textContent = "0";
        document.getElementById('segundos').textContent = "0";
    }
}

// Llama a la función cada 1 segundo (1000 ms)
var intervalo = setInterval(iniciarConteoRegresivo, 1000);
