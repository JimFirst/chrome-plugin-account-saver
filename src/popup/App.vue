<template>
  <el-config-provider :locale="locale">
    <div class="header">
      <div>
        登录传送门
      </div>
      <div>
        <el-button type="primary" size="small" @click="addType">添加分类</el-button>
        <el-dropdown :hide-on-click="false">
          <div>
            <el-icon :size="16"><more-filled /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div>
      <env-card v-for="item in typeList" :envName="item.envName" v-model:envList="item.envList" :key="item.id"></env-card>
    </div>
    <el-button @click="getData">获取数据</el-button>
    <el-button @click="clearData">清理数据</el-button>
  </el-config-provider>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { ElConfigProvider, ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import EnvCard from './components/EnvCard/index.vue'
import { MoreFilled } from '@element-plus/icons-vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { setLocalData, getLocalData } from './utils/index'
export default defineComponent({
  components: {
    ElButton,
    ElDropdown,
    ElIcon,
    ElDropdownMenu,
    ElDropdownItem,
    EnvCard,
    MoreFilled,
    ElConfigProvider
  },
  setup() {
    const typeList = ref([{
        envName: '环境名称',
        id: 1,
        envList: []
      }])
    function addType() {
      typeList.value.push({
        envName: '环境名称',
        id: Date.now(),
        envList: []
      })
      
    }
    function getData() {
      getLocalData('typeList', [{
        envName: '环境名称',
        id: 1,
        envList: []
      }], (data) => {
        if (data) {
          typeList.value = data
        }
      })
    }
    function clearData() {
      typeList.value = []
      setLocalData('typeList', [])
    }
    // init
    getData()
    watch(typeList, 
    () => {
      setLocalData('typeList', typeList.value)
    }, {
      deep: true
    })
    return {
      addType,
      locale: zhCn,
      typeList,
      getData,
      clearData
    }
  },
})
</script>
<style lang="scss">
#popup {
  width: 500px;
  height: 500px;
}
.header {
  display: flex;
  justify-content: space-between;
}

</style>