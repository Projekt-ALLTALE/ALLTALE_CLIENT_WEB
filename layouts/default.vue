<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="mask blur"></div>
    <div class="drawer" :class="{'open': drawerActive}">Drawer</div>
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
          <nuxt-link class="btn" to="/none">示例</nuxt-link>
          <nuxt-link class="btn" to="/none">示例</nuxt-link>
          <nuxt-link class="btn" to="/none">示例</nuxt-link>
        </div>
      </div>
      <div class="content">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerActive: false,
    }
  }
}
</script>

<style scoped>
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
