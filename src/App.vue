<script setup lang="ts">
import { ref } from 'vue';

// import HomeView from '@/views/HomeView.vue';
const user = ref({
  name: 'chris',
  id: 123,
});
</script>

<template>
  <nav
    class="nav"
    text-white
    bg-green-5
    flex
    justify-between
    items-center
    font-sans
    vw-100
    p-5
  >
    <router-link
      text-white
      class="logo"
      :to="{
        name: 'home',
        query: { token: 'asdfwef' },
      }"
    >
      <img src="/vite.svg" class="logo" alt="Vite logo" w-10 h-10 />
    </router-link>
    <div flex justify-around items-center gap-10>
      <router-link
        class="text-white [&.router-link-active]:text-black"
        :to="{ name: 'user' }"
      >
        account
      </router-link>
      <router-link
        class="text-white [&.router-link-exact-active]:text-black"
        :to="`/account/${user.id}`"
      >
        account:id
      </router-link>
      <router-link
        class="text-white [&.router-link-exact-active]:text-black"
        :to="`/account/${user.id}/update`"
      >
        update
      </router-link>
      <router-link
        class="text-white [&.router-link-exact-active]:text-black"
        :to="`/account/${user.id}/orders`"
      >
        orders
      </router-link>
    </div>
  </nav>
  <main flex justify-center items-center vw-100 h-20rem bg-black-2>
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.nav {
  a {
    display: flex;
    line-height: 1;
    text-decoration: none;
  }
}
.logo {
  display: flex;
}
</style>
