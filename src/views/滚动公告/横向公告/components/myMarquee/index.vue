<template>
    <div class="wrap">
        <div ref="box" class="box">
            <div ref="marquee" class="marquee">{{text}}</div>
            <div ref="copy" class="copy"></div>
        </div>
        <div ref="node" class="node">{{text}}</div>
    </div>
</template>
<script>
    export default {
        name: 'Marquee',
        props: {
            lists: {
                type: Array,
                default: () => []
            }, // 父组件传入数据， 数组形式 [ "连雨不知春去","一晴方觉夏深"]
        },
        data() {
            return {
                text: '' // 数组文字转化后的字符串
            }
        },
        methods: {
            move() {
                // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
                let width = this.$refs.node.getBoundingClientRect().width
                this.$refs.copy.innerText = this.text // 文字副本填充
                let distance = 0 // 位移距离
                // 设置位移
                setInterval(() => {
                    distance = distance - 1
                    // 如果位移超过文字宽度，则回到起点
                    if (-distance >= width) {
                        distance = 16
                    }
                    this.$refs.box.style.transform = 'translateX(' + distance + 'px)'
                }, 20)
            }
        },
        // 把父组件传入的arr转化成字符串
        mounted: function () {
            for (let i = 0; i < this.lists.length; i++) {
                this.text += ' ' + this.lists[i]
            }
        },
        // 更新的时候运动
        updated: function () {
            this.move()
        }

    }
</script>
<style scoped>

    .wrap {
        overflow: hidden;
    }

    .box {
        width: 80000%;
    }

    .box div {
        float: left;
    }

    .marquee {
        margin: 0 16px 0 0;
    }

    .node {
        position: absolute;
        z-index: -99 !important;
        top: 0;
        white-space: nowrap;
        opacity: 0;
    }
</style>
