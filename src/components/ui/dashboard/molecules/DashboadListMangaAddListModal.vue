<template>
  <v-row justify="center">
    <v-dialog
      v-model="modal"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          New List
        </v-card-title>
        <v-card-text>Please provide all information of your list</v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Title"
                required
                filled
                 v-model="title"
                :error-messages="titleErrors"
                @input="$v.title.$touch()"
                @blur="$v.title.$touch()"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Custom image url"
                required
                filled
                v-model="image_url"
                :error-messages="imageURLErrors"
                @input="$v.image_url.$touch()"
                @blur="$v.image_url.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Description"
                required
                filled
                v-model="description"
                :error-messages="descriptionErrors"
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
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
import { required, maxLength, url } from 'vuelidate/lib/validators';

import ListMangaRepository from '../../../../repository/ListMangaRepository';

export default {
  props: ['value'],
  data() {
    return {
      title: '',
      description: '',
      image_url: '',
      loading: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(250) },
    description: { required, maxLength: maxLength(250) },
    image_url: { url },
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
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push('You must provide a title');
      !this.$v.title.maxLength && errors.push('The limit of characters is 250');
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push('You must provide a description');
      !this.$v.description.maxLength && errors.push('The limit of characters is 250');
      return errors;
    },
    imageURLErrors() {
      const errors = [];
      if (!this.$v.image_url.$dirty) return errors;
      !this.$v.image_url.url && errors.push('You must provide a correct URL');
      return errors;
    },
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;

        this.$v.$touch();

        if (!this.$v.$invalid) {
          const { data } = await ListMangaRepository.storeList({
            title: this.title,
            description: this.description,
            image_url: this.image_url,
          });

          this.title = '';
          this.image_url = '';
          this.description = '';

          this.$emit('onAddNewList', data);
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
