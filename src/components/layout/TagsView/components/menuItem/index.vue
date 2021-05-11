<template>
    <span v-if="!item.hidden">
        <template v-if="hasOneShowingChild()">
            <router-link :to="item.path" :key="item.name">
                <el-menu-item :index="item.path">
                    {{item.name}}
                </el-menu-item>
            </router-link>
        </template>
        <template v-else>
            <el-submenu :index="item.path">
                <template slot="title">
                    <span>{{item.name}}</span>
                </template>
                <menu-item-index :item="child" :index="child.path"
                                 class=""
                                 style="display: block;margin-top: -1px"
                                 v-for="(child,indexChild) in item.children"
                                 :key="item.name+indexChild" :index-item="item.name"></menu-item-index>
            </el-submenu>
        </template>
    </span>
</template>

<script>
    export default {
        name: "menu-item-index",
        props: {
            item: {
                type: Object,
                required: true
            },
            indexItem: {
                type: String,
                required: true
            },
        },
        methods: {
            hasOneShowingChild() {
                let show = true
                if (this.item.children && this.item.children.length) {
                    show = false
                }
                return show
            }
        }
    }
</script>

<style scoped>
</style>
