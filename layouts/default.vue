<template>
  <div class="wrapper">
    <div class="background"></div>
    <div class="mask blur"></div>
    <div class="main">
      <div class="navbar">
        <div class="title">
          ALLTALE
          <span class="subtitle">University</span>
        </div>
        <div class="actions">
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
    return {}
  },
}
</script>
