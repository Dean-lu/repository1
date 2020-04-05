<template>
  <div class="confirm-rent">
    <!-- <van-nav-bar :title="title" left-arrow :fixed="true" color="#FFB640" @click-left="onClickLeft" /> -->
     <div>
      <!-- 没有银行卡信息 -->
      <div v-if="is_show==='none'">
          <img class="addimg" @click="add" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADxCAYAAAAay1EJAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8zQ+RHo1hYWEwaVmhQYqOMhJKmMcqvzcybNzNq3szrvSfJVtkqSmz8WvAXsFXWShEpWVlYExum57x5UyOZe7v3fO73nnM691zwxrKKZlaFQMtZRnQ8HJibXwjUvOCjlVqZnrhi6iORyBQVx+c9Hsfedju5Kvv9O+qTqqmAp1Z4WNENS3hCeGrV0h3eEW5RMvGk8JlwlyEFCt85esLlV4fTLn87bMSio+BtEg6kf3HiFysZQxOWlxPUsitKqR7nJQ1qbnZGbLusNkyijBMmwCRjjDJAL0OyD9BNHz1yokJ8qBg/TV5iFdl11jBYJk0Giy5RVyS7KjYluiozy5rT/799NVP9fW72hjBUP9v2ewfUbENhy7a/jmy7cAy+J7jMlePzhzD4IfpWWQsegH8Dzq/KWmIXLjah9VGPG/Gi5JPlTaXg7RQa56H5BuoW3Z6V7jl5gNi6fNU17O1Dp/j7l34A1GVno4O/7IoAAAAJcEhZcwAACxMAAAsTAQCanBgAABIhSURBVHic7d17kF5lYcfxb5ZNijUXICEhXBeeI5cSR4LIpVwShIJUa4PVtF4Aa7lUASnSQQXttOgItAU7wUIRBpEWZACRGblXgRZa7gmOQcB5noCDYUkClFw0GJJN/3ied9nbu/ue855znnPe9/eZ2Zlsdvec3+6e3z7nPZfnTEI6hnWuB5gOTAbe3eTTfgO8DaxLjBkoK5sUZ1LsADI+69wUoA/YI7ztAswF5gCzgR2A7fHlfVfKxW8E1gH/B7wBrAZWAf3ASuBX4e2lxJhNbX4rUhCVuCKsc1OBeeFtf+APgL2B3YGeiNEABoCXgReA54DljbfEmA0xg4lKHIV1rheYDxwCHAq8H1/Y2GVNawD4JfA08BjwOLAsMWZz1FRdRiUugXVuMnAwcAxwFHAY8PtRQxXnt8CjwMPAT4AnEmPejhups6nEBbHO7QZ8GDgBOBqYFjdRNOuBB4F7gLsSY16OnKfjqMQ5ss7NA04Mb/Mjx6mqZ4AfAbcnxiyPHaYTqMRtss4lwKeATwL7Ro5TN88DPwBuSoyxscPUlUqcgXVuBvAXwCn417fSvseA64GbE2PWRs5SKypxCta5w4DTgcV07oGp2H4L3AJ8NzHm0dhh6kAlnoB1blv8rvLZ6HVu2ZYBS/Cj81uxw1SVStyEdW4W8AXgTPyVURLPauBfgSsTY16LHaZqVOIRwqmhvwVORbvMVbMRuAb4Z52qeodKHITyXgB8DpgSOY6MbxNwHfAtlVklxjo3F/gqcAYqb91sAq4GLk6M6Y8dJpauLXG44eB84FxgauQ40p4NwOXAP3XjDRldV+Jwz+3ngG8AO0WOI/l6Ffg6cF033SvdVSW2zh2KP8p5YOwsUqilwJmJMY/FDlKGrihxOF10CX4E7orvWdiKP/j1lU4/LdXxG7R17iT866VZsbNIFK8BX0qM+ffYQYrSsSUOp4yuAY6PnUUq4T7gtE48JVW3mSRaYp37K/z0MSqwNBwPLA/bRkfpqJHYOjcbuBb4k9hZpNJ+DJyaGLM6dpA8dEyJrXPHA9/HzwIpMpFVwCmJMffFDtKu2pc4zF/1LeA8OuD7kVJtBS4DLqjzPGC13uitc7sAt6Ib86U9jwKfSIxZGTtIFrU9sGWdW4g/qa8CS7sOA5aGbap2alli69w5+OlQdZ+v5GU28J9h26qVWu1Oh0ea/Bvwl7GzSEf7HvDXdXl0TW1KbJ2biZ/q9MjYWaQrPAycmBjzeuwgE6lFia1ze+EnH987dhbpKr8ETkiMWRE7yHgq/5rYOncQfjpTFVjKtjfwWNgGK6vSJbbOHYt/BMiOsbNI19oReDBsi5VU2RJb504E7kKzbkh8U4G7wjZZOZUssXXuU/iLODTnlVTFFODWsG1WSuVKbJ37DHADsE3sLCIjbAPcULUiV+ro9JACVyqXyAhbgJMTY26KHQQqVJbw100jsNRFZYpciRJb5xYBt6ECS71sAT6eGHNHzBDRS2ydOwa4Gx3EknrahL8g5IFYAaKW2Dp3IPAQMC1mDpE2rQcWJsYsjbHyaCW2zu2Jv49TM3FIJ1gFHJYY82LZK45yisk6twN+F1oFlk4xB7g7bNulKr3E4XbC24B9y163SMH2BW4L23hpYozEVwBHR1ivSBmOxm/jpSm1xNa5M4HTy1ynSASnh229FKUd2LLOHQE8AEwua50iEb0NfDAx5pGiV1RKia1zOwHL0KNEpbu8CsxPjHm1yJUUvjttndsGuBkVWLrPTsDNoQOFKeM18d8DC0pYj0gVLcB3oDCF7k5b547GTy1buVseRUo0ABybGPNgEQsvrMRhdsqfAbsUtQ6RGlkJvK+I2TOLHCGvQgUWadgFuLKIBRdS4nBv8CeKWLZIjS0uYlaQ3Henw+mk5cDMvJct0gFeB+bledqpiJH4KlRgkWZm4juSm1xLbJ37GLAoz2WKdKBFoSu5yG132jo3A3gOmJvXMkU6WD+wX2LM2nYX1JtDmIZvogIXqrc3z1/XxDZv3lzq+rrMXOAbwBfbXVAuI7F17gDgKTTRXWF6enrYs6+v1HW6FZV+jlgn2AIclBjzTDsLafs1sXVuErAEFVgkrW2AJaFDmeVxYOvP0TODRbI6kjavqWirxNa5bYGL21mGiHBp6FIm7Y7EZwF9bS5DpNv14buUSeYSW+e2Ay7M+vUiMswFoVOptTMSfxnItFIRGWV74PwsX5ipxNa5WbQx/IvImM4O3Uol60h8Hv7p6SKSn6n4bqWSusQahUUKdVba0TjLSHwOGoVFijIV37GWpSqxdW4qGoVFinZW6FpL0o7Ep6Ij0iJF2w7ftZa0XGLrXC8ph3kRyeycVuerTjMSfxRdnSVSlj7gT1v5xDQlPjtTFBHJqqXjTy2V2Dq3H7CwnTQiktrC0L1xtToS63GkIuWbRAvdm7DE1rnfA07OI5GIpHZy6GBTrYzEi4Ad8skjIintwAQHuFopsUZhkbhOGe+D45bYOjcbOD7XOCKS1nGhi2OaaCRejCbAE4mtF9/FMbVSYhGJL32JrXM7A4cXEkdE0jo8dHKU8Ubij03wcREpTw9wYrMPNNPSdZsiUpoxH1Y4ZonDw9EWFBpHRNJaELo5TLOR+FhgcrF5RCSlyfhuDtOsxH9cbBYRyWhUN5uV+LiCg4hINn808j9Gldg6tw+waylxRCSt3UJHB401Ei8sJ4uIZLRw6DsqsUj9LBz6zlglPqqcHCKS0bCODiuxda4PGPPSLhGpjJ1DV4HRI/Gh5WYRkYwOafxjZIk/UHIQEcnm4MY/Rpb4oJKDiEg2g10dLLF1bhIwP0ocEUlrfujssJF4L2BanDwiktI0YE8YXuJ5cbKISEbvheEl3j9SEBHJZn8YXuJ9mnyiiFTTPjC8xHtHCiIi2ewNw0v8nkhBRCSb90AosXVuOjAzahwRSWumdW56b3inL2aSsvT29k78SRXV01P+xKN1/nkBbN68OXaEMvQ1fksdPwlAT08Pe+y+e+wYtVL3n5dbsSJ2hDLs2vjz3vElFulQgyWeGzWGiGQ1t1HiOVFjiEhWcxolnhU1hohkNatRYp1eEqmnmY0Sbx81hohktX2jxNtFjSEiWc1olHhq1BgiktW0RomnRI0hIllNaZR41OMSRaQWZpR/Qa6I5EolFqm5HuucHiYuUmM9wJbYIUQku57EmIHYIUQkO70mFqm5Rom1Sy1ST1saJV4fNYaIZLW+UeKNUWOISFYbGyXeEDWGiGS1oVHitVFjiEhWaxslfiNqDBHJ6g2VWKTeBku8JmoMEclqTaPE/VFjiEhW/Y0Svxo1hohk1d94jMuvo8YoycBAvS8TL/t5THX/eXWJlY0Svxw1RgkGBgZ48aWXYsfIrKenhz37+kpdZ51/Xl3k5caf9peArRGDiEh6W4GXegASY94CXombR0RSeiUx5q2hL7JstCgikoWF4fcTvxApiIhk8wIML/FzkYKISDa/gOElXh4piIhk8ywML/GzkYKISDbDS5wY0w+sihZHRNJYFTo7aqK8ZRHCiEh6g10dWeKnSg4iItkMdnVkiR8rOYiIZDPY1ZElfrzkICKSzWBXh5U4MeY1dNGHSNU9H7oKjP0EiIdLDCMi6T0y9J2xSvxQOTlEJKOHhr4zVokfLCeHiGQ0rKOjSpwY8wq6ekukqp4NHR3UbL6X+0oIIyLpjepmsxLfU3AQEcnm7pH/0azED6MnJYpUzXpGHJmGJiVOjPkdcG/RiUQklXtDN4cZbw7UOwoMIyLpjdnJ8Up8FzCq9SISxe/wnRylaYkTY9YC9xeVSERSuT90cpSJHinwgwLCiEh6NzX7wEQl/jGwId8sIpLSBuDOZh8ct8SJMRuA2/NOJCKp3B66OKZWntB1fX5ZRCSD68f7YCsl/i9gRS5RRCStFfgONjVhiRNjBoBr80okIqlcGzrYVKsPvP0esKn9PCKSwiZ898bVUokTY15FB7hEynZ76N640jx6fkkbYUQkvZY613KJE2MeBZ7MHEdE0ngydG5CaUZigMsyhBGR9FruWtoS/xB4MeXXiEg6L+K71pJUJU6M2Qz8Y9pEIpLKpaFrLUk7EgN8H+jP8HUiMrF+4IY0X5C6xIkxG4FL036diLTk0tCxlmUZiQG+i0Zjkbz147uVSqYSh78UF2X5WhFp6qK0ozBkH4kBrgNsG18vIu+w+E6llrnEiTGbgAuzfr2IDHNh6FRq7YzEALeiZxqLtOtxfJcyaavEiTFbgXOBre0sR6SLbQXODV3KpN2RuHFN9Y3tLkekS93Y6jXSzfTmFOTLwEeB6TktT8YwMDDuveFSP+uA89tdyKQcggBgnfsb4Nt5LU+kC5ybGPMv7S6k7d3pIb4DLMtxeSKdbBm+M23LrcThgu3TgC15LVOkQ20BTktzk8N48hyJSYx5Grg8z2WKdKDLQ1dykWuJg78Dni9guSKd4Hl8R3KTe4kTY94CPot2q0VG2gJ8NnQkN0WMxCTGPA5cUsSyRWrsktCNXBVS4uAfgKcKXL5InTyJ70TucjtPPBbrnMEfSp9W5HpEKm49MD8xxhWx8CJHYkLozxe5DpEa+HxRBYaCSwyQGHMjcE3R6xGpqGtCBwpTeImDLwJLS1qXSFUsxW/7hSr0NfFQ1rk9gKeBmWWtUySi14H3J8b8qugVlTUSE76ZxUAul5qJVNhmYHEZBYYSSwyQGPMAfhIBkU52btjWS1Ha7vRQ1rkr0VFr6UxXJcZ8ocwVljoSD3E2cG+kdYsU5V78tl2qKCMxgHVuGvAQcGCsDCI5WgosTIxZX/aKo5UYwDo3B3gESGLmEGmTBY5IjFkVY+WxdqcBCN/0h9AjYaS++oEPxSowRC4xDF6aeRywJnYWkZTWAMcVeUllK6KXGCAxZjnwEWBt7CwiLVoLfCRsu1FFfU08knXuYOB+YEbsLCLjWIsfgZ+IHQQqVmJQkaXyKlVgqMju9FDhh3Mseo0s1bMGOLZKBYYKjsQN1rl5+JPnu8TOIgKsxB+Fjv4aeKTKlhjAOrcXcB86jyxxWfwu9Iuxg4ylcrvTQyXGrAAOR3N1STxPAYdXtcBQ8RIDJMasBhYCd0aOIt3nTvyllKtjBxlP5UsMkBjzG2ARsCR2FukaS4BFYdurtEq/Jh6Lde4M4Apgcuws0pHeBs5OjLk6dpBW1a7EANa5o4BbgDmxs0hHWYWfkeO/YwdJo5YlBrDO7QrcBhwSO4t0hMeBjyfG/Dp2kLRq8Zp4LOGHfRQ5PeNVutp3gKPqWGCo8Ug8lHXuz4Brge1iZ5FaeRM4NTHmh7GDtKMjSgyDU+LeiD+vLDKR/wE+XdaMlEWq7e70SOGXsQD4Ov4Io8hY3sZvIws6ocDQQSPxUNa5+cANwLzYWaRSlgMnJcY8EztInjpmJB4qMWYZcBBwERqVxW8DFwEHdVqBoUNH4qHC3VBXA38YO4tE8b/A6Ykxz8YOUpSOHImHCreOHQmcAbwROY6U5w387/zITi4wdMFIPJR1bhbwTeA0uuAPWJfagj/d+LXEmNdihylDV5W4wTr3PuAy4JjYWSRXPwXOS4z5WewgZerKEjdY5z4MXAy8N3YWacvPga8mxtwVO0gMXb1LGX7pBwAn4WdvkHqx+N/dAd1aYOjykXgo61wv8Gnga2g6oKqz+GMbNybGdP3zrlXiEUKZFwNfQbvZVfNz4BLgFpX3HSpxE9a5SfjnRH0JfwBMP6s4tgI/Ab4N3JsYszVynsrRhtmCcMHImcBngKmR43SLDcB/AFckxvwidpgqU4lTsM5Nx79uPg2YHzlOp1oGXIN/vbsudpg6UIkzCjdZnAJ8EpgdOU7drQZuAm4I171LCipxm8KBsGPwZV6EniHVqjeBO4CbgZ/qQFV2KnGOrHOTgQ8CJ+If1apH0Ay3Ej+X84+ABxJjdIdZDlTigoSj2wcAJ+Afon4YMCVqqPJtAh7FP+XyHuAZHV3On0pcEuvcu4Ej8E+zOAJ/v/O2MTMV4C38Y08eAR4CHqnD5Ot1pxJHYp2bgh+pDwY+gD/avR/QGzNXCpuB5/BHk58EnsCPtJuipupCKnGFhGLvB+wP7APsi78EdC/izeT5JrACf6nj88ALwLPAcypsNajENWGd2w7YDdgZf8BsNjAL2BFf8On4I+Pvwu+m94T/G2odMIDf7d2If+r9OnxR1wCv4U/3rAReAV5OjHmzyO9L2vf/oAMPCmIyOYgAAAAASUVORK5CYII=" alt="">
      </div>
      <!-- 有银行卡信息 -->
      <div v-if="is_show=='has'">
          <div class="card" v-for="(item, index) in cardArr" :key="index">
              <div class="cardno">{{item.bank_card_no}}</div>
              <!-- <div class="bank">{{item.bank}}</div> -->
          </div>
          <div class="btn" @click="add">
              添加银行卡
          </div>
      </div>
    </div>     
  </div>
</template>

<script>
export default {
  name: "Bank",
  data() {
    return {
      is_show: "has",
      title: "银行卡",
      cardArr:[]
      
    };
  },
  mounted() {
    document.title = "我的银行卡";
    this.init()
  },
  methods: {     
     onClickLeft() {
        this.$router.back(-1);
      },
      add(){
          this.$router.push({path:'/EditBank'})
      },
      change(){
          this.$router.push({path:'/EditBank'})
      },
    init(){
        var that=this;
        console.log(this.$store.state.global.api_token)
        
        let api_token=this.$store.state.global.api_token;
         this.$http.post(this.$store.state.global.baseUrl + "user/my_bankcard",{
           api_token:this.$store.state.global.api_token
         })
          //this.$http.post(this.$store.state.global.baseUrl + "user/my_bankcard?api_token=pZTgamT6LgVMCX4HDqtbDVRUwYvSsCfRaZmuTHXe8vqzO1SASMQ38oYCP6EFhTSrtC6KFu8qiB37RMHchlwk2W7mr7nEqR0v9a29")
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              let data=res.data.data;
              //todo 
              if(data.total==0){
                that.is_show='none'
              }else{
                that.cardArr=data.data
              }
            } else {
              that.$toast(res.data.msg);
            }
          } else {
            that.$toast("系统异常！");
          }
        });
    }
    
    
  }
};
</script>

<style scoped>
.confirm-rent {
  width: 100%;
  height: 100%;  
}
.confirm-rent .van-nav-bar .van-icon,
  .confirm-rent .van-nav-bar__title{
    color:#FFB640;
  }
  .confirm-rent .van-nav-bar{
    border-bottom: .11rem solid #f5f5f5;
  }
.addimg{
  width:120px;height:120px;
  margin:2.173913043rem auto 0 auto;
}
.btn {
  width: 6.763285024rem;
  height: 0.857487923rem;
  line-height: 0.857487923rem;
  color: white;
  background: #ffb640;
  font-size: 0.434782609rem;
  border-radius: 0.096618357rem;
  bottom: 1.183574879rem;
  display: block;
  margin: 0 auto;
  margin-top: 2.246376812rem;
}
.card:first-child{
 margin-top: 2.173913043rem;
}
.card{
  box-sizing: border-box;
  color:white;
  background:rgb(114, 113, 113);
  width:9.034rem;
  height:1.571014493rem;
  margin-left:0.483091787rem;
  margin-top:1rem;
  text-align:left;
  padding:0.483091787rem;
  font-size:0.483091787rem;
  position:relative;
  border-radius:0.096618357rem;
}
.bank{
  position:absolute;
  width:100%;
  left:0.483091787rem;
  bottom:0.483091787rem;
}

</style>
