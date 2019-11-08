<h1>历史时间线</h1>

<a href="http://gonnavis.com/timeline/" target="_blank">在线演示</a>
&nbsp;
<a href="http://gonnavis.com/timeline/twha/" target="_blank">在线演示twha版</a>

<!-- <img src="http://gonnavis.com/timeline/preview2.png"> -->
<img src="https://raw.githubusercontent.com/gonnavis/Timeline/master/other/screenshoot.png">
<img src="https://raw.githubusercontent.com/gonnavis/Timeline/master/other/screenshoot_2.jpg">
<img src="https://raw.githubusercontent.com/gonnavis/Timeline/master/other/screenshoot_twha.jpg">

<h3>简介</h3>
<p>自动排列，直观地显示各个历史时间段。</p>

<h3>运行</h3>
<p>
  npm install<br>
  npm run dev<br>
  http://localhost:8080/<br>
</p>

<h3>编译</h3>
<p>
  npm run build<br>
  删除 dist/ 里的 lib/ 和 twha/ 文件夹<br>
  然后提取 index.html favicon.png dist/ static/ 即可 <br>
</p>

<h3>计划开发功能</h3>
<p>用河流图直观地同时显示时间和面积信息，完善标尺，时间段嵌套，自定义／上传时间段。 </p>

<h3>The World Historical Atras (twha) 项目代码</h3>
<p>果然已经有人整理了所有年代的历史地图并做成了网页, 不需要自己再搞一遍了，<a href="http://x768.com/w/twha.ja" target="_blank">官网</a>，奇怪的是并没有放到线上, 因此稍微改了改优化了下操作方式放到了线上 http://gonnavis.com/timeline/twha/ 目前只支持pc</p>
<p>代码放在本项目的 twha 文件夹下</p>

<h3>备注</h3>
<p>
  目前使用 vue2 开发<br>
  之前的 angular2 版 git SHA-1: b2bbf00d95ac24568e1941da56a91884b95edc8d<br>
  之前的 angular1 版 git SHA-1: b5372193ab1ff344b9bd0d3dabb2e3339b436269
</p>

<h3>地图编辑模式(暂时弃用，因为目前使用图片地图而非路径地图，后续适时继续开发)</h3>
<p>
  http://localhost:8080/?is_edit=true<br>
  点击框选边界<br>
  控制台执行:  JSON.stringify({boundary :smap.vec3s_boundary_dot,camera_position: smap.camera.position,})<br>
  将结果复制粘贴入 src/components/data.js 中对应朝代的 map 属性内<br>
</p>

