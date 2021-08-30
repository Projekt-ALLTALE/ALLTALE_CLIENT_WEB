<template>
  <div class="at-im">
    <div class="at-im-status">
      <h1>根频道</h1>
    </div>
    <div class="at-im-list-wrapper" ref="im-wrapper">
      <ul class="at-im-list">
        <li class="at-im-message"
            :class="{'info': message.info, 'warn': message.warn, 'myself': message.sender === identity.id}"
            v-for="message in globalMessage"
            :key="message.key">
          <div class="sender">
            <h3><span class="time">[{{ parseTimeToShow(message.time) }}] </span>{{ message.sender }}</h3>
          </div>
          <div class="message">
            {{ message.message }}
          </div>
        </li>
      </ul>
    </div>
    <div class="at-im-form-wrapper">
      <form class="at-im-form" @submit="sendMessage">
        <input placeholder="友善的发言..." v-model="inputMessage">
        <button type="submit"><i class="uit uit-telegram-alt"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstantMessage",
  computed: {
    globalMessage() {
      return this.$store.state.im.message.global
    },
    identity() {
      return this.$store.state.identity.info
    },
  },
  data() {
    return {
      inputMessage: ''
    }
  },
  methods: {
    sendMessage(event) {
      event.preventDefault();
      if (this.inputMessage) this.socket.emit('message:send', this.inputMessage);
      this.inputMessage = '';
    },
    parseTimeToShow(timestamp) {
      let datetime = new Date(timestamp);
      return `${datetime.getHours()}:${datetime.getMinutes()}`;
    }
  },
  watch: {
    globalMessage() {
      this.$nextTick(() => {
        // if (this.$refs["im-list"].childElementCount > 0) this.$refs["im-list"].lastChild.scrollIntoView({
        //   behavior: 'smooth'
        // });
        this.$refs['im-wrapper'].scroll(0, this.$refs['im-wrapper'].scrollHeight)
      })
    }
  }
}
</script>

<style scoped>
@keyframes MessageFadeInUp {
  0% {
    opacity: 0;
    transform: scale(.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

h1, p {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.at-im {
  width: 100%;
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
  width: 100%;
  height: 528px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.at-im-list {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0 20px;
  color: #fff;
}

.at-im-message {
  width: fit-content;
  margin-top: 6px;
  animation: MessageFadeInUp .6s ease-out;
}

.at-im-message.myself {
  margin-left: auto;
  text-align: right;
}

.at-im-message:first-child {
  margin-top: 0;
}

.at-im-message:last-child {
  margin-bottom: 10px;
}


.at-im-message .sender h3,
.at-im-message .sender .time {
  opacity: .6;
  font-size: 14px;
  font-weight: normal;
  font-family: sans-serif;
}

.at-im-message .sender .time {
  font-weight: bold;
}

.at-im-message .message {
  opacity: .8;
  /*font-size: 14px;*/
  font-weight: normal;
  font-family: sans-serif;
  word-wrap: anywhere;
}

.at-im-message.info,
.at-im-message.warn {
  display: flex;
  align-items: center;
  opacity: 1;
}

.at-im-message.info .message,
.at-im-message.warn .message {
  margin-left: 4px;
}

/*.at-im-message.info .sender h3,*/
/*.at-im-message.info .message {*/
/*  color: #f14668;*/
/*}*/

.at-im-message.info .message {
  opacity: 1;
}

.at-im-message.warn .sender h3,
.at-im-message.warn .message {
  color: #f14668;
}

.at-im-message.warn .message {
  opacity: 1;
}


.at-im-form-wrapper {
  width: 100%;
  height: 60px;
  border-radius: 0 0 4px 4px;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(5px) saturate(180%);
  overflow: hidden;
}

.at-im-form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.at-im-form input {
  appearance: none;
  flex: 4;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 16px;
  color: #fff;
  transition: all .1s;
  border-top: 2px solid rgba(255, 255, 255, 0);
}

.at-im-form input:hover {
  background-color: rgba(255, 255, 255, .1);
}

.at-im-form input:focus {
  background-color: rgba(255, 255, 255, .1);
  border-top: 2px solid rgba(255, 255, 255, .3);
}

.at-im-form button {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  transition: all .1s;
  border-left: 1px solid rgba(255, 255, 255, .1);
  will-change: contents;
}

.at-im-form button:hover {
  background-color: rgba(255, 255, 255, .1);
}

.at-im-form button:active {
  font-size: 20px;
}
</style>
