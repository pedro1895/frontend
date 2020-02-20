<template>
  <v-app>
    <v-content>
      <v-container class="mt-5">
         <v-row>
      <v-col
        cols="12"
        md="8"
      >
       <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar por DNS"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
       <v-data-table
       :search="search"
      :headers="headers"
      :items="list"
      :items-per-page="5"
      class="elevation-1"
      @load="loadList"
      @click:row="handleClick"
    ></v-data-table>
       </v-card>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
      <v-card class="mx-auto" max-width="344">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">DNS {{dns}}</v-list-item-title>
            <v-list-item-subtitle>localhost {{ip}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
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

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Salvar</v-btn>

            <v-btn color="error" class="mr-4" @click="reset">Limpar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
  
      </v-col>
         </v-row>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data: () => ({
    search: '',
    list: [],
    valid: true,
    dns: "",
    dnsRules: [v => !!v || "DNS is required"],
    ip: "",
    ipRules: [v => !!v || "Ip is required"],
    headers: [
      {
        text: "DNS",
        align: "left",
        sortable: false,
        value: "dns"
      },
      { text: "IP", value: "ip" }
    ]
  }),
  components: {},
  async mounted() {
    axios
      .get("http://localhost:9090/dns-services/list")
      .then(response => {
        this.list = response.data;
        console.log("Response", response.data);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        axios
          .post("http://localhost:9090/dns-services", {
            ip: this.ip,
            dns: this.dns
          })
          .then(response => {
            this.$refs.form.reset();
            console.log("Response", response.data);
            axios
              .get("http://localhost:9090/dns-services/list")
              .then(response => {
                this.list = response.data;
                console.log("Response", response.data);
              })
              .catch(error => {
                console.log(error);
                this.errored = true;
              });
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    handleClick(value) {
      this.ip = value.ip;
      this.dns = value.dns;
      console.log("Nome da fruta", value.dns);
      console.log("Nome da fruta", value.ip);
    }
  }
};
</script>
