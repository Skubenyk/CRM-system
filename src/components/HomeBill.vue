<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Рахунок в валюті</span>

        <p v-for="currency of currencies" :key="currency" class="currency-line">
          <span>{{ formatCurrency(getCurrency(currency), currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data: () => ({
    currencies: ["UAH", "USD", "EUR"],
  }),
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["UAH"] / this.rates["EUR"])
      );
    },
  },
  methods: {
    getCurrency(currency) {
      if (!this.rates) {
        return 0;
      }
      return Math.floor(this.base * this.rates[currency]);
    },
    formatCurrency(value, currency) {
      return `${value} ${currency}`;
    },
  },
};
</script>
