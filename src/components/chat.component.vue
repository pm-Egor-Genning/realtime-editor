<template>
  <div>
    <div class="mdl-card mdl-shadow--2dp your-name">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">
          Your name
        </h2>
      </div>
      <div class="mdl-card__supporting-text">
        <editable-textarea-component
          v-if="userName"
          :content="userName"
          :tooltip="'Current Username'"
          @onUpdate="debouncedSaveUserName($event)"
        />
      </div>
    </div>
    <div class="mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">
          Users
        </h2>
      </div>
      <div class="mdl-card__supporting-text">
        <user-list-component
          :document-id="documentId"
          :users="users"
        />
      </div>
    </div>
    <div class="mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">
          Messages
        </h2>
      </div>
      <div class="mdl-card__supporting-text">
        <chat-messages-component :document-id="documentId" />
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <div
          v-mdl
          class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        >
          <input
            id="document-title"
            v-model="newMessageContent"
            type="text"
            class="mdl-textfield__input"
          >
          <label
            class="mdl-textfield__label"
            for="document-title"
          >
            New Message Content
          </label>
        </div>
        <a
          class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          @click="submit"
        >
          Send
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    import debounce from 'lodash/debounce';
    import { ApiResourceProviderNamespace, authService, messageService, userService } from '../index';
    import EditableTextareaComponent from '../components/editable-textarea.component';
    import ChatMessagesComponent from '../components/chat-messages.component';
    import config from '../config';
    import UserListComponent from './user-list.component';

    export default {
        name: 'ChatComponent',
        components: { UserListComponent, EditableTextareaComponent, ChatMessagesComponent },
        props: {
            documentId: {
                type: String,
                required: true,
            },
        },
        data () {
            return {
                newMessageContent: '',
                userName: null,
                users: [],
            };
        },
        created () {
            this.debouncedSaveUserName = debounce(this.saveUserName, config.form.inputDebounceInterval);

            this.userName = authService.user.displayName;

            this.update();

            userService
                .listenList()
                .subscribe((users) => {
                    this.users = users;
                });
        },
        methods: {
            saveUserName (displayName) {
                authService
                    .updateUserDisplayName(displayName)
                    .subscribe(() => {
                        this.update();
                    });
            },
            submit () {
                const content = this.newMessageContent;
                const documentId = this.documentId;
                const timestamp = ApiResourceProviderNamespace.ServerValue.TIMESTAMP;
                const userUid = authService.user.uid;

                messageService
                    .add({ content, timestamp, userUid }, { documentId })
                    .subscribe(() => {
                        this.update();
                        this.newMessageContent = '';
                    });
            },
            update () {
                this.userName = authService.user.displayName;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import 'assets/main';

    .your-name {
      min-height: unset;
    }

    .chat {

        .title {
            font-size: 2em;
            margin-bottom: $margin-bottom;
        }
    }
</style>
