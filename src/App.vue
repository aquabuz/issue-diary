<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Account from '@/components/account/Account.vue';
import Auth from './components/account/Auth.vue';
import { supabase } from '@/api/supabase';

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});

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
    <div class="container" style="padding: 50px 0 100px 0">
      <Account v-if="session" :session="session" />
      <Auth v-else />
    </div>
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
