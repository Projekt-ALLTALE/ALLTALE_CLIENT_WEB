<template>
  <div class="tile-card">
    <div class="card-container">
      <h1 class="card-title">
        <i class="uit uit-polygon"></i>
        欢迎来到阿尔泰拉
      </h1>
      <p class="card-content">
        这是一个完全匿名的社交宇宙，每个人都是时空长河中的一个过客，我们无从知晓对方的面目，只能用纯粹的文字接触对方...
      </p>
      <h1 class="card-title">
        <i class="uit uit-polygon"></i>
        行星
      </h1>
      <p class="card-content">
        阿尔泰拉会不定期投放一批“行星”，可在有限的窗口期内登陆行星，与同行者建立通讯...
      </p>
      <h1 class="card-title">
        <i class="uit uit-polygon"></i>
        熵寂
      </h1>
      <p class="card-content">
        宇宙的终点是熵寂，万物湮灭。这个板块类似一个留言板，但是在这里发布的任何内容都会在某一时刻被“黑洞吞噬”，或许又在将来某一时刻，黑洞塌缩，内容得以短暂的重现...
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeCard",
}
</script>

<style scoped>

h1, p {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.tile-card {
  min-height: 320px;
  height: 100%;
  color: #fff;
}

.card-container {
  width: fit-content;
  height: 100%;
  padding: 20px;
}

.card-title {
  font-size: 28px;
  font-weight: 100;
}

.card-content {
  font-size: 16px;
  font-weight: 100;
  margin: 10px 0 20px 0;
  text-indent: 2rem;
  line-height: 26px;
}
</style>
