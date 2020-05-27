<template>
  <div :class="{listFirst: !index}">
    <a class="listItem" href="javascript:;">
      <span class="listItemNum">{{index+1}}</span>
      <span class="listItemTitle">
          <img v-show="(!index)" :src="item.movieImages">
          {{item.movieName}}
      </span>
      <span class="listItemSale">{{item.salesVolume}} w</span>
    </a>
  </div>
</template>
<script>
export default {
    props: {
        item: Object,
        index: NaN
    },
    data() {
        return {
            hover:false
        }
    },
    methods: {
        
    },
};
</script>
<style lang="less" scoped>
.listItem {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  color: #666666;
}
.listItem:hover {
  background-color: rgb(247, 247, 247);
}
.listItemNum {
  width: 40px;
  color: red;
  font-size: 20px;
}
.listItemTitle {
  width: 100%;
}
.listItemSale {
  text-align: end;
  width: 100px;
  color: #ff5900;
}
img {
   height: 150px;
   vertical-align: middle;
}

.listFirst {
    height: 150px;
    line-height: 150px;
}
// li:hover img {
//     display: block;
// }
</style>

