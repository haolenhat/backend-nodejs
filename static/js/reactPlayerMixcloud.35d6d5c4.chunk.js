(self.webpackChunkdoanchuyennganh=self.webpackChunkdoanchuyennganh||[]).push([[667],{732:(e,t,r)=>{var o,n=Object.create,s=Object.defineProperty,a=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyNames,i=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,p=(e,t,r,o)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let n of l(t))u.call(e,n)||n===r||s(e,n,{get:()=>t[n],enumerable:!(o=a(t,n))||o.enumerable});return e},h=(e,t,r)=>(((e,t,r)=>{t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!==typeof t?t+"":t,r),r),c={};((e,t)=>{for(var r in t)s(e,r,{get:t[r],enumerable:!0})})(c,{default:()=>f}),e.exports=(o=c,p(s({},"__esModule",{value:!0}),o));var d=((e,t,r)=>(r=null!=e?n(i(e)):{},p(!t&&e&&e.__esModule?r:s(r,"default",{value:e,enumerable:!0}),e)))(r(791)),y=r(135),m=r(365);class f extends d.Component{constructor(){super(...arguments),h(this,"callPlayer",y.callPlayer),h(this,"duration",null),h(this,"currentTime",null),h(this,"secondsLoaded",null),h(this,"mute",(()=>{})),h(this,"unmute",(()=>{})),h(this,"ref",(e=>{this.iframe=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e){(0,y.getSDK)("https://widget.mixcloud.com/media/js/widgetApi.js","Mixcloud").then((e=>{this.player=e.PlayerWidget(this.iframe),this.player.ready.then((()=>{this.player.events.play.on(this.props.onPlay),this.player.events.pause.on(this.props.onPause),this.player.events.ended.on(this.props.onEnded),this.player.events.error.on(this.props.error),this.player.events.progress.on(((e,t)=>{this.currentTime=e,this.duration=t})),this.props.onReady()}))}),this.props.onError)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){}seekTo(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("seek",e),t||this.pause()}setVolume(e){}getDuration(){return this.duration}getCurrentTime(){return this.currentTime}getSecondsLoaded(){return null}render(){const{url:e,config:t}=this.props,r=e.match(m.MATCH_URL_MIXCLOUD)[1],o=(0,y.queryString)({...t.options,feed:"/".concat(r,"/")});return d.default.createElement("iframe",{key:r,ref:this.ref,style:{width:"100%",height:"100%"},src:"https://www.mixcloud.com/widget/iframe/?".concat(o),frameBorder:"0",allow:"autoplay"})}}h(f,"displayName","Mixcloud"),h(f,"canPlay",m.canPlay.mixcloud),h(f,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerMixcloud.35d6d5c4.chunk.js.map