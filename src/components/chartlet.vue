<template>
    <div>
        <div id="container"></div>
    </div>
</template>

<script>
    import * as THREE from "three"
    import OrbitControls from "three-orbitcontrols"

    var camera;
    var renderer;
    var scene;
    export default {
        name: "chartlet",
        mounted() {
            // 调用全景图函数
            this.$nextTick(() => {
                this.init();
                this.animate();
            })
        },
        methods: {
            init() {
                // 创建渲染器
                renderer = new THREE.WebGLRenderer({
                    antialias: true // 是否执行抗锯齿
                })
                console.log(1)
                var container = document.getElementById('container');
                renderer.setPixelRatio(window.devicePixelRatio);
                console.log(2)
                renderer.setSize(window.innerWidth, window.innerHeight) // 设置canvas宽高
                console.log(3)
                // 判断容器中子元素的长度
                let childs = container.childNodes;
                if (container.childNodes.length > 0) {
                    container.removeChild(childs[0]);
                    container.appendChild(renderer.domElement);
                } else {
                    container.appendChild(renderer.domElement);
                }
                console.log(4)
                // 创建一个场景
                scene = new THREE.Scene()
                console.log(5)
                // 创建一个透视相机
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
                console.log(6)
                var materials = []
                var urls = [require("../assets/all/right.jpg"), require("../assets/all/left.jpg"), require("../assets/all/top.jpg"), require("../assets/all/bottom.jpg"), require("../assets/all/front.jpg"), require("../assets/all/back.jpg")]
                console.log(7)
                // 循环创建立方体六个面的材质
                for (var i = 0; i < urls.length; i++) {
                    // 加载贴图
                    var texture = new THREE.TextureLoader().load(urls[i])
                    //
                    var material = new THREE.MeshBasicMaterial({
                        map: texture,
                        transparent: true,
                        opacity: 1
                    })
                    materials.push(material)
                }
                console.log(8)
                var size = 100 // 立方体的长宽高
                var skyBox = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), materials) // 创建一个立方体
                skyBox.geometry.scale(1, 1, -1) // 里外两侧的表面翻转
                scene.add(skyBox) // 添加立方体到场景中
                console.log(9)
                var controls = new OrbitControls(camera, renderer.domElement) // 创建相机控制器，用鼠标键盘来来控制相机
                console.log(10)
                controls.enableDamping = true // 使动画循环使用时阻尼或自转 意思是否有惯性
                controls.dampingFactor = 1 // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
                controls.enableZoom = true // 是否可以缩放
                controls.autoRotate = false // 是否自动旋转
                controls.minDistance = 10 // 设置相机距离原点的最近距离
                controls.maxDistance = 50 // 设置相机距离原点的最远距离
                controls.enablePan = false // 是否开启右键拖拽
                console.log(11)
            },
            animate() {
                renderer.render(scene, camera);
                requestAnimationFrame(this.animate);
            }
        },
    }
</script>

<style scoped>

</style>