<template>
    <Carousel autoplay loop height="520px">
            <CarouselItem id="c1">
              <a href="javascript:;" >
                <div class="demo-carousel" id="i1" @click="detail(29)"></div>
              </a>
            </CarouselItem>
            <CarouselItem id="c2">
              <a href="javascript:;">
                <div class="demo-carousel" id="i2" @click="detail(1)"></div>
              </a>
            </CarouselItem>
            <CarouselItem id="c3">
              <a href="javascript:;">
                <div class="demo-carousel" id="i3" @click="detail(33)"></div>
              </a>
            </CarouselItem>
            <CarouselItem id="c4">
              <a href="javascript:;">
                <div class="demo-carousel" id="i4" @click="detail(34)"></div>
              </a>
            </CarouselItem>
    </Carousel>
</template>
<script>
export default {
    methods: {
      detail(id) {
      this.$router.push({ path: "/theater/detail", query: { id: id } });
    }
    }
}
</script>
<style lang="less" scoped>
    .ivu-layout-content {
        background-color: #fff;
    }

    #c1 {
        height: 100%;
        background: #072439 url('../../../assets/imgs/xunlonggaoshou.jpg') no-repeat 50%;
        background-size: auto 100%;
    }
    #i1 {
        height: 100%;
        background: url('../../../assets/imgs/xunlonggaoshou.png') no-repeat 50%;
        background-size: auto 100%;
    }

    #c2 {
        height: 100%;
        background: #487492 url('../../../assets/imgs/heyiweijia.jpg') no-repeat 50%;
        background-size: auto 100%;
    }
    #i2 {
        height: 100%;
        background: url('../../../assets/imgs/heyiweijia.png') no-repeat 50%;
        background-size: auto 100%;
    }

    #c3 {
        height: 100%;
        background: #072439 url('../../../assets/imgs/fantanfengbao.jpg') no-repeat 50%;
        background-size: auto 100%;
    }
    #i3 {
        height: 100%;
        background: url('../../../assets/imgs/fantanfengbao.png') no-repeat 50%;
        background-size: auto 100%;
    }

    #c4 {
        height: 100%;
        background: #072439 url('../../../assets/imgs/haishishenlou.jpg') no-repeat 50%;
        background-size: auto 100%;
    }
    #i4 {
        height: 100%;
        background: url('../../../assets/imgs/haishishenlou.png') no-repeat 50%;
        background-size: auto 100%;
    }
</style>
