(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{216:function(e,t,n){},217:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),i=n(66),c=n.n(i),s=(n(79),n(67)),r=n(68),l=n(72),m=n(69),u=n(73),d=(n(80),n(70)),g=n.n(d),h=n(71),p=n.n(h),f={transitionDuration:0},v={background:".my-bg-image-el"},w=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={items:[]},e}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.state.items.map(function(e,t){return o.a.createElement("li",{className:"image-element-class",key:t},o.a.createElement("img",{src:e.src,title:e.desc,alt:"\u56fe\u7247\u627e\u4e0d\u5230\u4e86"}))});return o.a.createElement(p.a,{className:"my-gallery-class",elementType:"ul",options:f,disableImagesLoaded:!1,updateOnEachImageLoad:!1,imagesLoadedOptions:v},e)}},{key:"componentDidMount",value:function(){var e=this;g.a.get("data.json").then(function(t){e.setState({items:t.data})}).then(function(){console.log(e.state.items)})}}]),t}(o.a.Component);n(216);var b=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(w,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},74:function(e,t,n){e.exports=n(217)},79:function(e,t,n){},80:function(e,t,n){}},[[74,1,2]]]);
//# sourceMappingURL=main.06d37477.chunk.js.map