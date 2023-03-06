<template>
  <div class="container">
    <div class="background-container">
      <div class="clip-path"></div>
      <div class="background-detail"></div>
    </div>
    <div class="recipe-container">
      <div class="recipe-header x-width flex-column align-middle max-width">
        <h2>{{ recipe.title }}</h2>
        <p>
          <span>
            ready in : {{ recipe.readyInMinutes }} minute(s)
          </span>
          <span>
            servings : {{ recipe.servings }}
          </span>
        </p>
      </div>
      <div class="two-col-container flex-wrap max-width">
        <div class="left-container">
          <div class="recipe-img-container">
            <vue-load-image>
              <img slot="image" :src="recipe.image" :alt="`Photo de la recette ${recipe.image}`"/>
              <img slot="preloader" src='../assets/img/loading-utensils.gif' alt="Loading image"/>
              <div slot="error">error message</div>
            </vue-load-image>
          </div>
          <div class="medium-up">
            <p class="source">Source : <a :href="recipe.sourceUrl">{{ recipe.sourceName }}</a></p>
            <p class="recipe-description" v-html="recipe.summary"></p>
          </div>
        </div>
        <div class="right-container">
          <div class="tags-container">
            <ul v-if="recipe.diets.length > 0" class="diets-list flex-wrap">
              <li class="diet-label">Diet :</li>
              <li
                class="diet-tag"
                v-for="(diet, index) in recipe.diets"
                :key="`diet-${index}`"
              >
                {{ diet }}
              </li>
            </ul>
            <ul v-if="recipe.dishTypes.length > 0" class="dish-type-list flex-wrap">
              <li class="dish-type-label">Dish type :</li>
              <li
                class="dish-type-tag"
                v-for="(dish, index) in recipe.dishTypes"
                :key="`dish-type-${index}`"
              >
                {{ dish }}
              </li>
            </ul>
          </div>
          <div class="ingredients-container">
            <h3 class="ingredients-title">Ingredients</h3>
            <ul class="ingredients-list">
              <li
                class="ingredient-item flex-wrap"
                v-for="(ingredient, index) in recipe.extendedIngredients"
                :key="`ingredient-${index}`"
              >
                <b>{{ ingredient.amount }} {{ ingredient.unit }}</b>
                <div class="flex-column">
                  <p>{{ ingredient.name }}</p>                  <p
                    class="ingredient-small-text"
                    v-for="(meta, index) in ingredient.meta"
                    :key="`meta-${index}`"
                  >
                    {{ meta }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="medium-down">
          <p class="source">Source : <a :href="recipe.sourceUrl">{{ recipe.sourceName }}</a></p>
          <p class="recipe-description" v-html="recipe.summary"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import VueLoadImage from 'vue-load-image';

export default {
  name: 'singlePage',

  components: {
    'vue-load-image': VueLoadImage,

  },
  props: {
    apikey: {
      type: String,
      required: true,
      default: '',
    },
  },

  data() {
    return {
      recipe: {},
    };
  },

  created() {
    const getRecipeDetails = async () => {
      try {
        const response = await this.$axios.get(
          `https://api.spoonacular.com/recipes/${this.$route.params.id}/information?apiKey=${this.apikey}`,
        );
        this.recipe = response.data;
      } catch (error) {
        console.log(error);
      }
    };
    getRecipeDetails();
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/app.scss";
.container {
  position: relative;
}
.clip-path {
  position: absolute;
  width: 100%;
  height: 190px;
  margin-top: -140px;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(224,227,232,1) 73%);
  clip-path: polygon(100% 0%, 0% 0% , 0.00% 64.95%, 2.00% 62.51%, 4.00% 60.13%, 6.00% 57.86%,
  8.00% 55.73%,10.00% 53.76%, 12.00% 52.01%, 14.00% 50.48%, 16.00% 49.21%, 18.00% 48.21%,
  20.00% 47.50%, 22.00% 47.10%, 24.00% 47.01%, 26.00% 47.22%, 28.00% 47.74%, 30.00% 48.56%,
  32.00% 49.67%, 34.00% 51.04%, 36.00% 52.66%, 38.00% 54.50%, 40.00% 56.54%, 42.00% 58.73%,
  44.00% 61.05%, 46.00% 63.45%, 48.00% 65.91%, 50.00% 68.38%, 52.00% 70.82%, 54.00% 73.20%,
  56.00% 75.47%, 58.00% 77.61%, 60.00% 79.57%, 62.00% 81.33%, 64.00% 82.86%, 66.00% 84.13%,
  68.00% 85.12%, 70.00% 85.83%, 72.00% 86.23%, 74.00% 86.33%, 76.00% 86.11%, 78.00% 85.59%,
  80.00% 84.77%, 82.00% 83.66%, 84.00% 82.29%, 86.00% 80.67%, 88.00% 78.83%, 90.00% 76.80%,
  92.00% 74.60%, 94.00% 72.29%, 96.00% 69.88%, 98.00% 67.42%, 100.00% 64.95%);
}
.background-detail {
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-right: 0;
  &::after {
    content: "";
    display: none;
    width: 400px;
    height: 270px;
    margin-top: -220px;
    margin-left: 0px;
    transform: rotate(-15deg);
    background-size: cover;
    background-position: center;
    background-image: url('@/assets/img/pan-tossing.png');
    @include breakpoint-min($medium) {
      display: block;
    }
    @include breakpoint-min($large) {
      width: 510px;
      height: 340px;
      margin-top: -250px;
    }
  }
}
.recipe-container {
  margin-top: 56px;
  margin-bottom: 40px;
  @include breakpoint-min($medium) {
    margin-top: 100px;
  }
    @include breakpoint-min($large) {
    margin-top: 146px;
  }
}
.recipe-header {
  h2 {
    text-align: center;
    font-weight: 900;
  }
  span {
    display: inline-block;
    padding: 0 20px;
    margin-bottom: 20px;
    font-weight: 400;
    &:first-child {
      border-right: 1px solid $primary-bgcolor;
    }
  }
}
.two-col-container {
  margin-top: 40px;
}
.left-container {
  width: 100%;
  @include breakpoint-min($medium) {
    width: 50%;
    border-right: 1px solid $primary-bgcolor;
    padding-right: 25px;
  }
  @include breakpoint-min($large) {
    width: 65%;
  }
}
.recipe-img-container {
  border-radius: 18px;
  border: 10px solid white;
  box-shadow: 0px 0px 25px 0px rgb(0 0 0 / 25%);
  width: 100%;
  overflow: hidden;
  margin-bottom: 40px;
  @include breakpoint-min($medium) {
    margin-bottom: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.source {
  font-size: rem(14);
  font-weight: 400;
  margin-top: 20px;
}
.recipe-description {
  margin-top: 16px;
  letter-spacing: rem(0.5);
}
.right-container {
  width: 100%;
  @include breakpoint-min($medium) {
    width: 50%;
    padding-left: 25px;
  }
  @include breakpoint-min($large) {
    width: 35%;
  }
}
.diets-list,
.dish-type-list {
  margin: 0 -8px 20px;
  align-items: center;
  .diet-tag,
  .dish-type-tag {
    font-size: rem(12);
    letter-spacing: rem(0.5);
    margin: 4px 2px;
    padding: 2px 8px 4px;
    border-radius: 16px;
    border: 1px solid $secondary-bgcolor;
    background-color: rgba($secondary-bgcolor, 0.24);
  }
  .diet-label,
  .dish-type-label {
    font-size: rem(14);
    font-weight: 900;
    margin-left: 8px;
  }
}
.ingredients-title {
  margin-bottom: 10px;
  font-weight: 700;
}
.ingredient-item {
  margin-bottom: 6px;
  b {
    margin-right: 8px;
    font-size: rem(14);
    font-weight: 900;
  }
  p {
    font-weight: 400;
    font-size: rem(14);
  }
  .ingredient-small-text {
    font-weight: 300;
    letter-spacing: rem(0.5);
  }
}
</style>
