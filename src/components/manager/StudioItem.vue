<template>
  <div style="display: inline-block;">
    <Button v-if="add" type="primary" @click="modal1 = true">添加</Button>
    <Button v-else type="primary" size="small" @click="modal1 = true">查看</Button>
    <Modal v-model="modal1" :title="item1.studioId">
      <Form ref="item1" :model="item1" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="studioName" style="margin-top:25px;">
          <Input v-model="item1.studioName" placeholder="studio Name" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="行" prop="rowsCount">
          <Input v-model="item1.rowsCount" placeholder="rowsCount" :disabled="!add"></Input>
        </FormItem>
        <FormItem label="列" prop="colsCount">
          <Input v-model="item1.colsCount" placeholder="colsCount" :disabled="!add"></Input>
        </FormItem>
        <FormItem>
          <div v-if="!(!add&&disabled)" style=" display:flex; flex-wrap: wrap;">
            <div v-for="(seat, index) in newSeats" class="seat" :style="seatStatus[seat.status]">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconkexuanzuobiankuang"></use>
              </svg>
            </div>
          </div>
          <div v-else style=" display:flex; flex-wrap: wrap;">
            <div v-for="seat in item1.seats" class="seat" :style="seatStatus[seat.status]">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconkexuanzuobiankuang"></use>
              </svg>
            </div>
          </div>
        </FormItem>
        <!-- <FormItem v-if="!(!add&&disabled)">
          <Button type="primary" @click="handleSubmit('item1')">提交</Button>
          <Button @click="handleReset('item1')" style="margin-left: 8px">重置</Button>
        </FormItem>
        <FormItem v-if="disabled">
          <Button v-if="(!add)" type="primary" @click="changeFormDate()">修改</Button>
        </FormItem> -->
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      item1: {},
      disabled: true,
      ruleValidate: {
        studioName: [
          {
            required: true,
            message: "影厅名不能为空",
            trigger: "blur"
          }
        ],
        rowsCount: [
          {
            required: true,
            message: "行不能为空",
            trigger: "blur"
          }
        ],
        colsCount: [
          {
            required: true,
            message: "列不能为空",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value > 13) {
                callback(new Error("列数为1-13"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    seatStatus() {
      let seatSize = 100 / this.item1.colsCount + "%";
      return {
        0: { opacity: 0, flex: seatSize },
        1: { flex: seatSize },
        2: { color: "rgb(109, 189, 0)", flex: seatSize },
        3: { color: "rgb(240, 78, 57)", flex: seatSize }
      };
    },
    newSeats() {
      if (this.item1.colsCount > 13) return null;
      let seatsList = [];
      for (let i = 1; i <= this.item1.rowsCount; i++) {
        for (let j = 1; j <= this.item1.colsCount; j++) {
          let seat = {
            column: j,
            row: i,
            status: 1,
            studio: this.item1.studioId
          };
          seatsList.push(seat);
        }
      }
      return seatsList;
    }
  },
  props: {
    item: Object,
    add: Boolean
  },
  mounted() {
    if (this.item) {
      this.item1 = { ...this.item };
     // console.log(this.item1);
    }
  },
  methods: {
    handleSubmit(name) {
      let _this = this;
      // console.log(this.$refs[name].validate)
       this.$refs[name].validate(valid => {
        try {
          if (valid) {
            this.$Message.success("Success!");
            this.disabled = true;
            this.$set(this.item1,'studioType','1')
         //   console.log(this.item1);
            if (this.add) {
              axios
                .post("http://manage.ptt.com/studio/add", this.item1)
                .then(function(response) {
                  console.log(response);
                  if (response.status == 200) {
                    _this.$set(
                      _this.item1,
                      "studioId",
                      response.data.studioId.toString()
                    );
                    // console.log(response);
                    _this.$emit("headCallBack", _this.item1);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              // console.log(this.item1)
              // axios
              //   .post("http://manage.ptt.com/movie/update", this.item1)
              //   .then(function(response) {
              //     if (response.status == 200) {
              //     }
              //   })
              //   .catch(function(error) {
              //     console.log(error);
              //   });
            }
          } else {
            this.$Message.error("Fail!");
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    // handleSubmit(name) {
    //   let _this = this;

    //   this.$refs[name].validate(valid => {
        
    //     try {
    //       console.log(valid)
    //       if (valid) {
    //         this.disabled = true;

    //         //添加
    //         if (this.add) {
    //           axios
    //             .post("http://manage.ptt.com/studio/add", this.item1)
    //             .then(function(response) {
    //               if (response.status == 200) {
    //                 // _this.$set(_this.item1, "id", response.data.id.toString());
    //                 // _this.$set(_this.item1, "salesVolume", 0);
    //                 console.log(_this.item1);
    //                 // _this.$emit("headCallBack", _this.item1);
    //                 // _this.$Message.success("Success!");
    //               }
    //             })
    //             .catch(function(error) {
    //               console.log(error);
    //             });
    //         } else {
    //           //修改
    //           axios
    //             .post("http://manage.ptt.com/movie/update", this.item1)
    //             .then(function(response) {
    //               if (response.status == 200) {
    //                 _this.$Message.success("Success!");
    //               }
    //             })
    //             .catch(function(error) {
    //               console.log(error);
    //             });
    //         }
    //       } else {
    //         this.$Message.error("Fail!");
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   });
    // },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    changeFormDate() {
      this.disabled = false;
    },
    choose(item, index) {
      console.log(item);
      console.log(this.newSeats);
      console.log(index);
      if (item.status == 1) item.status = 0;
      else if (item.status == 0) item.status = 1;
      //this.newSeats[index] = item
      this.$set(this.newSeats[index], "status", item.status);
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-avatar-large {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

.ivu-upload {
  display: inline-block;
  margin-left: 20px;
}

.seat {
  font-size: 30px;
  text-align: center;
}
</style>
