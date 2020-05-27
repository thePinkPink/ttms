<template>
  <div id="detail">
    <div id="detailTop">
      <div id="detailTopContent" class="content">
        <div id="detailTopContentLeft">
          <img :src="item.movieImages">
        </div>

        <div id="detailTopContentCenter">
          <div style="font-size:16px;margin-top:55px;">
            <p style="font-size: 25px;font-weight: 600;">{{item.movieName}}</p>
            <p>{{item.language}} / {{item.movieTime}}分钟</p>
            <p>{{item.startTime}}大陆上映</p>
          </div>
          <div>
            <p>用户评分</p>
            <div>
              <div>
                <span style="font-size:16px;">{{item.star}}</span>
                <Rate disabled allow-half v-model="valueDisabled"/>
              </div>
              <p></p>
            </div>
            <p>累计票房</p>
            <p style="font-size:16px;">{{item.salesVolume}}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="detailContent" class="content">
      <div>
        <p class="title">介绍</p>
        <p style="margin:20px 0;">{{item.movieDesc}}</p>
      </div>
      <div>
        <p class="title">排片表</p>
        <Tabs type="card" style="margin:20px 0;">
          <TabPane label="今天">
            <Table :columns="columns1" :data="data1"></Table>
          </TabPane>
          <TabPane label="明天">
            <Table :columns="columns1" :data="data2"></Table>
          </TabPane>
          <TabPane label="后天">
            <Table :columns="columns1" :data="data3"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueDisabled: 2.5,
      item: {},
      columns1: [
        {
          title: '放映时间',
          key: 'time'
        },
        {
          title: '语言',
          key: 'language'
        },
        {
          title: '放映厅',
          key: 'studioName'
        },
        {
          title: '售价',
          key: 'price'
        },
        {
          title: '选座购票',
          key: 'active',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params.row)
                      this.$router.push({
                        path: '/theater/set',
                        query: {
                          id: params.row.id
                        }
                      })
                    }
                  }
                },
                '购票'
              )
            ])
          }
        }
      ],
      data1: [],
      data2: [],
      data3: [],
      response: {}
    }
  },
  mounted () {
    let _this = this

    //详情
    axios
      .get('http://manage.ptt.com/movie/query/' + this.$route.query.id)
      .then(function (response) {
        console.log(response)
        if (response.data.status == 1) {
          let date = new Date(response.data.startTime)
          date = date.toLocaleDateString().replace(/\//g, '-')
          response.data.startTime = date
          _this.item = response.data
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    //拍片
    axios
      .get('http://manage.ptt.com/schedule/query/list/' + _this.$route.query.id + '/0')
      .then(function (response) {
        console.log(response)
        if (response.status == 200) {
          console.log(response.data.lists)
          response.data.lists.forEach(element => {
            let time = new Date(element.schedule.startTime)
            let time2 = new Date(element.schedule.endTime)
            time =
              time.toLocaleDateString().replace(/\//g, '-') +
              ' ' +
              time.toTimeString().substr(0, 5)
            time = time.slice(5)
            time2 =
              time2.toLocaleDateString().replace(/\//g, '-') +
              ' ' +
              time2.toTimeString().substr(0, 5)
            time2 = time2.slice(5)
            let newData = {
              language: element.language,
              studioName: element.studio.studioName,
              price: element.schedule.newPrice,
              time: time + '-' + time2,
              id: element.schedule.scheduleId
            }
            _this.data1.push(newData)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    axios
      .get('http://manage.ptt.com/schedule/query/list/' + _this.$route.query.id + '/1')
      .then(function (response) {
        // console.log(response);
        if (response.status == 200) {
          console.log(response.data.lists)
          response.data.lists.forEach(element => {
            let time = new Date(element.schedule.startTime)
            let time2 = new Date(element.schedule.endTime)
            time =
              time.toLocaleDateString().replace(/\//g, '-') +
              ' ' +
              time.toTimeString().substr(0, 5)
            time = time.slice(5)
            time2 =
              time2.toLocaleDateString().replace(/\//g, '-') +
              ' ' +
              time2.toTimeString().substr(0, 5)
            time2 = time2.slice(5)
            let newData = {
              language: element.language,
              studioName: element.studio.studioName,
              price: element.schedule.newPrice,
              time: time + '-' + time2,
              id: element.schedule.scheduleId
            }
            _this.data2.push(newData)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    axios
      .get('http://manage.ptt.com/schedule/query/list/' + _this.$route.query.id + '/2')
      .then(function (response) {
        // console.log(response);
        if (response.status == 200) {
          console.log(response.data.lists)
          // _this.response = response.data.lists;
          response.data.lists.forEach(element => {
            let time = new Date(element.schedule.startTime)
            let time2 = new Date(element.schedule.endTime)
            time =
              time.toLocaleDateString().replace(/\//g, '-') +
              ' ' +
              time.toTimeString().substr(0, 5)
            time = time.slice(5)
            time2 =
              time2.toLocaleDateString().replace(/\//g, '-') +
              ' ' +
              time2.toTimeString().substr(0, 5)
            time2 = time2.slice(5)
            let newData = {
              language: element.language,
              studioName: element.studio.studioName,
              price: element.schedule.newPrice,
              time: time + '-' + time2,
              id: element.schedule.scheduleId
            }
            _this.data3.push(newData)
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  
  
  }
}
</script>
<style lang="less" scoped>
#detailTop {
  width: 100%;
  background: #392f59 url("../../../assets/imgs/detailTop.png") no-repeat 50%;
}
.content {
  width: 1320px;
  padding: 60px;
  margin: 0 auto;
  color: #333333;
}
#detailTopContent {
  padding: 14px;
  display: flex;
  //position: relative;
  //overflow: hidden;
  color: #fff;
}
#detailTopContentLeft img {
  width: 240px;
  border: 4px solid #fff;
}
#detailTopContentLeft {
  position: relative;
  top: 60px;
  z-index: 100;
}
#detailTopContentCenter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 25px;
}

#detailContent {
  font-size: 16px;
}
.title {
  font-size: 24px;
  font-weight: 500;
  border-left: 5px solid #333333;
  height: 28px;
  line-height: 28px;
  padding-left: 8px;
}
</style>
