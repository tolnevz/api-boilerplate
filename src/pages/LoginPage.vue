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
  <div class="container">
    <div class="login">
      <h1>Login Page</h1>
      <div class="form">
        <div class="form-field">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model="email" />
        </div>
        <div class="form-field">
          <label for="password">Пароль</label>
          <input type="password" name="password" id="password" v-model="password" />
        </div>
        <input class="btn" type="submit" value="Войти" @click="login" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;

    .form {
      width: 300px;

      @media screen and (max-width: 500px) {
        width: 100%;
      }

      .btn {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
</style>
