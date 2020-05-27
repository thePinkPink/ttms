<template>
  <div class="content">
    <TopItemB v-for="(item,index) in ScoreTop" :item="item" :index="index"></TopItemB>
  </div>
</template>
<script>
import TopItemB from "../../../components/user/ContentGuide/TopItemB";

export default {
  data() {
    return {
      item: null,
      index: NaN,
      ScoreTop: []
    };
  },
  components: {
    TopItemB
  },
  mounted() {
    let _this = this;
    // 口碑榜单
    axios
      .get(
        "http://manage.ptt.com/movie/api/star/best/1/10"
      )
       .then(function(response) {
        if (response.status==200) {
          response.data.lists.forEach(element => {
            element.startTime = new Date(element.startTime);
            element.startTime = element.startTime.toLocaleDateString().replace(/\//g, "-");
          });
          _this.ScoreTop = response.data.lists;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 1320px;
  padding: 60px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
