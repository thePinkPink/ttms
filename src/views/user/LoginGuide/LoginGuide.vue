<template>
  <div style="flex:1;">
    <div style="min-width:1350px;position: relative;">
      <div id="background" style="width:100%;height:100%;">
        <img style="width:100%;height:100%;" src="../../../assets/imgs/login_bgc.jpg">
      </div>
      <div id="login">
        <Card :bordered="false">
          <p slot="title">登录</p>
          <Form ref="formInline" :model="formInline" >
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
          </Form>
          <p style="overflow: hidden;"><router-link to="register" style="float:right;">去注册</router-link></p>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
#login {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 100px;
  width: 350px;
  //   padding: 25px;
  //   background-color: rgba(255,255,255,.9);
}
</style>
