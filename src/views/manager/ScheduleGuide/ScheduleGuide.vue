<template>
  <div>
    <ScheduleItem :add="true" v-on:headCallBack="headCall"></ScheduleItem>
    <ManagerTable :table="table"></ManagerTable>
  </div>
</template>
<script>
import ManagerTable from "../../../components/manager/ManagerTable";
import ScheduleItem from "../../../components/manager/ScheduleItem";

export default {
  data() {
    return {
      table: {
        col: [
          {
            type: "id",
            key: "scheduleId"
          },
          {
            title: "电影名称",
            key: "movieName"
          },
          {
            title: "影厅名称",
            key: "studioName"
          },
          {
            title: "开始时间",
            key: "startTime"
          },
          {
            title: "结束时间",
            key: "endTime"
          },
          // {
          //   title: "座位数",
          //   key: "seatNum"
          // },
          {
            title: "票价",
            key: "newPrice"
          },
          {
            title: "Action",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(ScheduleItem, {
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
                        this.remove(params.index, params.row.scheduleId);
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
    ScheduleItem
  },
  methods: {
    remove(index, id) {
      this.table.list.splice(index, 1);
      let _this = this;
      let url = "http://manage.ptt.com/schedule/delete/" + id;
      axios
        .delete(url)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    headCall: function(msg) {
      //回调方法，接收子组件传的参数
      console.log(msg)
      this.table.list.unshift(msg);
    }
  },
  created() {
    let _this = this;
    axios
      .get("http://manage.ptt.com/schedule/query/list")
      .then(function(response) {
        console.log(response);
        let lists = [];
        response.data.lists.forEach(element => {
          //console.log(element)
          let date = new Date(element.startTime);
          let date2 = new Date(element.endTime);
          date = date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
          date2 = date2.toLocaleDateString().replace(/\//g, "-") + " " + date2.toTimeString().substr(0, 8);
          element.startTime = date;
          element.endTime = date2;
          lists.push({
              scheduleId: element.scheduleId.toString(),
              studioName: element.studio.studioName,
              studioId: element.studio.studioId,
              movieName: element.movie.movieName,
              movieId: element.movie.id,
              startTime: element.startTime,
              endTime: element.endTime,
              newPrice: element.newPrice
          })
        });
        _this.$set(_this.table, "list", lists);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style lang="less" scoped>
</style>
