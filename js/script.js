const DATA_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

document.addEventListener('DOMContentLoaded', function(){
    fetch(DATA_URL)
        .then(response => response.json())
        .then(data => {
            array = [];
            document.getElementById('btnBuscar').addEventListener('click', function(){
                document.getElementById('album').style.display = 'block';
                let pelicula = document.getElementById('inputBuscar').value.toLowerCase();
                let datos = [];

                for (const item of data) {
                    if(item.title.toLowerCase().match(pelicula) || item.overview.toLowerCase().match(pelicula) || item.tagline.toLowerCase().match(pelicula) || item.genres.includes(pelicula.toLowerCase())){
                        datos.push(item);
                    }
                }
                mostrarPeliculas(datos);
                array = datos;
                peliculasMostradas = document.getElementsByClassName("list-group-item");
                console.log(peliculasMostradas);
            })

        })
})



function mostrarPeliculas(peliculas){
    let lista = document.getElementById('lista');
    lista.innerHTML = "";
        
    for (const item of peliculas){
        lista.innerHTML += `
        <div class="list-group-item list-group-item-action cursor-active" onclick="cambiarOffCanvas(${peliculas.indexOf(item)})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1"><b>${item.title}</b> ${mostrarEstrellas(item.vote_average)}</p>
                    </div>    
                    <p class="mb-1"><i>${item.tagline}</i></p>
                </div>
            </div>
        </div>`;
    }
}

function cambiarOffCanvas(numero) {
    let offcanvas = document.getElementById('offcanvasTop');
    offcanvas.innerHTML = "";

    let item = array[numero];
    console.log(item);

    offcanvas.innerHTML = 
        `<h1>${item.title}</h1>
        <p>${item.overview}</p>
        <hr>
        <p>${mostrarGeneros(item.genres)}</p>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
            </button>
            <ul class="dropdown-menu">
                <li><p class="dropdown-item-text">Year: ${item.release_date.slice(0, 4)}</p></li>
                <li><p class="dropdown-item-text">Runtime: ${item.runtime} mins</p></li>
                <li><p class="dropdown-item-text">Budget: $${item.budget} </p></li>
                <li><p class="dropdown-item-text">Revenue: $${item.revenue} </p></li>
            </ul>
        </div>`;
}

function mostrarGeneros(generos) {
    let genero = "";
    for (let i = 0; i < generos.length; i++) {
        genero += `${generos[i].name}`;
        if (i < generos.length - 1) {
            genero += " - ";
        }
    }
    return genero;
}

function mostrarEstrellas(numeroEstrellas){
    let estrellas = ""
    for(let i = 1; i <= 5; i++){
        if(i <= (Math.round(numeroEstrellas) / 2)){
            estrellas += `<span class="fa fa-star checked"></span>`
        }
        else estrellas += `<span class="fa fa-star"></span>`
    }
    return estrellas;
}