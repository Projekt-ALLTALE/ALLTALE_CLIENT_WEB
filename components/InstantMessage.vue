<template>
  <div class="at-im">
    <div class="at-im-status">
      <h1>根频道<span class="at-im-online">在线人数：{{ online || 'N/A' }}</span></h1>
    </div>
    <div class="at-im-list-wrapper" ref="im-wrapper">
      <ul class="at-im-list">
        <li class="at-im-message"
            :class="{'info': message.info, 'warn': message.warn, 'admin': message.admin, 'myself': message.sender === identity.id}"
            v-for="message in lobbyMessage"
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
      <div class="typing-member-wrapper" v-if="$store.state.im.typingMember.lobby.length > 0">
        <div class="typing-member">{{ $store.state.im.typingMember.lobby.join(', ') }}</div>
        正在输入中
        <div class="typing-animate">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
      <form class="at-im-form" @submit="sendMessage">
        <input placeholder="友善的发言..." v-model="inputMessage" ref="input">
        <button type="submit"><i class="uit uit-telegram-alt"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstantMessage",
  computed: {
    lobbyMessage() {
      return this.$store.state.im.message.lobby
    },
    online() {
      return this.$store.state.im.server.online
    },
    identity() {
      return this.$store.state.identity.info
    },
    typingMember() {
      return this.$store.state.im.typingMember
    }
  },
  data() {
    return {
      inputMessage: '',
      typing: false
    }
  },
  methods: {
    sendMessage(event) {
      event.preventDefault();
      if (this.inputMessage) this.socket.emit('message:send', this.inputMessage);
      this.inputMessage = '';
      this.$nextTick(() => {
        this.typing = false;
      });
    },
    parseTimeToShow(timestamp) {
      let datetime = new Date(timestamp);
      return `${datetime.getHours().toString().padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}`;
    }
  },
  watch: {
    lobbyMessage() {
      this.$nextTick(() => {
        this.$refs['im-wrapper'].scroll(0, this.$refs['im-wrapper'].scrollHeight)
      })
    },
    inputMessage() {
      this.typing = this.inputMessage !== '';
    },
    typing(typing) {
      if (typing) this.socket.emit('session:typing-start')
      else this.socket.emit('session:typing-finish')
    }
  }
}
</script>

<style scoped>
@-webkit-keyframes MessageFadeInUp {
  0% {
    opacity: 0;
    transform: scale(.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

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
  padding: 20px;
  color: #fff;
}

.at-im-status h1 {
  font-size: 28px;
  font-weight: 100;
}

.at-im-status h1 .at-im-online {
  opacity: .6;
  display: block;
  font-size: 14px;
  font-weight: lighter;
}

.at-im-list-wrapper {
  width: 100%;
  height: 509px;
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
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin-top: 6px;
  -webkit-animation: MessageFadeInUp .6s ease-out;
  animation: MessageFadeInUp .6s cubic-bezier(.1, .7, .1, 1);
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
  flex-wrap: wrap;
  align-items: center;
  opacity: 1;
}

.at-im-message.info .message,
.at-im-message.warn .message,
.at-im-message.admin .message {
  opacity: 1;
  margin-left: 4px;
}

.at-im-message.warn .sender h3,
.at-im-message.warn .message {
  color: #f14668;
}

.at-im-message.admin .sender h3,
.at-im-message.admin .message {
  color: #ff9900;
}


.at-im-form-wrapper {
  position: relative;
  width: 100%;
  height: 60px;
  border-radius: 0 0 4px 4px;
  background: rgba(255, 255, 255, .1);
  -webkit-backdrop-filter: blur(5px) saturate(180%);
  backdrop-filter: blur(5px) saturate(180%);
}

@keyframes typingShow {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dot-scale {
  0% {
    opacity: .6;
    transform: scale(.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: .6;
    transform: scale(.9);
  }
}

.typing-member-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 25px;
  top: -25px;
  padding-left: 16px;
  color: rgba(255, 255, 255, .4);
  background-color: rgba(90, 90, 90, 1);
  backdrop-filter: blur(44px);
  font-size: 14px;
  font-family: sans-serif;
  overflow: hidden;
  animation: typingShow .6s cubic-bezier(.1, .7, .1, 1);
  transition: all .3s;
  will-change: opacity, transform, background;
}

.typing-member {
  margin-right: 4px;
}

.typing-animate {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
}

.typing-dot {
  background-color: rgba(255, 255, 255, .4);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 0 2px;
}

.typing-dot:nth-child(1) {
  animation: dot-scale .6s 0s infinite linear;
}

.typing-dot:nth-child(2) {
  animation: dot-scale .6s .2s infinite linear;
}

.typing-dot:nth-child(3) {
  animation: dot-scale .6s .4s infinite linear;
}

.at-im-form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.at-im-form input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 4;
  border: none;
  outline: none;
  border-radius: 0;
  background: transparent;
  margin: 0;
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
  margin: 0;
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

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm1hdC1wYWQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7SUFDRSxVQUFVO0lBQ1Ysb0JBQW9CO0VBQ3RCO0VBQ0E7SUFDRSxVQUFVO0lBQ1YsbUJBQW1CO0VBQ3JCO0FBQ0Y7O0FBVEE7RUFDRTtJQUNFLFVBQVU7SUFDVixvQkFBb0I7RUFDdEI7RUFDQTtJQUNFLFVBQVU7SUFDVixtQkFBbUI7RUFDckI7QUFDRjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLE9BQU87RUFDUCxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsU0FBUztFQUNULGVBQWU7RUFDZixXQUFXO0FBQ2I7O0FBRUE7RUFDRSwwQkFBa0I7RUFBbEIsdUJBQWtCO0VBQWxCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsK0NBQXVDO1VBQXZDLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7OztBQUdBOztFQUVFLFdBQVc7RUFDWCxlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixVQUFVO0FBQ1o7O0FBRUE7O0VBRUUsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBOztFQUVFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7OztBQUdBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWiwwQkFBMEI7RUFDMUIsbUNBQW1DO0VBQ25DLGlEQUF5QztVQUF6Qyx5Q0FBeUM7RUFDekMsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0Usd0JBQWdCO0tBQWhCLHFCQUFnQjtVQUFoQixnQkFBZ0I7RUFDaEIsT0FBTztFQUNQLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLDRDQUE0QztBQUM5Qzs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLHlDQUF5QztFQUN6Qyw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxPQUFPO0VBQ1AsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLFdBQVc7RUFDWCxlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLDhDQUE4QztFQUM5QyxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCIiwiZmlsZSI6ImZvcm1hdC1wYWQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGtleWZyYW1lcyBNZXNzYWdlRmFkZUluVXAge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKC45KTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cblxuaDEsIHAge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xufVxuXG4uYXQtaW0ge1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmF0LWltLXN0YXR1cyB7XG4gIGZsZXg6IDE7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4uYXQtaW0tc3RhdHVzIGgxIHtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBmb250LXdlaWdodDogMTAwO1xufVxuXG4uYXQtaW0tbGlzdC13cmFwcGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNTI4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xufVxuXG4uYXQtaW0tbGlzdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAgMjBweDtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5hdC1pbS1tZXNzYWdlIHtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBtYXJnaW4tdG9wOiA2cHg7XG4gIGFuaW1hdGlvbjogTWVzc2FnZUZhZGVJblVwIC42cyBlYXNlLW91dDtcbn1cblxuLmF0LWltLW1lc3NhZ2UubXlzZWxmIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4uYXQtaW0tbWVzc2FnZTpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG5cbi5hdC1pbS1tZXNzYWdlOmxhc3QtY2hpbGQge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG5cbi5hdC1pbS1tZXNzYWdlIC5zZW5kZXIgaDMsXG4uYXQtaW0tbWVzc2FnZSAuc2VuZGVyIC50aW1lIHtcbiAgb3BhY2l0eTogLjY7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG59XG5cbi5hdC1pbS1tZXNzYWdlIC5zZW5kZXIgLnRpbWUge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmF0LWltLW1lc3NhZ2UgLm1lc3NhZ2Uge1xuICBvcGFjaXR5OiAuODtcbiAgLypmb250LXNpemU6IDE0cHg7Ki9cbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIHdvcmQtd3JhcDogYW55d2hlcmU7XG59XG5cbi5hdC1pbS1tZXNzYWdlLmluZm8sXG4uYXQtaW0tbWVzc2FnZS53YXJuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgb3BhY2l0eTogMTtcbn1cblxuLmF0LWltLW1lc3NhZ2UuaW5mbyAubWVzc2FnZSxcbi5hdC1pbS1tZXNzYWdlLndhcm4gLm1lc3NhZ2Uge1xuICBtYXJnaW4tbGVmdDogNHB4O1xufVxuXG4uYXQtaW0tbWVzc2FnZS5pbmZvIC5tZXNzYWdlIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLmF0LWltLW1lc3NhZ2Uud2FybiAuc2VuZGVyIGgzLFxuLmF0LWltLW1lc3NhZ2Uud2FybiAubWVzc2FnZSB7XG4gIGNvbG9yOiAjZjE0NjY4O1xufVxuXG4uYXQtaW0tbWVzc2FnZS53YXJuIC5tZXNzYWdlIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuXG4uYXQtaW0tZm9ybS13cmFwcGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNjBweDtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDRweCA0cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgLjEpO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNXB4KSBzYXR1cmF0ZSgxODAlKTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmF0LWltLWZvcm0ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5hdC1pbS1mb3JtIGlucHV0IHtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgZmxleDogNDtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMCAxNnB4O1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIC4xcztcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XG59XG5cbi5hdC1pbS1mb3JtIGlucHV0OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuMSk7XG59XG5cbi5hdC1pbS1mb3JtIGlucHV0OmZvY3VzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAuMSk7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIC4zKTtcbn1cblxuLmF0LWltLWZvcm0gYnV0dG9uIHtcbiAgZmxleDogMTtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAyNHB4O1xuICB0cmFuc2l0aW9uOiBhbGwgLjFzO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgLjEpO1xuICB3aWxsLWNoYW5nZTogY29udGVudHM7XG59XG5cbi5hdC1pbS1mb3JtIGJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgLjEpO1xufVxuXG4uYXQtaW0tZm9ybSBidXR0b246YWN0aXZlIHtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuIl19 */
</style>
