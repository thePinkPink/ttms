<template>
  <div>
    <div class="content">
      <Steps id="steps" :current="current">
        <Step title="选择影片场次"></Step>
        <Step title="选择座位"></Step>
        <Step title="已选择"></Step>
        <Step title="影院取票观影"></Step>
      </Steps>
      <div v-show="current==0">
        <div></div>
        <Button type="primary" @click="next()">Next step</Button>
      </div>
      <div v-show="current==1">
        <div id="chooseSaet">
          <div id="chooseSaetLeft">
            <div id="rowBox">
              <div class="row" style="width:100%;" v-for="row in seatList.row">{{row}}</div>
            </div>
            <div id="seats" style="flex:1;">
              <div style="display:flex;justify-content: center;">
                <div style="margin-right:20px;">
                  <svg class="icon seat" style="vertical-align: middle;margin-right:10px;">
                    <use xlink:href="#iconkexuanzuobiankuang"></use>
                  </svg>
                  <span>未选择</span>
                </div>
                <div style="margin-right:20px;">
                  <svg
                    class="icon seat"
                    style="vertical-align: middle;margin-right:10px;color:rgb(109, 189, 0)"
                  >
                    <use xlink:href="#iconkexuanzuobiankuang"></use>
                  </svg>
                  <span>已选择</span>
                </div>
                <div>
                  <svg
                    class="icon seat"
                    style="vertical-align: middle;margin-right:10px;color:rgb(240, 78, 57)"
                  >
                    <use xlink:href="#iconkexuanzuobiankuang"></use>
                  </svg>
                  <span>已售出</span>
                </div>
              </div>
              <div id="screen">荧幕中央</div>
              <div style=" display:flex; flex-wrap: wrap;">
                <div v-for="item in tickets" class="seat" :style="seatStatus[item.status]">
                  <svg class="icon" aria-hidden="true" @click="choose(item)">
                    <use xlink:href="#iconkexuanzuobiankuang"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div id="chooseSaetRight">
            <div style="display:flex;">
              <img :src="movie.movieImages">
              <div style="margin-left:20px;">
                <p
                  style="font-size: 20px;font-weight: 700;color: #333;margin: 0 0 14px;"
                >{{movie.movieName}}</p>
                <p>
                  <span class="title">时长 :</span>
                  {{movie.movieTime}}分钟
                </p>
                <p>
                  <span class="title">导演 :</span>
                  {{movie.movieDirect}}
                </p>
                <p>
                  <span class="title">演员 :</span>
                  {{movie.moviePerformer}}
                </p>
              </div>
            </div>
            <div>
              <p style="margin-top:20px;">
                <span class="title">影厅 :</span>
                {{studio.studioName}}
              </p>
              <p style="margin-top:10px;">
                <span class="title">语言 :</span>
                {{movie.language}}
              </p>
              <p style="margin-top:10px;">
                <span class="title">场次 :</span>
                {{response.startTime}}
              </p>
              <p style="margin-top:10px;">
                <span class="title">票价 :</span>
                ￥{{response.newPrice}}/张
              </p>
            </div>
            <div
              style="margin:20px 0;padding:20px 0;border-top: 1px dashed #e5e5e5;border-bottom: 1px dashed #e5e5e5;"
            >
              <p style="height:80px;">
                <span class="title">座位：</span>
                <Tag
                  v-for="item in chooseTicket"
                  type="border"
                >{{item.seat.row}}行 {{item.seat.column}}列</Tag>
              </p>
              <p>
                <span class="title">总价 :</span>
                {{sum}}
              </p>
            </div>
            <Button type="primary" @click="next()">确认选座</Button>
          </div>
        </div>
      </div>
      <div v-show="current==2">
        <div style="margin: 0 auto; ">
          <div>
            <span style="font-size:30px;">请在 5 分钟内完成付款，如超时系统将自动释放已选座位。</span>
            <span style="font-size:30px;color:#2d8cf0">{{m}}分{{s}}秒</span>
          </div>
          <div id="chooseSaetRight" style="display:flex;">
            <div>
              <img :src="movie.movieImages">
              <div style="margin-left:20px;">
                <p
                  style="font-size: 20px;font-weight: 700;color: #333;margin: 0 0 14px;"
                >{{movie.movieName}}</p>
                <p>
                  <span class="title">时长 :</span>
                  {{movie.movieTime}}分钟
                </p>
                <p>
                  <span class="title">导演 :</span>
                  {{movie.movieDirect}}
                </p>
                <p>
                  <span class="title">演员 :</span>
                  {{movie.moviePerformer}}
                </p>
              </div>
            </div>

            <div>
              <p style="margin-top:20px;">
                <span class="title">影厅 :</span>
                {{studio.studioName}}
              </p>
              <p style="margin-top:10px;">
                <span class="title">语言 :</span>
                {{movie.language}}
              </p>
              <p style="margin-top:10px;">
                <span class="title">场次 :</span>
                {{response.startTime}}
              </p>
              <p style="margin-top:10px;">
                <span class="title">票价 :</span>
                ￥{{response.newPrice}}/张
              </p>
            </div>
          </div>
          <div
            style="margin:20px 0;padding:20px 0;border-top: 1px dashed #e5e5e5;border-bottom: 1px dashed #e5e5e5;"
          >
            <p style="height:80px;">
              <span class="title">订单号：{{orderId}}</span>
            </p>
            <p style="height:80px;">
              <span class="title">座位：</span>
              <Tag
                v-for="item in chooseTicket"
                type="border"
              >{{item.seat.row}}行 {{item.seat.column}}列</Tag>
            </p>
            <p>
              <span class="title">总价 :</span>
              {{sum}}
            </p>
          </div>
        </div>
        <Button type="primary" @click="next2()">确认支付</Button>
      </div>
      <div v-show="current==3">
        <div style="margin:0 auto;font-size:30px;color:#2d8cf0">支付成功！</div>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      current: 1,
      seatList: {},
      tickets: {},
      movie: {},
      studio: {},
      response: {},
      chooseTicket: [],
      sum: 0,
      time: 0,
      m: 4,
      s: 59,
      orderId: {}
      // seatStatus,
      // seatSize
    }
  },
  computed: {
    seatStatus () {
      var seatSize = 100 / this.studio.colsCount + '%';
      return {
        0: { opacity: 0, flex: seatSize },
        1: { flex: seatSize },
        2: { color: 'rgb(109, 189, 0)', flex: seatSize },
        3: { color: 'rgb(240, 78, 57)', flex: seatSize }
      }
    }
  },
  mounted () {
    let _this = this
    axios
      .get(
        'http://manage.ptt.com/schedule/query/' + this.$route.query.id
      )
      .then(function (response) {
        console.log(response)
        _this.movie = response.data.movie
        _this.response = response.data
        _this.tickets = response.data.tickets
        _this.studio = response.data.studio
        let time = new Date(response.data.startTime)
        time =
          time.toLocaleDateString().replace(/\//g, '-') +
          ' ' +
          time.toTimeString().substr(0, 5)
        _this.$set(_this.response, 'startTime', time)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    next () {
      console.log(12)
      let _this = this
      let ticketIds = []
      let orderLists = []
      this.chooseTicket.forEach(element => {
        console.log(this.movie)
        ticketIds.push(element.ticketId)
        orderLists.push({
          ticketId: element.ticketId,
          movieName: this.movie.movieName,
          movieImg: this.movie.movieImages,
          language: this.movie.language,
          movieTimes: this.movie.movieTime,
          row: element.seat.row,
          column: element.seat.column
        })
      })
      //console.log(orderLists);
      axios
        .post('http://manage.ptt.com/ticket/check', ticketIds)
        .then(function (response) {
          console.log(response)
          if (response.data.code == 1) {
            console.log(_this.$store.state.user.nowUser.userId)
            axios
              .post('http://order.ptt.com/order/save', {
                userId: _this.$store.state.user.nowUser.userId,
                totalPrice: _this.sum,
                orderItems: orderLists
              })
              .then(function (response) {
                console.log(response)
                _this.orderId = response.data
              })
              .catch(function (error) {
                console.log(error)
              })

            _this.current++

            let myVar = setInterval(function () {
              countDown()
            }, 1000)
            console.log(myVar)
            function countDown () {
              if (_this.m == 0 && _this.s == 0) {
                console.log(1)
                stop()
              } else if (_this.m >= 0) {
                if (_this.s > 0) {
                  _this.s--
                } else if (_this.s == 0) {
                  _this.m--
                  _this.s = 59
                }
              }
            }
            function stop () {
              clearInterval(myVar)
            }
          } else if (response.data.code == '3') {
            _this.$Message.error('锁票失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      console.log(ticketIds)
      //this.current++;
    },
    next2 () {
      let _this = this
      axios
        .get('http://order.ptt.com/order/update/' + _this.orderId + '/2')
        .then(function (response) {
          console.log(response)
          if (response.data.status == 200) {
            _this.current++
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    choose (item) {
      if (item.status == 1) {
        item.status = 2
        this.chooseTicket.push(item)
        this.sum += this.response.newPrice
      } else if (item.status == 2) {
        item.status = 1
        this.sum -= this.response.newPrice
        this.chooseTicket = this.chooseTicket.filter(element => {
          return element.ticketId != item.ticketId
        })
      }
    },
    countDown () {
      if (this.m == 0 && this.s == 0) {
        alert('倒计时结束')
      } else if (this.m >= 0) {
        if (this.s > 0) {
          this.s--
        } else if (this.s == 0) {
          this.m--
          this.s = 59
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 1320px;
  padding: 60px;
  margin: 0 auto;
  background-color: #fff;
}
#steps {
  margin-bottom: 50px;
}
#chooseSaet {
  display: flex;
}
#chooseSaetLeft {
  display: flex;
  flex: 1;
}
#rowBox {
  width: 20px;
  margin-top: 132px;
  display: flex;
  flex-wrap: wrap;
}
.row {
  height: 40px;
  line-height: 40px;
}
#seats {
  padding: 0 50px;
  margin: 0 50px;
}
#screen {
  width: 100%;
  height: 25px;
  line-height: 20px;
  text-align: center;
  margin: 50px auto 20px;
  border: 2px solid gainsboro;
}
.seat {
  font-size: 30px;
  text-align: center;
}
.seatChoose {
  color: green;
}
// #seats .seat {
//   margin-bottom: 10px;
// }

#chooseSaetRight {
  width: 380px;
  background-color: #f9f9f9;
  padding: 20px;
}
#chooseSaetRight img {
  width: 115px;
  height: 158px;
  border: 2px solid #fff;
  box-shadow: 0 2px 7px 0 hsla(0, 0%, 53%, 0.5);
}
.title {
  color: #999;
}
</style>
