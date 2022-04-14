import { ref } from 'vue'
export default function useOperation(props, emit) {
  function toWeb(url) {
    window.open(url, '_blank')
  }
  const envForm = ref({
    name: '',
    protocol: 'http://',
    host: ''
  })
  const envDialog = ref(false)
  const envFormRef = ref(null)
  function addEnv() {
    envDialog.value = true
  }
  function confirmAddEnv() {
    const list = props.envList
    list.push({
      ...envForm.value
    })
    emit('update:envList', list)
    envDialog.value = false
  }
  function delEnv(val) {
    console.log(val);
  }
  function resetForm() {
    envForm.value = {
      name: '',
      protocol: 'http://',
      host: ''
    }
  }
  return {
    delEnv,
    toWeb,
    addEnv,
    confirmAddEnv,
    resetForm,
    envForm,
    envDialog,
    envFormRef,
    rules: {
      name: [{
        required: true, message: '请输入名称', trigger: 'blur'
      }],
      host: [{
        required: true, message: '请输入名称', trigger: 'blur'
      }]
    }
  }
}