const javascriptContainer = document.getElementById('jsContainer');
const movieVueComponents = document.getElementById('movieVue');

javascriptContainer.appendChild(movieVueComponents);

let movieLink = document.createElement('a');
movieLink.href = "./websites/finalProjectMovieDBVue/index.html";
movieLink.innerHTML = "MovieDB Using Vue";

movieVueComponents.appendChild(movieLink);
