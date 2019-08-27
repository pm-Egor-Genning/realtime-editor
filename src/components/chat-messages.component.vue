<template>
  <div>
    <div v-if="messages" class="messages">
      <div
        v-for="message in messages"
        :key="message.id"
      >
        <div class="mdl-color-text--grey-700">
          <strong v-if="userNames[message.userUid]">
            {{ userNames[message.userUid] }}
          </strong>
          <small>
            {{ message.timestamp | formatDate }}
          </small>
        </div>
        <p>{{ message.content }}</p>
      </div>
    </div>
    <div
      v-mdl
      class="mdl-spinner mdl-js-spinner"
      :class="{ 'is-active': !messages }"
    />
  </div>
</template>

<script>
    import { messageService, userService } from '../index';
    import { map } from 'rxjs/operators';

    export default {
        name: 'ChatMessagesComponent',
        props: {
            documentId: {
                type: String,
                required: true,
            },
        },
        data () {
            return {
                messages: null,
                userNames: {},
                users: [],
            };
        },
        created () {
            const documentId = this.documentId;
            messageService
                .listenList({ documentId })
                .pipe(
                    map(messages => messages.reverse())
                )
                .subscribe((messages) => {
                    this.messages = messages;
                });

            userService
                .listenList()
                .subscribe((users) => {
                    this.userNames = {};
                    users.forEach(user => {
                        this.userNames[user.uid] = user.displayName;
                    });
                });
        },
        methods: {
        },
    };
</script>

<style scoped>
  .messages {
    max-height: 200px;
    overflow: auto;
  }
</style>
