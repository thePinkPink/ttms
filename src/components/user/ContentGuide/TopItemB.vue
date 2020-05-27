<template>
  <div class="topItem">
    <div class="topLeft">{{index+1}}</div>
    <div class="topMiddle">
      <a href="javascript:;" @click="detail(item.id)">
        <img :src="item.movieImages">
      </a>
    </div>
    <div class="topRight">
      <div class="topMeg">
        <a href="javascript:;" @click="detail(item.id)" :title="item.movieName">{{item.movieName}}</a>
        <p>
          主演：
          <span v-for="actor in item.moviePerformer">{{actor}}  </span>
        </p>
        <p>上映时间：{{item.startTime}}</p>
      </div>
      <div class="topSale">
        <p>{{item.salesVolume}} w</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return{
            
        }
    },
    props: {
        index: NaN,
        item: Object
    },
    methods: {
      detail(id) {
      console.log(123);
      this.$router.push({ path: "/theater/detail", query: { id: id } });
    }
    }
};
</script>
<style lang="less" scoped>
.topItem {
  display: flex;
  align-items: center;
}
.topItem > div + div {
  margin-left: 50px;
}
.topLeft {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: orange;
  color: #fff;
  font-size: 20px;
}
.topMiddle {
  width: 160px;
}
.topMiddle img {
  width: 100%;
}
.topRight {
  width: 890px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a {
  color: #333;
  font-size: 26px;
}
a:hover {
  color: rgba(3, 3, 3, 0.8);
}
.topMeg > p {
  margin-top: 10px;
}
.topSale {
  color: orange;
  font-size: 20px;
}
</style>

