(self.webpackChunkdoanchuyennganh=self.webpackChunkdoanchuyennganh||[]).push([[216],{741:(e,t,a)=>{var r,s=Object.create,l=Object.defineProperty,n=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,i=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,h=(e,t,a,r)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let s of o(t))p.call(e,s)||s===a||l(e,s,{get:()=>t[s],enumerable:!(r=n(t,s))||r.enumerable});return e},c=(e,t,a)=>(((e,t,a)=>{t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a})(e,"symbol"!==typeof t?t+"":t,a),a),d={};((e,t)=>{for(var a in t)l(e,a,{get:t[a],enumerable:!0})})(d,{default:()=>P}),e.exports=(r=d,h(l({},"__esModule",{value:!0}),r));var y=((e,t,a)=>(a=null!=e?s(i(e)):{},h(!t&&e&&e.__esModule?a:l(a,"default",{value:e,enumerable:!0}),e)))(a(791)),u=a(135),m=a(365);class P extends y.Component{constructor(){super(...arguments),c(this,"callPlayer",u.callPlayer),c(this,"playerID",this.props.config.playerId||"".concat("twitch-player-").concat((0,u.randomString)())),c(this,"mute",(()=>{this.callPlayer("setMuted",!0)})),c(this,"unmute",(()=>{this.callPlayer("setMuted",!1)}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e,t){const{playsinline:a,onError:r,config:s,controls:l}=this.props,n=m.MATCH_URL_TWITCH_CHANNEL.test(e),o=n?e.match(m.MATCH_URL_TWITCH_CHANNEL)[1]:e.match(m.MATCH_URL_TWITCH_VIDEO)[1];t?n?this.player.setChannel(o):this.player.setVideo("v"+o):(0,u.getSDK)("https://player.twitch.tv/js/embed/v1.js","Twitch").then((t=>{this.player=new t.Player(this.playerID,{video:n?"":o,channel:n?o:"",height:"100%",width:"100%",playsinline:a,autoplay:this.props.playing,muted:this.props.muted,controls:!!n||l,time:(0,u.parseStartTime)(e),...s.options});const{READY:r,PLAYING:i,PAUSE:p,ENDED:h,ONLINE:c,OFFLINE:d,SEEK:y}=t.Player;this.player.addEventListener(r,this.props.onReady),this.player.addEventListener(i,this.props.onPlay),this.player.addEventListener(p,this.props.onPause),this.player.addEventListener(h,this.props.onEnded),this.player.addEventListener(y,this.props.onSeek),this.player.addEventListener(c,this.props.onLoaded),this.player.addEventListener(d,this.props.onLoaded)}),r)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){this.callPlayer("pause")}seekTo(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("seek",e),t||this.pause()}setVolume(e){this.callPlayer("setVolume",e)}getDuration(){return this.callPlayer("getDuration")}getCurrentTime(){return this.callPlayer("getCurrentTime")}getSecondsLoaded(){return null}render(){return y.default.createElement("div",{style:{width:"100%",height:"100%"},id:this.playerID})}}c(P,"displayName","Twitch"),c(P,"canPlay",m.canPlay.twitch),c(P,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerTwitch.0457f442.chunk.js.map