<template>
  <div class="at-im">
    <div class="at-im-status">
      <h1>根频道</h1>
    </div>
    <div class="at-im-list-wrapper">
      <ul class="at-im-list">
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
        <li class="at-im-message">[FASTER#2210]: sdfsdfsdf</li>
        <li class="at-im-message">[FASTER#2210]: dfgdsfgdsfg</li>
      </ul>
    </div>
    <div class="at-im-input-wrapper">
      asd
    </div>
  </div>
</template>

<script>
export default {
  name: "InstantMessage"
}
</script>

<style scoped>
h1, p {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.at-im {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.at-im-status {
  flex: 1;
  padding: 20px;
  color: #fff;
}

.at-im-status h1 {
  font-size: 28px;
  font-weight: 100;
}

.at-im-list-wrapper {
  flex: 6;
  width: 100%;
  overflow-y: scroll;
}

.at-im-list {
  list-style: none;
  margin: 0;
  padding: 0 20px;
  color: #fff;
}

.at-im-message {
  width: fit-content;
}

.at-im-input-wrapper {
  flex: 1;
  height: 60px;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(5px) saturate(180%);
  margin-top: auto;
}
</style>
