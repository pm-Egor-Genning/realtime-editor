import Vue from 'vue';
import App from './app.vue';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';
import router from './router';
import vueFilters from './plugins/filters';
import vueDirectives from './plugins/directives';
import 'material-design-lite/material.js';

import 'material-design-lite/material.css';
import 'assets/main.scss';
import AuthService from './services/auth.service';
import UserService from './services/user.service';
import RandomNameService from './services/random-name.service';
import DocumentService from './services/document.service';
import MessageService from './services/message.service';

firebase.initializeApp(config.firebase);

export const ApiResourceProviderNamespace = firebase.database;

for (let key in vueFilters) {
  Vue.filter(key, vueFilters[key]);
}

for (let key in vueDirectives) {
  Vue.directive(key, vueDirectives[key]);
}

/* eslint-disable no-new */
const firebaseDatabase = firebase.database();
export const messageService = new MessageService(firebaseDatabase);
export const documentService = new DocumentService(firebaseDatabase);
export const userService = new UserService(firebaseDatabase);
export const randomNameService = new RandomNameService(firebaseDatabase);
export const authService = new AuthService(firebase.auth(), userService, randomNameService);
authService.handleUserStateChange();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
