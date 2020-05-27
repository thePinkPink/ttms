<template>
  <div>
    <MovieItem :add="true" v-on:headCallBack="headCall"></MovieItem>
    <ManagerTable :table="table"></ManagerTable>
  </div>
</template>
<script>
import ManagerTable from "../../../components/manager/ManagerTable";

// import movieView from "./MovieView.vue";
import MovieItem from "../../../components/manager/MovieItem";

export default {
  data() {
    return {
      table: {
        col: [
          {
            type: "id",
            key: "id"
          },
          {
            title: "名称",
            key: "movieName"
          },
          {
            title: "语言",
            key: "language"
          },
          {
            title: "时长",
            key: "movieTime"
          },
          {
            title: "销量",
            key: "salesVolume"
          },
          {
            title: "Action",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              console.log(params.row);
              return h("div", [
                h(MovieItem, {
                  props: {
                    item: params.row
                  }
                }),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        //console.log(params)
                        this.remove(params.index, params.row.id);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]
      }
    };
  },
  components: {
    ManagerTable,
    MovieItem
  },
  methods: {
    remove(index, id) {
      this.table.list.splice(index, 1);
      let _this = this;
      let url = "http://manage.ptt.com/movie/delete/" + id;
      axios
        .delete(url)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    headCall: function (msg) { //回调方法，接收子组件传的参数
      this.table.list.unshift(msg);
    }
  },
  created() {
    let _this = this;
    axios
      .get("http://manage.ptt.com/movie/query/list/1/1000")
      .then(function(response) {
        response.data.lists.forEach(element => {
          element.id = element.id.toString()
        });
        _this.$set(_this.table, "list", response.data.lists);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style lang="less" scoped>
</style>
