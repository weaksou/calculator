const e=document.getElementById("calculationInput"),t=document.querySelector(".calculator-body"),a=document.querySelector(".previous-operator");function c(){let t=e.value;t.length>=10?e.classList.add("fs30"):t.length<=10&&e.classList.remove("fs30")}let o,n,l,r;e.addEventListener("input",c);let u=["0"],s=u.length;t.addEventListener("click",(d=>{if(d.target.matches("button")){const p=d.target,y=p.dataset.action,v=p.textContent,m=e.value;if(y||(e.value="0"===m||"operator"===o||"calculate"===o?v:m+v,o="number"),"add"===y||"subtract"===y||"multiply"===y||"divide"===y||"divideByTwo"===y||"supTwo"===y||"percentage"===y||"powx"===y||"rootsquare"===y){if(n&&l&&"operator"!==o&&"calculate"!==o){const t=i(n,l,m);e.value=t,n=t}else n=m;o="operator",l=y}"decimal"===y&&(m.includes(".")?"operator"===o&&(m.value="0."):e.value=m+".",o="decimal");const k=t.querySelector('[data-action="clear"]');if("clear"===y&&("AC"===k.textContent?(n="",r="",l="",o="",a.textContent=""):p.textContent="AC",e.value="0",o="clear"),"clear"!==y&&"backspace"!==y&&(k.textContent="CE"),"equal"===y){const t=n,c=l,s=m;if(t){"equal"===o&&(t=m,s=r);const n=i(t,c,s);e.value=n,a.innerHTML=function(e,t,a){switch(t){case"add":return e+" + "+a;case"subtract":return e+" - "+a;case"multiply":return e+" x "+a;case"divide":return e+" &#247; "+a;case"divideByTwo":return e+" &#247; 2 "+a;case"supTwo":return e+" <sup>2</sup> "+a;case"percentage":return e+" % "+a;case"powx":return e+"<sup>"+a+"</sup>";case"rootsquare":return"&radic;"+e}}(t,c,s),u.push(n)}o="calculate"}if("divideByTwo"===y&&(o="divideByTwo"),"backspace"===y){let t=m;if("0"!==t){let t=m.slice(0,-1);e.value=t}""===t&&(e.value="0"),o="backspace"}if("supTwo"===y&&(o="supTwo"),"ans"===y){s=u.length;e.value=u[s-1],console.log(u),console.log(s),o="ans"}c()}}));const i=(e,t,a)=>{const c=parseFloat(e),o=parseFloat(a);return"add"===t?c+o:"subtract"===t?c-o:"multiply"===t?c*o:"divide"===t?c/o:"divideByTwo"===t?c/2:"supTwo"===t?Math.pow(c,2):"percentage"===t?c%o:"powx"===t?Math.pow(c,o):"rootsquare"===t?Math.sqrt(c):void 0};function d(e){document.getElementById(e).click()}const p=["0","1","2","3","4","5","6","7","8","9"],y=document.getElementById("equal");document.addEventListener("keydown",(function(e){void t.querySelectorAll("button").forEach((e=>{e.blur()})),("Enter"===e.key||"="===e.key)&&y.click();for(let t=0;t<p.length;t++){const a=p[t];if(e.key.includes(a)){let t=parseInt(e.key);document.getElementById("num"+t).click()}}"+"!==e.key&&"p"!==e.key||d("add");"-"===e.key&&d("subtract");"/"===e.key&&d("divide");"*"!==e.key&&"x"!==e.key||d("multiply");"Backspace"===e.key&&d("backspace")}));const v=document.querySelector(".calculator-head"),m=v.querySelector("#clickDiv"),k=document.querySelector("#inputToolTip").querySelector(".textContent");m.addEventListener("click",(()=>{const t=e.value.slice(0,1e3);navigator.clipboard.writeText(t),k.textContent="Copied!"})),v.addEventListener("mouseleave",(()=>{setTimeout((()=>{k.textContent="Copy"}),200)}));
//# sourceMappingURL=index.355dde7e.js.map
