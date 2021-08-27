<template>
  <div class="home-page">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <div class="tile is-child">
              <HitokotoCard></HitokotoCard>
            </div>
            <div class="tile is-child">
              <IdentitySettingCard></IdentitySettingCard>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child">
              <WelcomeCard></WelcomeCard>
            </div>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <div class="tile-card" style="min-height: 100%;">
            <InstantMessage></InstantMessage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      trackIds: [],
      songs: []
    }
  },
  // created() {
  //   this.$ncm = this.$axios
  //   this.$ncm.setBaseURL('https://ncm.ibox.moe/')
  //   this.$ncm.$get('/playlist/detail', {params: {id: 6932491434}}).then(playlist_detail => {
  //     playlist_detail.playlist.trackIds.forEach(id => {
  //       this.trackIds.push(id.id)
  //     })
  //     this.$ncm.$get('/song/detail', {params: {ids: this.trackIds.join(',')}}).then(song_detail => {
  //       this.songs = song_detail.songs
  //     })
  //     this.$ncm.$get('/song/url', {params: {id: this.trackIds.join(',')}}).then(song_url => {
  //       console.log(song_url)
  //     })
  //   })
  // },
  mounted() {
    const tile_cards = document.querySelectorAll('.tile-card')
    let tile_cards_animation_delay = 0;
    tile_cards.forEach(tileCard => {
      tileCard.style.animationDuration = '1s';
      tileCard.style.animationDelay = `${tile_cards_animation_delay}s`;
      tile_cards_animation_delay += 0.25;
    })
  }
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.tile-card {
  opacity: 0;
}
</style>
