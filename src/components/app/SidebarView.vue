<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <li
      v-for="link in links"
      :key="link.url"
      :class="{ active: isLinkActive(link.url) }"
    >
      <router-link
        :to="link.url"
        :exact="link.exact"
        class="waves-effect waves-yellow darken-3 pointer"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      links: [
        { title: "Рахунок", url: "/" },
        { title: "Історія", url: "/history" },
        { title: "Планування", url: "/planning" },
        { title: "Новий запис", url: "/record" },
        { title: "Категорії", url: "/categories" },
      ],
    };
  },
  methods: {
    isLinkActive(url) {
      return this.$route.path === url;
    },
  },
};
</script>
