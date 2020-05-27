<template>
  <div class="content">
    <!-- <Tabs>
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
    </Tabs>-->
    <Row
      type="flex"
      justify="space-between"
      class="code-row-bg"
      style="margin-top: 50px;min-height:800px;"
    >
      <Col v-for="item in ScoreList" :span="4" style="margin-bottom: 30px;">
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

export default {
  data() {
    return {
      total: 1,
      ScoreList: []
    };
  },
  components: {
    FilmImgM
  },
  mounted() {
    // 即将上映
    let _this = this;
    axios
      .get("http://manage.ptt.com/movie/api/coming/list/1/100")
      .then(function(response) {
        if (response.status == 200) {
          console.log(response);
          _this.ScoreList = response.data.lists;
        }
      });
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

