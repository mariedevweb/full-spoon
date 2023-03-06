<template>
  <router-link
    :to="{ name: 'Single', params: { id: recipe.id } }"
    class="card-container flex-column"
  >
    <div class="card-header">
      <vue-load-image>
        <img slot="image" :src="recipe.image" :alt="`Photo de la recette ${recipe.image}`"/>
        <img slot="preloader" src='../assets/img/loading-utensils.gif' alt="Loading image"/>
        <div slot="error">error message</div>
      </vue-load-image>
    </div>
    <div class="card-body">
      <h3>{{ recipe.title }}</h3>
      <p class="flex-column">
        <span>
          Ready in : {{ recipe.readyInMinutes }} minute(s)
        </span>
        <span>
          Servings : {{ recipe.servings }}
        </span>
      </p>
      <div v-if="recipe.diets.length > 0" class="tag-list-container flex-row">
        <ul class="diets-list flex-wrap">
          <li class="diet-label">Diet : </li>
          <li
            class="diet-tag"
            v-for="(diet, index) in recipe.diets"
            :key="`diet-${index}`"
          >
            {{ diet }}
          </li>
        </ul>
      </div>
      <div v-if="recipe.dishTypes.length > 0" class="tag-list-container flex-row">
        <ul class="dish-type-list flex-wrap">
          <li class="dish-type-label">Dish type : </li>
          <li
            class="dish-type-tag"
            v-for="(dishType, index) in recipe.dishTypes"
            :key="`dishType-${index}`"
          >
            {{ dishType }}
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer">
      source {{ recipe.sourceName }}
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

  mounted() {},

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
    max-width: 100%;
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
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid $primary-bgcolor;
    font-size: rem(18);
  }
}
.diets-list,
.dish-type-list {
  margin: 0 -8px;
  align-items: center;
  .diet-tag,
  .dish-type-tag {
    font-size: rem(12);
    margin: 4px 2px;
    padding: 2px 8px 4px;
    border-radius: 16px;
    border: 1px solid $secondary-bgcolor;
    background-color: rgba($secondary-bgcolor, 0.24);
  }
  .diet-label,
  .dish-type-label {
    margin-left: 8px;
  }
}
.card-footer {
  font-size: rem(12);
  letter-spacing: rem(1);
  padding-top: 6px;
  border-top: 1px solid $primary-bgcolor;
}
</style>
