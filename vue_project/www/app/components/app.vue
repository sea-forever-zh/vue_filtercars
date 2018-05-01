<template>
   <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="dangqian()" @on-select="changehandler">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="clipboard"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="filtercar">
                            <Icon type="calendar"></Icon>
                            筛选列表
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '20px 50px'}">
                <Card>
                    <div style="min-height: 200px;">
                        <router-view/>
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">^_^</Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        methods : {
            dangqian(){
               return this.$router.history.current.fullPath.match(/^\/(.[^\/]+)(\/(.+))?$/)[1];
            },
            changehandler(name){
                this.$router.push(`/${name}`);
            }
        }
    }
</script>

<style lang="less" scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-menu-item-active{
        background:gold;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 520px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
