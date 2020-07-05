<template>
  <div id="app">
    <JumpBlock />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JumpBlock from './components/JumpBlock.vue';

@Component({
  components: {
    JumpBlock,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/style/reset.scss';
</style>
