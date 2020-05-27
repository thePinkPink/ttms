<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="Password" prop="oldPasswd">
      <Input type="oldPasswd" v-model="formCustom.oldPasswd"></Input>
    </FormItem>
    <FormItem label="Password" prop="passwd">
      <Input type="password" v-model="formCustom.passwd"></Input>
    </FormItem>
    <FormItem label="Confirm" prop="passwdCheck">
      <Input type="password" v-model="formCustom.passwdCheck"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
    </FormItem>
  </Form>
</template>
<script>
import api from "../../../api/api";

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
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        oldPasswd: "",
        passwd: "",
        passwdCheck: ""
      },
      ruleCustom: {
        oldPasswd: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .get("http://sso.ptt.com/user/token/" + api.cookie.get("PTT_TOKEN"))
            .then(function(response) {
              console.log(response.data.userId);
              let id = response.data.userId;
              axios
                .post("http://sso.ptt.com/user/update/pwd", {
                  userId: id,
                  oldPassword: _this.formCustom.oldPasswd,
                  newPassword: _this.formCustom.passwd
                })
                .then(function(response) {
                  console.log(response);
                  if (response.status == 400) {
                    this.$Message.error("旧密码错误");
                  } else {
                    _this.$Message.success("Success!");
                    _this.$store.dispatch("SignOut");
                    _this.$Message.success("请重新登录");
                    _this.$router.push({path:"/theater"})
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
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
