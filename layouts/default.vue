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
          <span class="subtitle">University</span>
        </div>
        <div class="actions hide-on-mobile">
          <nuxt-link v-for="button in navButtons" class="btn" :to="button.to" :key="button.key">{{
              button.title
            }}
          </nuxt-link>
        </div>
      </div>
      <div class="content">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import {io} from "socket.io-client";

export default {
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
    const socket = io('127.0.0.1:21611', {path: '/alltale-core'})
    socket.on('user:update-info', ev => {
      this.$store.commit('identity/update', ev);
    })
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
</style>

<style>
.foot {
  display: none;
}
</style>
