<!--suppress HtmlUnknownAttribute -->
<template>
  <div class="wrapper" ref="page-wrapper" :theme="'light'">
    <div class="background"></div>
    <div class="mask blur"></div>
    <div class="drawer acrylic" theme="dark" :class="{'open': drawerActive}">
      <div class="drawer-mask" ref="drawer-close-area"></div>
      <DrawerOption :drawer-options="drawerOptions"/>
    </div>
    <div class="main">
      <div class="navbar acrylic">
        <button class="menu-toggle" @click="drawerActive=!drawerActive">
          <i class="uit" :class="drawerActive ? 'uit-left-indent' : 'uit-subject'"></i>
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
        <div class="server-status" @click="toggleInfo">
          <div class="dot" :class="{'offline': !serverConnected}"></div>
          <div class="server-info" :class="{visible: serverInfoVisible}">
            <div>
              <div>
                <b-icon icon="server-network" size="is-small"/>
                服务器: <code>{{ serverInfo.name || 'N/A' }}</code>
              </div>
              <div>
                <b-icon icon="earth" size="is-small"/>
                区域: <code>{{ serverInfo.region || 'N/A' }}</code>
              </div>
              <div>
                <b-icon icon="beta" size="is-small"/>
                版本: <code>{{ serverInfo.version || 'N/A' }}</code>
              </div>
            </div>
          </div>
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
    },
    onlineMembers() {
      return this.$store.state.im.server.members;
    },
    serverInfo() {
      return this.$store.state.websocket.status.serverInfo;
    }
  },
  data() {
    return {
      drawerActive: false,
      serverInfoVisible: false,
      navButtons: [
        {title: '境地', to: {name: 'index'}},
        {title: '行星', to: {name: 'planet'}},
        {title: '熵寂', to: {name: 'heat-death'}},
      ],
      drawerOptions: [
        {
          title: '项目处于开发中，前往GitHub →',
          isTip: true,
          callback: () => {
            window.open('https://github.com/Projekt-ALLTALE/ALLTALE_CLIENT_WEB')
          }
        },
        {
          title: '切换主题',
          icon: 'theme-light-dark'
        },
        {
          title: '媒体',
          icon: 'playlist-music',
          children: [
            {
              title: '子项目',
              icon: 'arrow-right'
            },
          ]
        },
        {
          title: '在线',
          icon: 'account-supervisor',
          children: []
        },
      ]
    }
  },
  mounted() {
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
      this.$store.commit('im/updateMembers', dat);
    });

    /* Session */
    this.socket.on('session:server-info', info => this.$store.commit('websocket/updateServerInfo', info));
    this.socket.on('session:update-cookie', cookie => document.cookie = cookie);
    this.socket.on('session:conflict', () => this.socket.disconnect());
    this.socket.on('session:typing', typing => this.$store.commit('im/updateTypingMember', JSON.parse(typing).members))

    /* User / Identity */
    this.socket.on('user:update-info', ev => {
      this.$store.commit('identity/update', ev);
    });

    /* Messaging */
    this.socket.on('message:lobby', message => {
      this.$store.commit('im/putLobbyMessage', message);
    });
  },
  watch: {
    onlineMembers(members) {
      this.drawerOptions[3].children = [];
      for (let member in members) {
        this.drawerOptions[3].children.push({
          title: members[member].id,
          icon: 'account'
        })
      }
    }
  },
  methods: {
    toggleInfo() {
      this.serverInfoVisible = !this.serverInfoVisible;
    }
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
  will-change: left;
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

.server-status {
  display: flex;
  align-items: center;
  min-width: 35px;
  height: 100%;
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
  user-select: none;
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

.server-info {
  pointer-events: none;
  position: absolute;
  min-width: 50px;
  padding: 10px;
  top: 64px;
  right: 48px;
  color: rgba(255, 255, 255, .6);
  background-color: rgba(55, 55, 55, 1);
  box-shadow: -5px 5px 5px -5px rgba(0, 0, 0, .5);
  font-size: 13px;
  font-family: sans-serif;
  border-bottom-left-radius: 4px;
  opacity: 0;
  transition: opacity 0.1s;
}

.server-info.visible {
  opacity: 1;
}
</style>
