<template>
  <div class="signHandle">
    <canvas ref="signHandle" class="canvas" />
    <div>
      <van-button size="mini" @touchstart="clearHandle">清空</van-button>
      <van-button type="info" size="mini" @touchstart="saveImg">确认</van-button>
    </div>
  </div>
</template>

<script>
// 解构设备的宽度, 和 高度
export default {
  name: 'Signature',
  data() {
    return {
      el: '', // canvas dom
      ctx: '', // canvas context
      background: '#fff', // canvas background-color 白色
      color: '#000', // 绘制时线条的颜色
      linewidth: 3, // 线条的宽度
    }
  },
  created() {
  },
  mounted() {
    this.draw()
  },
  methods: {
    // 添加绘制 line
    draw() {
      document.addEventListener('touchmove', e => e.preventDefault(), {
        passive: false
      })
      this.el = this.$refs.signHandle
      this.initCanvas()
    },
    // 初始化canvas配置
    initCanvas() {
      this.ctx = this.el.getContext('2d')
      this.ctx.fillStyle="#FFF";
      this.ctx.fillRect( 0, 0, 500, 500 );
      // 设置背景色
      this.ctx.fillStyle = this.background
      // 设置线条颜色
      this.ctx.strokeStyle = this.color
      // 设置线宽
      this.ctx.lineWidth = this.linewidth
      // 设置线条两头的结束点和开始点是圆形的
      this.ctx.lineCap = 'round'
      this.drawStart()
      this.drawing()
      this.drawEnd()
    },
    // 开始绘制
    drawStart() {
      this.el.addEventListener('touchstart',e => {
        this.ctx.beginPath()
        this.ctx.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
      },false)
    },
    // 绘制中
    drawing() {
      this.el.addEventListener('touchmove',e => {
        this.ctx.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        this.ctx.stroke()
      },false)
    },
    // 绘制结束
    drawEnd() {
      this.el.addEventListener('touchend', () => this.ctx.closePath(), false)
    },
    // 清空
    clearHandle() {
      this.initCanvas()
    },
    // 保存信息
    saveImg() {
      const imgBase64 = this.el.toDataURL()
      console.log('保存签名成功' + imgBase64)
    }
  }
}
</script>

<style>
  .signHandle {
    /* width: 5rem; */
    position: relative;
    background-color: lightgray;
    .canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
