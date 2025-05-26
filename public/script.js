async function cargarUsuarios() {
  const res = await fetch('/api/usuarios');
  const usuarios = await res.json();
  const lista = document.getElementById('listaUsuarios');
  lista.innerHTML = '';
  usuarios.forEach(u => {
    lista.innerHTML += `<li><strong>${u.nombre}</strong> (${u.email}) (${u.telefono})</li>`;
  });
}

document.getElementById('formulario').addEventListener('submit', async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  await fetch('/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, telefono })
  });
  cargarUsuarios();
  e.target.reset();
});

cargarUsuarios();
