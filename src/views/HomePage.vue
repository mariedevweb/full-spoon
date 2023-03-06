<template>
  <div class="container">
    <div class="background-container">
      <div class="clip-path"></div>
      <div class="background-detail max-width"></div>
    </div>
    <div class="search-container max-width flex-column">
      <h1>What are you going to create today ?</h1>
      <form class="search-form flex-row" v-on:submit.prevent="fireSearch">
        <label for="search">
          <span class="visuallyhidden">Search bar</span>
          <input
            class="search-bar"
            id="search"
            type="text"
            placeholder="Type your inspiration here"
            v-model="searchQuery"
          >
        </label>
        <button class="search-button" type="submit">
          <span class="visuallyhidden">Execute search</span>
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </button>
      </form>
    </div>
    <Transition :duration="550" name="slide-fade">
      <div v-if="resultsList.length" class="recipe-list-container outer max-width">
        <div class="inner">
          <h2>You have searched for <b>{{ searchQuery }}</b></h2>
          <div class="filter-container">
            <span class="filter-label">Filter by cuisine : </span>
            <ul class="filter-list flex-wrap">
              <li v-for="(cuisineType, index) in cuisineTypeList" :key="`cuisine-type-${index}`">
                <button
                  class="cuisine-filter-btn"
                  type="button"
                  @click="filterByCuisine(cuisineType, $event)"
                >
                  {{ cuisineType }}
                </button>
              </li>
            </ul>
            <button class="delete-filter-btn" type="button" @click="clearFilters">
              Clear search
            </button>
          </div>
          <ul class="listing-container flex-wrap">
            <li
              class="search-result-item"
              v-for="(recipe, index) in resultsList"
              :key="index"
            >
              <search-result :recipe="recipe"></search-result>
            </li>
          </ul>
          <div class="pagination-container">
            <pagination
              v-model="page"
              :records="numberOfResults"
              :per-page="5"
              @paginate="paginate(page)"
            />
          </div>
        </div>
      </div>
    </Transition>
    <div class="recipe-list-container max-width">
      <h2>Here are some suggestions</h2>
      <ul class="listing-container flex-wrap">
        <li
          class="listing-item"
          v-for="(recipe, index) in randomRecipeList"
          :key="index"
        >
          <recipe-card :recipe="recipe"></recipe-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RecipeCard from '../components/RecipeCard.vue';
import SearchResult from '../components/SearchResult.vue';

export default {
  name: 'HomePage',

  components: {
    RecipeCard,
    SearchResult,
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
      randomRecipeList: [],
      searchQuery: '',
      resultsList: [],
      apiQuery: '',
      filterList: [],
      cuisineTypeList: [
        'African',
        'American',
        'British',
        'Cajun',
        'Caribbean',
        'Chinese',
        'Eastern',
        'European',
        'European',
        'French',
        'German',
        'Greek',
        'Indian',
        'Irish',
        'Italian',
        'Japanese',
        'Jewish',
        'Korean',
        'Latin',
        'American',
        'Mediterranean',
        'Mexican',
        'Middle',
        'Eastern',
        'Nordic',
        'Southern',
        'Spanish',
        'Thai',
        'Vietnamese',
      ],
      page: 1,
      numberOfResults: 0,
    };
  },

  created() {
    const getRandomRecipes = async () => {
      try {
        const response = await this.$axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${this.apikey}&number=3`,
        );
        this.randomRecipeList = response.data.recipes;
      } catch (error) {
        console.log(error);
      }
    };
    getRandomRecipes();
  },

  methods: {
    fireSearch() {
      const getSearchResults = async () => {
        try {
          const response = await this.$axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apikey}&query=${this.searchQuery}&number=5`,
          );
          this.apiQuery = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apikey}&query=${this.searchQuery}&number=5`;
          this.resultsList = response.data.results;
          this.numberOfResults = response.data.totalResults;
        } catch (error) {
          console.log(error);
        }
      };
      getSearchResults();
    },
    filterByCuisine(cuisineType, event) {
      event.target.classList.add('selected');
      const getFilterResults = async () => {
        try {
          const response = await this.$axios.get(
            `${this.apiQuery}&cuisine=${cuisineType}`,
          );
          this.apiQuery = `${this.apiQuery}&cuisine=${cuisineType}`;
          this.resultsList = response.data.results;
          this.numberOfResults = response.data.totalResults;
        } catch (error) {
          console.log(error);
        }
      };
      getFilterResults();
    },
    clearFilters() {
      this.resultsList = [];
    },
    paginate(page) {
      this.page = page;
      const changePage = async () => {
        try {
          const response = await this.$axios.get(
            `${this.apiQuery}&offset=${(page - 1) * 5}`,
          );
          this.resultsList = response.data.results;
        } catch (error) {
          console.log(error);
        }
      };
      changePage();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/app.scss";
.container {
  position: relative;
}
.clip-path {
  position: absolute;
  width: 110%;
  height: 390px;
  margin-top: -140px;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(224,227,232,1) 73%);
  clip-path: polygon(
    100% 0%, 0% 0% , 0.00% 63.95%, 2.50% 63.32%, 5.00% 62.90%, 7.50% 62.69%,
    10.00% 62.70%, 12.50% 62.92%, 15.00% 63.35%, 17.50% 63.99%, 20.00% 64.82%,
    22.50% 65.83%, 25.00% 67.01%, 27.50% 68.34%, 30.00% 69.79%, 32.50% 71.35%,
    35.00% 72.98%, 37.50% 74.67%, 40.00% 76.38%, 42.50% 78.09%, 45.00% 79.78%,
    47.50% 81.41%, 50.00% 82.96%, 52.50% 84.40%, 55.00% 85.72%, 57.50% 86.89%,
    60.00% 87.90%, 62.50% 88.72%, 65.00% 89.35%, 67.50% 89.77%, 70.00% 89.98%,
    72.50% 89.97%, 75.00% 89.75%, 77.50% 89.32%, 80.00% 88.68%, 82.50% 87.85%,
    85.00% 86.83%, 87.50% 85.65%, 90.00% 84.33%, 92.50% 82.88%, 95.00% 81.32%,
    97.50% 79.69%, 100.00% 78.00%
  );
  @include breakpoint-min($medium) {
    width: 100%;
    height: 320px;
  }
}
.background-detail {
  position: absolute;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-right: 0;
  &::after {
    content: "";
    display: none;
    width: 280px;
    height: 320px;
    margin-top: -130px;
    margin-left: 580px;
    background-size: cover;
    background-position: center;
    background-image: url('@/assets/img/vegetables-tossing.png');
    @include breakpoint-min($medium) {
      display: block;
    }
    @include breakpoint-min($large) {
      width: 390px;
      height: 440px;
      margin-top: -200px;
      margin-left: auto;
    }
  }
}
.search-container {
  position: relative;
  height: 100%;
  flex-grow: 1;
  align-items: center;
  text-align: center;
}
.search-form {
  max-width: 100%;
  margin-top: 20px;
  @include breakpoint-min($medium) {
    margin-top: 0;
  }
  label {
    max-width: 100%;
  }
}
.search-bar {
  max-width: 100%;
  width: 420px;
  font-size: 18px;
  padding: 10px 60px 10px 10px;
  border: 0;
  border-radius: 25px;
  box-shadow: 0px 4px 19px 2px rgb(0 0 0 / 35%);
  text-align: center;
  &::placeholder {
    text-align: center;
  }
  @include breakpoint-min($medium) {
    padding: 10px 60px 10px 20px;
  }
}
.search-button {
  background-color: $secondary-bgcolor;
  position: relative;
  width: 60px;
  cursor: pointer;
  padding: 10px;
  margin-left: -60px;
  font-size: 18px;
  color: white;
  border: 0;
  border-radius: 0 25px 25px 0;
  transition: all $transition-duration ease-in;
  &:hover,
  &:focus {
    background-color: darken($secondary-bgcolor, 8%);
    box-shadow: inset 2px 2px 5px 0px rgb(0 0 0 / 34%);
    .search-icon {
      fill: darken($color-white, 12%);
    }
  }
}
.search-icon {
  width: 22px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: white;
    filter: drop-shadow(2px 0 1.6px rgb(0 0 0 / 0.4));
    transition: all $transition-duration ease-in;
}
.filter-label {
  font-weight: 400;
}
.filter-list {
  margin: 4px -4px;
}
.cuisine-filter-btn {
  margin: 4px 4px;
  padding: 2px 8px;
  border-radius: 8px;
  border: 0;
  background: $secondary-bgcolor;
  color: $color-white;
  box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 15%);
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: all $transition-duration ease-in;
  &.selected {
    background-color: darken($secondary-bgcolor, 10%);
  }
  &:hover,
  &:focus {
    background-color: darken($secondary-bgcolor, 10%);
    box-shadow: inset 2px 2px 5px 0px rgb(0 0 0 / 34%);
  }
}
.delete-filter-btn {
  padding: 6px 12px;
  border-radius: 11px;
  border: 0;
  background-color: $color-alert;
  box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 15%);
  color: $color-white;
  margin-top: 8px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.recipe-list-container {
  position: relative;
  z-index: 1;
  margin-top: 110px;
  h2 {
    text-align: center;
  }
}
.listing-container {
  margin: 10px -10px;
  justify-content: space-around;
}
.listing-item {
  margin: 10px;
  width: 100%;
  @include breakpoint-min($medium) {
    width: 50%;
  }
  @include breakpoint-min($large) {
    width: 30%;
  }
}
.search-result-item {
  margin: 10px;
  width: 100%;
  @include breakpoint-min($medium) {
    width: 50%;
  }
  @include breakpoint-min($large) {
    width: 18%;
  }
}

</style>
