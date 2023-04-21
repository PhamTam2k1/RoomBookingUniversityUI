<template>
  <router-link :to="itemLink" class="button">
				<span :class="itemIcon">{{ itemNameIcon }}</span>
				<span class="text">{{itemName}}</span>
	</router-link>
</template>

<script>
export default {
  props: {
    /**Tên của item */
    itemName: {
      type: String,
      default: "",
    },

    /**Icon của item */
    itemIcon: {
      type: String,
      default: "",
    },
    itemNameIcon: {
      type: String,
      default: "",
    },
    /**Link của item */
    itemLink: {
      type: String,
      default: "",
    },
  },
};
</script>