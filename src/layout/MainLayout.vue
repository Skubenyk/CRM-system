<template>
  <div class="app-main-layout">
    <NavbarView @click="isOpen = !isOpen" />

    <SidebarView :value="isOpen" @update:modelValue="isOpen = $event" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavbarView from "@/components/app/NavbarView";
import SidebarView from "@/components/app/SidebarView";
export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  },
  components: {
    NavbarView,
    SidebarView,
  },
};
</script>
