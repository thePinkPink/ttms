<template>
  <div style="display: inline-block;">
    <Button v-if="add" type="primary" @click="modal1 = true">添加</Button>
    <Button v-else type="primary" size="small" @click="modal1 = true">查看</Button>
    <Modal v-model="modal1" :title="item1.id">
      <Form ref="item1" :model="item1" :rules="ruleValidate" :label-width="80">
        <FormItem id="a" label="图片" prop="movieImages">
          <Avatar icon="ios-person" size="large" :src="item1.movieImages" shape="square"/>
          <Upload
            action="http://manage.ptt.com/pic/upload"
            name="uploadFile"
            :on-success="changeImg"
            :show-upload-list="false"
            v-if="!(!add&&disabled)"
          >
            <Button icon="ios-cloud-upload-outline">修改图片</Button>
          </Upload>
        </FormItem>
        <FormItem label="名称" prop="movieName" style="margin-top:25px;">
          <Input v-model="item1.movieName" placeholder="Movie Name" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="语言" prop="language">
          <Input v-model="item1.language" placeholder="Language" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="国家" prop="movieArea">
          <Input v-model="item1.movieArea" placeholder="Area" :disabled="!add&&disabled"></Input>
        </FormItem>
        <!-- <FormItem label="类型" prop="movieType">
          <Input v-model="item1.movieType" placeholder="Type" :disabled="!add&&disabled"></Input>
        </FormItem> -->
        <FormItem label="导演" prop="movieDirect">
          <Input v-model="item1.movieDirect" placeholder="Director" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="演员" prop="moviePerformer">
          <Input v-model="item1.moviePerformer" placeholder="Actor" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="时长" prop="movieTime">
          <Input v-model="item1.movieTime" placeholder="Time" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="上映时间" prop="startTime">
          <DatePicker
            v-bind="item1.startTime"
            type="datetime"
            placeholder="Select date and time"
            style="width: 200px"
            @on-change="f"
          ></DatePicker>
        </FormItem>
        <FormItem label="销量" prop="salesVolume">
          <Input v-model="item1.salesVolume" placeholder="Sale" disabled></Input>
        </FormItem>
        <FormItem label="简介" prop="movieDesc">
          <Input
            v-model="item1.movieDesc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
            :disabled="!add&&disabled"
          ></Input>
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
      ruleValidate: {
        movieName: [
          {
            required: true,
            message: "电影不能为空",
            trigger: "blur"
          }
        ],
        language: [
          {
            required: true,
            message: "语言不能为空",
            trigger: "blur"
          }
        ],
        movieArea: [
          {
            required: true,
            message: "国家不能为空",
            trigger: "blur"
          }
        ],
        // movieType: [
        //   {
        //     required: true,
        //     message: "类型不能为空",
        //     trigger: "blur"
        //   }
        // ],
        movieDirect: [
          {
            required: true,
            message: "导演不能为空",
            trigger: "blur"
          }
        ],
        moviePerformer: [
          {
            required: true,
            message: "演员不能为空",
            trigger: "blur"
          }
        ]
        // movieTime: [
        //   {
        //     required: true,
        //     message: "时长不能为空",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  props: {
    item: Object,
    add: Boolean
  },
  mounted() {
    if (this.item) {
      this.item1 = { ...this.item };
    }
  },
  methods: {
    handleSubmit(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        try {
          if (valid) {
            this.disabled = true;

            //添加
            if (this.add) {
              this.item1.startTime = new Date(this.item1.startTime).valueOf();
              _this.$set(_this.item1,"movieType", 1);
              axios
                .post("http://manage.ptt.com/movie/add", this.item1)
                .then(function(response) {
                  if (response.status == 200) {
                    _this.$set(_this.item1, "id", response.data.id.toString());
                    _this.$set(_this.item1, "salesVolume", 0);
                    console.log(_this.item1);
                    _this.$emit("headCallBack", _this.item1);
                    _this.$Message.success("Success!");
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              //修改
              axios
                .post("http://manage.ptt.com/movie/update", this.item1)
                .then(function(response) {
                  if (response.status == 200) {
                    _this.$Message.success("Success!");
                  }
                  // _this.$Message.success("Success!");
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
    changeImg(res, file) {
      this.$set(this.item1, "movieImages", res.url);
      console.log(this.item1);
    },
    f(a, b) {
      this.item1.startTime = a;
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
</style>
