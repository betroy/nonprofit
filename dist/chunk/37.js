(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"88":function(e,t,i){"use strict";i.r(t),i.d(t,"taro_switch_core",(function(){return c}));var s=i(30);const c=class{"constructor"(e){Object(s.g)(this,e),this.onChange=Object(s.c)(this,"change",7),this.type="switch",this.checked=!1,this.color="#04BE02",this.disabled=!1,this.isWillLoadCalled=!1,this.switchChange=e=>{e.stopPropagation();const t=e.target.checked;this.isChecked=t,this.onChange.emit({"value":t})}}"function"(e,t){this.isWillLoadCalled&&e!==t&&(this.isChecked=e)}"componentWillLoad"(){this.isWillLoadCalled=!0,this.isChecked=this.checked}"componentDidLoad"(){Object.defineProperty(this.el,"value",{"get":()=>this.isChecked,"configurable":!0})}"render"(){const{"type":e,"color":t,"isChecked":i,"name":c,"disabled":h}=this,o=i?{"borderColor":t||"04BE02","backgroundColor":t||"04BE02"}:{};return Object(s.e)("input",{"type":"checkbox","class":"weui-"+e,"style":o,"checked":i,"name":c,"disabled":h,"onChange":this.switchChange})}get"el"(){return Object(s.d)(this)}static get"watchers"(){return{"checked":["function"]}}};c.style="taro-switch-core{display:inline-block;width:52px;height:32px}taro-switch-core .weui-switch{display:block;width:100%;height:100%}"}}]);