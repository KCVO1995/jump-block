<template>
  <div class="global">
    <div class="container">
      <div v-for="colCount in col" :key="colCount" class="col-item" :style="{marginBottom: gap + 'px'}">
        <div v-for="rowCount in row" :key="rowCount" class="row-item" :id="(colCount - 1) * row + rowCount"
             :style="{marginRight: gap + 'px'}"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';

  @Component
  export default class HelloWorld extends Vue {
    currentCount = '';
    // 配置项如下
    row = 3; // 每行 item 个数
    col = 3; // 行数
    duration = 500; // 跳跃时间间隔
    changeBackground = true; // 是否开启背景颜色变换
    defaultBackground = 'white'; // 不开启背景颜色变换，使用的默认颜色
    colorRange_R = [0, 100]; // RGB R 的颜色范围
    colorRange_G = [0, 100]; // RGB G 的颜色范围
    colorRange_B = [0, 100]; // RGB B 的颜色范围
    numberRange = [1, 100]; // 跳体数字区间
    stringRange = [19960, 20901]; // 跳体文字区间
    contentType = 'string'; // 跳体显示文字或数字
    fontSize = 28; // 跳体文字大小
    color = 'white'; // 跳体文字颜色
    gap = 2; // 内格的间距

    get total() {
      return this.row * this.col;
    }

    get shortSide() {
      const rowItem = document.getElementsByClassName('row-item')[0];
      return rowItem.clientWidth > rowItem.clientHeight ? rowItem.clientHeight : rowItem.clientWidth;
    }


    @Watch('currentCount')
    onChildChanged(val: string, oldVal: string) {
      const oldCount = oldVal.split('T')[0];
      const newCount = val.split('T')[0];
      if (oldCount === newCount) {
        this.getRandom(1, this.total, true);
        return;
      }
      const old = document.getElementById(oldCount);
      const current = document.getElementById(newCount);
      if (old) old.innerHTML = '';
      if (current) current.appendChild(this.createJumpBlock());
    }

    mounted() {
      setInterval(() => {this.getRandom(1, this.total, true);}, this.duration);
    }

    getRandom(min: number, max: number, jump = false) {
      const random = (Math.floor(Math.random() * Math.floor(max - min + 1)) + min).toString();
      return jump ? this.currentCount = random + 'T' + Math.random() : random;
    }

    getColor() {
      const R = this.getRandom(this.colorRange_R[0], this.colorRange_R[1]);
      const G = this.getRandom(this.colorRange_G[0], this.colorRange_G[1]);
      const B = this.getRandom(this.colorRange_B[0], this.colorRange_B[1]);
      return `rgb(${R}, ${G}, ${B})`;
    }

    createContent() {
      if (this.contentType === 'number') {
        return this.getRandom(this.numberRange[0], this.numberRange[1]);
      } else {
        return String.fromCodePoint(Math.round(Math.random() * this.stringRange[1]) + this.stringRange[0]);
      }
    }

    createJumpBlock() {
      const JumpBlock = document.createElement('div');
      JumpBlock.id = 'JumpBlock';
      JumpBlock.innerText = this.createContent();
      JumpBlock.classList.add('jump-block');
      JumpBlock.style.width = this.shortSide + 'px';
      JumpBlock.style.height = this.shortSide + 'px';
      JumpBlock.style.fontSize = this.fontSize + 'px';
      JumpBlock.style.color = this.color;
      JumpBlock.style.background = this.changeBackground ? this.getColor() : this.defaultBackground;
      return JumpBlock;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .global {
    width: 100vw;
    height: 100vh;
    > .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      > .col-item {
        width: 100%;
        flex: 1;
        display: flex;
        &:last-child {
          margin-bottom: 0 !important;
        }
        > .row-item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          &:last-child {
            margin-right: 0 !important;
          }
          > .jump-block {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>
