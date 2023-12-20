//isvisible Kind of works, but I actually want to be able to add a movie again if I accidentally remove it. This is my only problem I see right now. This is not totally correct yet.
export default {

  template: `
    <div v-if="isVisible" class="subtotal-container">
      <h3>{{ title }}</h3>
      <p>Adult Tickets @ 6.99: {{ subtotal.adultTickets }} 
        <button @click="removeAdultTicket">Remove Adult Ticket</button>
      </p>
      <p>Child Tickets @ $3.99: {{ subtotal.childTickets }}
        <button @click="removeChildTicket">Remove Child Ticket</button>
      </p>
      <p> Total Cost: $ {{ calculateTotalCost().toFixed(2)}} </p>
      <button @click="removeMovie">Remove Entire Movie</button>
    </div>
  `,
  props: {//props for parent
    title: String,
    subtotal: Object,
  },
  data() {
    return {
      isVisible: true, // Adding a flag to check visibility
    };
  },
  methods: {
    calculateTotalCost() {
      const adultPrice = 6.99;
      const childPrice = 3.99;
      return this.subtotal.adultTickets * adultPrice + this.subtotal.childTickets * childPrice;
    },
    removeAdultTicket() {
      // Ensure there are adult tickets to remove
      if (this.subtotal.adultTickets > 0) {
        this.$emit('remove-ticket', 'adult', this.title);
      }
    },
    removeChildTicket() {
      // Ensure there are child tickets to remove
      if (this.subtotal.childTickets > 0) {
        this.$emit('remove-ticket', 'child', this.title);
      }
    },
    removeMovie() {
      // Set isVisible to false to hide the container
      this.isVisible = false;
      // Emit an event to notify the parent component to remove this subtotal
      this.$emit('remove-subtotal', this.title);
    },
    resetVisibility() {
      this.isVisible = true;//Makes subtotal disappear when true
    },
  },
};
