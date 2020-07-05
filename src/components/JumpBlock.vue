<template>
  <div class="global">
    <ul class="container">
      <li v-for="count in itemCount" :key="count" class="item"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop({ default: 9 }) readonly rowCount?: number
  @Prop({ default: 9 }) readonly colCount?: number

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .global {
    width: 100vw;
    height: 100vh;
    > .container {
      width: 100%;
      height: 100%;
      border: 1px solid blue;
      display: flex;
      flex-wrap: wrap;
      > .item {
        border: 2px solid red;
      }
    }
  }
</style>
