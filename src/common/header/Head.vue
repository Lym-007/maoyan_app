<template>
<header class="header">
    <div class="left" @click="goBack">
        <slot name="left"/>
    </div>
    <h1 class="title">{{title}}</h1>
        <slot name="right"/>
</header>
</template>

<script>
export default {
  name: "app-header",
  props: {
    title: String
  },
  methods:{
      goBack(){
          this.$router.back();
      }
  }
};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;
  background: red;
  .title {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    color: #fff;
  }
  .left{
      position: absolute;
      left:10px;
  }
  .header-btn-right {

  }

  .header-btn-left {
    position: absolute;
    top: 12px;
    width: 0;
    height: 0;
    border-width: 10px;
    border-color: transparent #fff transparent transparent;
    border-style: dashed solid dashed dashed;
    &:after {
      content: "";
      position: absolute;
      left: -13px;
      top: -16px;
      width: 0;
      height: 0;
      border-width: 16px;
      border-color: transparent red transparent transparent;
      border-style: dashed solid dashed dashed;
    }
  }
}
</style>
