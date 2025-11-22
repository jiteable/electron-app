<template>
  <form class="login-form-container" @submit.prevent="submitForm">
    <div class="form-item">
      <div class="input-group">
        <el-icon class="icon-user">
          <User />
        </el-icon>
        <input v-model="form.username" type="text" placeholder="请输入账号" required />
      </div>
    </div>

    <div class="form-item">
      <div class="input-group">
        <el-icon class="icon-lock">
          <Lock />
        </el-icon>
        <input v-model="form.password" type="password" placeholder="请输入密码" required />
      </div>
    </div>

    <div class="form-item captcha-container">
      <div class="input-group">
        <el-icon class="icon-key">
          <Key />
        </el-icon>
        <input v-model="form.captcha" type="text" placeholder="请输入验证码" required />
      </div>
      <div class="captcha-image" @click="refreshCaptcha">
        <!-- 这里应该显示验证码图片 -->
        <div class="placeholder-captcha">1047</div>
      </div>
    </div>

    <div class="form-item login-options">
      <div class="remember-password">
        <input type="checkbox" v-model="rememberPassword" id="remember" />
        <label for="remember">记住密码</label>
      </div>
      <a href="#" class="forget-password" @click.prevent="forgetPassword">忘记密码?</a>
    </div>

    <div class="form-item">
      <button type="submit" class="login-button">登录</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock, Key } from '@element-plus/icons-vue'
import { loginByJson } from '../../api/login'

const form = reactive({
  username: '',
  password: '',
  captcha: '',
  key: '' // 验证码的key
})

// 记住密码
const rememberPassword = ref(false)

// 刷新验证码
const refreshCaptcha = () => {
  console.log('刷新验证码')
}

// 忘记密码
const forgetPassword = () => {
  console.log('忘记密码')
}

// 提交表单
const submitForm = async () => {
  try {
    // 调用登录API
    const res = await loginByJson({
      username: form.username,
      password: form.password,
      key: form.key,
      captcha: form.captcha
    })

    console.log('登录结果:', res)

    // 如果登录成功，保存token到localStorage
    if (res.data && res.data.token) {
      localStorage.setItem('TOKEN', res.data.token)
      // 这里应该跳转到主页面
      window.location.href = '#/'
    }
  } catch (error) {
    console.error('登录失败:', error)
    // 可以在这里显示错误信息
  }
}
</script>

<style scoped>
.login-form-container {
  padding: 20px 0;
  width: 100%;
}

.form-item {
  margin-bottom: 15px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  height: 32px;
  /* 缩小整体高度 */
}

.input-group input {
  flex: 1;
  padding: 6px 10px;
  /* 减小内边距 */
  border: none;
  outline: none;
  font-size: 14px;
  background-color: transparent;
  height: 100%;
  box-sizing: border-box;
}

.icon-user,
.icon-lock,
.icon-key {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 8px;
  color: #909399;
}

.el-icon {
  font-size: 14px;
}

.captcha-container {
  display: flex;
  gap: 10px;
}

.captcha-container .input-group {
  flex: 1;
}

.captcha-image {
  width: 100px;
  /* 略微缩小宽度 */
  height: 32px;
  /* 与输入框高度保持一致 */
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #909399;
  font-size: 14px;
}

.captcha-image:hover {
  border-color: #c0c4cc;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.remember-password {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}

.remember-password input[type="checkbox"] {
  margin-right: 5px;
  transform: scale(0.8);
  /* 略微缩小复选框 */
}

.forget-password {
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.forget-password:hover {
  color: #666;
}

.login-button {
  width: 100%;
  padding: 8px 0;
  /* 减小按钮内边距 */
  background-color: #0081ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 32px;
  /* 与输入框高度保持一致 */
}

.login-button:hover {
  background-color: #0066cc;
}
</style>