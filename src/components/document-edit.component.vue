<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--2-offset mdl-cell--9-col mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">
          Document
        </h2>
      </div>
      <div class="mdl-card__supporting-text">
        <template v-if="isLoaded">
          <div class="mdl-cell mdl-cell--12-col">
            <editable-textarea-component
              :content="title"
              :tooltip="'Document Title'"
              @onUpdate="saveTitle($event)"
            />
          </div>
          <div class="mdl-cell mdl-cell--12-col">
            <editable-textarea-component
              :content="content"
              :tooltip="'Document Content'"
              @onUpdate="saveContent($event)"
            />
          </div>
        </template>
        <div
          v-mdl
          class="mdl-spinner mdl-js-spinner"
          :class="{ 'is-active': !isLoaded }"
        />
      </div>
    </div>
  </div>
  <!--<div class="mdl-grid">
    <template v-if="isLoaded">
      <div class="mdl-cell mdl-cell&#45;&#45;6-col">
        <editable-textarea-component
          :content="title"
          :tooltip="'Document Title'"
          @onUpdate="saveTitle($event)"
        />
      </div>
      <div class="mdl-cell mdl-cell&#45;&#45;12-col">
        <editable-textarea-component
          :content="content"
          :tooltip="'Document Content'"
          @onUpdate="saveContent($event)"
        />
      </div>
    </template>
    <div
      v-mdl
      class="mdl-spinner mdl-js-spinner"
      :class="{ 'is-active': !isLoaded }"
    />
  </div>-->
</template>

<script>
    import { documentService } from '../index';
    import EditableTextareaComponent from '../components/editable-textarea.component';
    import debounce from 'lodash/debounce';
    import config from '../config';

    export default {
        name: 'DocumentEditComponent',
        components: { EditableTextareaComponent },
        props: {
            documentId: {
                type: String,
                required: true,
            },
        },
        data () {
            return {
                title: null,
                content: null,
                isLoaded: false,
            };
        },
        created () {
            this.debouncedSave = debounce(this.save, config.form.inputDebounceInterval);

            documentService
                .listenItem(this.documentId)
                // @todo: usage of arrow fn here will be provided with SafeSubscriber context instead of actual 'this'
                .subscribe(function (document) {
                    if (!document) {
                        throw new Error('No such document!');
                    }

                    this.title = document.title || '';
                    this.content = document.content || '';

                    this.isLoaded = true;
                }.bind(this));
        },
        methods: {
            saveTitle (title) {
                this.title = title;

                this.debouncedSave();
            },
            saveContent (content) {
                this.content = content;

                this.debouncedSave();
            },
            save () {
                const body = {
                    title: this.title,
                    content: this.content,
                };
                documentService
                    .save(this.documentId, body)
                    .subscribe();
            },
        },
    };
</script>

<style lang="scss" scoped>
  @import 'assets/main';

  .document {
    .title {
      font-size: 2em;
      margin-bottom: $margin-bottom;
    }
  }
</style>
