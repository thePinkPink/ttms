<template>
  <div class="content">
    <!-- <Tabs  @on-click="change">
      <TabPane label="按热度排序">
        <Row type="flex" justify="space-between" class="code-row-bg">
          <Col v-for="item in HotList" :span="4" style="margin-bottom: 30px;">
            <FilmImgM :item="item"></FilmImgM>
          </Col>
        </Row>
        <Page class="page" :total="40" size="small" />
      </TabPane>
      <TabPane label="按时间排序">
          <Row type="flex" justify="space-between" class="code-row-bg">
          <Col v-for="item in TimeList" :span="4" style="margin-bottom: 30px;">
            <FilmImgM :item="item"></FilmImgM>
          </Col>
        </Row>
        <Page class="page" :total="40" size="small" />
      </TabPane>
      <TabPane label="按评价排序">
          <Row type="flex" justify="space-between" class="code-row-bg">
          <Col v-for="item in ScoreList" :span="4" style="margin-bottom: 30px;">
            <FilmImgM :item="item"></FilmImgM>
          </Col>
        </Row>
        <Page class="page" :total="40" size="small" />
      </TabPane>
    </Tabs>-->
    <Row
      type="flex"
      justify="space-between"
      class="code-row-bg"
      style="margin-top: 50px;min-height:800px;"
    >
      <Col v-for="item in HotList" :span="4" style="margin-bottom: 30px;">
        <div style="display: inline-block;cursor:pointer;" @click="detail(item.id)">
          <FilmImgM :item="item"></FilmImgM>
        </div>
      </Col>
    </Row>
    <Page class="page" :total="40" size="small"/>
  </div>
</template>
<script>
import FilmImgM from "../../../components/user/ContentGuide/FilmImgM";

var TimeList = [
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  },
  {
    title: "哥斯拉2：怪兽之王",
    img: require("../../../assets/imgs/gesila.jpg")
  }
];

var ScoreList = [
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  },
  {
    title: "阿拉丁",
    img: require("../../../assets/imgs/alading.jpg")
  }
];

export default {
  data() {
    return {
      HotList: [],
      TimeList,
      ScoreList
    };
  },
  components: {
    FilmImgM
  },
  mounted() {
    // 正在热映
    let _this = this;
    axios
      .get("http://manage.ptt.com/movie/api/hotting/list/1/25")
      .then(function(response) {
        if (response.status == 200) {
          console.log(response);
          _this.HotList = response.data.lists;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    change() {
      console.log(1);
    },
    detail(id) {
      console.log(123);
      this.$router.push({ path: "/theater/detail", query: { id: id } });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 1320px;
  margin: 0 auto;
  padding: 20px 60px;
  background-color: #fff;
}

.page {
  display: flex;
  justify-content: center;
}
</style>

