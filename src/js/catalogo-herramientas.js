function createElem(type, classNames = [], attrs = {}) {
    const elem = document.createElement(type);
    if (classNames.length) elem.classList.add(...classNames);
    for (const key in attrs) {
      if (key === 'innerHTML' || key === 'textContent') {
        elem[key] = attrs[key];
      } else {
        elem.setAttribute(key, attrs[key]);
      }
    }
    return elem;
  }
  
  function buildPage() {
    const body = document.body;

    const header = createElem('header');

    const nav = createElem('nav', ['barra-incio']);
  
    const logo = createElem('img', ['logo'], {
      src: '../imagen/imag-inicio/3.svg',
      alt: 'Logo',
    });
    nav.appendChild(logo);
  
    const menu = createElem('ul', ['menu']);
    ['Inicio', 'Nosotros', 'Contáctanos', 'Tienda'].forEach((text, i) => {
      const li = document.createElement('li');
      const a = createElem('a', [], { href: ['index.html', 'nosotros.html', 'contactanos.html', 'catalogo-todos.html'][i], textContent: text });
      li.appendChild(a);
      menu.appendChild(li);
    });
    nav.appendChild(menu);
  
    const botonesInicio = createElem('div', ['botones-inicio']);
    const favLink = createElem('a', [], { href: 'favoritos.html' });
    const favImg = createElem('img', ['favoritos-logo'], { src: '../imagen/favoritos.svg', alt: 'favoritos' });
    favLink.appendChild(favImg);
    botonesInicio.appendChild(favLink);
  
    const cartLink = createElem('a', [], { href: 'carro-compras.html' });
    const cartImg = createElem('img', ['carro-compras-logo'], { src: '../imagen/carro-compras.svg', alt: 'carro-compras' });
    cartLink.appendChild(cartImg);
    botonesInicio.appendChild(cartLink);
  
    const btnIngresar = createElem('button', ['boton-inicio'], { textContent: 'INGRESAR' });
    btnIngresar.onclick = () => window.location.href = 'ingresar.html';
    botonesInicio.appendChild(btnIngresar);
  
    nav.appendChild(botonesInicio);

    const encabezado = createElem('div', ['encabezado']);
    const formDiv = document.createElement('div');
    const form = document.createElement('form');
  
    const searchInput = createElem('input', ['barrabusqueda'], {
      type: 'search',
      id: 'searchBar',
      placeholder: 'Buscar productos...',
    });
  
    const searchBtn = createElem('button', ['botonbusqueda']);
    const searchImg = createElem('img', [], { src: '../imagen/img-buscador.svg', alt: '', width: '25px' });
    searchBtn.appendChild(searchImg);
  
    form.appendChild(searchInput);
    form.appendChild(searchBtn);
    formDiv.appendChild(form);
    encabezado.appendChild(formDiv);
  
    header.appendChild(nav);
    header.appendChild(encabezado);
  
    body.appendChild(header);

    const contenedor = createElem('div', ['contenedor']);
    const contenido = createElem('div', ['contenido']);
    const h1 = createElem('h1', [], { textContent: 'Herramientas' });
    contenido.appendChild(h1);
    contenido.appendChild(document.createElement('br'));
    contenido.appendChild(document.createElement('br'));
    contenedor.appendChild(contenido);
    body.appendChild(contenedor);

    function crearCardProducto(srcImg, titulo, precio) {
      const col = createElem('div', ['col']);
      const card = createElem('div', ['card', 'h-100', 'card-black']);
      const img = createElem('img', ['card-img-top'], { src: srcImg, alt: '...' });
      const cardBody = createElem('div', ['card-body']);
      const cardTitle = createElem('h5', ['card-title'], { textContent: titulo });
      const cardText = createElem('p', ['card-text']);
      cardText.innerHTML = `<b>${precio}</b>`;
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(img);
      card.appendChild(cardBody);
  
      const cardFooter = createElem('div', ['card-footer']);
      const btnGroup = createElem('div', ['btn-group'], { role: 'group', 'aria-label': 'Basic example' });

      const btnFavoritos = createElem('button', ['btn', 'btn-primary-1'], { type: 'button' });
      const imgFav = createElem('img', [], { src: '../imagen/favoritos.svg', alt: '', width: '15px' });
      btnFavoritos.appendChild(imgFav);
  
      const btnMenos = createElem('button', ['btn'], { type: 'button', textContent: '-' });
      const btnCantidad = createElem('button', ['btn'], { type: 'button', textContent: '1' });
      const btnMas = createElem('button', ['btn'], { type: 'button', textContent: '+' });
  
      const btnCarro = createElem('button', ['btn', 'btn-primary-1'], { type: 'button' });
      const imgCarro = createElem('img', [], { src: '../imagen/carro-compras.svg', alt: '', width: '15px' });
      btnCarro.appendChild(imgCarro);
  
      btnGroup.append(btnFavoritos, btnMenos, btnCantidad, btnMas, btnCarro);
      cardFooter.appendChild(btnGroup);
      card.appendChild(cardFooter);
      col.appendChild(card);
  
      return col;
    }

    const row1 = createElem('div', ['row', 'row-cols-1', 'row-cols-md-4', 'g-4']);
    row1.style.marginTop = '50px';
    row1.appendChild(crearCardProducto('../imagen/imag-produc-herr/produc-herr-1.svg', 'Tijera De Poda Jardinería Mango Recubierto Ferreco Basics', '$20.900'));
    row1.appendChild(crearCardProducto('../imagen/imag-produc-herr/produc-herr-2.svg', 'Tijera Para Podar Ramas 21\'\' Mango Tubular Truper 18399', '$49.900'));
    row1.appendChild(crearCardProducto('../imagen/imag-produc-herr/produc-herr-3.svg', 'Paladraga 35.5x13.9cm Calibre 16 Herragro', '$95.715'));

    const colCategorias = createElem('div');
    const h3Categorias = createElem('h3', [], { textContent: 'Categorías' });
    const hrCategorias = document.createElement('hr');
  
    colCategorias.appendChild(h3Categorias);
    colCategorias.appendChild(hrCategorias);
  
    const categorias = [
      { href: 'catalogo-semillas.html', label: 'Semillas' },
      { href: 'catalogo-fert.html', label: 'Fertilizantes' },
      { href: 'catalogo-herr.html', label: 'Herramientas' },
      { href: 'catalogo-prot.html', label: 'Protección' }
    ];
  
    categorias.forEach(cat => {
      const label = createElem('label', ['checkbox-label']);
      const input = createElem('input', ['catalogo'], { type: 'checkbox' });
      input.onclick = () => window.location.href = cat.href;
      const h6 = createElem('h6', [], { textContent: cat.label });
      label.appendChild(input);
      label.appendChild(h6);
      colCategorias.appendChild(label);
    });
  
    colCategorias.appendChild(document.createElement('br'));
  
    const h3SubCategorias = createElem('h3', [], { textContent: 'Subcategorías' });
    const hrSubCategorias = document.createElement('hr');
  
    colCategorias.appendChild(h3SubCategorias);
    colCategorias.appendChild(hrSubCategorias);

  
    ['Jardinería', 'Agrícola', 'Maquinaria'].forEach(subcat => {
      const label = createElem('label', ['checkbox-label']);
      label.style.paddingLeft = '60px';
      const input = createElem('input', [], { type: 'checkbox' });
      const h6 = createElem('h6', [], { textContent: subcat });
      label.appendChild(input);
      label.appendChild(h6);
      colCategorias.appendChild(label);
    });

    row1.appendChild(colCategorias);
  
    body.appendChild(row1);

    const row2 = createElem('div', ['row', 'row-cols-1', 'row-cols-md-4', 'g-4']);
    row2.style.marginTop = '1px';
    row2.appendChild(crearCardProducto('../imagen/imag-produc-herr/produc-herr-4.svg', 'Expulso de Agua manual, herraimenta Agrícola', '$75.000'));
    row2.appendChild(crearCardProducto('../imagen/imag-produc-herr/produc-herr-5.svg', 'Mqhuayu Herramientas De Jardinería. Juego de Herramientas.', '$284.900'));
    row2.appendChild(crearCardProducto('../imagen/imag-produc-herr/produc-herr-6.svg', 'Juego Herramientas Para Jardín 4 Piezas, 6 Truper 15030', '$49.000'));

    const colSubtipos = createElem('div');
    const h3Subtipos = createElem('h3', [], { textContent: 'Subtipos' });
    const hrSubtipos = document.createElement('hr');
    colSubtipos.appendChild(h3Subtipos);
    colSubtipos.appendChild(hrSubtipos);
  
    ['Manual', 'Eléctrico', 'A Batería'].forEach(subtipo => {
      const label = createElem('label', ['checkbox-label']);
      label.style.paddingLeft = '60px';
      const input = createElem('input', [], { type: 'checkbox' });
      const h6 = createElem('h6', [], { textContent: subtipo });
      label.appendChild(input);
      label.appendChild(h6);
      colSubtipos.appendChild(label);
    });
  
    row2.appendChild(colSubtipos);
  
    body.appendChild(row2);

    function createFooter() {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const footerGrid = document.createElement('div');
        footerGrid.classList.add('footer-grid');

        const servicio = document.createElement('div');
        servicio.classList.add('footer');
      
        const h2Servicio = document.createElement('h2');
        h2Servicio.classList.add('h2-footer');
        h2Servicio.textContent = 'Servicio al cliente';
      
        const ulServicio = document.createElement('ul');
        ulServicio.classList.add('servicio-cliente');
      
        const links = [
          { href: 'promociones.html', text: 'Promociones' },
          { href: 'nosotros.html', text: 'Nosotros' },
          { href: 'ingresar.html', text: 'Vinculación eventos' },
          { href: 'seguimiento-pedido.html', text: 'Seguimiento a mi pedido' },
          { href: 'politicas.html', text: 'Políticas de privacidad' },
          { href: 'terminos-condiciones.html', text: 'Términos y condiciones' },
          { href: 'contactanos.html', text: 'Contáctanos' },
        ];
      
        links.forEach(link => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = link.href;
          a.classList.add('footer-li');
          a.textContent = link.text;
          li.appendChild(a);
          ulServicio.appendChild(li);
        });
      
        servicio.appendChild(h2Servicio);
        servicio.appendChild(ulServicio);
        footerGrid.appendChild(servicio);

        const logoFinal = document.createElement('div');
        logoFinal.classList.add('parte-final');
      
        const imgLogo = document.createElement('img');
        imgLogo.src = '../imagen/img-logo.svg';
        imgLogo.alt = 'logo';
        imgLogo.classList.add('logo-final');
      
        logoFinal.appendChild(imgLogo);
        footerGrid.appendChild(logoFinal);

        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info');
      
        const h2Contacto = document.createElement('h2');
        h2Contacto.classList.add('h2-footer');
        h2Contacto.textContent = 'Atención al cliente';
      
        const contactDetails = [
          'WhatsApp: 322 861 8001',
          'tiendavirtual@campodigital.co',
          'Calle 32 # 48 - 45 Medellín, Colombia',
          'Campogigital.com es controlado y operado por: DIAZ Y ALIADOS S.A. S.NIT: 890702426-7'
        ];
      
        contactDetails.forEach(text => {
          const p = document.createElement('p');
          p.classList.add('footer-p');
          p.textContent = text;
          contactInfo.appendChild(p);
        });
      
        contactInfo.prepend(h2Contacto);
        footerGrid.appendChild(contactInfo);

        footer.appendChild(footerGrid);
        document.body.appendChild(footer);
      }
      
      createFooter();
    }      

  document.addEventListener('DOMContentLoaded', buildPage);
