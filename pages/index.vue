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
              <div class="tile-card">1</div>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child">
              <div class="tile-card" style="height: 100%;">2</div>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child">
            <div class="tile-card">3</div>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <div class="tile-card" style="height: 100%;">4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
