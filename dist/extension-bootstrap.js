!function(){"use strict";const e=globalThis.singlefileBootstrap;let t,o,n,s,a,r,i;async function d(){if(void 0!==document.documentElement.dataset.sfz){const e=new XMLHttpRequest;e.open("GET",location.href),e.send(),e.responseType="arraybuffer",e.onload=()=>c(e.response),e.onerror=()=>{let e=[];browser.runtime.onMessage.addListener((e=>{"singlefile.multipartResponse"==e.method&&o(e)}));const t=document.getElementById("sfz-error-message");function o(t){t.error?browser.runtime.onMessage.removeListener(o):(e.length||document.body.appendChild(document.createTextNode("Please wait...")),e=t.truncated?e.concat(t.array):t.array,t.truncated&&!t.finished||(browser.runtime.onMessage.removeListener(o),c(e)))}t&&t.remove(),browser.runtime.sendMessage({method:"singlefile.multipartFetch",url:location.href})}}else if(document.body&&1==document.body.childNodes.length&&"PRE"==document.body.childNodes[0].tagName&&/<html[^>]* data-sfz[^>]*>/i.test(document.body.childNodes[0].textContent)){const e=(new DOMParser).parseFromString(document.body.childNodes[0].textContent,"text/html");document.replaceChild(e.documentElement,document.documentElement),document.querySelectorAll("script").forEach((e=>{const t=document.createElement("script");t.textContent=e.textContent,e.parentElement.replaceChild(t,e)})),await d()}}function c(e){const t=document.createElement("script");t.textContent="this.bootstrap(["+new Uint8Array(e).toString()+"])",document.body.appendChild(t)}async function l(t){return n&&"content.autosave"==t.method?(async function(e){o=e.options,"complete"!=document.readyState&&await new Promise((e=>globalThis.addEventListener("load",e)));await u(),o.autoSaveRepeat&&setTimeout((()=>{n&&!a&&(r=!1,o.autoSaveDelay=0,l(e))}),1e3*o.autoSaveRepeatDelay)}(t),{}):"content.maybeInit"==t.method?(m(),{}):"content.init"==t.method?(o=t.options,n=t.autoSaveEnabled,p(),{}):"devtools.resourceCommitted"==t.method?(e.pageInfo.updatedResources[t.url]={content:t.content,type:t.type,encoding:t.encoding},{}):"common.promptValueRequest"==t.method?(browser.runtime.sendMessage({method:"tabs.promptValueResponse",value:prompt("SingleFileZ: "+t.promptMessage)}),{}):void 0}function m(){i==location.href||e.pageInfo.processing||(r=!1,i=location.href,browser.runtime.sendMessage({method:"tabs.init"}),browser.runtime.sendMessage({method:"ui.processInit"}))}async function u(){const t=e.helper;if((!a||s)&&!r)if(a=!0,o.autoSaveDelay&&!s)await new Promise((e=>s=setTimeout(e,1e3*o.autoSaveDelay))),await u();else{const n=window._singleFileZ_waitForUserScript;let i,d=[];s=null,!o.removeFrames&&globalThis.frames&&globalThis.frames.length&&(d=await e.processors.frameTree.getAsync(o)),i=d&&d.sessionId,o.userScriptEnabled&&n&&await n(t.ON_BEFORE_CAPTURE_EVENT_NAME);const c=t.preProcessDoc(document,globalThis,o);f(c,d),i&&e.processors.frameTree.cleanup(i),t.postProcessDoc(document,c.markedElements),o.userScriptEnabled&&n&&await n(t.ON_AFTER_CAPTURE_EVENT_NAME),r=!0,a=!1}}function p(){n&&o&&(o.autoSaveUnload||o.autoSaveLoadOrUnload)?t||(globalThis.addEventListener("unload",h),t=!0):(globalThis.removeEventListener("unload",h),t=!1)}function h(){const t=e.helper;if(!r||o.autoSaveUnload){const n=window._singleFileZ_waitForUserScript;let s=[];!o.removeFrames&&globalThis.frames&&globalThis.frames.length&&(s=e.processors.frameTree.getSync(o)),o.userScriptEnabled&&n&&n(t.ON_BEFORE_CAPTURE_EVENT_NAME);f(t.preProcessDoc(document,globalThis,o),s)}}function f(t,n){const s=e.helper,a=e.pageInfo.updatedResources,r=e.pageInfo.visitDate.getTime();Object.keys(a).forEach((e=>a[e].retrieved=!1)),browser.runtime.sendMessage({method:"autosave.save",taskId:o.taskId,content:s.serialize(document),canvases:t.canvases,fonts:t.fonts,stylesheets:t.stylesheets,images:t.images,posters:t.posters,usedFonts:t.usedFonts,shadowRoots:t.shadowRoots,imports:t.imports,referrer:t.referrer,frames:n,url:location.href,updatedResources:a,visitDate:r})}e.pageInfo={updatedResources:{},visitDate:new Date},browser.runtime.sendMessage({method:"autosave.init"}).then((e=>{if(o=e.options,n=e.autoSaveEnabled,"loading"==document.readyState)return new Promise((e=>document.addEventListener("DOMContentLoaded",(()=>e()))))})).then((()=>{p()})),browser.runtime.onMessage.addListener((e=>{if(n&&"content.autosave"==e.method||"content.maybeInit"==e.method||"content.init"==e.method||"devtools.resourceCommitted"==e.method||"common.promptValueRequest"==e.method)return l(e)})),m(),globalThis.window==globalThis.top&&location&&location.href&&location.href.startsWith("file:///")&&("loading"==document.readyState?document.addEventListener("DOMContentLoaded",d,!1):d())}();
