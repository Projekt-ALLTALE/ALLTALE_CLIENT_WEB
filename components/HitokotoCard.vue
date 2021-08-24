<template>
  <div class="tile-card card-hitokoto">
    <div class="image" :style="{'background-image': `url('${imageUrl}')`}"></div>
    <div class="mask"></div>
    <div class="card-content">
      <div class="date">
        <h1 id="day">25</h1>
        <h6 id="year">AUG 2021</h6>
      </div>
      <div class="slogan-wrapper">
        <b-skeleton :active="!hitokoto" width="250px" height="26px"></b-skeleton>
        <p id="slogan" v-html="hitokoto"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HitokotoCard",
  data() {
    return {
      hitokoto: null,
      imageUrl: null,
    }
  },
  mounted() {
    this.$axios.$get('https://v1.hitokoto.cn/?c=k').then(data => {
      const words = data.hitokoto.split('')
      let rawAnimatedWords = ''
      words.forEach(word => {
        rawAnimatedWords += `<span class="slogan-word fadeIn" style="animation-delay: ${this.rdm(0.5, 1)}s; animation-duration: ${this.rdm(0.5, 1.5)}s;">${word}</span>`
      })
      this.hitokoto = rawAnimatedWords
    })
    this.$axios.$get('https://api.no0a.cn/api/bing/0').then(data => {
      this.imageUrl = data.bing.url || 'https://acg.toubiec.cn/random.php'
    })
  },
  methods: {
    rdm(min = 0, max = 1, fix = 2) {
      let ratio = max - min;
      let range = Math.random() * ratio;
      return parseFloat((range + min).toFixed(fix));
    }
  }
}
</script>

<style scoped>
h1, h6, p {
  margin: 0;
  padding: 0;
}

.card-hitokoto {
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  overflow: hidden;
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: .8;
  -o-object-fit: cover;
  object-fit: cover;
  background-size: cover;
  background-position: center;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
}

.card-content {
  position: absolute;
  bottom: 0;
  padding: 20px;
}

.date {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin-bottom: 20px;
  text-align: center;
}

.date #day,
.date #year,
.slogan-wrapper #slogan {
  color: rgba(255, 255, 255, 1);
  font-family: sans-serif;
}

.date #day {
  font-size: 50px;
  font-weight: 900;
}

.date #year {
  font-size: 12px;
  font-weight: 600;
}

#slogan {
  max-width: 350px;
  line-height: 1.8rem;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: .3rem;
}
</style>

<style>
span.slogan-word {
  opacity: 0;
  animation-fill-mode: forwards;
}
</style>
