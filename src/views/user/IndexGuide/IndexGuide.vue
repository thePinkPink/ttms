<template>
  <Content id="indexContent">
    <Carousel></Carousel>
    <div class="content">
      <div id="showing" class="content_left">
        <div class="title">
          <router-link :to="{path:'/theater/movie/showing',query:{page:'1'}}">
            <span class="content_title">正在热映 |</span>
            <span class="content_title content_title_orange">more</span>
          </router-link>
        </div>
        <Row type="flex" justify="space-between" class="code-row-bg">
          <Col v-for="item in ShowingList" :span="6" style="margin-bottom: 30px;">
            <div style="display: inline-block;cursor:pointer;" @click="detail(item.id)">
              <FilmImgM :item="item"></FilmImgM>
            </div>
          </Col>
        </Row>
      </div>
      <div id="hotTop" class="content_right">
        <div class="title">
          <router-link to="/theater/top/showing">
            <span class="content_title">热映榜 |</span>
            <span class="content_title content_title_orange">Top</span>
          </router-link>
        </div>
        <ul id="top">
          <li
            v-for="(item, index) in HotTop"
            style="display: inline-block;cursor:pointer;"
            @click="detail(item.id)"
          >
            <TopItem :key="index" :item="item" :index="index"></TopItem>
          </li>
        </ul>
      </div>
    </div>
    <div id="commingSoon" style="padding:40px 0;">
      <div class="title" style="margin-left:120px;">
        <router-link :to="{path:'/theater/movie/commingsoon',query:{page:'1'}}">
          <span class="content_title">即将上映 |</span>
          <span class="content_title content_title_orange">more</span>
        </router-link>
      </div>
      <div>
        <Row type="flex" justify="space-between" class="code-row-bg">
          <Col style="width:15%;height: 440px;" v-for="item in CommingSoonList">
            <div style="display: inline-block;cursor:pointer;"  @click="detail(item.id)">
              <img style="width:100%;height: 440px;" :src="item.movieImages">
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="content">
      <div class="content_left">
        <div class="title">
          <router-link :to="{path:'/theater/movie/showing',query:{page:'1'}}">
            <span class="content_title">口碑热映 |</span>
            <span class="content_title content_title_orange">more</span>
          </router-link>
        </div>
        <Row type="flex" justify="space-between" class="code-row-bg">
          <Col v-for="item in ScoreList" :span="6" style="margin-bottom: 30px">
            <div style="display: inline-block;cursor:pointer;" @click="detail(item.id)">
              <FilmImgM :item="item"></FilmImgM>
            </div>
          </Col>
        </Row>
      </div>
      <div class="content_right">
        <div class="title">
          <router-link to="/theater/top/score">
            <span class="content_title">口碑榜 |</span>
            <span class="content_title content_title_orange">Top</span>
          </router-link>
        </div>
        <ul id="top">
          <li
            v-for="(item, index) in ScoreTop"
            style="display: inline-block;cursor:pointer;"
            @click="detail(item.id)"
          >
            <TopItem :key="index" :item="item" :index="index"></TopItem>
          </li>
        </ul>
      </div>
    </div>
  </Content>
</template>
<script>
import Carousel from "../../../components/user/ContentGuide/Carousel";
import FilmImgM from "../../../components/user/ContentGuide/FilmImgM";
import TopItem from "../../../components/user/ContentGuide/TopItem";

export default {
  data() {
    return {
      ShowingList: [],
      HotTop: [],
      CommingSoonList: [],
      ScoreList: [],
      ScoreTop: [],
      item: null,
      index: NaN
    };
  },
  components: {
    Carousel,
    FilmImgM,
    TopItem
  },
  methods: {
    detail(id) {
      console.log(123);
      this.$router.push({ path: "/theater/detail", query: { id: id } });
    }
  },
  mounted() {
    let _this = this;
    
    // 正在热映
    axios
      .get(
        "http://manage.ptt.com/movie/api/hotting/list/1/12"
      )
      .then(function(response) {
        if (response.status==200) {
          //console.log(response)
          _this.ShowingList = response.data.lists;
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    // 即将上映
    axios
      .get(
        "http://manage.ptt.com/movie/api/coming/list/1/6"
      )
      .then(function(response) {
        if (response.status==200) {
          console.log(response)
          _this.CommingSoonList = response.data.lists;
        }
      });

    // 口碑列表
    axios
      .get(
        "http://manage.ptt.com/movie/query/list/1/12"
      )
      .then(function(response) {
        if (response.status==200) {
          console.log(response)
          _this.ScoreList = response.data.lists;
        }
      });

    // 销量榜单
    axios
      .get(
        "http://manage.ptt.com/movie/api/salesVolume/best/1/10"
      )
      .then(function(response) {
         if (response.status==200) {
          console.log(response)
          _this.HotTop = response.data.lists;
        }
      });

    // 评分榜单
    axios
      .get(
        "http://manage.ptt.com/movie/api/star/best/1/10"
      )
      .then(function(response) {
        if (response.status==200) {
          //console.log(response)
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
li {
  list-style: none;
  width: 100%;
  font: 16px;
  line-height: 50px;
  font-size: 18px;
}
.content {
  width: 1320px;
  background-color: #fff;
  padding: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.title {
  margin: 0 0 30px 20px;
}
.content_title {
  font: normal normal normal 18px/1.6em poppins-extralight, poppins, sans-serif;
  letter-spacing: 0.2em;
  opacity: 0.8;
  color: #072439;
}
.content_title_orange {
  color: #ff5900;
}
.font_black {
  color: #072439;
}

.content_left {
  width: 63%;
}

.content_right {
  width: 32%;
}

// #commingSoon {
//   background-color: #fff;
// }
</style>