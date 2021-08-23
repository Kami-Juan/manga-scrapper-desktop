<template>
  <v-row justify="center">
    <v-dialog
      v-model="modal"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          New Manga
        </v-card-title>
        <v-card-text>Please provide the manga url you wanna get it.</v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="URL"
                required
                filled
                v-model="url"
                :error-messages="urlErrors"
                @input="$v.url.$touch()"
                @blur="$v.url.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="modal = false"
            :disabled="loading"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="secondary"
            @click="onSubmit"
            :disabled="loading"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
/* eslint-disable no-unused-expressions */
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';

import MangaRepository from '../../../../repository/MangaRepository';

export default {
  props: ['value'],
  data() {
    return {
      url: '',
      loading: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    url: { url, required },
  },
  computed: {
    modal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    urlErrors() {
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.required && errors.push('You must provide a url');
      !this.$v.url.url && errors.push('You must provide a correct URL');
      return errors;
    },
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;

        this.$v.$touch();

        if (!this.$v.$invalid) {
          const { data } = await MangaRepository.storeManga({
            url: this.url,
            idList: this.$route.params.idList,
          });

          this.url = '';

          this.$emit('onNewManga', data);
          this.modal = false;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
