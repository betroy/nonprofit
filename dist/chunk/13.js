/*! For license information please see 13.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"92":function(t,e,i){"use strict";i.r(e),i.d(e,"taro_video_control",(function(){return n})),i.d(e,"taro_video_core",(function(){return a})),i.d(e,"taro_video_danmu",(function(){return l}));var s=i(30),o=i(95);const formatTime=t=>{if(null===t)return"";const e=Math.round(t%60),i=Math.round((t-e)/60);return`${i<10?"0"+i:i}:${e<10?"0"+e:e}`},normalizeNumber=t=>Math.max(-1,Math.min(t,1)),throttle=(t,e)=>{let i=0;return function(){const s=Date.now();s-i>e&&(t.apply(this,arguments),i=s)}},r=function(){let t;const e=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]];let i=0;const s=e.length,o={};for(;i<s;i++)if(t=e[i],t&&t[1]in document){for(i=0;i<t.length;i++)o[e[0][i]]=t[i];return o}return o}(),n=class{"constructor"(t){Object(s.g)(this,t),this.visible=!1,this.isDraggingProgressBall=!1,this.percentage=0,this.progressDimentions={"left":0,"width":0},this.calcPercentage=t=>{let e=t-this.progressDimentions.left;return e=Math.max(e,0),e=Math.min(e,this.progressDimentions.width),e/this.progressDimentions.width},this.onDragProgressBallStart=()=>{this.isDraggingProgressBall=!0,this.hideControlsTimer&&clearTimeout(this.hideControlsTimer)},this.onClickProgress=t=>{t.stopPropagation();const e=this.calcPercentage(t.pageX);this.seekFunc(e*this.duration),this.toggleVisibility(!0)}}"onDocumentTouchMove"(t){if(!this.isDraggingProgressBall)return;const e=t.touches[0].pageX;this.percentage=this.calcPercentage(e),this.setProgressBall(this.percentage),this.setCurrentTime(this.percentage*this.duration)}"onDocumentTouchEnd"(){this.isDraggingProgressBall&&(this.isDraggingProgressBall=!1,this.seekFunc(this.percentage*this.duration),this.toggleVisibility(!0))}async"setProgressBall"(t){this.progressBallRef&&(this.progressBallRef.style.left=100*t+"%")}async"toggleVisibility"(t){const e=void 0===t?!this.visible:t;e?(this.hideControlsTimer&&clearTimeout(this.hideControlsTimer),this.isPlaying&&(this.hideControlsTimer=setTimeout(()=>{this.toggleVisibility(!1)},2e3)),this.controlsRef.style.visibility="visible"):this.controlsRef.style.visibility="hidden",this.visible=!!e}async"getIsDraggingProgressBall"(){return this.isDraggingProgressBall}async"setCurrentTime"(t){this.currentTimeRef.innerHTML=formatTime(t)}"render"(){const{"controls":t,"currentTime":e,"duration":i,"isPlaying":o,"pauseFunc":r,"playFunc":n,"showPlayBtn":a,"showProgress":l}=this,c=formatTime(i);let h;return h=a?o?Object(s.e)("div",{"class":"taro-video-control-button taro-video-control-button-pause","onClick":r}):Object(s.e)("div",{"class":"taro-video-control-button taro-video-control-button-play","onClick":n}):null,Object(s.e)(s.a,{"class":"taro-video-bar taro-video-bar-full"},t&&Object(s.e)("div",{"class":"taro-video-controls"},h,l&&Object(s.e)("div",{"class":"taro-video-current-time","ref":t=>this.currentTimeRef=t},formatTime(e)),l&&Object(s.e)("div",{"class":"taro-video-progress-container","onClick":this.onClickProgress},Object(s.e)("div",{"class":"taro-video-progress","ref":t=>{if(!t)return;const e=t.getBoundingClientRect();this.progressDimentions.left=e.left,this.progressDimentions.width=e.width}},Object(s.e)("div",{"class":"taro-video-progress-buffered","style":{"width":"100%"}}),Object(s.e)("div",{"class":"taro-video-ball","ref":t=>this.progressBallRef=t,"onTouchStart":this.onDragProgressBallStart,"style":{"left":(c?this.currentTime/i*100:0)+"%"}},Object(s.e)("div",{"class":"taro-video-inner"})))),l&&Object(s.e)("div",{"class":"taro-video-duration"},c)),Object(s.e)("slot",null))}get"controlsRef"(){return Object(s.d)(this)}},a=class{"constructor"(t){Object(s.g)(this,t),this.onPlay=Object(s.c)(this,"play",7),this.onPause=Object(s.c)(this,"pause",7),this.onEnded=Object(s.c)(this,"ended",7),this.onTimeUpdate=Object(s.c)(this,"timeupdate",7),this.onError=Object(s.c)(this,"error",7),this.onFullScreenChange=Object(s.c)(this,"fullscreenchange",7),this.onProgress=Object(s.c)(this,"progress",7),this.onLoadedMetaData=Object(s.c)(this,"loadedmetadata",7),this.currentTime=0,this.isDraggingProgress=!1,this.gestureType="none",this.controls=!0,this.autoplay=!1,this.loop=!1,this.muted=!1,this.initialTime=0,this.objectFit="contain",this.showProgress=!0,this.showFullscreenBtn=!0,this.showPlayBtn=!0,this.showCenterPlayBtn=!0,this.showMuteBtn=!1,this.danmuBtn=!1,this.enableDanmu=!1,this.enablePlayGesture=!1,this.enableProgressGesture=!0,this.vslideGesture=!1,this.vslideGestureInFullscreen=!0,this._enableDanmu=!1,this.isPlaying=!1,this.isFirst=!0,this.isFullScreen=!1,this.fullScreenTimestamp=(new Date).getTime(),this.isMute=!1,this.analyseGesture=t=>{var e;const i={"type":"none"},s=t.touches[0].screenX,o=t.touches[0].screenY,r=s-this.lastTouchScreenX,n=o-this.lastTouchScreenY,a=this.isFullScreen?this.vslideGestureInFullscreen:this.vslideGesture;if("none"===this.gestureType){if((l=r,c=n,Math.sqrt(Math.pow(l,2)+Math.pow(c,2)))<10)return i;if(Math.abs(n)>=Math.abs(r)){if(!a)return i;this.gestureType="adjustVolume",this.lastVolume=this.videoRef.volume}else if(Math.abs(n)<Math.abs(r)){if(!this.enableProgressGesture)return i;this.gestureType="adjustProgress",this.lastPercentage=this.currentTime/(null!==(e=this.duration)&&void 0!==e?e:this._duration)}}var l,c;return i.type=this.gestureType,i.dataX=normalizeNumber(r/200),i.dataY=normalizeNumber(n/200),i},this.handlePlay=()=>{this.isPlaying=!0,this.isFirst=!1,this.controlsRef.toggleVisibility(!0),this.onPlay.emit()},this.handlePause=()=>{this.isPlaying=!1,this.controlsRef.toggleVisibility(!0),this.onPause.emit()},this.handleEnded=()=>{this.isFirst=!0,this.pause(),this.controlsRef.toggleVisibility(),this.onEnded.emit()},this.handleTimeUpdate=throttle(async t=>{var e,i;this.currentTime=this.videoRef.currentTime;const s=this.duration||this._duration,o=await this.controlsRef.getIsDraggingProgressBall();this.controls&&this.showProgress&&(o||this.isDraggingProgress||(this.controlsRef.setProgressBall(this.currentTime/s),this.controlsRef.setCurrentTime(this.currentTime))),this.danmuRef.tick(this.currentTime),this.onTimeUpdate.emit({"duration":null===(e=t.target)||void 0===e?void 0:e.duration,"currentTime":null===(i=t.target)||void 0===i?void 0:i.currentTime}),this.duration&&this.currentTime>=this.duration&&(this.seek(0),this.handleEnded())},250),this.handleError=t=>{var e,i;this.onError.emit({"errMsg":null===(i=null===(e=t.target)||void 0===e?void 0:e.error)||void 0===i?void 0:i.message})},this.handleDurationChange=()=>{this._duration=this.videoRef.duration},this.handleProgress=()=>{this.onProgress.emit()},this.handleLoadedMetaData=t=>{const e=t.target;this.onLoadedMetaData.emit({"width":e.videoWidth,"height":e.videoHeight,"duration":e.duration})},this._play=()=>this.videoRef.play(),this._pause=()=>this.videoRef.pause(),this._stop=()=>{this.videoRef.pause(),this._seek(0)},this._seek=t=>{this.videoRef.currentTime=t},this.onTouchStartContainer=t=>{this.lastTouchScreenX=t.touches[0].screenX,this.lastTouchScreenY=t.touches[0].screenY},this.onClickContainer=()=>{if(this.enablePlayGesture){const t=Date.now();t-this.lastClickedTime<300&&(this.isPlaying?this.pause():this.play()),this.lastClickedTime=t}this.controlsRef.toggleVisibility()},this.onClickFullScreenBtn=t=>{t.stopPropagation(),this.toggleFullScreen()},this.handleFullScreenChange=t=>{const e=(new Date).getTime();!t.detail&&this.isFullScreen&&!document[r.fullscreenElement]&&e-this.fullScreenTimestamp>100&&this.toggleFullScreen(!1)},this.toggleFullScreen=(t=!this.isFullScreen)=>{this.isFullScreen=t,this.controlsRef.toggleVisibility(!0),this.fullScreenTimestamp=(new Date).getTime(),this.onFullScreenChange.emit({"fullScreen":this.isFullScreen,"direction":"vertical"}),this.isFullScreen&&!document[r.fullscreenElement]&&setTimeout(()=>{this.videoRef[r.requestFullscreen]({"navigationUI":"show"})},0)},this.toggleMute=t=>{t.stopPropagation(),this.videoRef.muted=!this.isMute,this.controlsRef.toggleVisibility(!0),this.isMute=!this.isMute},this.toggleDanmu=t=>{t.stopPropagation(),this.controlsRef.toggleVisibility(!0),this._enableDanmu=!this._enableDanmu}}"componentWillLoad"(){this._enableDanmu=this.enableDanmu}"componentDidLoad"(){this.initialTime&&(this.videoRef.currentTime=this.initialTime),this.danmuRef.sendDanmu(this.danmuList),document.addEventListener&&document.addEventListener(r.fullscreenchange,this.handleFullScreenChange)}"componentDidRender"(){}"disconnectedCallback"(){document.removeEventListener&&document.removeEventListener(r.fullscreenchange,this.handleFullScreenChange)}"watchEnableDanmu"(t){this._enableDanmu=t}async"onDocumentTouchMove"(t){if(void 0===this.lastTouchScreenX||void 0===this.lastTouchScreenY)return;if(await this.controlsRef.getIsDraggingProgressBall())return;const e=this.analyseGesture(t);if("adjustVolume"===e.type){this.toastVolumeRef.style.visibility="visible";const t=Math.max(Math.min(this.lastVolume-e.dataY,1),0);this.videoRef.volume=t,this.toastVolumeBarRef.style.width=100*t+"%"}else if("adjustProgress"===e.type){this.isDraggingProgress=!0,this.nextPercentage=Math.max(Math.min(this.lastPercentage+e.dataX,1),0),this.controls&&this.showProgress&&(this.controlsRef.setProgressBall(this.nextPercentage),this.controlsRef.toggleVisibility(!0));const t=this.duration||this._duration;this.toastProgressTitleRef.innerHTML=`${formatTime(this.nextPercentage*t)} / ${formatTime(t)}`,this.toastProgressRef.style.visibility="visible"}}"onDocumentTouchEnd"(){var t;"adjustVolume"===this.gestureType?this.toastVolumeRef.style.visibility="hidden":"adjustProgress"===this.gestureType&&(this.toastProgressRef.style.visibility="hidden"),this.isDraggingProgress&&(this.isDraggingProgress=!1,this.seek(this.nextPercentage*(null!==(t=this.duration)&&void 0!==t?t:this._duration))),this.gestureType="none",this.lastTouchScreenX=void 0,this.lastTouchScreenY=void 0}async"play"(){this._play()}async"pause"(){this._pause()}async"stop"(){this._stop()}async"seek"(t){this._seek(t)}async"requestFullScreen"(){this.toggleFullScreen(!0)}async"exitFullScreen"(){this.toggleFullScreen(!1)}"render"(){const{"src":t,"controls":e,"autoplay":i,"loop":r,"muted":n,"poster":a,"objectFit":l,"isFirst":c,"isMute":h,"isFullScreen":d,"duration":u,"_duration":g,"showCenterPlayBtn":A,"isPlaying":b,"_enableDanmu":m,"showMuteBtn":p,"danmuBtn":v,"showFullscreenBtn":y}=this,f=formatTime(u||g||null);return Object(s.e)(s.a,{"class":Object(o.a)("taro-video-container",{"taro-video-type-fullscreen":d}),"onTouchStart":this.onTouchStartContainer,"onClick":this.onClickContainer},Object(s.e)("video",{"class":"taro-video-video","style":{"object-fit":l},"ref":t=>{t&&(this.videoRef=t)},"src":t,"autoplay":i,"loop":r,"muted":n,"poster":e?a:void 0,"playsinline":!0,"webkit-playsinline":!0,"onPlay":this.handlePlay,"onPause":this.handlePause,"onEnded":this.handleEnded,"onTimeUpdate":this.handleTimeUpdate,"onError":this.handleError,"onDurationChange":this.handleDurationChange,"onProgress":this.handleProgress,"onLoadedMetaData":this.handleLoadedMetaData},"暂时不支持播放该视频"),Object(s.e)("taro-video-danmu",{"ref":t=>{t&&(this.danmuRef=t)},"enable":m}),c&&A&&!b&&Object(s.e)("div",{"class":"taro-video-cover"},Object(s.e)("div",{"class":"taro-video-cover-play-button","onClick":()=>this.play()}),Object(s.e)("p",{"class":"taro-video-cover-duration"},f)),Object(s.e)("taro-video-control",{"ref":t=>{t&&(this.controlsRef=t)},"controls":e,"currentTime":this.currentTime,"duration":this.duration||this._duration||void 0,"isPlaying":this.isPlaying,"pauseFunc":this._pause,"playFunc":this._play,"seekFunc":this._seek,"showPlayBtn":this.showPlayBtn,"showProgress":this.showProgress},p&&Object(s.e)("div",{"class":Object(o.a)("taro-video-mute",{"taro-video-type-mute":h}),"onClick":this.toggleMute}),v&&Object(s.e)("div",{"class":Object(o.a)("taro-video-danmu-button",{"taro-video-danmu-button-active":m}),"onClick":this.toggleDanmu},"弹幕"),y&&Object(s.e)("div",{"class":Object(o.a)("taro-video-fullscreen",{"taro-video-type-fullscreen":d}),"onClick":this.onClickFullScreenBtn})),Object(s.e)("div",{"class":"taro-video-toast taro-video-toast-volume","ref":t=>{t&&(this.toastVolumeRef=t)}},Object(s.e)("div",{"class":"taro-video-toast-title"},"音量"),Object(s.e)("div",{"class":"taro-video-toast-icon"}),Object(s.e)("div",{"class":"taro-video-toast-value"},Object(s.e)("div",{"class":"taro-video-toast-value-content","ref":t=>{t&&(this.toastVolumeBarRef=t)}},Object(s.e)("div",{"class":"taro-video-toast-volume-grids"},Array(10).fill(1).map(()=>Object(s.e)("div",{"class":"taro-video-toast-volume-grids-item"})))))),Object(s.e)("div",{"class":"taro-video-toast taro-video-toast-progress","ref":t=>{t&&(this.toastProgressRef=t)}},Object(s.e)("div",{"class":"taro-video-toast-title","ref":t=>{t&&(this.toastProgressTitleRef=t)}})))}get"el"(){return Object(s.d)(this)}static get"watchers"(){return{"enableDanmu":["watchEnableDanmu"]}}};a.style='.taro-video{width:100%;height:225px;display:inline-block;line-height:0;overflow:hidden;position:relative}.taro-video[hidden]{display:none}.taro-video-container{width:100%;height:100%;background-color:#000;display:inline-block;position:absolute;top:0;left:0;overflow:hidden;object-position:inherit}.taro-video-container.taro-video-type-fullscreen{position:fixed;top:0;left:0;right:0;bottom:0;z-index:999}.taro-video-container.taro-video-type-fullscreen.taro-video-type-rotate-left{-webkit-transform:translate(-50%, -50%) rotate(-90deg);transform:translate(-50%, -50%) rotate(-90deg)}.taro-video-container.taro-video-type-fullscreen.taro-video-type-rotate-right{-webkit-transform:translate(-50%, -50%) rotate(90deg);transform:translate(-50%, -50%) rotate(90deg)}.taro-video-video{width:100%;height:100%;object-position:inherit}.taro-video-cover{position:absolute;top:0;left:0;bottom:0;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:rgba(1, 1, 1, 0.5);z-index:1}.taro-video-cover-play-button{width:40px;height:40px;background-size:50%;background-repeat:no-repeat;background-position:50% 50%}.taro-video-cover-duration{color:#fff;font-size:16px;line-height:1;margin-top:10px}.taro-video-bar{visibility:hidden;height:44px;background-color:rgba(0, 0, 0, 0.5);overflow:hidden;position:absolute;bottom:0;right:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 10px;z-index:1}.taro-video-bar.taro-video-bar-full{left:0}.taro-video-controls{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;flex-grow:1;margin:0 8.5px}.taro-video-control-button{width:13px;height:15px;padding:14.5px 12.5px 14.5px 12.5px;margin-left:-8.5px;box-sizing:content-box}.taro-video-control-button:after{content:"";display:block;width:100%;height:100%;background-size:100%;background-position:50% 50%;background-repeat:no-repeat}.taro-video-control-button.taro-video-control-button-play:after,.taro-video-cover-play-button{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAWhJREFUSA1j+P///0cgBoHjQGzCQCsAtgJB/AMy5wCxGNXtQ9iBwvoA5BUCMQvVLEQxHpNzDSjkRhXLMM3GKrIeKKpEkYVYjcUu+AMo3ALE3GRZiN1MvKKPgbIRJFuG10j8koeA0gZEW4jfLIKyf4EqpgOxMEELCRpFnIJ3QGU5QMyM00LizCFa1SWgSkeslhFtBGkKVwGVy6FYSJp+klR/A6quB2JOkIWMIK0oNlOf8xBoZDE9LAI7nYn6HsBq4l96WHQEaLUpAyiOaASeAM2NgvuPBpaACt82IEYtfKls0UagecpwXyAzqGTRdaA57sjmYrAptAjUsCkGYlYMg9EFyLQI1IiZB8Ti6Obh5JNh0QmgHlOcBuKSIMGi50C18UDMiMssvOJEWPQLqKYbiHnxGkRIkoBF24DyaoTMIEoeh0W3geI+RBlArCI0iz4D+RVAzEasfqLVAQ19AcSg5LoYiKWI1kiiQgCMBLnEEcfDSgAAAABJRU5ErkJggg==)}.taro-video-control-button.taro-video-control-button-pause:after{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAFlJREFUSA3tksEKACAIQ7X//5zq98wOgQayum8QaGweHhMzG/6OujzKAymn+0LMqivu1XznWmX8/echTIyMyAgTwA72iIwwAexgj8gIE8CO3aMRbDPMaEy5BRGaKcZv8YxRAAAAAElFTkSuQmCC)}.taro-video-current-time,.taro-video-duration{height:14.5px;line-height:14.5px;margin-top:15px;margin-bottom:14.5px;font-size:12px;color:#cbcbcb}.taro-video-progress-container{-webkit-box-flex:2;-webkit-flex-grow:2;flex-grow:2;position:relative}.taro-video-progress{height:2px;margin:21px 12px;background-color:rgba(255, 255, 255, 0.4);position:relative}.taro-video-progress-buffered{position:absolute;left:0;top:0;width:0;height:100%;-webkit-transition:width 0.1s;transition:width 0.1s;background-color:rgba(255, 255, 255, 0.8)}.taro-video-ball{width:16px;height:16px;padding:14px;position:absolute;top:-21px;box-sizing:content-box;left:0;margin-left:-22px}.taro-video-inner{width:100%;height:100%;background-color:#fff;border-radius:50%}.taro-video-danmu-button{white-space:nowrap;line-height:1;padding:2px 10px;border:1px solid #fff;border-radius:5px;font-size:13px;color:#fff;margin:0 8.5px}.taro-video-danmu-button.taro-video-danmu-button-active{border-color:#48c23d;color:#48c23d}.taro-video-fullscreen,.taro-video-mute{width:17px;height:17px;padding:8.5px;box-sizing:content-box;background-size:50%;background-position:50% 50%;background-repeat:no-repeat}.taro-video-fullscreen{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhUlEQVRYR+2WSwrAMAhEnZO3PfmULLooGEFTiIXJ2s/kRY2wzQeb85sE9CRA8jSzY1YfAFzhJBnU1AVgxH2dSiArCnD9QgGzRNnOech48SRABHoSyFb5in3PSbhyo6yvCPQkEM3u7BsPe/0FIvBfAh/vhKmVbO9SWun1qk/PSVi9TcVPBG6R1YIhgWwNpQAAAABJRU5ErkJggg==)}.taro-video-fullscreen.taro-video-type-fullscreen{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPUlEQVRYR+2Xu0pDURBF1/ZLxNcHKNiIlfhA7C0UBSEE8RNEBNFPUEQEEbGxFiSSSrCwEHsf5E/ccsSUuWfUhKQ40947+y42Z8+ZK/pcinzf9hhwD1xJ2q/qsb0JHAOzkl5y+lGAGnCWICQtZgAS6DxQk3TeLYA6cAo0JSXxjmW7CcwBdUkJurKiDhSA4kBvHbA9CqwBQx2O7BSw8ssU3ALPFRF4knT3nQLbr8B4LjLBOdAAFgJaLUkjbYC9n+zm+i4kXWbmwCqwnRMCHiXthuZAQOzPrxSA4kBxYDAcsH0EzATCfCLpJjOINoCtgFZabg7bk7AFDAeaGpKWgitZTu5N0kQbYBmYrujo9mX0CVxL+gidAdu9vY5zXhWA4sAgOND3X7NJ4AHYCaxkB8B62gslvecSFpoDOZH/PP8Cnt7hIaM5xCEAAAAASUVORK5CYII=)}.taro-video-mute{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDQtMTFUMTA6MTg6MjArMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA0LTExVDEwOjIyOjIyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA0LTExVDEwOjIyOjIyKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3YmE4Yjg0LTFhNTYtNGM1MS04NDVkLTNiZmYyMGI0ZDc0ZiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg1NGQ3MjlkLWUwNjctZjU0OC1hMTlhLTBlZjQ4OGRkYjJiOSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjA1ODY3ZDFlLWQ3NGEtNDgyNC04MDU3LTYzYmRmMTdjODk5ZSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDU4NjdkMWUtZDc0YS00ODI0LTgwNTctNjNiZGYxN2M4OTllIiBzdEV2dDp3aGVuPSIyMDE5LTA0LTExVDEwOjE4OjIwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTdiYThiODQtMWE1Ni00YzUxLTg0NWQtM2JmZjIwYjRkNzRmIiBzdEV2dDp3aGVuPSIyMDE5LTA0LTExVDEwOjIyOjIyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz459+FoAAABqElEQVRYhc2XPWsVQRSGnxPjF4oGRfxoRQKGWCU2Ft7CykrQWosEyf/If0hhIPgHDEmbNJZqCFxiQEgTUGxsBUVEHgvnyrjZZJO92V1fGIaZnTPvszPszNlQ6VIjnbr/DwCoDLMNak/dUVfUK0f2rQugnlcX/FevWgFQH6gf3autRgHUC+piiXHzAOmtPx9gXgug8itQx9SXwDpw47AGKXZWvXvQmNFCwE3gCXA2dY0Az4GrRzHONA9cU/vAbERsllEOyh31e8USV2mrMPdG9uyn+rDom2/BHHCm5puWKiKmgdtAnz+rvaxO5mNygEvHaZ5BfADuARvAaWBpP4DGFBHfgBngFzClTrUKkCDeA+9S837rAEnbqb7VFcCpVJ/oCmCw959aB1AfAROpudYqgDoOLKRmPyLelAF8bcD4pPoMeAtcB34AT4uDBqXXwFG8XXUU/72MIuK1OgE8Bs6l7mEvo8up7lN1Ge0n9aK6VHMFZvJTr9S3CiALaCQhqZOSvegMIAvu2UVSWpigLC1fbQ0gm6in7qpfLCQbhwGIYcyPQ53/G3YO8BtUtd35bvKcVwAAAABJRU5ErkJggg==)}.taro-video-mute.taro-video-type-mute{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDQtMTFUMTA6MTk6MDMrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA0LTExVDEwOjIyOjMzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA0LTExVDEwOjIyOjMzKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzYjJmNjE2LTZmZTUtNDJjNC1iNTgwLTczNzZjZjI2NzdmNSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjYzZjQ2NTYzLWE0ZjktOGQ0Mi1hM2FhLTY3ODJhNDBhYWNjMSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjIyYWNjMWFlLTg4ZmMtNDBlZi1iMWM1LTNmODgwY2QzYWI2MiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjJhY2MxYWUtODhmYy00MGVmLWIxYzUtM2Y4ODBjZDNhYjYyIiBzdEV2dDp3aGVuPSIyMDE5LTA0LTExVDEwOjE5OjAzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDNiMmY2MTYtNmZlNS00MmM0LWI1ODAtNzM3NmNmMjY3N2Y1IiBzdEV2dDp3aGVuPSIyMDE5LTA0LTExVDEwOjIyOjMzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5PmxYVAAACLklEQVRYhc2XP2sVQRRHz40hKoqaQgVBCy1EozFlGiVFxMLGh4piYWEh+hkEP4YKAVFEEFTyughaCH6DqIVpAhYWEgIxoJE8cywyi5tNHu/tJmvyg2WZO3dmzt47/zZUtoJ6Nhsg09YDiYhKDzACTAFNYH9lEpUq80TdrT5wpV5n/ZV9KoGoo+pXV2uyKkipOaLuUceAt8DhUvQd1FsCYhR4ChzaSIBMHSOi7lOfsByFWiCgEBH1GHAF2JlMPcBt4GC3HUYEaj9wF3gVEVPtfNVTwAXgWX7CDKq/1piAZTSZBmim8qJ6sQ3EgDqb/L7kU3MH2NHtl3dQX3r3Ak21UYAYAj4A/cl0JB+RF+uMRj4iQ+p8zt7KYFLdXKHuRi0gacBhV6a6pd5bA6KRNagFJPU9qv5u47toLmW1HnoR8Q5oAK1CVQu4FBHj/wUkaXsb+4pzpVaQFPqXrN7Be4Fx9VztIOr1BLEtmX4A94E/qdwHTKjDWYM6lu81dSlnn3V570BtuLxaMs2rZ/IgYxsBovaoPwsQA4VoFWEm8ql5DiysNyURsQTMpOIMcDYiPhd8xoGr/FtNC2G6FKXD6ihwGdiVHMoeeh8jYlA9ANwE3kTEp3bO6vE03qOONzR1r/q4RGrquaFFxFxE3ALOA9+6jExpdb180y55AhirhaRTatq0GXEzL8+ZIuI9cBJ4WKiartJf9nWV/mty7UfUafW7erpqRGI9EBuprffvu9n6C1KOmsqwI5A1AAAAAElFTkSuQmCC)}.taro-video-danmu{position:absolute;top:0;left:0;bottom:0;width:100%;margin-top:14px;margin-bottom:44px;font-size:14px;line-height:14px;overflow:visible}.taro-video-danmu-item{line-height:1;position:absolute;color:#fff;white-space:nowrap;left:100%;-webkit-transform:translatex(0);transform:translatex(0);-webkit-transition-property:left, -webkit-transform;transition-property:left, -webkit-transform;transition-property:left, transform;transition-property:left, transform, -webkit-transform;-webkit-transition-duration:3s;transition-duration:3s;-webkit-transition-timing-function:linear;transition-timing-function:linear}.taro-video-toast{pointer-events:none;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border-radius:5px;background-color:rgba(255, 255, 255, 0.8);color:#000;display:block;visibility:hidden}.taro-video-toast.taro-video-toast-volume{width:100px;height:100px;display:block}.taro-video-toast-volume .taro-video-toast-title{width:100%;font-size:12px;line-height:16px;text-align:center;margin-top:10px;display:block}.taro-video-toast-volume .taro-video-toast-icon{fill:#000;width:50%;height:50%;margin-left:25%;display:block;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFhklEQVR4Xu2aeaxfQxTHP1VBES0NIQitWtpaaxeCUkQtaYVa0tiClAq1ExIiQTVppaWxt8RWSa2tWkJQRGgtQaSIpUKEpG0ssbbk28yV2+mZO/e9e3vvu/e98897mZnfzPl+75mZs0wvurn06ub46SGgxwLqZaA3sB/wO/A+8G/V6tS5BU4BJgJbO9DvAMOB36okoQ4CNgAeBEYbQK8Bbm4zAdsBc4EdAyA/APZoKwHHAA8DG2UA/AnYrG0ErAVcD1yXA9gfQJ8c40obsqbPgH7AY8CROTVuFQFD3X7fJid4DWsNAWOAGZ0w58YTsDZwKzChA189PbTRBGwKzAYO6iT4srbAMHfTfAksjulS1iG4JzAH2Dy2YKS/qAVcCdzi1vgZOBZ4PWvNGAG6wgYCW0IwctzNmf06BcEXtYABwOeA4otEfgEOdnGGqV6IAAUopwM6zDYuAVjeKYpYwCjgCWOhH513+b2lhE+Avrj89NPyalzyuCIE6EN9BfQ1dHoPOAD40+9LE6D/5aoqSqtLsgiQC60DTiHzfGCFoaSsQAexZdlTgEuyCDgLuK8u5G7dEAHyKN8CBrtxLwDHAX8Z+l4N3GS0L3db4aN0X5opmc+2XZQAfb2LPd2eciG1lUSRJZ9qYHkZONwiYAjwSc3gs24BXWWWfzEVuMjQez13HljX8v7A28lvEgsInaBVcxLaAvr6sgJLtBWeNTrOB+4w2p8DRvoEnAPcXTVaY70QAbrbXwIONX7zBSAL/tvrk1+iviTllnRry2irr/QSEws4D7izCxMg1XQLLAQGGXpeCkw22kOWI49RMUujCJC+uwAfGtfcImAng4AtAMsBeg04pIkESOfbgQsMsNoGnxrtSrfv7rXrSlwXWN6kLZBgEBiB8iWUUZZPIN/AF1nMoiYSICDfAlt5iB4CxhpAzwXuMtqPBuY1lYB5wFEeqFeAwwyguvIUqvuiQO/xphJwP3Cmhyh0EKrOoGDIF7n+M5pKwEwXrqdBCaQSM77Ig7SSIicDs5pKwIvACA+pzFwZIF9OlKm36QyQV7jEqDDJk5VD58uFgGIGX1Se+6yJFqAKsqI6X84GdDb4Mh0Y5zUqjFYFakUTCXja5QLSmBQHbAL8ahAgT1AeYVreSKLLphGwF/CuAfLJQLldGSTFD75c5d4mNCoWyAqG9gYWGED1AOMKo12ZbiWA/idA++deY2DVTZ0Jh5UJPsFQtD/wDaAHGWl5EzgwaUi2gK4UXS11S0cTIjrMFBtYQdAk4DID0BnAAz4B6wNLgTKKG0VIDBHwqitwpOcW+OOB540FdeipNKbUWFrUtn06o5xOij4KyDuqU0IE3Obl/rLA63pTzm9XA8jKACjdniZAaSKFmUpB1yUhAlTsUEpMh913wEkuTe7rKTzPAHqO44vpKPkFhH3cWWBVV6ogJVYZUgz/tXtIYelzI3Ct0fExIGx6j7iKWBUUveyYBehv1RIjIEsfqziq8Xp4pSBJOYTVJFQcVY3wCFeKUjVGyYfQWB00+5bEVBECrNS+qsOKBpVHNCVWHs+LS7H5PV5pOu9v0+OKEOAXR39w1e1C7wM6AkJ1eLmkRcrpRQiQrqobXO5S3vL3/4kBKMsCknV0k+iasVLUMV3UX5SAPGtED8EOT+L9YENnCasUIXNO2goChFWHqAIRyxXN4qI1BCQg9dJESYq8LnbrCBAR8t50Lig6i0krCRBoVWhVlt45wkBrCRBuRZyPuAguxIPe9lXqhpd9DcZMXOvdkPF0Xu/8dohNUmZ/1QQkuitXr+d4fryuFx3jywQYm6suAqSX8vLTXKJDt4QqO6rtLYspXWZ/nQQkOJTAUJZGIav19q9MvKvN1RUIWKMAY5P3EBBjqO393d4C/gMVHwRQlpx21QAAAABJRU5ErkJggg==);background-size:50%;background-position:50% 50%;background-repeat:no-repeat}.taro-video-toast-volume .taro-video-toast-value{width:80px;height:5px;margin-top:5px;margin-left:10px}.taro-video-toast-volume .taro-video-toast-value>.taro-video-toast-value-content{overflow:hidden}.taro-video-toast-volume-grids{width:80px;height:5px}.taro-video-toast-volume-grids-item{float:left;width:7.1px;height:5px;background-color:#000}.taro-video-toast-volume-grids-item:not(:first-child){margin-left:1px}.taro-video-toast.taro-video-toast-progress{background-color:rgba(0, 0, 0, 0.8);color:#fff;font-size:14px;line-height:18px;padding:6px}';const l=class{"constructor"(t){Object(s.g)(this,t),this.list=[],this.danmuElList=[],this.currentTime=0,this.enable=!1,this.danmuList=[]}"ensureProperties"(t){const e=Object.assign({},t);return"time"in t||(e.time=this.currentTime),e.key=Math.random(),e.bottom=90*Math.random()+5+"%",e}async"sendDanmu"(t=[]){if(Array.isArray(t))this.list=[...this.list,...t.map(t=>this.ensureProperties(t))];else{const e=t;this.list=[...this.list,Object.assign({},this.ensureProperties(e))]}}async"tick"(t){if(this.currentTime=t,!this.enable)return;const e=this.list.filter(({"time":e})=>t-e<4&&t>e);let i=!1;const s=this.danmuList;i=e.length!==s.length||e.some(({"key":t})=>s.every(e=>t!==e.key)),i&&(this.danmuList=e)}"componentDidUpdate"(){requestAnimationFrame(()=>{setTimeout(()=>{this.danmuElList.splice(0).forEach(t=>{t.style.left="0",t.style.webkitTransform="translateX(-100%)",t.style.transform="translateX(-100%)"})})})}"render"(){return this.enable?Object(s.e)(s.a,{"class":"taro-video-danmu"},this.danmuList.map(({"text":t,"color":e,"bottom":i,"key":o})=>Object(s.e)("p",{"class":"taro-video-danmu-item","key":o,"style":{"color":e,"bottom":i},"ref":t=>{t&&this.danmuElList.push(t)}},t))):""}}},"95":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var s=function createCommonjsModule(t,e,i){return t(i={"path":e,"exports":{},"require":function(t,e){return function commonjsRequire(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}},i.exports),i.exports}((function(t){!function(){var e={}.hasOwnProperty;function classNames(){for(var t=[],i=0;i<arguments.length;i++){var s=arguments[i];if(s){var o=typeof s;if("string"===o||"number"===o)t.push(s);else if(Array.isArray(s)&&s.length){var r=classNames.apply(null,s);r&&t.push(r)}else if("object"===o)for(var n in s)e.call(s,n)&&s[n]&&t.push(n)}}return t.join(" ")}t.exports?(classNames.default=classNames,t.exports=classNames):window.classNames=classNames}()}))}}]);