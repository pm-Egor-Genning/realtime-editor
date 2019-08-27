<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--3-offset mdl-cell--6-col mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">
          Dashboard
        </h2>
      </div>
      <div class="mdl-card__supporting-text">
        <form action="#">
          <div
            v-mdl
            class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
          >
            <input
              id="sample2"
              v-model="newDocumentName"
              class="mdl-textfield__input"
              type="text"
            >
            <label
              class="mdl-textfield__label"
              for="sample2"
            >
              New Document Title
            </label>
          </div>
        </form>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a
          class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          @click="submit"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    import { documentService } from '../index';

    export default {
        name: 'DashboardComponent',
        data () {
            return {
                newDocumentName: '',
            };
        },
        created () {
        },
        methods: {
            submit () {
                const name = 'document';

                documentService
                    .add({ title: this.newDocumentName, content: '' })
                    .subscribe((id) => {
                        this.$router.push({ name, params: { documentId: id } });
                    });
            },
        },
    };
</script>

<style scoped></style>
