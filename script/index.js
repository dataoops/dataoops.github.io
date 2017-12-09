window.onload = function () {


  var config = {
    apiKey: "AIzaSyAX4VeEkDtBBxBFiOLgfq64QLkjgjWyxnc",
    authDomain: "guuc-80f54.firebaseapp.com",
    databaseURL: "https://guuc-80f54.firebaseio.com",
    projectId: "guuc-80f54",
    storageBucket: "",
    messagingSenderId: "1097052603270"
  };
  var defaultApp = firebase.initializeApp(config);

  var database = firebase.database();

  firebase.database().ref('/conf').once('value').then(function(snapshot) {
    var json = snapshot.val();
    var speakers = Object.keys(json.speaker).map(function(speakerId){
      return json.speaker[speakerId];
    });
    var sessions = Object.keys(json.session).map(function(index){
      return json.session[index];
    });

    var speakerSection = new Vue({
      el: '#speaker-section',
      methods: {
        getImgUrl: function(name){
          return './image/' + name + '.png';
        }
      },
      data: {
        speakers: speakers
      }
    });

    var sessionSection = new Vue({
      el: '#session-section',
      data: {
        sessions: sessions
      }
    });


    // function getRatio(){
    //   var height = document.body.scrollHeight;
    //   var windowHeight = $(window).height();
    //   var current = $(window).scrollTop();
    //   return current/(height-windowHeight);
    // }
    // function getY(n){
    //   var ratio = getRatio();
    //   var windowHeight = $(window).height();
    //   return 'translateY(-' + windowHeight * ratio + 'px)'
    // }

    // var fragments = new Vue({
    //   el: '#fragments',
    //   data: function(){
    //     return {
    //       transform1: getY(1),
    //       transform2: getY(2),
    //       transform3: getY(3)
    //     }
    //   },
    //   methods: {
    //     handleScroll: function (event) {
    //       console.log(event)
    //       this.update();
    //     }
    //   },
    //   methods: {
    //     update: function(){
    //       console.log(2);
    //       this.transform1 = getY()
    //       this.transform2 = getY()
    //       this.transform3 = getY()
    //     }
    //   },
    //   mounted: function(){
    //     this.interval = setInterval(function () {
    //       this.update();
    //     }.bind(this), 1000); 
    //   }
  
    // });

  });







  function getTime(){
    var startAt = countdown(new Date(2017, 12, 22, 10, 20));
    var day = startAt.days
    var hour = startAt.hours < 10 ? '0' + startAt.hours : startAt.hours
    var dayHour = startAt.days == 0 && startAt.hours < 10 ? '0' + startAt.hours : startAt.days * 24 + startAt.hours
    var minute = startAt.minutes  < 10 ? '0' + startAt.minutes : startAt.minutes
    var second = startAt.seconds  < 10 ? '0' + startAt.seconds : startAt.seconds
    return { hour: dayHour, minute: minute, second: second };
  }

  Vue.component('hero-timer', {
    data: function(){
      return {
        time: getTime()
      }
    },
    methods: {
      update: function(){
        this.time = getTime();
      }
    },
    mounted: function(){
      this.interval = setInterval(function () {
        this.update();
      }.bind(this), 1000);
    },
    template: '<div class="numbers">{{time.hour}} : {{time.minute}}: {{time.second}}</div>'
  });
  var timer = new Vue({
    el: '#timer'
  });
}

var map;
var maru = { lat: 37.495485, lng: 127.038741 };
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: maru,
    zoom: 16
  });
  var marker = new google.maps.Marker({
    position: maru,
    map: map
  });
}
