function loadInsight(e,a){let t=$(".searchbox"),n=t.find(".searchbox-input"),o=t.find(".searchbox-body");function l(t,e,n){if(!Array.isArray(e)||!e.length||!t)return n?t.slice(0,n):t;let r=t.toLowerCase();e=e.map(e=>{var t=r.indexOf(e.toLowerCase());return e&&-1!==t?[t,t+e.length]:null}).filter(e=>null!==e).sort((e,t)=>e[0]-t[0]||e[1]-t[1]);if(!e.length)return t;let s="",a=0;var o=function(e){let t,n=[];return e.forEach(e=>{!t||e[0]>t[1]?n.push(t=e):e[1]>t[1]&&(t[1]=e[1])}),n}(e),l=[o[0][0],o[o.length-1][1]];n&&n<l[1]&&(a=l[0]);for(let e=0;e<o.length;e++){var i=o[e];if(s+=t.slice(a,Math.min(i[0],l[0]+n)),n&&i[0]>=l[0]+n)break;s+="<em>"+t.slice(i[0],i[1])+"</em>",a=i[1],e===o.length-1&&(s+=n?t.slice(i[1],Math.min(t.length,l[0]+n+1)):t.slice(i[1]))}return s}function i(e,t,n,r,s){return`<a class="searchbox-result-item" href="${s}">
            <span class="searchbox-result-icon">
                <i class="fa fa-${e}" />
            </span>
            <span class="searchbox-result-content">
                <span class="searchbox-result-title">
                    ${t=null!=t&&""!==t?t:a.untitled}
                    ${n?'<span class="searchbox-result-title-secondary">('+n+")</span>":""}
                </span>
                ${r?'<span class="searchbox-result-preview">'+r+"</span>":""}
            </span>
        </a>`}function c(r,s,e){let t;if(0===e.length)return null;var n=a[s.toLowerCase()];switch(s){case"POSTS":case"PAGES":t=e.map(e=>{return i("file",l(e.title,r),null,l(e.text,r,100),e.link)});break;case"CATEGORIES":case"TAGS":t=e.map(e=>{var t=l(e.name,r),n=l(e.slug,r);return i("CATEGORIES"===s?"folder":"tag",t,n,null,e.link)});break;default:return null}return n=n,$("<section>").addClass("searchbox-result-section").append($("<header>").text(n)).append(t)}function u(e){return e.split(" ").filter(e=>!!e).map(e=>e.toLowerCase())}function h(e,n,r){e=u(e);return e.filter(t=>{return 0<r.filter(e=>!!Object.prototype.hasOwnProperty.call(n,e)&&-1<n[e].toLowerCase().indexOf(t)).length}).length===e.length}function p(e,r,t,s){let a=0;return u(e).forEach(e=>{let n=new RegExp(e,"img");t.forEach((e,t)=>{Object.prototype.hasOwnProperty.call(r,e)&&(e=r[e].match(n),a+=e?e.length*s[t]:0)})}),a}function f(e,t){let n={post:function(e){return p(r,e,["title","text"],[3,1])},page:function(e){return p(r,e,["title","text"],[3,1])},category:function(e){return p(r,e,["name","slug"],[1,1])},tag:function(e){return p(r,e,["name","slug"],[1,1])}};s=r=t;var r,s,t={post:function(e){return h(s,e,["title","text"])},page:function(e){return h(s,e,["title","text"])},category:function(e){return h(s,e,["name","slug"])},tag:function(e){return h(s,e,["name","slug"])}},a=e.posts,o=e.pages,l=e.tags,e=e.categories;return{posts:a.filter(t.post).sort((e,t)=>n.post(t)-n.post(e)).slice(0,5),pages:o.filter(t.page).sort((e,t)=>n.page(t)-n.page(e)).slice(0,5),categories:e.filter(t.category).sort((e,t)=>n.category(t)-n.category(e)).slice(0,5),tags:l.filter(t.tag).sort((e,t)=>n.tag(t)-n.tag(e)).slice(0,5)}}function r(e){var t=$.makeArray(o.find(".searchbox-result-item"));let n=-1;t.forEach((e,t)=>{$(e).hasClass("active")&&(n=t)});var r,s,e=(t.length+n+e)%t.length;$(t[n]).removeClass("active"),$(t[e]).addClass("active"),0!==(t=$(t[e])).length&&(e=o[0].clientHeight,r=t.position().top-o.scrollTop(),(s=t[0].clientHeight+t.position().top)>e+o.scrollTop()&&o.scrollTop(s-o[0].clientHeight),r<0)&&o.scrollTop(t.position().top)}function s(e){e&&e.length&&(location.href=e.attr("href"))}$.getJSON(e.contentUrl,s=>{"#insight-search"===location.hash.trim()&&t.addClass("show"),n.on("input",function(){var e,t=$(this).val(),n=t,r=f(s,t);for(e in o.empty(),r)o.append(c(u(n),e.toUpperCase(),r[e]))}),n.trigger("input")});let g=!1;$(document).on("click focus",".navbar-main .search",()=>{t.addClass("show"),t.find(".searchbox-input").focus()}).on("click touchend",".searchbox-result-item",function(e){"click"!==e.type&&!g||(s($(this)),g=!1)}).on("click touchend",".searchbox-close",e=>{"click"!==e.type&&!g||($(".navbar-main").css("pointer-events","none"),setTimeout(()=>{$(".navbar-main").css("pointer-events","auto")},400),t.removeClass("show"),g=!1)}).on("keydown",e=>{if(t.hasClass("show"))switch(e.keyCode){case 27:t.removeClass("show");break;case 38:r(-1);break;case 40:r(1);break;case 13:s(o.find(".searchbox-result-item.active").eq(0))}}).on("touchstart",e=>{g=!0}).on("touchmove",e=>{g=!1})}