<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">
          Realtime Web Editor
        </span>
        <div class="mdl-layout-spacer" />
        <button
          type="button"
          class="mdl-button mdl-js-button mdl-button&#45;&#45;raised mdl-js-ripple-effect mdl-button&#45;&#45;accent"
          @click="showModal = !showModal"
        >
          <i class="material-icons">
            logout
          </i>
        </button>
      </div>
    </header>
    <div
      v-if="documents"
      class="mdl-layout__drawer"
    >
      <span class="mdl-layout-title">
        Documents
      </span>
      <nav class="mdl-navigation">
        <a
          v-for="document in documents"
          :key="document.id"
          class="mdl-navigation__link"
          :href="'/'+document.id"
        >
          {{ document.title }}
        </a>
      </nav>
    </div>
    <dialog
      v-mdl
      v-mdl-modal-show="showModal"
      class="mdl-dialog"
    >
      <h4 class="mdl-dialog__title">
        Are you sure to log out?
      </h4>
      <div class="mdl-dialog__content">
        <p>
          This will remove your current nickname and you will not be able to authenticate with same credentials.
        </p>
      </div>
      <div class="mdl-dialog__actions">
        <button
          type="button"
          class="mdl-button"
          @click="signOut()"
        >
          Agree
        </button>
        <button
          type="button"
          class="mdl-button"
          @click="showModal = !showModal"
        >
          Disagree
        </button>
      </div>
    </dialog>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
    import { authService, documentService } from './index';

    export default {
        components: {},
        data () {
            return {
                showModal: false,
                documents: [],
            };
        },
        created () {
            documentService
                .listenList()
                .subscribe((documents) => {
                    this.documents = documents;
                });
        },
        methods: {
            signOut () {
                authService.signOut()
                    .subscribe(
                        null,
                        (error) => {
                            throw new Error(error);
                        },
                        () => {
                            this.showModal = !this.showModal;
                            this.$router.push('/');
                        },
                    );
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import 'assets/main';
</style>
