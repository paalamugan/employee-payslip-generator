(this["webpackJsonppayslip-generator-client"]=this["webpackJsonppayslip-generator-client"]||[]).push([[0],{125:function(e,t,n){},130:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(12),i=n.n(r),s=n(187),o=n(186),l=n(58),u=25e3,m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return u*e/100},j={company:{icon:null,iconUrl:"",name:"Mycompany pvt ltd.",address:"250, S-BLock, 27 Street, Adayar, Chennai: 600027"},employee:{name:"John Deo",email:"johndeo123@gmail.com",id:"emp01",position:"Software Engineer",joiningDate:n.n(l)()("2020-04-08").format(),uan:"201017181120",accountNumber:"8718927610892",pfAccountNumber:"TN/AAA/00000/000/00000",paidDays:28,lopDays:3},earnings:[{name:"Basic pay",amount:u},{name:"House Rent Allowance",amount:m(20)},{name:"Dearness Allowance",amount:m(15)}],deductions:[{name:"Provident Fund",amount:m(12)},{name:"Income Tax",amount:m(5)}],reimbursements:[{name:"Medical Reimbursement",amount:m(20)},{name:"Conveyance Reimbursement",amount:m(2)}]},d=n(67),b=n(97),p=Object(b.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"rgb(220, 0, 78)"},error:{main:d.a.A400},background:{default:"#fff"}}}),O=(n(125),n(14)),h=n(22),g=n(31),x=n(32),f=n(132),y=n(177),v=n(103),D=n(95),C=n.n(D),N=n(96),w=n.n(N),S=n(179),I=n(178),k=n(173),A=n(189),B=n(194),R=n(90),T=n.n(R),E=n(174),U=n(192),W=n(99),F=n(191),L=n(190),z=n(4);function P(e){var t=e.open,n=e.duration,a=void 0===n?5e3:n,c=e.onClose,r=void 0===c?function(){}:c,i=e.anchorOrigin,s=void 0===i?{vertical:"top",horizontal:"center"}:i,o=e.type,l=Object(W.a)(e,["open","duration","onClose","anchorOrigin","type"]);if(!o||!l.children)return null;var u=function(e,t){"clickaway"!==t&&r(!1)};return Object(z.jsx)(F.a,{open:t,anchorOrigin:s,autoHideDuration:a,onClose:u,children:Object(z.jsx)(L.a,Object(O.a)({onClose:u,elevation:6,variant:"filled",severity:o},l))})}var q=Object(a.forwardRef)((function(e,t){var n=e.templateData,r=e.classes,i=Object(a.useState)(Object(O.a)({},n.current.company)),s=Object(h.a)(i,2),o=s[0],l=s[1],u=Object(a.useState)(!1),m=Object(h.a)(u,2),j=m[0],d=m[1],b=Object(a.useState)(!1),p=Object(h.a)(b,2),x=p[0],f=p[1];Object(a.useImperativeHandle)(t,(function(){return{set:function(e){l(e)},reset:function(e){l(e)}}}));var D=function(e){return function(t){var a="icon"===e?t.target.files[0]:t.target.value;if(a&&a.type&&!a.type.includes("image"))return f(!0);n.current.company[e]=a,l(Object(O.a)(Object(O.a)({},o),{},Object(g.a)({},e,a)))}};return Object(z.jsxs)(c.a.Fragment,{children:[Object(z.jsx)(v.a,{variant:"h6",gutterBottom:!0,children:"Company Information"}),Object(z.jsx)(P,{open:x,onClose:f,type:"error",children:"Support only image format.(svg, png, jpg)"}),Object(z.jsxs)(k.a,{container:!0,spacing:3,className:r.girdButton,children:[Object(z.jsxs)(k.a,{item:!0,xs:12,sm:6,children:[Object(z.jsx)(E.a,{control:Object(z.jsx)(U.a,{checked:j,onChange:function(e){var t=e.target.checked;t?n.current.company.iconUrl="":n.current.company.icon=null,l(Object(O.a)({},n.current.company)),d(t)},color:"primary"}),label:"Enable Icon URL"}),j?Object(z.jsx)(k.a,{item:!0,xs:12,children:Object(z.jsx)(A.a,{required:!0,id:"companyIconUrl",name:"companyIconUrl",label:"Company Icon URL",autoComplete:"off",value:o.iconUrl,onChange:D("iconUrl"),fullWidth:!0})}):Object(z.jsxs)("div",{className:r.root,children:[Object(z.jsx)("input",{accept:"image/*",className:r.input,id:"companyIcon",name:"companyIcon",type:"file",onChange:D("icon")}),Object(z.jsx)("div",{className:r.uploadText,children:o.icon&&o.icon.name?o.icon.name:"No files chosen"}),Object(z.jsx)("label",{htmlFor:"companyIcon",className:r.uploadButton,children:Object(z.jsx)(B.a,{title:"Choose your company icon",arrow:!0,placement:"top",children:Object(z.jsx)(y.a,{variant:"contained",component:"span",size:"small",startIcon:Object(z.jsx)(T.a,{}),children:"Upload Icon"})})})]})]}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,style:{display:"flex",alignItems:"flex-end"},children:Object(z.jsx)(A.a,{required:!0,id:"companyName",name:"companyName",label:"Company name",autoComplete:"off",value:o.name,onChange:D("name"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,children:Object(z.jsx)(A.a,{required:!0,id:"companyAddress",name:"companyAddress",label:"Company Address",value:o.address,onChange:D("address"),fullWidth:!0})})]})]})})),Y=n(91),M=n(17),G=n(188),H=Object(a.forwardRef)((function(e,t){var n=e.templateData,c=e.classes,r=Object(a.useState)(Object(O.a)({},n.current.employee)),i=Object(h.a)(r,2),s=i[0],o=i[1],l=function(e){return function(t){var a="joiningDate"===e?t&&t.format():t.target.value;n.current.employee[e]=a,o(Object(O.a)(Object(O.a)({},s),{},Object(g.a)({},e,a)))}};return Object(a.useImperativeHandle)(t,(function(){return{set:function(e){o(e)},reset:function(e){o(e)}}})),Object(z.jsxs)(a.Fragment,{children:[Object(z.jsx)(v.a,{variant:"h6",gutterBottom:!0,children:"Employee Information"}),Object(z.jsxs)(k.a,{container:!0,spacing:3,className:c.girdButton,children:[Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{required:!0,id:"employeeName",name:"employeeName",label:"Employee Name",value:s.name,onChange:l("name"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{required:!0,id:"employeeEmail",name:"employeeEmail",label:"Employee Email",type:"email",value:s.email,onChange:l("email"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{required:!0,id:"position",name:"position",label:"Employee Position",value:s.position,onChange:l("position"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{required:!0,id:"employeeId",name:"employeeId",label:"Employee Id",value:s.id,onChange:l("id"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(M.a,{utils:Y.a,children:Object(z.jsx)(G.a,{disableToolbar:!0,variant:"inline",format:"YYYY-MM-DD",id:"joiningDate",name:"joiningDate",label:"Joining Date (YYYY-MM-DD)",value:s.joiningDate,onChange:l("joiningDate"),KeyboardButtonProps:{"aria-label":"joining date"},fullWidth:!0})})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{required:!0,id:"accountNumber",name:"accountNumber",label:"Account Number",value:s.accountNumber,onChange:l("accountNumber"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{id:"pfAccountNumber",name:"pfAccountNumber",label:"PF Account Number",value:s.pfAccountNumber,onChange:l("pfAccountNumber"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{id:"uan",name:"uan",label:"Universal Account Number (UAN)",value:s.uan,onChange:l("uan"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{required:!0,type:"number",id:"paidDays",name:"paidDays",label:"Paid Days",value:s.paidDays,onChange:l("paidDays"),fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:12,sm:6,children:Object(z.jsx)(A.a,{required:!0,type:"number",id:"lopDays",name:"lopDays",label:"LOP Days",value:s.lopDays,onChange:l("lopDays"),fullWidth:!0})})]})]})})),J=n(98),V=n(180),K=n(184),$=n(183),_=n(181),Q=n(182),X=n(172),Z=n(93),ee=n.n(Z),te=n(92),ne=n.n(te),ae=n(68),ce=Object(a.forwardRef)((function(e,t){var n=e.type,r=e.templateData,i=e.classes,s=Object(a.useState)({name:"",amount:""}),o=Object(h.a)(s,2),l=o[0],u=o[1],m=Object(x.capitalize)(n)+"s",j=n+"s",d="earning"===n?"Gross Earnings":"deduction"===n?"Total Deductions":"reimbursement"===n?"Total Reimbursements":"";Object(a.useImperativeHandle)(t,(function(){return{set:function(e){u({name:"",amount:""})},reset:function(e){u({name:"",amount:""})}}}));var b=function(e){return function(t){r.current[j].splice(e,1),u({name:"",amount:""})}};return Object(z.jsxs)(c.a.Fragment,{children:[Object(z.jsx)(v.a,{variant:"h6",gutterBottom:!0,children:Object(z.jsx)("span",{children:m})}),Object(z.jsxs)(k.a,{container:!0,spacing:3,alignItems:"flex-end",className:i.marginBottom2,children:[Object(z.jsx)(k.a,{item:!0,xs:5,children:Object(z.jsx)(A.a,{id:"".concat(n,"-name"),name:"name",label:"Name",value:l.name,onChange:function(e){return u(Object(O.a)(Object(O.a)({},l),{},{name:e.target.value}))},fullWidth:!0})}),Object(z.jsx)(k.a,{item:!0,xs:5,children:Object(z.jsx)(ae.a,{id:"".concat(n,"-amount"),fullWidth:!0,label:"Amount",value:l.amount,customInput:A.a,thousandSeparator:!0,thousandsGroupStyle:"lakh",prefix:"\u20b9",onValueChange:function(e){e.formattedValue;var t=e.value;u(Object(O.a)(Object(O.a)({},l),{},{amount:t}))}})}),Object(z.jsx)(k.a,{item:!0,xs:2,children:Object(z.jsx)(y.a,{size:"small",className:i.addButton,variant:"contained",startIcon:Object(z.jsx)(ne.a,{}),onClick:function(e){var t=r.current[j]||[];r.current[j]=[].concat(Object(J.a)(t),[l]),u({name:"",amount:""})},disabled:!l.name||!l.amount,children:"Add"})})]}),r.current[j]&&r.current[j].length?Object(z.jsx)(k.a,{container:!0,spacing:3,className:i.girdButton,children:Object(z.jsx)(k.a,{item:!0,xs:12,style:{marginRight:"24px"},children:Object(z.jsxs)(V.a,{size:"small",children:[Object(z.jsx)(_.a,{children:Object(z.jsxs)(Q.a,{children:[Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"},children:"Name"}),Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)",width:"20%"},align:"right",children:"Amount(\u20b9)"}),Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)",width:"10%"},align:"right"})]})}),Object(z.jsxs)(K.a,{children:[r.current[j].map((function(e,t){return Object(z.jsxs)(Q.a,{children:[Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"},children:e.name}),Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"},align:"right",children:Object(z.jsx)(ae.a,{value:e.amount,displayType:"text",thousandSeparator:!0,thousandsGroupStyle:"lakh",prefix:"\u20b9"})}),Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"},align:"right",children:Object(z.jsx)(X.a,{color:"secondary",onClick:b(t),children:Object(z.jsx)(ee.a,{fontSize:"small"})})})]},t)})),Object(z.jsxs)(Q.a,{children:[Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"},children:Object(z.jsx)("b",{children:d})}),Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"},align:"right",children:Object(z.jsx)("b",{children:Object(z.jsx)(ae.a,{value:r.current[j].reduce((function(e,t){return e+ +t.amount}),0),displayType:"text",thousandSeparator:!0,thousandsGroupStyle:"lakh",prefix:"\u20b9"})})}),Object(z.jsx)($.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"},align:"right",children:Object(z.jsx)("div",{style:{height:"35px"}})})]},"total-".concat(j))]})]})})}):null]})})),re=n(94),ie=n.n(re),se=n(185);function oe(e){var t=e.result,n=e.setResult,c=void 0===n?function(){}:n,r=e.classes;return Object(z.jsx)(a.Fragment,{children:Object(z.jsxs)("div",{className:r.marginTop3,children:[Object(z.jsx)(k.a,{container:!0,justify:"flex-end",className:r.marginBottom2,children:Object(z.jsx)(y.a,{variant:"outlined",color:"primary",startIcon:Object(z.jsx)(ie.a,{}),size:"small",onClick:function(){return c(null)},children:"Back"})}),Object(z.jsxs)(L.a,{severity:"success",className:r.marginBottom2,children:[Object(z.jsx)(se.a,{children:"Success"}),t.to&&"ethereal"!==t.type?Object(z.jsxs)("span",{children:["Successfully Email Sent to - ",Object(z.jsx)("strong",{children:t.to})]}):null,"ethereal"===t.type?Object(z.jsxs)("div",{children:[" ",Object(z.jsx)("span",{children:"Successfully Email Generator."}),Object(z.jsx)(y.a,{size:"small",href:t.url,color:"primary",target:"_blank",children:"Click here to View Mail"})," "]}):null]})]})})}var le,ue="".concat("/api","/payslip"),me=Object(I.a)((function(e){return{layout:Object(g.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2),opacity:.9},e.breakpoints.up(600+2*e.spacing(2)),{width:800,marginLeft:"auto",marginRight:"auto"}),paper:Object(g.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(3),marginBottom:e.spacing(6),padding:e.spacing(3)}),section:{marginTop:e.spacing(4)},root:{marginTop:e.spacing(2),display:"flex",alignItems:"center",justifyContent:"space-between"},input:{display:"none"},uploadButton:{cursor:"pointer",minWidth:"135px"},uploadText:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},girdButton:{marginBottom:e.spacing(3)},addButton:{marginLeft:e.spacing(1)},marginBottom2:{marginBottom:e.spacing(2)},buttons:{display:"flex",justifyContent:"flex-end",marginTop:e.spacing(1),marginBottom:e.spacing(2)},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)},floatRight:{float:"right"},marginTop3:{marginTop:e.spacing(3)}}})),je={company:{icon:null,iconUrl:"",name:"",address:""},employee:{name:"",email:"",id:"",position:"",joiningDate:null,uan:"",accountNumber:"",pfAccountNumber:"",paidDays:0,lopDays:0},earnings:[],deductions:[],reimbursements:[]};function de(){var e=me(),t=Object(a.useState)(null),n=Object(h.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)({open:!1,type:"",children:""}),s=Object(h.a)(i,2),o=s[0],l=s[1],u=Object(a.useState)(!1),m=Object(h.a)(u,2),d=m[0],b=m[1],p=Object(a.useState)(!1),g=Object(h.a)(p,2),D=g[0],N=g[1],I=Object(a.useRef)(Object(x.cloneDeep)(je)),k=Object(a.useRef)(),A=Object(a.useRef)(),B=Object(a.useRef)(),R=Object(a.useRef)(),T=Object(a.useRef)(),E=function(e){return function(t){t.preventDefault(),I.current.type=e,"download"===e?b(!0):N(!0);var n=new FormData;for(var a in I.current)if(Object(x.isObject)(I.current[a])&&!Object(x.isArray)(I.current[a]))for(var c in I.current[a])I.current[a][c]&&n.append(a+c.charAt(0).toUpperCase()+c.slice(1),I.current[a][c]);else Object(x.isArray)(I.current[a])?n.append(a,JSON.stringify(I.current[a])):I.current[a]&&n.append(a,I.current[a]);var i="payslip.pdf";fetch(ue,{method:"POST",body:n}).then((function(t){if(!t.ok)return t.json();var n=t.headers.get("content-disposition");return n&&(i=n.replace(/.*="|"$/g,"")),"download"===e?t.blob():t.json()})).then((function(e){if(e.status&&e.status>399)throw new Error(e.message);return e})).then((function(t){if("download"===e){var n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=i,n.click(),URL.revokeObjectURL(n.href),b(!1),l({open:!0,type:"success",children:"Successfully Downloaded."})}else N(!1),r(t)})).catch((function(t){l({open:!0,type:"error",children:t.message}),"download"===e?b(!1):N(!1)}))}};return Object(z.jsxs)(a.Fragment,{children:[Object(z.jsx)(P,Object(O.a)(Object(O.a)({},o),{},{duration:5e3,onClose:function(){return l(Object(O.a)(Object(O.a)({},o),{},{open:!1}))}})),Object(z.jsx)("main",{className:e.layout,children:Object(z.jsxs)(f.a,{elevation:0,className:e.paper,children:[Object(z.jsx)(v.a,{component:"h1",variant:"h4",align:"center",gutterBottom:!0,children:"Employee Payslip Generator"}),c?Object(z.jsx)(oe,{result:c,setResult:r,classes:e}):Object(z.jsxs)(a.Fragment,{children:[Object(z.jsxs)("section",{className:e.section,children:[Object(z.jsx)(y.a,{variant:"contained",size:"small",className:e.floatRight,onClick:function(){I.current=Object(x.cloneDeep)(j),k.current.set(I.current.company),A.current.set(I.current.employee),B.current.set(I.current.earnings),R.current.set(I.current.deductions),T.current.set(I.current.reimbursements)},children:"Apply with Sample Data"}),Object(z.jsx)(q,{templateData:I,classes:e,ref:k}),Object(z.jsx)(H,{templateData:I,classes:e,ref:A}),Object(z.jsx)(ce,{type:"earning",templateData:I,classes:e,ref:B}),Object(z.jsx)(ce,{type:"deduction",templateData:I,classes:e,ref:R}),Object(z.jsx)(ce,{type:"reimbursement",templateData:I,classes:e,ref:T})]}),Object(z.jsxs)("div",{className:e.buttons,children:[Object(z.jsx)(y.a,{variant:"contained",onClick:function(){I.current=Object(x.cloneDeep)(je),k.current.reset(I.current.company),A.current.reset(I.current.employee),B.current.reset(I.current.earnings),R.current.reset(I.current.deductions),T.current.reset(I.current.reimbursements)},className:e.button,children:"Reset"}),Object(z.jsx)(y.a,{variant:"contained",color:"primary",startIcon:d?Object(z.jsx)(S.a,{size:24,thickness:4,value:100}):Object(z.jsx)(C.a,{}),onClick:E("download"),disabled:d,className:e.button,children:"Download as PDF"}),Object(z.jsx)(y.a,{variant:"contained",color:"primary",startIcon:D?Object(z.jsx)(S.a,{size:24,thickness:4,value:100}):Object(z.jsx)(w.a,{}),onClick:E("email"),disabled:D,className:e.button,children:"Send as Email"})]})]})]})})]})}i.a.render(Object(z.jsx)(o.a,{theme:p,children:Object(z.jsx)(s.a,{children:Object(z.jsx)(de,{})})}),document.getElementById("root")),le&&le instanceof Function&&n.e(3).then(n.bind(null,195)).then((function(e){var t=e.getCLS,n=e.getFID,a=e.getFCP,c=e.getLCP,r=e.getTTFB;t(le),n(le),a(le),c(le),r(le)}))}},[[130,1,2]]]);
//# sourceMappingURL=main.b9e75b1d.chunk.js.map