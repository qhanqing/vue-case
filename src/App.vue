<template>
    <div id="app">
        <el-container>
            <el-aside class="clear">
                <TagsView></TagsView>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <TagsHeader></TagsHeader>
                </el-header>
                <el-main class="clear">
                    <router-view/>
                </el-main>
                <el-footer class="footer_copyright">
                    <span>
                        change the world by program 🚀 你盼世界，我盼望你无bug
                    </span>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import TagsView from '@/components/layout/TagsView'
    import TagsHeader from '@/components/layout/TagsHeader'

    export default {
        name: 'App',
        components: {TagsView, TagsHeader},
        mounted() {
        },
        data() {
            return {}
        }
    }
</script>
<style>
    html, body, #app {
        height: 100%;
    }
</style>
<style scoped lang="scss">
    .clear {
        margin: 0;
        padding: 0;
    }

    .header {
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .footer_copyright {
        background-color: #2e3f51;
        width: 100%;
        color: #ffffff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
</style>

