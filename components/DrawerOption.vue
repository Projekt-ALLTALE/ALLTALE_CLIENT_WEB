<!--suppress HtmlUnknownAttribute -->
<template>
  <div class="option-list">
    <div class="option-wrapper" v-for="(option, index) in drawerOptions" :key="option.key">
      <div v-if="option.isTip" @click="(typeof option.callback === 'function') ? option.callback() : ()=>{}"
           class="option-wrapper">
        <div class="option tip">
          <span>{{ option.title }}</span>
        </div>
      </div>
      <div v-else class="option"
           @click="!option.callback
           ? toggleDrawerChild(index, option.children ? (option.children.length || 0) : 0)
           : option.callback()"
           :ref="`option${index}`">
          <span>
              <b-icon
                class="option-icon"
                style="margin-right: 1rem;"
                :icon="option.icon"
                size="is-small"
              />{{ option.title }}
          </span>
        <b-icon
          v-if="option.children || false"
          class="option-icon"
          icon="chevron-right"
          size="is-small"
        />
      </div>
      <div class="option-list-child" v-if="option.children" :ref="`child${index}`"
      >
        <div class="option child" v-for="(child, childIndex) in option.children">
          <span><b-icon
            class="option-icon"
            style="margin-right: 1rem;"
            :icon="child.icon"
            size="is-small">
          </b-icon>{{ child.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawerOption",
  props: {
    'drawerOptions': {
      type: Array,
      require: true
    }
  },
  mounted() {
  },
  methods: {
    toggleDrawerChild(index, childCount = 0) {
      /* Self icon rotation */
      const ref = this.$refs[`option${index}`];
      ref[0].classList.toggle('expanded')

      /* Child */
      const childRef = this.$refs[`child${index}`] || null;
      if (childRef) if (childRef[0]) {
        const elem = childRef[0];
        elem.style.height = !ref[0].classList.contains('expanded')
          ? 0
          : `${childCount * 50}px`;
      }
    }
  }
}
</script>

<style scoped>
.option-list {
  width: 100%;
  color: rgba(255, 255, 255, .8);
  font-family: sans-serif;
}

.option {
  --rotate-deg: 0deg;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 1.5rem;
  height: 50px;
  font-size: 16px;
  user-select: none;
  background-color: rgba(0, 0, 0, .04);
  backdrop-filter: blur(50px);
  transition: background-color var(--animation);
  cursor: pointer;
}

.option.expanded {
  --rotate-deg: 90deg;
}

/*.option:last-child {*/
/*  border-bottom: none;*/
/*}*/

.option:hover {
  background-color: rgba(0, 0, 0, .2);
}

.option-icon {
  transform: rotate(var(--rotate-deg));
  transition: all var(--animation);
}


.option.tip {
  height: 30px;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  background-color: rgba(241, 70, 104, .4);
}

.option-list-child {
  width: 100%;
  height: 0;
  background: transparent;
  font-family: sans-serif;
  color: rgba(255, 255, 255, .8);
  box-shadow: inset 0 20px 12px -20px rgba(0, 0, 0, .8);
  overflow: hidden;
  will-change: height;
  transition: all calc(var(--animation) / 2) ease-in-out;
}

.option.child {
  background-color: rgba(255, 255, 255, .04);
}

.option.child:hover {
  background-color: rgba(255, 255, 255, .02);
}
</style>
