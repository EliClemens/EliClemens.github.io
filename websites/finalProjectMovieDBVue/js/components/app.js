//Eli Clemens
import Movie from './movie.js';
import Subtotal from './subtotal.js'

Vue.createApp({
  //for "movie" in movies array with key of movie id.
  //bind title to movie.title, description to movie.overview and image to 'https://image.tmdb.org/t/p/w200/' + poster_path. These variables were found in json for movieDB
  //when cart is clicked the emitted method and addToCart is run to add movie.
  template: `
  <header>
  </header>
    <movie v-for="movie in movies" :key="movie.id"
      :title="movie.title" :description="movie.overview" :image="'https://image.tmdb.org/t/p/w200/' + movie.poster_path"
      @add-to-cart="addToCart">
    </movie>

    <div id="cart">
    <!-- Use the Subtotal component for each subtotal entry -->
    <Subtotal
        v-for="(subtotal, title) in ticketsTotal"
        :key="title"
        :title="title"
        :subtotal="subtotal"
        @remove-ticket="removeTicket"
        @remove-movie="removeMovie">
      </Subtotal>
  
  </div>
</div>
  `,
  data() {
    return {
      movies: [], //array
      cartItems: [], //array
      ticketsTotal: {}, //object
    };
  },
  methods: {
    addToCart(cartItem) {
      if (!this.ticketsTotal[cartItem.title]) {//if ticket title is not in cart
        this.ticketsTotal[cartItem.title] = {//change or send tickets to cart
          adultTickets: 0,
          childTickets: 0,
        };
      }
  
      this.ticketsTotal[cartItem.title].adultTickets += cartItem.adultTickets;//adds tickets to existing tickets or creates a cart
      this.ticketsTotal[cartItem.title].childTickets += cartItem.childTickets;
      this.$refs[cartItem.title].resetVisibility();
    },
    removeTicket(type, currentTitle) {//check to make sure tickets isn't negative and removes one ticket at a time
        // Update the ticketsTotal based on the ticket type (adult or child)
        if (type === 'adult' && this.ticketsTotal[currentTitle].adultTickets > 0) {
          this.ticketsTotal[currentTitle].adultTickets--;//I could have probable combined title and currentTitle
        } else if (type === 'child' && this.ticketsTotal[currentTitle].childTickets > 0) {
          this.ticketsTotal[currentTitle].childTickets--;
        }
      },
      
    },
      removeSubtotal(title) {
        // Removes the entire movie from "Remove Movie" button
        delete this.ticketsTotal[title];
      },
      
  mounted() {
    // Make an asynchronous call to the Movie DB API when mounted
    axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-us&page=1&api_key=156f485744210682e45fa5a3bab67e28')
      .then(response => {
        this.movies = response.data.results.slice(0,3);//only show 3 movies with slice method to start at first movie and show 3.
      })
      .catch(error => {
        console.error(error);
      });
  },

  components: {
    Movie,//for movies
    Subtotal,//for cart
  },
}).mount('#app');
