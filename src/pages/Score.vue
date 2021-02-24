<template>
  <TemplateDefault>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="scores"
        sort-by="score"
        @click:row="handleClick"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Classificação</v-toolbar-title>
            <v-dialog v-model="dialog" max-width="500px">
                    <!-- INICIO -->

                    <Games/>

                    <!-- FIM -->
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </TemplateDefault>
</template>

<script>
import axios from "axios";
import TemplateDefault from "@/components/TemplateDefault";
import Games from "@/components/Games";
export default {
  name: "App",
  components: { TemplateDefault , Games},
  data: () => ({
    itemSelect: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Clube",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Pts", value: "score" },
      { text: "PJ", value: "games" },
      { text: "VIT", value: "victories" },
      { text: "E", value: "draw" },
      { text: "DER", value: "defeats" },
      { text: "GP", value: "scoredGoals" },
      { text: "GC", value: "concededGoals" },
      { text: "SG", value: "balance" },
    ],
    scores: [],
    games: [],
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios
        .get("http://localhost:3000/score")
        .then((response) => {
          this.scores = response.data;
          console.log("Score", response.data);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });

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
    close() {
      this.dialog = false;
    },
    handleClick() {
      //this.highlightClickedRow(value);
      this.dialog = true;
    },
    highlightClickedRow() {},
  },
};
</script>