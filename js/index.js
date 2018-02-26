const interval = 33

new Vue({
  el: 'section',
  data () {
    return {
      hourlyRate: 200,
      totalTime: 0,
      nPeople: 4,
      wasting: false
    }
  },
  methods: {
    start () {
      this.wasting = 
        setInterval(() => {
          this.totalTime += interval / 1000.0
        }, interval)
    },
    pause () {
      if (!this.wasting) {
        return
      }
      
      clearInterval(this.wasting)
      this.wasting = false
    }
  },
  computed: {
    timeUnit () {
      if (this.totalTime > 60) {
        return 'm'
      }
      
      if (this.totalTime > 3600) {
        return 'h'
      }
      
      return 's'
    },
    timeMultiplier () {
      switch (this.timeUnit) {
        case 'h':
          return 1/3600.0
        case 'm':
          return 1/60.0
      }
      return 1
    },
    time () {
      return (this.totalTime * this.timeMultiplier * this.nPeople).toFixed(1)
    },
    money () {
      return (this.totalTime * this.hourlyRate * this.nPeople / 3600.0).toFixed(2)
    },
    ratePerHour () {
      return (this.nPeople * this.hourlyRate).toFixed(2)
    },
    ratePerMinute () {
      return (this.ratePerHour / 60.0).toFixed(2)
    },
    ratePerSecond () {
      return (this.ratePerHour / 3600.0).toFixed(2)
    }
  }
});