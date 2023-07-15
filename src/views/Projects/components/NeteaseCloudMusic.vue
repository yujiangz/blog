
<template>
    <section
        class="mx-auto sm:w-4/5 md:3/5 [&_a]:text-blue-500 text-sm leading-6 tracking-widest bg-slate-100/20 dark:bg-slate-600/30 p-8 rounded-lg">
        <h2 class="text-lg font-bold"># 网易云音乐</h2>
        <div>
            <div class="py-4 space-y-8 indent-8">
                <p>
                    <img src="@/assets/imgs/netease-cloud-music/06.png" class="block rounded-md shadow-md" />
                    该项目根据平板的网易云音乐 App 进行布局，改动一小部分。
                </p>

                <p>

                    你可以在<a href="https://zyzstudy.gitee.io/"> 网易云音乐 Vue3 </a>体验，数据为<a href="http://mockjs.com/"> mock
                    </a>生成，方便静态展示。
                </p>
                <p>
                    使用<a href="https://cn.vuejs.org/"> Vue3 </a>作为主要框架，其中的主视图使用<a href="https://router.vuejs.org/zh"> Vue
                        Router </a>，而子视图（滑动进入的视图）使用动态组件，达到自由跳转的目的。
                </p>

                <div class="clear-both">
                    <span>

                        目前已完成：
                    </span>
                    <ol class="pl-16 list-decimal indent-0">
                        <li>扫码登录</li>
                        <li>用户页、动态</li>
                        <li>歌单详情视口</li>
                        <li>评价视口：评价主展示区（未详细分类）</li>
                        <li>本地歌单管理：增、删</li>
                        <li>音乐控件
                            <ul class="pl-8 list-disc">
                                <li>基本控制：播放/暂停、上下曲、音量等</li>
                                <li>进度条同步与控制</li>
                                <li>歌词同步与控制</li>
                            </ul>
                        </li>
                        <li>发现页及其部分子页</li>
                    </ol>
                </div>


                <p>
                    支持小屏，最小屏到<i> iphone mini </i>，大屏未作 <i> max-width </i>限制，待修正。
                </p>

                <p class="clear-both">该项目中，你可以看到一些小 demo ，比如<a
                        href="https://element-plus.org/zh-CN/component/carousel.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95">
                        Element
                        Plus 的 Carousel 走马灯</a>，不直接使用，使用绝对定位实现：<code> W*(~~(length/2)-(index+active)%length)+50+'%'</code>
                </p>

                <p class="clear-both">
                    路由全局配置 loading ，子视口暂未处理。
                </p>

                <p class="clear-both">
                    为了方便测试，本地尽量<a href="http://mockjs.com/"> mock </a>一些数据，虽然当点击多个链接时，可能返回值是一样的，但这非常值得。也可以选择使用<a
                        href="https://github.com/Binaryify/NeteaseCloudMusicApi"> NeteaseCloudMusicApi
                    </a>，如果选择这样，在阅读完其使用方法后，只需要开启其服务即可，之后选择性的在项目文件夹<small> utils/mock
                    </small>中注释掉不想拦截的数据。

                </p>




                <p class="clear-both">你可以在<a href="https://github.com/yujiangz/netease-cloud-music.git"> netease-cloud-music
                    </a>看到更多细节。</p>


            </div>
            <div class="grid grid-flow-row-dense grid-cols-2 gap-4 ">
                <img src="@/assets/imgs/netease-cloud-music/01-1.png" class="block rounded-md" shadow-md />
                <img src="@/assets/imgs/netease-cloud-music/01.png" class="block rounded-md shadow-md" />
                <img src="@/assets/imgs/netease-cloud-music/02.png" class="block rounded-md shadow-md" />
                <img src="@/assets/imgs/netease-cloud-music/03.png" class="block rounded-md shadow-md" />

                <img src="@/assets/imgs/netease-cloud-music/04.png" class="block row-span-2 rounded-md shadow-md" />
                <img src="@/assets/imgs/netease-cloud-music/05.png" class="block row-span-2 rounded-md shadow-md" />
            </div>

        </div>
    </section>
</template>

<style scoped>
code {
    display: block;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: .2em;
}
</style>
