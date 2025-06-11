document.getElementById('metodo-de-pago').addEventListener('change', function() {
    const value = this.value;


    document.getElementById('tc').classList.add('opcion');
    document.getElementById('td').classList.add('opcion');
    document.getElementById('pse').classList.add('opcion');


    if (value === 'tarjeta-credito') {
        document.getElementById('tc').classList.remove('opcion');
    } else if (value === 'tarjeta-debito') {
        document.getElementById('td').classList.remove('opcion');
    } else if (value === 'pse') {
        document.getElementById('pse').classList.remove('opcion');
    }
});


document.getElementById('forma-de-pago').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Pago realizado con éxito (esto es un mensaje de prueba)');
});
