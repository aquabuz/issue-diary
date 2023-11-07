<script setup lang="ts">
import { supabase } from '@/api/supabase';
import { onMounted, ref } from 'vue';
import Avatar from '@/components/account/Avatar.vue';

const props = defineProps({ session: Object as () => any });
// const { session }: Ref<any> | undefined = toRefs(props);
const session = props.session;

const loading = ref(true);
const username = ref('');
const website = ref('');
const avatar_url = ref('');

onMounted(() => {
  getProfile();
});

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError'; // 에러의 이름을 설정
  }
}

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
    throw new CustomError('This is a custom error message');
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    console.log('👌', user);

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) throw error;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        type="text"
        :value="session.user.email"
        disabled
      />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button
        class="button block"
        @click="signOut"
        :disabled="loading"
      >
        Sign Out
      </button>
    </div>
    <!-- Add to body -->
    <Avatar
      v-model:path="avatar_url"
      @upload="updateProfile"
      size="10"
    />
  </form>
</template>
