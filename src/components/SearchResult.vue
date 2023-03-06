.<template>
  <router-link
    :to="{ name: 'Single', params: { id: recipe.id } }"
    class="card-container flex-column"
  >
    <div class="card-header">
      <vue-load-image>
        <img slot="image" :src="recipe.image" :alt="`Photo de la recette ${recipe.image}`" />
        <img slot="preloader" src='../assets/img/loading-utensils.gif' alt="Loading image" />
        <div slot="error">error message</div>
      </vue-load-image>
    </div>
    <div class="card-body">
      <h3>{{ recipe.title }}</h3>
    </div>
  </router-link>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import VueLoadImage from 'vue-load-image';

export default {
  components: {
    'vue-load-image': VueLoadImage,
  },
  props: {
    recipe: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },

  mounted() { },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/app.scss";

.card-container {
  height: 100%;
  border: 8px solid $color-white;
  border-radius: 8px;
  box-shadow: 0px 0px 25px 0px rgb(0 0 0 / 25%);
  text-decoration: none;
  color: $color-black;
  transition: all $transition-duration ease-in;
  img {
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
  &:hover,
  &:focus {
    transform: scale(1.05);
    background-color: white;
    box-shadow: 0px 19px 25px 4px rgb(0 0 0 / 44%);
  }
}

.card-body {
  flex-grow: 1;
  padding: 8px;
  font-size: rem(14);
  letter-spacing: rem(0.5);
  font-weight: 500;
  h3 {
    text-align: center;
    margin-bottom: 0;
    font-size: rem(18);
  }
}
</style>
