<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="mask blur"></div>
    <div class="drawer" :class="{'open': drawerActive}">
      Drawer
    </div>
    <div class="main">
      <div class="navbar">
        <button class="menu-toggle" @click="drawerActive=!drawerActive">
          <i class="uit uit-subject"></i>
        </button>
        <div class="title">
          ALLTALE
          <span class="subtitle">Universe</span>
        </div>
        <div class="actions hide-on-mobile">
          <nuxt-link v-for="button in navButtons" class="btn" :to="button.to" :key="button.key">{{
              button.title
            }}
          </nuxt-link>
        </div>
        <div class="server-status">
          <div class="dot" :class="{'offline': !serverConnected}"></div>
        </div>
      </div>
      <div class="content">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {io} from "socket.io-client";

export default {
  computed: {
    serverConnected() {
      return this.$store.state.websocket.status.connected;
    }
  },
  data() {
    return {
      drawerActive: false,
      navButtons: [
        {title: '境地', to: {name: 'index'}},
        {title: '行星', to: {name: 'planet'}},
        {title: '熵寂', to: {name: 'heat-death'}},
      ]
    }
  },
  mounted() {
    Vue.prototype.socket = io(this.$config.alltale_server, {
      path: '/alltale-core',
      withCredentials: true
    });

    /* Connection status */
    this.socket.on('connect', ev => {
      this.$store.commit('websocket/updateStatus', true);
    });
    this.socket.on('disconnect', ev => {
      this.$store.commit('websocket/updateStatus', false);
    });

    /* Broadcasts */
    this.socket.on('broadcast:online', dat => {
      this.$store.commit('im/updateOnline', dat);
    });

    /* Session */
    this.socket.on('session:update-cookie', cookie => document.cookie = cookie);
    this.socket.on('session:conflict', () => {
      this.socket.disconnect();
    });

    /* User / Identity */
    this.socket.on('user:update-info', ev => {
      this.$store.commit('identity/update', ev);
    });

    /* Messaging */
    this.socket.on('message:lobby', message => {
      this.$store.commit('im/putLobbyMessage', message);
    });
  }
}
</script>

<style scoped>
@import "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css";
@import "https://unicons.iconscout.com/release/v4.0.0/css/thinline.css";

.drawer {
  z-index: 999;
  position: fixed;
  left: -300px;
  bottom: 0;
  width: 300px;
  height: calc(100% - 64px);
  background: rgba(0, 0, 0, .8);
  backdrop-filter: blur(50px) saturate(180%);
  transition: left var(--animation) ease-out;
}

.drawer.open {
  left: 0;
}

.server-status {
  display: flex;
  align-items: center;
  min-width: 35px;
  height: 100%;
  margin-left: auto;
  margin-right: 20px;
}

.server-status .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #48c78e;
}

.server-status .dot.offline {
  background: #f14668;
}
</style>
