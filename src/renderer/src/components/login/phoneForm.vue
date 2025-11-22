<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="login-form-container">
    <el-form-item prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号" clearable>
        <template #prefix>
          <el-icon>
            <Iphone />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="code">
      <div class="sms-code-container">
        <el-input v-model="form.code" placeholder="请输入短信验证码" clearable>
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" :disabled="isCodeButtonDisabled" @click="sendCode">
          {{ codeButtonText }}
        </el-button>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="submitForm">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Iphone, Message } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const form = reactive({
  phone: '',
  code: ''
})

const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入短信验证码', trigger: 'blur' }
  ]
})

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

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      // 这里应该调用登录API
      console.log('手机号登录:', form)
    }
  })
}
</script>

<style scoped>
.login-form-container {
  padding: 20px 0;
}

.sms-code-container {
  display: flex;
  gap: 10px;
}

.sms-code-container :deep(.el-input) {
  flex: 1;
}
</style>