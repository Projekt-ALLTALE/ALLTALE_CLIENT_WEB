<template>
  <div class="wrapper" ref="page-wrapper">
    <div class="background"></div>
    <div class="mask blur"></div>
    <div class="drawer acrylic" theme="dark" :class="{'open': drawerActive}">
      <div class="drawer-mask" ref="drawer-close-area"></div>
      <div class="option-list">
        <div class="option">
          <span><b-icon
            class="option-icon"
            style="margin-right: 1rem;"
            icon="list-status"
            size="is-small">
          </b-icon>服务器状态</span>
        </div>
        <div class="option">
          <span><b-icon
            class="option-icon"
            style="margin-right: 1rem;"
            icon="playlist-music"
            size="is-small">
          </b-icon>媒体</span>
          <b-icon
            class="option-icon"
            icon="chevron-right"
            size="is-small">
          </b-icon>
        </div>
        <div class="option">
          <span><b-icon
            class="option-icon"
            style="margin-right: 1rem;"
            icon="account-supervisor"
            size="is-small">
          </b-icon>在线</span>
          <b-icon
            class="option-icon"
            icon="chevron-right"
            size="is-small">
          </b-icon>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="navbar acrylic">
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
    this.$refs['page-wrapper'].setAttribute('theme', 'light');
    this.$refs['drawer-close-area'].onclick = () => {
      this.drawerActive = false;
    }

    /* Websocket */
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

@keyframes drawerMaskIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.drawer {
  z-index: 999;
  position: fixed;
  left: -300px;
  bottom: 0;
  width: 300px;
  height: calc(100% - 64px);
  backdrop-filter: blur(55px);
  transition: left var(--animation) ease-out;
}

.drawer.open {
  left: 0;
}

.drawer.open .drawer-mask {
  position: fixed;
  margin-left: 300px;
  width: calc(100vw + 300px);
  height: calc(100vh - 64px);
  background-color: rgba(0, 0, 0, .6);
  animation: drawerMaskIn var(--animation);
}

.option-list {
  width: 100%;
  color: rgba(255, 255, 255, .8);
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 50px;
  background-color: rgba(0, 0, 0, .04);
  backdrop-filter: blur(50px);
  transition: background-color var(--animation);
  cursor: pointer;
  /*border-bottom: 1px solid rgba(255, 255, 255, .1);*/
}

/*.option:last-child {*/
/*  border-bottom: none;*/
/*}*/

.option:hover {
  background-color: rgba(0, 0, 0, .2);
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
