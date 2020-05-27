<template>
  <div class="content">
    <Steps :current="current">
      <Step title="账号注册"></Step>
      <Step title="注册成功"></Step>
    </Steps>
    <div v-show="current==0">
      <div>
        <Form
          ref="formCustom"
          :model="formCustom"
          :rules="ruleCustom"
          :label-width="80"
          style="width:800px;margin: 100px auto;"
        >
          <FormItem label="UserName" prop="userName">
            <Input v-model="formCustom.userName"></Input>
          </FormItem>
          <FormItem label="Password" prop="password">
            <Input type="password" v-model="formCustom.password"></Input>
          </FormItem>
          <FormItem label="Password2" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
          </FormItem>
          <FormItem label="email" prop="email">
            <Input type="email" v-model="formCustom.email"></Input>
          </FormItem>
          <FormItem label="phoneNum" prop="phoneNum">
            <Input v-model="formCustom.phoneNum"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">下一步</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <div v-show="current==2">
      <div></div>
    </div>
  </div>
</template>
<script>

import api from "../../../api/api"

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };

    return {
      current: 0,
      img: "",
      formCustom: {
        userName: "",
        password: "",
        passwdCheck: "",
        email: "",
        phoneNum: ""
      },
      ruleCustom: {
        userName: [
          {
            min: 3,
            trigger: "blur"
          }
        ],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    next() {
      if (this.current == 3) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    },
    handleSubmit(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          //this.$Message.success("Success!");
          axios
            .post("http://sso.ptt.com/user/regist", _this.formCustom)
            .then(function(response) {
              console.log(response);
              axios
                .post("http://sso.ptt.com/user/login", _this.formCustom)
                .then(function(response) {
                  console.log(response);
                  if (response.data.status == 0) {
                    //console.log(api.cookie)
                    api.cookie.set("PTT_TOKEN", response.data.PTT_TOKEN, 30);
                    _this.$store.dispatch(
                      "SignIn",
                      api.cookie.get("PTT_TOKEN")
                    );
                    _this.$Message.success("登陆成功");
                  } else if(response.data.status == 1)  {
                    _this.$Message.error("用户名或密码错误!");
                  } else {
                    _this.$Message.error("手机号或邮箱已被注册!");
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
              _this.current++;
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
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
