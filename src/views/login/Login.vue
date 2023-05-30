<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form @submit.prevent="handleSubmit">
            <div class="form-body">
              <div class="logo"></div>
              <div class="dx-fieldset-header">Đăng nhập</div>
              <div class="input-container">
                <div class="mgb-8">Email</div>
                <DxTextBox
                  label-mode="static"
                  class="input-field"
                  v-model:value="username"
                >
                  <DxValidator>
                    <DxValidationRule
                      type="required"
                      message="Email không được để trống"
                    />
                    <DxValidationRule
                      type="email"
                      message="Email không đúng định dạng"
                    />
                  </DxValidator>
                  <div class="input-field-icon icon-email"></div>
                </DxTextBox>
                <div class="mgb-8">Password</div>
                <DxTextBox
                  v-model:value="password"
                  label-mode="static"
                  class="input-field"
                  mode="password"
                >
                  <DxValidator>
                    <DxValidationRule
                      type="required"
                      message="Password không được để trống"
                    />
                  </DxValidator>
                  <div class="input-field-icon icon-password"></div>
                </DxTextBox>
                <div class="error" v-if="error != ''">{{ error }}</div>
                <!-- <DxButton
                  width="100%"
                  :use-submit-behavior="true"
                  text="Đăng nhập"
                  type="default"
                  class="mgt-16 btn-login"
                /> -->
                <BaseButton
                  class="mgt-16"
                  :use-submit-behavior="true"
                  :tabindex="3"
                  lableButton="Đăng nhập"
                  classButton="misa-button-normal w-120 misa-button-primary "
                ></BaseButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5"
      style="background: #337ab7"
    >
      <!-- Copyright -->
      <div class="text-white mb-3 mb-md-0"></div>
      <!-- Copyright -->

      <!-- Right -->
      <div>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#!" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="#!" class="text-white">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <!-- Right -->
    </div>
  </section>
</template>

<script>
import store from '@/store'
import DxValidator, { DxValidationRule } from 'devextreme-vue/validator'
import DxTextBox from 'devextreme-vue/text-box'
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  components: {
    DxTextBox,
    DxValidator,
    DxValidationRule,
    BaseButton,
  },
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async handleSubmit() {
      const user = { Username: this.username, Password: this.password }
      localStorage.setItem('user', JSON.stringify(user))
      debugger
      try {
        // Gọi action login trong store để thực hiện yêu cầu đăng nhập
        await store.dispatch('auth/login', user)
        this.error = ''
        // Chuyển hướng đến trang Dashboard sau khi đăng nhập thành công
        if (localStorage.getItem('roleOption') - 0 === 3) {
          this.$router.push('/booking/booking-await')
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        this.error = 'Tên đăng nhập hoặc mật khẩu không đúng!'
        // console.error(error)
        // Hiển thị thông báo lỗi đăng nhập
      }
    },
  },
}
</script>
<style scoped lang="scss">
aside {
  display: none;
}
.error {
  color: #e14242;
  font-size: 13px;
  font-family: 'Roboto';
}
#content-header {
  display: none;
}
.content {
  height: 100vh;
  width: 100vw;
}
.t-left {
  width: 50%;
  height: 100vh;
  // background: #f8fafb;
}
.t-right {
  width: 50%;
  height: 100vh;

  // background: #f8fafb;
}
.login {
  // width: 50%;
  // justify-content: center;
  .logo {
    @media (min-width: 1568px) {
      margin-top: 165px;
    }
  }
  // border: 1px solid #ccc;
  // @media (min-width: 768px) {
  //   display: none !important;
  // }
}
.login-logo {
  // border-top: 1px solid #ccc;
  // border-bottom: 1px solid #ccc;
  // border-left: 1px solid #ccc;

  width: 100%;
  height: 77%;
  margin: 0 auto;
  background: url('@/assets/Scholl.png') no-repeat;
  background-size: contain;
  margin-top: 15%;
  margin-left: 150px;
}

.dx-fieldset-header {
  text-align: center;
  font-size: 20px;
}
.btn-login {
  width: 180px;
}
.logo {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: url('@/assets/logoUniversity.png') no-repeat;
  background-size: contain;
  margin-bottom: 20px;
  // margin-top: 90px;
}
.input-container {
  width: 100%;
}
.form-body {
  // border-top: 1px solid #ccc;
  // border-bottom: 1px solid #ccc;
  // border-right: 1px solid #ccc;
  width: 400px;
  height: 420px;
  // border: 1px solid #ddd;
  border-radius: 4px;
  // padding: 40px;
  background-color: #fff;
  margin-bottom: 40px;
}
.input-field {
  height: 40px;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 30px;

  .input-field-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    z-index: 1;
    margin-left: -20px;
    background: url('@/assets/images/Icon_process.2df8445b.svg') no-repeat;

    &.icon-email {
      background-position: -156px -205px;
    }
    &.icon-password {
      background-position: -204px -229px;
    }
  }
}
.divider:after,
.divider:before {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
