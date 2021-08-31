<template>
  <div class="tile-card acrylic card-identity">
    <div class="identity">
      <h3>当前会话身份</h3>
      <p>{{ identity.info.id || '等待分配' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdentitySettingCard",
  computed: {
    identity() {
      return this.$store.state.identity
    }
  }
}
</script>

<style scoped>
h3, p {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.card-identity {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  --line-color: rgba(0, 153, 68, .2);
  background: linear-gradient(
    -45deg,
    var(--line-color) 0, var(--line-color) 25%, transparent 25%, transparent 50%,
    var(--line-color) 50%, var(--line-color) 75%, transparent 75%, transparent
  );
  background-size: 15px 15px;
}

.identity h3 {
  font-size: 18px;
  color: rgba(200, 200, 200, .8);
  margin-top: -28px;
  margin-bottom: 10px;
}

.identity p {
  color: rgba(255, 255, 255, .8);
  padding: 0 5px;
  font-size: 30px;
  background: rgba(255, 255, 255, .4);
  border: 2px solid rgba(255, 255, 255, .8);
  border-radius: 6px;
  cursor: pointer;
}
</style>
