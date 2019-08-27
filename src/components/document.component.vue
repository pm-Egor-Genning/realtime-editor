<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col">
      <document-edit-component :document-id="documentId" />
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <chat-component :document-id="documentId" />
    </div>
  </div>
</template>

<script>
    import DocumentEditComponent from './document-edit.component';
    import ChatComponent from './chat.component';

    export default {
        name: 'DocumentComponent',
        components: { DocumentEditComponent, ChatComponent },
        data () {
            return {
                resource: null,
                document: null,
            };
        },
        computed: {
            documentId () {
                return this.$route.params['documentId'];
            },
        },
        created () {
        },
        methods: {
        },
    };
</script>

<style lang="scss" scoped>
</style>
