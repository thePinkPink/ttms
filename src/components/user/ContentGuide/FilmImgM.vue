<template>
  <div class="film">
    <img class="film_img" :src="item.movieImages">
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
};
</script>
<style lang="less" scoped>
.film {
  display: block;
  background-color: #fff;
  width: 160px;
  height: 220px;
}
.film_img {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
  text-align: center;
}
</style>
