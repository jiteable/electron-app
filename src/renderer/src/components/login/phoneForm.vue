<template>
  <form class="login-form-container" @submit.prevent="submitForm">
    <div class="form-item">
      <div class="input-group">
        <el-icon class="icon-user">
          <Iphone />
        </el-icon>
        <input v-model="form.phone" type="text" placeholder="请输入手机号" required />
      </div>
    </div>

    <div class="form-item">
      <div class="sms-code-container">
        <div class="input-group">
          <el-icon class="icon-message">
            <Message />
          </el-icon>
          <input v-model="form.code" type="text" placeholder="请输入短信验证码" required />
        </div>
        <el-button type="primary" :disabled="isCodeButtonDisabled" @click="sendCode" class="code-button">
          {{ codeButtonText }}
        </el-button>
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
import { Iphone, Message } from '@element-plus/icons-vue'

const form = reactive({
  phone: '',
  code: ''
})

// 记住密码
const rememberPassword = ref(false)

// 验证码按钮相关状态
const isCodeButtonDisabled = ref(false)
const codeButtonText = ref('发送验证码')
let countdown = 60

// 发送验证码
const sendCode = () => {
  if (!form.phone) {
    // 这里应该提示用户输入手机号
    return
  }

  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(form.phone)) {
    // 这里应该提示手机号格式错误
    return
  }

  // 开始倒计时
  isCodeButtonDisabled.value = true
  const timer = setInterval(() => {
    if (countdown > 0) {
      codeButtonText.value = `${countdown}秒后重发`
      countdown--
    } else {
      clearInterval(timer)
      codeButtonText.value = '发送验证码'
      isCodeButtonDisabled.value = false
      countdown = 60
    }
  }, 1000)

  // 这里应该调用发送验证码的API
  console.log('发送验证码到：', form.phone)
}

// 忘记密码
const forgetPassword = () => {
  console.log('忘记密码')
}

// 提交表单
const submitForm = async () => {
  try {
    // 这里应该调用登录API
    console.log('手机号登录:', form)

    // 如果登录成功，保存token到localStorage
    // localStorage.setItem('TOKEN', res.data.token)
    // window.location.href = '#/'
  } catch (error) {
    console.error('登录失败:', error)
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
.icon-message {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 8px;
  color: #909399;
}

.el-icon {
  font-size: 14px;
}

.sms-code-container {
  display: flex;
  gap: 10px;
}

.sms-code-container .input-group {
  flex: 1;
}

.code-button {
  padding: 8px 12px;
  /* 减小按钮内边距 */
  height: 32px;
  /* 与输入框高度保持一致 */
  font-size: 12px;
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