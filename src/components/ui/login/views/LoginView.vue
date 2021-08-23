<template>
  <v-row justify="center" class="mt-8">
    <v-col
      cols="10"
      sm="10"
    >
      <v-text-field
        label="Username/email"
        v-model="form.account"
        outlined
        clearable
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="form.password"
        outlined
        type="password"
        clearable
      ></v-text-field>
      <v-btn block color="primary" @click="onLogin">
        Sign In
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import jwtDecode from 'jwt-decode';
import { createNamespacedHelpers } from 'vuex';
import { SET_USER_CREDENTIALS } from '../../../../store/modules/auth/mutations-types';
import UserRepository from '../../../../repository/UserRepository';

const { mapMutations } = createNamespacedHelpers('auth');

export default {
  data() {
    return {
      form: {
        account: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapMutations([SET_USER_CREDENTIALS]),
    async onLogin() {
      try {
        const { data } = await UserRepository.onSignIn(this.form);

        try {
          const values = jwtDecode(data.token);

          localStorage.setItem('token', data.token);

          this.SET_USER_CREDENTIALS(values);
          this.$router.push({ name: 'Dashboard' });
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

</style>
