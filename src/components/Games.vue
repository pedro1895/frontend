<template>
  <v-card class="mx-auto">
    <v-toolbar color="pink" dark>
      <v-spacer />
      <v-toolbar-title>Partidas</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group active-class="pink--text">
        <template v-for="(item, index) in games">
          <v-list-item :key="item.title">
            <template>
              <v-list-item-content>
               <v-text-field v-text="item.data" dense outlined />
                <v-spacer />
                <v-text-field v-text="item.teamnamehome" dense outlined />
                <v-text-field v-text="item.goalhome" dense outlined />
                <v-text-field v-text="item.goalaway" dense outlined />
                <v-text-field v-text="item.teamnameaway" dense outlined />
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-divider v-if="index < games.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data: () => ({
    games: [],
  }),

  computed: {},

  watch: {},

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios
        .get("http://localhost:3000/games")
        .then((response) => {
          this.games = response.data;
          console.log("Games", response.data);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    close() {},
  },
};
</script>