<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">DNS {{dns}}</v-list-item-title>
        <v-list-item-subtitle>localhost {{ip}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-text-field
        v-model="dns"
        :counter="15"
        :rules="dnsRules"
        label="Dns"
        required
        clearable
      ></v-text-field>

      <v-text-field
        v-model="ip"
        :counter="15"
        :rules="ipRules"
        label="IP"
        required
        clearable
        v-mask="'##/##/####'"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
       Alterar
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
       Limpar
      </v-btn>
       </v-form>
      </v-card-text>
    </v-card>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
      valid: true,
      dns: '',
      dnsRules: [
        v => !!v || 'DNS is required',
      ],
      ip: '',
      ipRules: [
        v => !!v || 'Ip is required',
      ],

  }),
  components: {
  },
  methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
    },
};
</script>
