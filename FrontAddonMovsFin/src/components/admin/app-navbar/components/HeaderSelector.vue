<template>
  <span
    class="flex-center header-selector"
    :class="`i-menu-${minimized ? 'expanded' : 'collapsed'}`"
    @click="$emit('update:minimized', !minimized)"></span>
</template>

<script>
export default {
  name: 'header-selector',
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.header-selector {
  cursor: pointer;
}

</style>
