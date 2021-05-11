<template>
    <el-row class="header-container">
        <el-menu
                background-color="#545c64"
                text-color="#fff"
                style=" border: none;"
                active-text-color="#ffd04b"
                :default-active="activeIndex"
                @select="handleSelect">
            <menu-item-com :item="item" :indexItem="index+''" v-for="(item,index) in router"
                           :key="index+'router'"></menu-item-com>
        </el-menu>
    </el-row>
</template>

<script>
    import menuItemCom from './components/menuItem/index'

    export default {
        name: "index",
        components: {menuItemCom},
        computed: {
            router: {
                get() {
                    let routers = this.$router.options.routes
                    //取出可展示的路由
                    return routers.filter(item => {
                        return !item.hidden
                    })
                }
            }
        },
        create() {
        },
        mounted() {
        },
        methods: {
            handleSelect() {
            }
        },
        data() {
            return {
                activeIndex: '1',
            }
        }
    }
</script>

<style scoped lang="scss">
    .header-container {
        width: 100%;
        min-height: 100vh;
        height: 100%;
        background-color: #545c64;
        border: none;
    }
</style>
