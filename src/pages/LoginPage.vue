<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import useStore from '@/stores/store';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';

  const store = useStore();
  const router = useRouter();
  const { isAuthenticated } = storeToRefs(store);
  const email = ref('hello@aiscreen.io');
  const password = ref('Demo!1234');

  onMounted(() => {
    if (isAuthenticated.value) {
      router.push({ name: 'HomePage' });
    }
  });

  const login = async () => {
    if (email.value && password.value) {
      await store.login(email.value, password.value);
      if (isAuthenticated.value) {
        router.push({ name: 'HomePage' });
      }
    }
  };
</script>

<template>
  <div>
    <h1>Login Page</h1>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email" />
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password" />
      </div>
      <div>
        <input type="submit" value="Login" @click="login" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
