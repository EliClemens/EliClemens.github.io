//Eli Clemens
// movie.js 
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    inCart: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      adultTickets: 0,
      childTickets: 0,
    };
  },
  methods: {
    addToCart() {
      // Calculate the cost based on the number of tickets
      const adultPrice = 6.99;
      const childPrice = 3.99;

      // Include the cost in the cartItem object
      const cartItem = {
        title: this.title,
        description: this.description,
        image: this.image,
        adultTickets: this.adultTickets,
        childTickets: this.childTickets,
        totalCost: this.adultTickets * adultPrice + this.childTickets * childPrice,
      };
      //reset the tickets to zero after added to cart
      this.adultTickets = 0;
      this.childTickets = 0;
      // Emit the cartItem to be added to the cart so it can be recognized by parent 
      this.$emit('add-to-cart', cartItem);
    },
    // To add tickets
    incrementAdultTicket() {
      this.adultTickets++;
    },
    incrementChildTicket() {
      this.childTickets++;
    },
  },
  template: `
    <div v-if="!inCart" class="movie">
      <h2>{{ title }}</h2>
      <img :src="image" alt="Movie Poster">
      <p>{{ description }}</p>
      <div>
        <label>Adult Tickets: {{ adultTickets }}</label>
        <button @click="incrementAdultTicket">Add Adult Ticket</button>
      </div>
      <div>
        <label>Child Tickets: {{ childTickets }}</label>
        <button @click="incrementChildTicket">Add Child Ticket</button>
      </div>
      <button @click="addToCart">Add to Cart</button>
    </div>
    <div v-else>
      <div class="movie">
        <h2>{{ title }}</h2>
        <img :src="image" alt="Movie Poster">
        <p>{{ description }}</p>
        <div>
          <label>Adult Tickets: {{ adultTickets }}</label>
          <button @click="incrementAdultTicket">Add Adult Ticket</button>
        </div>
        <div>
          <label>Child Tickets: {{ childTickets }}</label>
          <button @click="incrementChildTicket">Add Child Ticket</button>
        </div>
        <button @click="removeFromCart">Remove from Cart</button>
      </div>
    </div>
  `,
};
