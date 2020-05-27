<template>
  <div style="display: inline-block;">
    <Button v-if="add" type="primary" @click="modal1 = true">添加</Button>
    <Button v-else type="primary" size="small" @click="modal1 = true">查看</Button>
    <Modal v-model="modal1" :title="item1.scheduleId">
      <Form ref="item1" :model="item1" :label-width="80">
        <FormItem label="电影" prop="movie" style="margin-top:25px;">
          <Select v-model="item1.movieId" style="width:200px" :disabled="!add">
            <Option v-for="item in movieList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="影厅" prop="studio" style="margin-top:25px;">
          <Select v-model="item1.studioId" style="width:200px" :disabled="!add">
            <Option
              v-for="item in studioList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="上映时间" prop="startTime">
          <DatePicker
            v-model="item1.startTime"
            type="datetime"
            placeholder="Select date and time"
            style="width: 200px"
            :disabled="!add&&disabled"
          ></DatePicker>
        </FormItem>
        <FormItem label="上映时间" prop="startTime">
          <DatePicker
            v-model="item1.endTime"
            type="datetime"
            placeholder="Select date and time"
            :disabled="!add&&disabled"
            style="width: 200px"
          ></DatePicker>
        </FormItem>
        <FormItem label="票价" prop="price">
          <Input v-model="item1.newPrice" placeholder="price" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem v-if="!(!add&&disabled)">
          <Button type="primary" @click="handleSubmit('item1')">提交</Button>
          <Button @click="handleReset('item1')" style="margin-left: 8px">重置</Button>
        </FormItem>
        <FormItem v-if="disabled">
          <Button v-if="(!add)" type="primary" @click="changeFormDate()">修改</Button>
        </FormItem>
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
      movieList: [],
      movie: "",
      studioList: [],
      studio: "",
      startTime: "",
      endTime: "",
      price: "",
      MList: {},
      SList: {}
    };
  },
  props: {
    item: Object,
    add: Boolean
  },
  mounted() {
    let _this = this;

    if (this.item) {
      this.item1 = { ...this.item };
      //this.$set(this.item1, "scheduleId", this.item1.scheduleId.toString());
      console.log(this.item1);
    }

    axios
      .get("http://manage.ptt.com/movie/query/list/1/100")
      .then(function(response) {
        response.data.lists.forEach(element => {
          _this.movieList.push({
            value: element.id,
            label: element.movieName
          });
          _this.MList[element.id] = element.movieName
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://manage.ptt.com/studio/query/list")
      .then(function(response) {
        response.data.forEach(element => {
          _this.studioList.push({
            value: element.studioId,
            label: element.studioName
          });
          _this.MList[element.studioid] = element.studioName
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    handleSubmit(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        try {
          if (valid) {
            this.$Message.success("Success!");
            this.disabled = true;
            console.log(this.item1.movieId)
            if (this.add) {
              axios
                .post("http://manage.ptt.com/schedule/add", {
                  movieId: _this.item1.movieId,
                  movieName: _this.MList[_this.item1.movieId],
                  studioId: _this.item1.studioId,
                  studioName: _this.SList[_this.item1.studioId],
                  newPrice: _this.item1.newPrice,
                  oldPrice: _this.item1.newPrice,
                  startTime: _this.item1.startTime,
                  endTime: _this.item1.endTime
                })
                .then(function(response) {
                  if (response.status == 200) {
                    console.log(_this.item1)
                    //console.log(response)
                    _this.$set(
                      _this.item1,
                      "scheduleId",
                      response.data.toString()
                    );
                    // console.log(_this.item1.movieName)
                    //_this.$emit("headCallBack", _this.item1);
                    _this.$Message.success("Success!");
                    _this.$router.go(0);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              axios
                .post("http://manage.ptt.com/schedule/update", {
                  scheduleId: _this.item1.scheduleId,
                  movieId: _this.item1.movieId,
                  movieName: _this.MList[_this.item1.movieId],
                  studioId: _this.item1.studioId,
                  studioName: _this.SList[_this.item1.studioId],
                  newPrice: _this.item1.newPrice,
                  oldPrice: _this.item1.newPrice,
                  startTime: _this.item1.startTime,
                  endTime: _this.item1.endTime
                })
                .then(function(response) {
                  if (response.status == 200) {
                    _this.$Message.success("Success!");
                    _this.$router.go(0);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          } else {
            this.$Message.error("Fail!");
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    changeFormDate() {
      this.disabled = false;
    },
    // f(a, b) {
    //   this.item1.startTime = a;
    // }
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
