(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ac1e37e"],{"057f":function(t,e,i){var o=i("fc6a"),a=i("241c").f,s={}.toString,n="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],r=function(t){try{return a(t)}catch(e){return n.slice()}};t.exports.f=function(t){return n&&"[object Window]"==s.call(t)?r(t):a(o(t))}},1276:function(t,e,i){"use strict";var o=i("d784"),a=i("44e7"),s=i("825a"),n=i("1d80"),r=i("4840"),l=i("8aa5"),c=i("50c4"),u=i("14c3"),h=i("9263"),p=i("d039"),d=[].push,f=Math.min,g=4294967295,b=!p((function(){return!RegExp(g,"y")}));o("split",2,(function(t,e,i){var o;return o="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,i){var o=String(n(this)),s=void 0===i?g:i>>>0;if(0===s)return[];if(void 0===t)return[o];if(!a(t))return e.call(o,t,s);var r,l,c,u=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,b=new RegExp(t.source,p+"g");while(r=h.call(b,o)){if(l=b.lastIndex,l>f&&(u.push(o.slice(f,r.index)),r.length>1&&r.index<o.length&&d.apply(u,r.slice(1)),c=r[0].length,f=l,u.length>=s))break;b.lastIndex===r.index&&b.lastIndex++}return f===o.length?!c&&b.test("")||u.push(""):u.push(o.slice(f)),u.length>s?u.slice(0,s):u}:"0".split(void 0,0).length?function(t,i){return void 0===t&&0===i?[]:e.call(this,t,i)}:e,[function(e,i){var a=n(this),s=void 0==e?void 0:e[t];return void 0!==s?s.call(e,a,i):o.call(String(a),e,i)},function(t,a){var n=i(o,t,this,a,o!==e);if(n.done)return n.value;var h=s(t),p=String(this),d=r(h,RegExp),m=h.unicode,v=(h.ignoreCase?"i":"")+(h.multiline?"m":"")+(h.unicode?"u":"")+(b?"y":"g"),y=new d(b?h:"^(?:"+h.source+")",v),k=void 0===a?g:a>>>0;if(0===k)return[];if(0===p.length)return null===u(y,p)?[p]:[];var C=0,w=0,_=[];while(w<p.length){y.lastIndex=b?w:0;var S,D=u(y,b?p:p.slice(w));if(null===D||(S=f(c(y.lastIndex+(b?0:w)),p.length))===C)w=l(p,w,m);else{if(_.push(p.slice(C,w)),_.length===k)return _;for(var x=1;x<=D.length-1;x++)if(_.push(D[x]),_.length===k)return _;w=C=S}}return _.push(p.slice(C)),_}]}),!b)},"159b":function(t,e,i){var o=i("da84"),a=i("fdbc"),s=i("17c2"),n=i("9112");for(var r in a){var l=o[r],c=l&&l.prototype;if(c&&c.forEach!==s)try{n(c,"forEach",s)}catch(u){c.forEach=s}}},"17c2":function(t,e,i){"use strict";var o=i("b727").forEach,a=i("a640"),s=i("ae40"),n=a("forEach"),r=s("forEach");t.exports=n&&r?[].forEach:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}},"2aa3":function(t,e,i){"use strict";var o=i("880e"),a=i.n(o);a.a},4160:function(t,e,i){"use strict";var o=i("23e7"),a=i("17c2");o({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},"44e7":function(t,e,i){var o=i("861d"),a=i("c6b6"),s=i("b622"),n=s("match");t.exports=function(t){var e;return o(t)&&(void 0!==(e=t[n])?!!e:"RegExp"==a(t))}},"4de4":function(t,e,i){"use strict";var o=i("23e7"),a=i("b727").filter,s=i("1dde"),n=i("ae40"),r=s("filter"),l=n("filter");o({target:"Array",proto:!0,forced:!r||!l},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));i("a4d3"),i("4de4"),i("4160"),i("e439"),i("dbb4"),i("b64b"),i("159b");function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function a(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function s(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?a(Object(i),!0).forEach((function(e){o(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},"746f":function(t,e,i){var o=i("428f"),a=i("5135"),s=i("e538"),n=i("9bf2").f;t.exports=function(t){var e=o.Symbol||(o.Symbol={});a(e,t)||n(e,t,{value:s.f(t)})}},"880e":function(t,e,i){},a4d3:function(t,e,i){"use strict";var o=i("23e7"),a=i("da84"),s=i("d066"),n=i("c430"),r=i("83ab"),l=i("4930"),c=i("fdbf"),u=i("d039"),h=i("5135"),p=i("e8b5"),d=i("861d"),f=i("825a"),g=i("7b0b"),b=i("fc6a"),m=i("c04e"),v=i("5c6c"),y=i("7c73"),k=i("df75"),C=i("241c"),w=i("057f"),_=i("7418"),S=i("06cf"),D=i("9bf2"),x=i("d1e7"),O=i("9112"),V=i("6eeb"),L=i("5692"),z=i("f772"),A=i("d012"),E=i("90e3"),P=i("b622"),F=i("e538"),R=i("746f"),N=i("d44e"),T=i("69f3"),j=i("b727").forEach,I=z("hidden"),$="Symbol",U="prototype",G=P("toPrimitive"),H=T.set,q=T.getterFor($),B=Object[U],W=a.Symbol,Y=s("JSON","stringify"),J=S.f,M=D.f,Z=w.f,K=x.f,Q=L("symbols"),X=L("op-symbols"),tt=L("string-to-symbol-registry"),et=L("symbol-to-string-registry"),it=L("wks"),ot=a.QObject,at=!ot||!ot[U]||!ot[U].findChild,st=r&&u((function(){return 7!=y(M({},"a",{get:function(){return M(this,"a",{value:7}).a}})).a}))?function(t,e,i){var o=J(B,e);o&&delete B[e],M(t,e,i),o&&t!==B&&M(B,e,o)}:M,nt=function(t,e){var i=Q[t]=y(W[U]);return H(i,{type:$,tag:t,description:e}),r||(i.description=e),i},rt=c?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},lt=function(t,e,i){t===B&&lt(X,e,i),f(t);var o=m(e,!0);return f(i),h(Q,o)?(i.enumerable?(h(t,I)&&t[I][o]&&(t[I][o]=!1),i=y(i,{enumerable:v(0,!1)})):(h(t,I)||M(t,I,v(1,{})),t[I][o]=!0),st(t,o,i)):M(t,o,i)},ct=function(t,e){f(t);var i=b(e),o=k(i).concat(ft(i));return j(o,(function(e){r&&!ht.call(i,e)||lt(t,e,i[e])})),t},ut=function(t,e){return void 0===e?y(t):ct(y(t),e)},ht=function(t){var e=m(t,!0),i=K.call(this,e);return!(this===B&&h(Q,e)&&!h(X,e))&&(!(i||!h(this,e)||!h(Q,e)||h(this,I)&&this[I][e])||i)},pt=function(t,e){var i=b(t),o=m(e,!0);if(i!==B||!h(Q,o)||h(X,o)){var a=J(i,o);return!a||!h(Q,o)||h(i,I)&&i[I][o]||(a.enumerable=!0),a}},dt=function(t){var e=Z(b(t)),i=[];return j(e,(function(t){h(Q,t)||h(A,t)||i.push(t)})),i},ft=function(t){var e=t===B,i=Z(e?X:b(t)),o=[];return j(i,(function(t){!h(Q,t)||e&&!h(B,t)||o.push(Q[t])})),o};if(l||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=E(t),i=function(t){this===B&&i.call(X,t),h(this,I)&&h(this[I],e)&&(this[I][e]=!1),st(this,e,v(1,t))};return r&&at&&st(B,e,{configurable:!0,set:i}),nt(e,t)},V(W[U],"toString",(function(){return q(this).tag})),V(W,"withoutSetter",(function(t){return nt(E(t),t)})),x.f=ht,D.f=lt,S.f=pt,C.f=w.f=dt,_.f=ft,F.f=function(t){return nt(P(t),t)},r&&(M(W[U],"description",{configurable:!0,get:function(){return q(this).description}}),n||V(B,"propertyIsEnumerable",ht,{unsafe:!0}))),o({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:W}),j(k(it),(function(t){R(t)})),o({target:$,stat:!0,forced:!l},{for:function(t){var e=String(t);if(h(tt,e))return tt[e];var i=W(e);return tt[e]=i,et[i]=e,i},keyFor:function(t){if(!rt(t))throw TypeError(t+" is not a symbol");if(h(et,t))return et[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),o({target:"Object",stat:!0,forced:!l,sham:!r},{create:ut,defineProperty:lt,defineProperties:ct,getOwnPropertyDescriptor:pt}),o({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:dt,getOwnPropertySymbols:ft}),o({target:"Object",stat:!0,forced:u((function(){_.f(1)}))},{getOwnPropertySymbols:function(t){return _.f(g(t))}}),Y){var gt=!l||u((function(){var t=W();return"[null]"!=Y([t])||"{}"!=Y({a:t})||"{}"!=Y(Object(t))}));o({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,i){var o,a=[t],s=1;while(arguments.length>s)a.push(arguments[s++]);if(o=e,(d(e)||void 0!==t)&&!rt(t))return p(e)||(e=function(t,e){if("function"==typeof o&&(e=o.call(this,t,e)),!rt(e))return e}),a[1]=e,Y.apply(null,a)}})}W[U][G]||O(W[U],G,W[U].valueOf),N(W,$),A[I]=!0},a640:function(t,e,i){"use strict";var o=i("d039");t.exports=function(t,e){var i=[][t];return!!i&&o((function(){i.call(null,e||function(){throw 1},1)}))}},b0c0:function(t,e,i){var o=i("83ab"),a=i("9bf2").f,s=Function.prototype,n=s.toString,r=/^\s*function ([^ (]*)/,l="name";o&&!(l in s)&&a(s,l,{configurable:!0,get:function(){try{return n.call(this).match(r)[1]}catch(t){return""}}})},b64b:function(t,e,i){var o=i("23e7"),a=i("7b0b"),s=i("df75"),n=i("d039"),r=n((function(){s(1)}));o({target:"Object",stat:!0,forced:r},{keys:function(t){return s(a(t))}})},bb51:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{style:t.home,attrs:{id:"home"}},[i("Header"),i("el-col",{attrs:{offset:4,span:16,id:"section"}},[i("div",{attrs:{id:"configBtDiv"}},[t.showConfigForm?t._e():i("el-button",{staticClass:"configBt",attrs:{type:"primary"},on:{click:function(e){return t.configCla()}}},[t._v(" Configure CLA ")])],1),i("el-row",[t.showConfigForm?i("el-row",[i("div",{staticStyle:{"padding-bottom":"1.5rem","font-size":"1.3rem"}},[t._v("Configure CLA")]),i("el-row",[i("el-col",{attrs:{span:10}},[i("div",{staticStyle:{"background-color":"white"}},[i("div",{staticStyle:{"text-align":"right",padding:"1rem"}},[i("svg-icon",{attrs:{"icon-class":"close"},on:{click:function(e){return t.closeConfigForm()}}})],1),i("div",{staticStyle:{"font-size":"1.2rem",padding:".5rem"}},[t._v(" ① Choose a repository "),t.user.isAuthorize?t._e():i("span",{staticStyle:{"font-size":".8rem","text-decoration":"underline",cursor:"pointer"},on:{click:function(e){return t.authorize()}}},[t._v("(want to link an org?)")])]),i("div",{staticStyle:{padding:"0 2rem"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"select",size:"medium",value:t.repositoryValue},on:{change:t.changeRepository},model:{value:t.repositoryValue,callback:function(e){t.repositoryValue=e},expression:"repositoryValue"}},t._l(t.repositoryOptions,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),i("div",{staticStyle:{"font-size":"1.2rem",padding:".5rem"}},[t._v(" ② Choose a CLA ")]),i("div",{staticStyle:{"font-size":"1rem",padding:"0 2rem .5rem 2rem"}},[t._v(" Select from Gist "),i("span",{staticStyle:{"font-size":".8rem","text-decoration":"underline",cursor:"pointer"},on:{click:function(e){return t.createCLA()}}},[t._v("(don't have one?)")])]),i("div",{staticStyle:{padding:"0 2rem"}},[i("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"select",size:"medium",value:t.claValue},on:{change:t.changeCla},model:{value:t.claValue,callback:function(e){t.claValue=e},expression:"claValue"}},t._l(t.claOptions,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),i("div",{staticStyle:{"font-size":"1rem",padding:".5rem 2rem"}},[t._v(" Email ")]),i("div",{staticStyle:{padding:"0 2rem"}},[i("el-input",{attrs:{size:"medium",placeholder:"Input you email"},on:{input:t.verifyEmail},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),i("div",{class:{"linkBt pointer":t.claChoose&&t.repositoryChoose&&t.isEmail,disableClass:!(t.claChoose&&t.repositoryChoose&&t.isEmail)},on:{click:function(e){return t.openLinkDialog()}}},[i("div",[i("svg-icon",{attrs:{"icon-class":"link"}}),t._v(" LINK ")],1)])])]),i("el-col",{attrs:{span:12,offset:2}},[i("el-input",{staticStyle:{"white-space":"pre-wrap"},attrs:{rows:"16",type:"textarea"},model:{value:t.previewText,callback:function(e){t.previewText=e},expression:"previewText"}})],1)],1)],1):t._e()],1),i("div",[i("el-tabs",{on:{"tab-click":t.tabsHandleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{staticStyle:{"margin-top":"1rem"},attrs:{label:"Linked Repositories",name:"first"}},[i("div",{staticClass:"tableStyle"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,align:"center"}},[i("el-table-column",{attrs:{prop:"repository",label:"Repository",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("svg-icon",{attrs:{"icon-class":"repository"}}),i("span",{staticClass:"pointer hoverUnderline",staticStyle:{"margin-left":"10px"},on:{click:function(e){return t.newWindow()}}},[t._v(t._s(e.row.repository))])]}}])}),i("el-table-column",{attrs:{prop:"cla",label:"CLA",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"pointer hoverUnderline",on:{click:function(e){return t.checkCla()}}},[t._v(t._s(e.row.cla))])]}}])}),i("el-table-column",{attrs:{prop:"gist",label:"Gist"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("svg-icon",{staticStyle:{cursor:"pointer"},attrs:{"icon-class":"github"}})]}}])}),i("el-table-column",{attrs:{prop:"sharedGist",label:"Shared Gist"}}),i("el-table-column",{attrs:{prop:"contributors",label:"Contributors",align:"center"}}),i("el-table-column",{attrs:{prop:"status",align:"center",label:"Status"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("svg-icon",{staticClass:"pointer",attrs:{"icon-class":"link_active"}})]}}])}),i("el-table-column",{attrs:{align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Edit",placement:"bottom"}},[i("svg-icon",{staticClass:"pointer",staticStyle:{display:"inline-block","margin-right":".5rem"},attrs:{"icon-class":"edit"},on:{click:function(i){return t.editHandleClick(e)}}})],1),i("el-popover",{attrs:{width:"80",placement:"right"}},[i("div",{staticClass:"menuBT"},[i("el-button",{attrs:{type:"primary",size:"medium"}},[t._v("Import")]),i("el-button",{attrs:{type:"primary",size:"medium"}},[t._v("ReCheck PRs")]),i("el-button",{attrs:{type:"primary",size:"medium"}},[t._v("Get Badge")]),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){t.unLinkDialogVisible=!0}}},[t._v("Unlink ")])],1),i("el-tooltip",{attrs:{slot:"reference",effect:"dark",content:"More..",placement:"bottom"},slot:"reference"},[i("svg-icon",{staticClass:"pointer",attrs:{"icon-class":"menu"}})],1)],1)]}}])})],1)],1),i("div",{staticClass:"paginationClass"},[i("el-pagination",{attrs:{background:"","page-size":5,"pager-count":5,"hide-on-single-page":!0,"current-page":t.currentPage,layout:"prev, pager, next",total:t.tableTotal},on:{"current-change":t.changePage}})],1)]),i("el-tab-pane",{staticStyle:{"margin-top":"1rem"},attrs:{label:"Signed Repositories",name:"second"}},[t.isVerify?i("div",[i("div",{staticClass:"tableStyle"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableDataOther,align:"center"}},[i("el-table-column",{attrs:{prop:"repository",label:"Repository",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("svg-icon",{attrs:{"icon-class":"repository"}}),i("span",{staticClass:"pointer hoverUnderline",staticStyle:{"margin-left":"10px"},on:{click:function(e){return t.newWindow()}}},[t._v(t._s(e.row.repository))])]}}])}),i("el-table-column",{attrs:{prop:"cla",label:"CLA",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticClass:"pointer hoverUnderline",on:{click:function(e){return t.checkCla()}}},[t._v(t._s(e.row.cla))])]}}])}),i("el-table-column",{attrs:{prop:"gist",label:"Gist"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("svg-icon",{staticStyle:{cursor:"pointer"},attrs:{"icon-class":"github"}})]}}])}),i("el-table-column",{attrs:{prop:"sharedGist",label:"Shared Gist"}}),i("el-table-column",{attrs:{prop:"contributors",label:"Contributors",align:"center"}}),i("el-table-column",{attrs:{prop:"status",align:"center",label:"Status"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("svg-icon",{staticClass:"pointer",attrs:{"icon-class":"link_active"}})]}}])}),i("el-table-column",{attrs:{align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[3===t.tableType?i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.listDialogVisible=!0}}},[t._v("白名单 ")]):t._e()]}}])})],1)],1),i("div",{staticClass:"paginationClass"},[i("el-pagination",{attrs:{background:"","page-size":5,"pager-count":5,"hide-on-single-page":!0,"current-page":t.currentPage,layout:"prev, pager, next",total:t.tableTotal},on:{"current-change":t.changePage}})],1)]):i("el-col",{attrs:{offset:8,span:8}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",staticStyle:{padding:"2rem"},attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"账号",prop:"account"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.ruleForm.account,callback:function(e){t.$set(t.ruleForm,"account",e)},expression:"ruleForm.account"}})],1),i("el-form-item",{attrs:{label:"密码",prop:"pass"}},[i("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:t.ruleForm.pass,callback:function(e){t.$set(t.ruleForm,"pass",e)},expression:"ruleForm.pass"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("提交")]),i("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("重置")])],1)],1)],1)],1)],1)],1)],1),i("Footer",{attrs:{id:"footer"}}),i("el-dialog",{attrs:{top:"5vh",title:"",visible:t.authorizeDialogVisible,width:"35%"},on:{"update:visible":function(e){t.authorizeDialogVisible=e}}},[i("div",{staticStyle:{"text-align":"left"}},[i("p",{staticClass:"dialogDesc"},[t._v("Why link organizations?")]),i("p",[t._v("If you link an organization with your CLA, CLA assistant sets a web hook on your organization and listens to Pull Requests of all repositories in the organization. That means that your CLA becomes active for each existing and future repositories of your organization.")]),i("p",{staticClass:"dialogDesc"},[t._v("How can I link an organization?")]),i("p",[t._v("CLA assistant needs an additional authorization from you to be able to create web hooks for organizations. To grant CLA assistant appropriate rights just click on the button below. For more information on Authorization scopes see github documentation")]),i("div",{staticClass:"linkBt pointer",staticStyle:{"font-size":"1.1rem"},on:{click:function(e){return t.getOrgPermission()}}},[t._v(" Yes,let's go for it ")])])]),i("el-dialog",{attrs:{top:"5vh",title:"",visible:t.createCLADialogVisible,width:"35%"},on:{"update:visible":function(e){t.createCLADialogVisible=e}}},[i("div",{staticStyle:{"text-align":"left"}},[i("p",{staticClass:"dialogDesc"},[t._v("How can I create a CLA Gist?")]),i("p",[t._v("To "),i("span",{staticStyle:{cursor:"pointer","text-decoration":"underline",color:"blue"},on:{click:function(e){return t.toCreateCLA()}}},[t._v("createCLA")]),t._v(" enter a file name and paste the content of your CLA.")]),i("p",{staticClass:"dialogDesc"},[t._v("What happens if I edit the Gist file?")]),i("p",[t._v("CLA assistant will always show you the current version of your Gist file. Users who accept your CLA sign the current version. If you change the content of your CLA, each contributor has to accept the new version when they create a new pull request.")])]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})]),i("el-dialog",{attrs:{top:"5vh",title:"",visible:t.shareDialogVisible,width:"35%"},on:{"update:visible":function(e){t.shareDialogVisible=e}}},[i("div",{staticStyle:{"text-align":"left"}},[i("p",{staticClass:"dialogDesc"},[t._v("What happens if I choose to share the gist with multiple repos or orgs?")]),i("p",[t._v("Contributors will simply need to sign only once for any of the repos or orgs linked with the same shared gist.")]),i("p",{staticClass:"dialogDesc"},[t._v("Are previous CLA signatures still valid after I choose to share the gist with multiple repos or orgs?")]),i("p",[t._v("Yes, but the scope of the previous signatures are still limited to the previous repo or org.")]),i("p",{staticClass:"dialogDesc"},[t._v("What happens if I uncheck the box and choose NOT to share the gist any more?")]),i("p",[t._v("Previous contributors that have signed the shared gist will have to sign again.")])]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})]),i("el-dialog",{attrs:{top:"5vh",title:"",visible:t.linkDialogVisible,width:"35%"},on:{"update:visible":function(e){t.linkDialogVisible=e}}},[i("div",[i("p",{staticClass:"dialogDesc"},[t._v("Would you like to link this CLA to your repository?")]),i("div",[i("el-row",[i("svg-icon",{staticStyle:{width:"100%",height:"100%"},attrs:{"icon-class":"popup_link"}})],1),i("el-row",[i("el-col",{attrs:{offset:6,span:5}},[t._v(" "+t._s(t.claOptions[t.claValue].label)+" ")]),i("el-col",{attrs:{offset:2,span:5}},[t._v(" "+t._s(t.repositoryOptions[t.repositoryValue].label)+" ")])],1)],1),i("div",{staticStyle:{padding:"0 3rem",color:"#409EFF"}}),i("div",{staticStyle:{padding:"2rem 6rem","text-align":"left","font-size":"1.3rem"}},[i("p",{staticStyle:{"text-align":"center"}},[t._v("CLA assistant will...")]),i("ul",[i("li",[t._v("Create a webhook in your repository and listen for pull requests")]),i("li",[t._v("Set a pull request CLA status")]),i("li",[t._v("Comment on pull requests")])])]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.linkDialogVisible=!1}}},[t._v("Cancel")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.linkRepository()}}},[t._v("Yes,Let's do this!")])],1)])]),i("el-dialog",{attrs:{title:"",top:"5vh",visible:t.editDialogVisible,width:"35%"},on:{"update:visible":function(e){t.editDialogVisible=e}}},[i("div",[i("p",{staticClass:"size_b"},[t._v("Edit ooo/Test")]),i("div",{staticClass:"left"},[i("div",[i("span",{staticClass:"size_m"},[t._v("Choose a CLA")])]),i("div",[i("span",[t._v("(please note that changing the CLA results in a new request to sign the CLA from the contributors!)")])]),i("p",{staticClass:"size_m",staticStyle:{"margin-bottom":".2rem"}},[t._v("Select from Gist")]),i("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"select",size:"medium",value:t.claValue},on:{change:t.changeCla},model:{value:t.claValue,callback:function(e){t.claValue=e},expression:"claValue"}},t._l(t.claOptions,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),i("div",{staticClass:"dialogDec"},[t._v(" Email ")]),i("el-input",{attrs:{size:"medium",placeholder:"Input your email"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),i("div",{staticClass:"dialogDec"},[t._v(" - or - ")]),i("div",{staticClass:"dialogDec"},[t._v(" Paste a URL from a Gist ")]),i("div",[i("el-input",{attrs:{size:"medium",placeholder:"https://gist.github.com/<your cla gist id>"},model:{value:t.gistUrl,callback:function(e){t.gistUrl=e},expression:"gistUrl"}})],1),i("div",{staticClass:"dialogDec"},[i("el-checkbox",{model:{value:t.shareGistChecked,callback:function(e){t.shareGistChecked=e},expression:"shareGistChecked"}}),t._v(" Share the Gist "),i("span",{staticClass:"qusLink",on:{click:function(e){t.shareDialogVisible=!0}}},[t._v("(want to share?)")])],1),i("div",{staticClass:"dialogDec"},[t._v(" Minimum File Number Changes ")]),i("div",[i("el-input",{attrs:{type:"number",size:"medium",placeholder:"number"},model:{value:t.fileNumber,callback:function(e){t.fileNumber=e},expression:"fileNumber"}})],1),i("div",{staticClass:"dialogDec"},[t._v(" - or - ")]),i("div",{staticClass:"dialogDec"},[t._v(" Minimum Line Number Changes ")]),i("div",[i("el-input",{attrs:{type:"number",size:"medium",placeholder:"number"},model:{value:t.lineNumber,callback:function(e){t.lineNumber=e},expression:"lineNumber"}})],1),i("div",{staticClass:"dialogDec"},[t._v("Specify usernames to be whitelisted "),i("span",{staticClass:"qusLink"},[t._v("(how does this work?)")])]),i("span",[t._v("(you can also use wildcard *)")]),i("div",{staticClass:"dialogDec"},[i("el-input",{attrs:{size:"medium",placeholder:"user1,user2,*[bot]"},model:{value:t.gistUrl,callback:function(e){t.gistUrl=e},expression:"gistUrl"}})],1),i("div",{staticClass:"dialogDec"},[i("span",[t._v("Request the user's consent to the use of personal data in accordance with your privacy policy. Please, provide a link to your Privacy Policy here")])]),i("div",{staticClass:"dialogDec"},[i("el-input",{attrs:{size:"medium",placeholder:"https://..."},model:{value:t.gistUrl,callback:function(e){t.gistUrl=e},expression:"gistUrl"}})],1)],1),i("div",{staticClass:"right",staticStyle:{margin:"1rem 0"}},[i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.editDialogVisible=!1}}},[t._v("Cancel")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.editDialogVisible=!1}}},[t._v("Save")])],1)])])]),i("el-dialog",{attrs:{title:"",top:"5vh",visible:t.unLinkDialogVisible,width:"35%"},on:{"update:visible":function(e){t.unLinkDialogVisible=e}}},[i("div",[i("p",{staticClass:"dialogDesc",staticStyle:{"margin-top":"0"}},[t._v("Are you sure you want to unlink?")]),i("div",[i("svg-icon",{staticStyle:{width:"30rem",height:"20rem",margin:"auto"},attrs:{"icon-class":"error"}})],1),i("div",{staticStyle:{padding:"0 6rem","text-align":"left","font-size":"1.3rem"}},[i("p",{staticStyle:{"text-align":"center"}},[t._v("Unlinking will...")]),i("ul",[i("li",[t._v("Remove the CLA assistant webhook in your repository/organization ")]),i("li",[t._v("Remove the link to your list of contributors")])])]),i("div",{staticClass:"right"},[i("el-button",{on:{click:function(e){t.unLinkDialogVisible=!1}}},[t._v("Keep it")]),i("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.unLinkRepository()}}},[t._v("Unlink anyway")])],1)])]),i("el-dialog",{attrs:{title:"白名单",top:"5vh",visible:t.listDialogVisible,width:"70%"},on:{"update:visible":function(e){t.listDialogVisible=e}}},[i("div",{staticStyle:{"margin-bottom":"1rem"}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.listData,align:"center"}},[i("el-table-column",{attrs:{prop:"name",label:"Name"}}),i("el-table-column",{attrs:{prop:"email",label:"Email"}}),i("el-table-column",{attrs:{prop:"tel",label:"Tel"}}),i("el-table-column",{attrs:{align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-switch",{attrs:{"active-color":"#409EFF","inactive-color":"#EBEEF5"},model:{value:e.row.isUsed,callback:function(i){t.$set(e.row,"isUsed",i)},expression:"scope.row.isUsed"}}),i("el-button",{staticStyle:{"margin-left":"1rem"},attrs:{type:"danger",size:"mini"}},[t._v("删除 ")])]}}])})],1)],1),i("div",{staticClass:"paginationClass"},[i("el-pagination",{attrs:{background:"","page-size":5,"pager-count":5,"hide-on-single-page":!0,"current-page":t.listCurrentPage,layout:"prev, pager, next",total:t.listData.length},on:{"current-change":t.listChangePage}})],1)])],1)},a=[],s=(i("4160"),i("b0c0"),i("ac1f"),i("1276"),i("159b"),i("96cf"),i("1da1")),n=i("5530"),r=i("221d"),l=i("615a"),c=i("0418"),u=i("fd2d"),h=i("2f62");window.onresize=function(){l["a"]()>document.getElementById("home").offsetHeight&&(document.getElementById("home").style.height=l["a"]()+"px")};var p={name:"Home",components:{Header:c["a"],Footer:u["a"]},data:function(){var t=function(t,e,i){""===e&&i(new Error("请输入账号")),i()},e=function(t,e,i){""===e&&i(new Error("请输入密码")),i()};return{ruleForm:{pass:"",account:""},rules:{account:[{validator:t,trigger:"blur"}],pass:[{validator:e,trigger:"blur"}]},isVerify:!1,activeName:"first",previewShow:!1,previewText:"previewCla",loginType:this.$store.state.loginType,tableTotal:0,listData:[{name:"jack",email:"10577507@qq.com",tel:"15632486433",isUsed:!0},{name:"Rose",email:"105507@163.com",tel:"18832486437",isUsed:!1}],tableType:1,tableShow:!0,currentPage:1,listCurrentPage:1,dropdownTitle:"Linked Repositories",isEmail:!1,email:"",code:"",gitee_client_id:this.$store.state.gitee_client_id,gitee_client_secret:this.$store.state.gitee_client_secret,gitee_redirect_uri:this.$store.state.gitee_redirect_uri,github_client_id:this.$store.state.github_client_id,github_client_secret:this.$store.state.github_client_secret,github_redirect_uri:this.$store.state.github_redirect_uri,access_token:this.$store.state.access_token,refresh_token:this.$store.state.refresh_token,listDialogVisible:!1,checkClaDialogVisible:!1,unLinkDialogVisible:!1,editDialogVisible:!1,menuVisible:!1,claName:"test",repositoryName:"ooo/test",shareGistChecked:!1,claOptions:[{value:"0",label:"test",text:"来而不往非礼也"},{value:"1",label:"share",text:"   学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，    思维              不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔                 ，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆学而不思则罔，思维不学则殆"}],claValue:"0",claChoose:!1,linkDialogVisible:!1,shareDialogVisible:!1,createCLADialogVisible:!1,authorizeDialogVisible:!1,fileNumber:"",lineNumber:"",gistUrl:"",orgOptions:[{value:"0",label:"myOrg"}],orgValue:"0",repositoryOptions:[{value:"0",label:"test"}],repositoryValue:"0",repositoryChoose:"",showConfigForm:!1,tableData:[{repository:"ooo",cla:"test",sharedGist:"Yes",contributors:"0"},{repository:"ooo",cla:"test",sharedGist:"No",contributors:"0"}],tableDataOther:[{repository:"ooo",cla:"test",sharedGist:"Yes",contributors:"0"}],home:{height:""},user:{userName:"",userId:"",isAuthorize:!1}}},methods:Object(n["a"])(Object(n["a"])({},Object(h["b"])(["setLoginUserAct","setTokenAct"])),{},{submitForm:function(t){this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(t){this.$refs[t].resetFields()},tabsHandleClick:function(t,e){console.log(t,e)},getOrgPermission:function(){"0"===this.loginType&&(window.location.href="https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_url=http://localhost:8080/home&scope=repo")},listChangePage:function(t){console.log(t)},changePage:function(t){console.log(t)},handleCommand:function(t){switch(this.dropdownTitle=t,t){case"发布的开源项目":this.tableType=1,this.tableShow=!0,this.currentPage=1,this.tableTotal=this.tableData.length,console.log(this.tableShow);break;case"个人签署的项目":this.tableType=2,this.currentPage=1,this.tableShow=!1,console.log(this.tableShow),this.tableTotal=this.tableDataOther.length;break;case"企业签署的项目":this.tableType=3,this.currentPage=1,this.tableShow=!1,console.log(this.tableShow),this.tableTotal=this.tableDataOther.length;break;case"企业个人签署的项目":this.tableType=4,this.tableShow=!1,this.currentPage=1,console.log(this.tableShow),this.tableTotal=this.tableDataOther.length;break}},getLinkedRepositories:function(){var t=this;console.log("getLinkedRepositories");var e={userName:this.user.userName};this.$axios({url:r["d"],methods:"post",data:e}).then((function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data)})).catch((function(t){console.log(t)}))},getPersonalRepositories:function(){var t=this;console.log("getPersonalRepositories");var e={userName:this.user.userName};this.$axios({url:r["e"],methods:"post",data:e}).then((function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data)})).catch((function(t){console.log(t)}))},getCompanyRepositories:function(){var t=this;console.log("getCompanyRepositories");var e={userName:this.user.userName};this.$axios({url:r["c"],methods:"post",data:e}).then((function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data)})).catch((function(t){console.log(t)}))},getCompanyPersonRepositories:function(){var t=this;console.log("getCompanyPersonRepositories");var e={userName:this.user.userName};this.$axios({url:r["b"],methods:"post",data:e}).then((function(e){console.log(e),200===e.data.code&&(t.tableData=e.data.data)})).catch((function(t){console.log(t)}))},newWindow:function(){window.open("https://github.com/ouchengle")},openLinkDialog:function(){this.repositoryChoose&&this.claChoose&&this.isEmail&&(this.linkDialogVisible=!0)},verifyEmail:function(){var t=this.email;console.log(t);var e=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;if(!e.test(t))return this.isEmail=!1,!1;this.isEmail=!0},unLinkRepository:function(){var t=this;this.linkDialogVisible=!1;var e={repositoryValue:this.repositoryValue,claValue:this.claValue};this.$axios({url:r["j"],methods:"post",data:e}).then((function(e){console.log(e),200===e.data.code&&(t.repositoryOptions=e.data.data,t.$message.success("解绑成功"),t.unLinkDialogVisible=!1)})).catch((function(t){console.log(t)}))},linkRepository:function(){this.linkDialogVisible=!1;var t={repositoryId:this.repositoryOptions[this.repositoryValue].id,claId:this.claOptions[this.claValue].id,email:this.email,platform:this.platform,orgId:this.orgOptions[this.orgValue].id};this.$axios({url:"/api"+r["h"],methods:"post",data:t}).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))},checkCla:function(){console.log("checkCla"),this.$router.push("/checkCla")},editHandleClick:function(t){console.log(t),this.editDialogVisible=!0},toCreateCLA:function(){this.$router.push("/createCLA")},changeCla:function(t){this.claValue=t,this.claChoose=!0,console.log(t),this.previewText=this.claOptions[t].text},createCLA:function(){console.log("authorize"),this.createCLADialogVisible=!0},authorize:function(){console.log("authorize"),this.authorizeDialogVisible=!0},changeRepository:function(t){console.log(t),this.repositoryChoose=!0,this.repositoryValue=t},getRepository:function(){var t=this;console.log("getRepository");var e={access_token:this.access_token,admin:!0,page:1,per_page:10};this.$axios({url:r["f"],methods:"get",params:e}).then((function(e){console.log(e),200===e.status&&e.data.forEach((function(i,o){t.repositoryOptions.push({value:o,label:e.data[o].login})}))})).catch((function(t){console.log(t)}))},getCLA:function(){var t=this;console.log("getCLA"),this.$axios({url:"/api"+r["a"],headers:{access_token:this.access_token,refresh_token:this.refresh_token}}).then((function(e){console.log(e),e.data.length&&(t.claOptions=[],e.data.forEach((function(e,i){t.claOptions.push({value:i,label:e.name,id:e.id,text:e.text})})))})).catch((function(t){console.log(t)}))},closeConfigForm:function(){this.showConfigForm=!1,this.setClientHeight()},configCla:function(){this.showConfigForm=!0,this.home.height="auto",this.getCLA(),this.getRepository()},setClientHeight:function(){var t=this;this.$nextTick((function(){l["a"]()>document.getElementById("home").offsetHeight?t.home.height=l["a"]()+"px":t.home.height=document.getElementById("home").offsetHeight}))},change:function(t){console.log(t),this.value=t},getCookieData:function(){console.log("getCookieData");var t,e=document.cookie.split("; "),i="";e.forEach((function(e,o){var a=e.split("=");"access_token"===a[0]?t=a[1]:i="refresh_token"===a[0]?a[1]:""}));var o={access_token:t,refresh_token:i};this.setTokenAct(o)},getUserInfo:function(){var t=this,e={access_token:this.access_token};this.$axios({url:r["g"],params:e}).then((function(e){if(console.log(e),200===e.status){var i={userId:e.data.id,userName:e.data.login,userImg:e.data.avatar_url,userEmail:e.data.email};t.setLoginUserAct(i)}})).catch((function(t){console.log(t)}))}}),created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getCookieData();case 2:return e.next=4,t.getUserInfo();case 4:case"end":return e.stop()}}),e)})))()},mounted:function(){this.setClientHeight()}},d=p,f=(i("2aa3"),i("2877")),g=Object(f["a"])(d,o,a,!1,null,"f718fc56",null);e["default"]=g.exports},dbb4:function(t,e,i){var o=i("23e7"),a=i("83ab"),s=i("56ef"),n=i("fc6a"),r=i("06cf"),l=i("8418");o({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,i,o=n(t),a=r.f,c=s(o),u={},h=0;while(c.length>h)i=a(o,e=c[h++]),void 0!==i&&l(u,e,i);return u}})},e439:function(t,e,i){var o=i("23e7"),a=i("d039"),s=i("fc6a"),n=i("06cf").f,r=i("83ab"),l=a((function(){n(1)})),c=!r||l;o({target:"Object",stat:!0,forced:c,sham:!r},{getOwnPropertyDescriptor:function(t,e){return n(s(t),e)}})},e538:function(t,e,i){var o=i("b622");e.f=o}}]);
//# sourceMappingURL=chunk-6ac1e37e.3d435d46.js.map