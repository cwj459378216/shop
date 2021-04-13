<template>
    <el-container class="home-container">
      <el-header>
        <div class="home-header-left">
          <img class="home-logo" src="../assets/logo.png" alt="logo">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
        </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px' ">
          <div class="toggle-button" @click="toggleCollapse()">|||</div>
           <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF" unique-opened :collapse="isCollapse"
            :collapse-transition="isCollapse" router :default-active="activePath">
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavStatsu('/' + subItem.path)">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  // data() 防止命名重复
  data() {
    return {
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(this.menuList)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavStatsu(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
  .home-logo{
    width: 50px;
  }
}
.el-aside{
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #EAEDF1;
}
.iconfont{
  margin-right: 10px;
  // margin-left: 10px;
}
.toggle-button{
  background-color: #4A506B;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  // margin-left: 10xp;
}
</style>
