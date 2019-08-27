<template>
  <div>
    <div v-if="users">
      <ul class="mdl-list users">
        <li class="mdl-list__item"
            v-for="user in users"
            :key="user.id">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">
              person
            </i>
            {{ user.displayName }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'UserListComponent',
        components: {},
        props: {
            documentId: {
                type: String,
                required: true,
            },
            users: {
                type: Array,
                default: function () {
                    return [];
                },
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import 'assets/main';

    .users {
      max-height: 200px;
    }
</style>
