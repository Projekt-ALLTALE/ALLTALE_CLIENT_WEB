<template>
  <div class="chat-room">
    <InstantMessage></InstantMessage>
  </div>
</template>

<script>
export default {
  name: "chat-room"
}
</script>

<style scoped>
.chat-room {
  height: calc(100vh - 64px);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
}
</style>
