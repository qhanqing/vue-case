<template>
    <div class="hello">
        <button id="btn1" class="btn btn-primary" @click="cut()" style="margin-bottom:20px;">切换场景1</button>
        <button id="btn2" class="btn btn-warning" style="margin-bottom:20px;">切换场景2</button>

        <div id="container"></div>
    </div>
</template>

<script>
    import * as THREE from "three"

    var camera;
    var renderer;
    var scene;
    export default {
        name: 'HelloWorld',
        data() {
            return {
                bigImg: require("./360.jpg"),//全景图图片路径
            }
        },
        mounted() {
            // 调用全景图函数
            this.$nextTick(() => {
                this.init();
                this.animate();
            })
        },
        methods: {
            cut() {
                // 调用全景图函数
                this.$nextTick(() => {
                    this.init();
                    this.animate();
                })
            },
            // 全景图配置函数---------------
            init() {
                var container = document.getElementById('container');
                // 创建渲染器
                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                // 设置画布的宽高
                renderer.setSize(window.innerWidth, window.innerHeight);
                // 判断容器中子元素的长度
                let childs = container.childNodes;
                if (container.childNodes.length > 0) {
                    container.removeChild(childs[0]);
                    container.appendChild(renderer.domElement);
                } else {
                    container.appendChild(renderer.domElement);
                }
                //   container.appendChild(renderer.domElement);
                // 创建场景
                scene = new THREE.Scene();
                // 创建相机
                camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
                camera.position.set(0, 0, 0);
                var material = new THREE.MeshBasicMaterial();//材质
                var texture = new THREE.TextureLoader().load(this.bigImg);
                material.map = texture;
                var skyBox = new THREE.Mesh(
                    new THREE.SphereBufferGeometry(100, 100, 100),
                    material
                );
                skyBox.geometry.scale(1, 1, -1);
                scene.add(skyBox);
                window.addEventListener('resize', this.onWindowResize, false);
                var bMouseDown = false;
                var x = -1;
                var y = -1;
                // 添加鼠标事件
                container.onmousedown = function (event) {
                    event.preventDefault();//取消默认事件
                    x = event.clientX;
                    y = event.clientY;
                    bMouseDown = true;
                }
                container.onmouseup = function (event) {
                    event.preventDefault();
                    bMouseDown = false;
                }
                container.onmousemove = function (event) {
                    event.preventDefault();
                    if (bMouseDown) {
                        skyBox.rotation.y += -0.005 * (event.clientX - x);
                        skyBox.rotation.x += -0.005 * (event.clientY - y);
                        if (skyBox.rotation.x > Math.PI / 2) {
                            skyBox.rotation.x = Math.PI / 2
                        }
                        if (skyBox.rotation.x < -Math.PI / 2) {
                            skyBox.rotation.x = -Math.PI / 2
                        }
                        x = event.clientX;
                        y = event.clientY;
                    }
                }
                container.onmousewheel = function (event) {
                    event.preventDefault();
                    if (event.wheelDelta != 0) {
                        camera.fov += event.wheelDelta > 0 ? 1 : -1;
                        if (camera.fov > 150) {
                            camera.fov = 150;
                        } else if (camera.fov < 30) {
                            camera.fov = 30;
                        }
                        camera.updateProjectionMatrix();
                    }
                }
            },
            onWindowResize() {
                // 窗口缩放的时候,保证场景也跟着一起缩放
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            },
            animate() {
                requestAnimationFrame(this.animate); // 循环渲染
                //执行渲染动作
                renderer.render(scene, camera);// 渲染场景
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
