(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a390a"],{"035f":function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-row",[i("el-col",{staticStyle:{padding:"3rem"},attrs:{span:4,offset:10}},[i("el-button",{staticStyle:{width:"100%",margin:"1rem 0"},attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.submit("Individual")}}},[t._v(" Individual ")]),i("el-button",{staticStyle:{width:"100%",margin:"1rem 0"},attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.submit("Corporation")}}},[t._v(" Corporation ")]),i("el-button",{staticStyle:{width:"100%",margin:"1rem 0"},attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.submit("Employee")}}},[t._v(" Employee ")]),i("el-button",{staticStyle:{width:"100%",margin:"1rem 0"},attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.submit("RogManager")}}},[t._v(" RogManager ")]),i("el-button",{staticStyle:{width:"100%",margin:"1rem 0"},attrs:{type:"primary",size:"medium"},on:{click:function(e){return t.submit("CorporationManager")}}},[t._v(" CorporationManager ")])],1)],1)],1)},a=[],n={name:"RepoSelect",data:function(){return{platform:"",platformOption:[{value:"gitee",label:"gitee"},{value:"github",label:"github"}],org:"",orgOption:[{value:"gitee",label:"gitee"},{value:"github",label:"github"}],repo:"",repoOption:[{value:"gitee",label:"gitee"},{value:"github",label:"github"}]}},methods:{submit:function(t){console.log(t),"RogManager"===t?this.$router.push("/platformSelect"):"CorporationManager"===t?this.$router.push("/CorporationManagerLogin"):this.$router.push("/repoSelect")}}},o=n,u=i("2877"),l=Object(u["a"])(o,r,a,!1,null,"aeda9e1c",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0a390a.02229cb2.js.map