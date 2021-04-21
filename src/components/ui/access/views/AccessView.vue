<template>
  <v-container class="access-view-container">
    <v-row justify="center" align="center">
      <v-col align-self="center" xl="8" lg="8" md="10" sm="8" xs="12">
        <v-card height="600px">
            <div class="full-height" >
              <v-row justify="center" class="full-height">
                <v-col class="access-view-container-background"></v-col>
                <v-col md="6" v-if="$route.name === 'Login'">
                  <access-change-view />
                  <login-view />
                </v-col>
                <v-col md="6" v-else>
                  <access-change-view />
                  <signup-view />
                </v-col>
              </v-row>
            </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginView from '../../login/views/LoginView';
import SignupView from '../../signup/views/SignupView';
import AccessChangeView from '../molecules/AccessChangeView.vue';

export default {
  components: { SignupView, LoginView, AccessChangeView },

};
</script>

<style scoped>
  .access-view-container {
    height: 100vh;
  }

  .access-view-container > div {
    height: 100%;
  }

  .access-view-container-background {
    background-image: url("https://i.pinimg.com/originals/e4/7a/89/e47a894afaf3368867f39be88a62acb9.gif");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }

  .full-height {
    height: 100%;
  }
</style>
