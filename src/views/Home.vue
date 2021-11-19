<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class = "right" style="" >
     <el-dropdown class="userInfo" @command="commandHandler" style="text-align:right">
              <span class="el-dropdown-link">
              <i><img src="http://www.panxixi.xyz/web/upload/admin.jpg" class="head" alt=""></i>
              </span>
                  <el-dropdown-menu slot="dropdown">
                   
                      <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
                      <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div style = "float:right">
              欢迎您：管理员 
            </div>
             <div id = "thetitle" >小说管理平台</div>
      </el-header>
      <el-container>
        <el-aside width="14%">
          <el-row class="tac">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-menu-item index="/topPage" style="width:100%" >
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="" style="width:100%" >
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>后台管理</span>
                </template>
                <el-menu-item-group style="width:100%">
                  <el-menu-item index="/showbook" >书籍管理</el-menu-item>
                  <el-menu-item index="/showAuthor">作者管理</el-menu-item>
                  <el-menu-item index="/dictionary">字典配置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-row>
        </el-aside>
        <el-main >
         
         
            <router-view></router-view>
          
         </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.home {
  height: 100%;
}
.right{
float:right;height:60px;line-height:60px
}
#thetitle{
height:60px;line-height:60px;
font-size: 20px;

}
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
#app {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;

}

.el-aside {
  background-color: #d3dce6;

  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
 .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 40px;
        height: 40px;
        margin-top: 8px;
        margin-left: 3px;
        line-height: 60px;
        border-radius: 24px;
        margin-left: 8px;
        margin-right: 10px; 
    }

    .el-dropdown-link {
        color: rgb(32, 25, 25);
        display: flex;
        align-items: center;
    }
</style>


<script>

export default {

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
      commandHandler(cmd) {
                // 退出登录
                if (cmd == 'logout') {
                    this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                      window.sessionStorage.clear()
                      this.$router.push("/login")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }  else if (cmd == 'pwd'){
                    this.$router.push("/pwd");
                }
            },
  },
};
</script>
