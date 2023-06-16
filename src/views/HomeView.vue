<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Рахунок</h3>

          <button
            class="btn waves-effect waves-light btn-small"
            @click="refresh"
          >
            <i class="material-icons">refresh</i>
          </button>
        </div>

        <LoaderView v-if="loading" />

        <div v-else class="row">
          <HomeBill :rates="currency.rates" />
          <HomeCurrency :rates="currency.rates" :date="currency.date" />
        </div>
      </div>
    </div>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";
export default {
  name: "HomeView",
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>
