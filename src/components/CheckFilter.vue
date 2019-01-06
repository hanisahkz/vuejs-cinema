<template>
    <div v-bind:class="{ 'check-filter' : true, 'active' : checked }" @click="checkFilterChildren">
        <span class="checkbox"></span>
        <span class="check-filter-title">{{ title }}</span>
    </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    };
  },
  methods: {
    checkFilterChildren() {
      this.checked = !this.checked;
      // Param 1: custom event name, Param 2: the kind of filter which is genre, Param 3: props of interest, Param 4: data property
      this.$emit("check-filter", "genre", this.title, this.checked);
    }
  },
  props: ["title"]
};
</script>