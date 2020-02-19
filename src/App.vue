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
    <v-data-table
    :headers="headers"
    :items="list"
    :items-per-page="5"
    class="elevation-1"
    @load="loadList"
    @click:row="handleClick"
  ></v-data-table>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data: () => ({
     list: [],
      valid: true,
      dns: '',
      dnsRules: [
        v => !!v || 'DNS is required',
      ],
      ip: '',
      ipRules: [
        v => !!v || 'Ip is required',
      ],
      headers: [
          {
            text: 'DNS',
            align: 'left',
            sortable: false,
            value: 'dns',
          },
          { text: 'IP', value: 'ip' },
        ],
       

  }),
  components: {
  },
  async mounted () {
axios.get('http://localhost:9090/dns-services/list').then(response => {
              this.list = response.data;
              console.log("Response", response.data);
            })
            .catch(error => {
              console.log(error)
              this.errored = true
            })
},
  methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          axios.post('http://localhost:9090/dns-services').then(response => {
              this.dns = response.data.dns;
              this.ip = response.data.ip;
              console.log("Response", response.data);
            })
            .catch(error => {
              console.log(error)
              this.errored = true
            })
     
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      handleClick(value) {
        this.ip = value.ip;
        this.dns = value.dns;
        console.log("Nome da fruta", value.dns);
                console.log("Nome da fruta", value.ip);
            },     
    },
};
</script>
