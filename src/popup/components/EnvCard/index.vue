<template>
  <div class="env-card">
    <div>
      {{ envName }}
    </div>
    <div>
      <el-tag v-for="env in envList" key="{{env.id}}" effect="dark" closable @click="toWeb(env.protocol + env.host)" @close="delEnv">{{ env.name }}</el-tag>
      <el-button size="small" @click="addEnv">
        <el-icon :size="16"><plus /></el-icon>
      </el-button>
    </div>
  </div>

  <el-dialog
    title="添加环境"
    v-model="envDialog"
    width="400px"
    @close="resetForm">
    <el-form :model="envForm" ref="envFormRef" :rules="rules" label-width="80px">
      <el-form-item label="所属环境">
        {{ envName }}
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="envForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="host">
        <el-input v-model="envForm.host" clearable>
          <template #prepend>
            <el-select v-model="envForm.protocol" placeholder="协议" style="width: 85px">
              <el-option label="http://" value="http://" />
              <el-option label="https://" value="https://" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="envDialog = false">取 消</el-button>
      <el-button type="primary" @click="confirmAddEnv">确 定</el-button>
    </template>
  </el-dialog>
  
</template>

<script>
import { defineComponent } from 'vue'
import { ElOption, ElTag, ElIcon, ElDialog, ElForm, ElFormItem, ElButton, ElInput, ElSelect } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import useOperation from './useOperation'

export default defineComponent({
  components: {
    ElTag,
    Plus,
    ElButton,
    ElIcon,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption
  },
  props: {
    envName: {
      type: String,
      default: '环境名称'
    },
    envList: {
      type: Array,
      default: () => [{
        name: '',
        id: 1,
        protocol: '',
        host: ''
      }]
    }
  },
  emits: ['update:envList'],
  setup(props, { emit }) {
    return {
      ...useOperation(props, emit)
    }
  }
})
</script>

<style lang="scss">
.env-card {
  display: flex;
  align-items: center;
}
</style>