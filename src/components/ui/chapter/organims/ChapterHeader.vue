<template>
  <v-app-bar
    absolute
    color="primary"
    dark
    prominent
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <div class="tools">
      <v-row align="center">
        <v-col md="1" >
          <v-row justify="center">
            <v-btn icon>
              <v-icon>
                mdi-arrow-left
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col md="7">
          <v-select
            :items="[]"
            label="Outlined style"
            outlined
            hide-details
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-col md="1">
          <v-row justify="center">
            <v-btn icon>
              <v-icon>
                mdi-fullscreen
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col md="1">
          <v-row justify="center">
            <v-btn icon>
              <v-icon>
                mdi-magnify-minus-outline
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col md="1">
          <v-row justify="center">
            <v-btn icon>
              <v-icon>
                mdi-magnify-plus-outline
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col md="1">
          <v-row justify="center">
            <v-btn icon>
              <v-icon>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {

};
</script>

<style>
  .tools {
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
  }
</style>
