<template>
  <div id="App" class="wrapper">
    <header class="wrapper-header">
      <div class="max-width flex-row align-middle">
        <router-link class="header-link flex-row" to="/">
          <span>Full Spoon</span>
        </router-link>
      </div>
    </header>
    <router-view id="main" class="wrapper-main" :apikey="apikey" />
    <footer class="wrapper-footer">
      created using
      <a href="https://spoonacular.com/food-api" target="_blank">
        Spoonacular API
      </a>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apikey: 'ae4c7efb4db1489bb2ed9e22e5cd798a',
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.wrapper-header {
  padding: 40px 0;
  font-weight: 800;
  font-size: rem(40);
  position: relative;
  z-index: 1;
  .header-link {
    color: $color-black;
    align-items: center;
    text-decoration: none;
  }
}
.wrapper-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
footer {
  font-size: rem(14);
  text-align: center;
  margin-top: 30px;
  padding: 8px;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(224,227,232,1) 73%);
  a {
    font-weight: 400;
    letter-spacing: 0.5px;
    color: $secondary-bgcolor;
  }
}
</style>
