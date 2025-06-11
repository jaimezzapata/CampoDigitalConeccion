document.getElementById("formulario-registro").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Captura de datos
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const telefono = document.getElementById("telefono").value;
  const aceptaTerminos = document.getElementById("aceptaTerminos").checked;

  // Validación básica
  if (password !== confirmPassword) {
    return alert("Las contraseñas no coinciden");
  }

  if (!aceptaTerminos) {
    return alert("Debes aceptar los términos y condiciones");
  }

  // Enviar al backend
  try {
    const respuesta = await fetch("http://localhost:3000/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password,
        telefono
      })
    });

    const mensaje = await respuesta.text();
    alert(mensaje);

  } catch (error) {
    console.error("Error al enviar datos:", error);
    alert("Error al registrar usuario");
  }
});
