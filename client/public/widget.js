(function(){var e=`http://localhost:8080`;function t(e){return e===`light`||e===`dark`}function n(e){return e===`bottom-right`||e===`bottom-left`}function r(e){let r=e.dataset.widgetId?.trim();if(!r)return null;let i={widgetId:r},a=e.dataset.theme?.trim();t(a)&&(i.theme=a);let o=e.dataset.primaryColor?.trim();o&&(i.primaryColor=o);let s=e.dataset.language?.trim();s&&(i.language=s);let c=e.dataset.position?.trim();n(c)&&(i.position=c);let l=e.dataset.title?.trim();l&&(i.title=l);let u=e.dataset.apiBaseUrl?.trim();return u&&(i.apiBaseUrl=u),i}function i(t){return t.apiBaseUrl||console.error(`[AISalesWidget] data-api-base-url is not set on the widget's <script> tag. Falling back to ${e}, which will not work outside local development. Add data-api-base-url="https://<your-backend-domain>" to the embed snippet.`),{widgetId:t.widgetId,theme:t.theme??`light`,primaryColor:t.primaryColor??`#4F46E5`,language:t.language??`en`,position:t.position??`bottom-right`,title:t.title??`Chat with us`,apiBaseUrl:t.apiBaseUrl??e}}function a(e,t){return{...e,...t}}var o={"--asw-color-bg":`#ffffff`,"--asw-color-surface":`#f9fafb`,"--asw-color-surface-alt":`#f3f4f6`,"--asw-color-text":`#111827`,"--asw-color-text-muted":`#6b7280`,"--asw-color-border":`#e5e7eb`,"--asw-color-bubble-visitor-bg":`var(--asw-color-primary)`,"--asw-color-bubble-visitor-text":`#ffffff`,"--asw-color-bubble-assistant-bg":`#f3f4f6`,"--asw-color-bubble-assistant-text":`#111827`,"--asw-shadow":`0 12px 32px rgba(15, 23, 42, 0.16)`},s={"--asw-color-bg":`#111827`,"--asw-color-surface":`#1f2937`,"--asw-color-surface-alt":`#27303f`,"--asw-color-text":`#f9fafb`,"--asw-color-text-muted":`#9ca3af`,"--asw-color-border":`#374151`,"--asw-color-bubble-visitor-bg":`var(--asw-color-primary)`,"--asw-color-bubble-visitor-text":`#ffffff`,"--asw-color-bubble-assistant-bg":`#27303f`,"--asw-color-bubble-assistant-text":`#f9fafb`,"--asw-shadow":`0 12px 32px rgba(0, 0, 0, 0.5)`};function c(e){let t=e.theme===`dark`?s:o,n=Object.entries(t).map(([e,t])=>`${e}: ${t};`).join(`
      `);return`
    :host {
      all: initial;
      /* A system font stack — the widget never depends on (and is never
         broken by) the host page's own web fonts. */
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
        Arial, sans-serif;
      font-size: 14px;
      line-height: 1.45;
      --asw-color-primary: ${e.primaryColor};
      ${n}
    }

    .asw-container,
    .asw-container * {
      box-sizing: border-box;
    }

    .asw-container button {
      font: inherit;
      color: inherit;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .asw-container button:focus-visible,
    .asw-container textarea:focus-visible {
      outline: 2px solid var(--asw-color-primary);
      outline-offset: 2px;
    }

    .asw-container button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}var l=56;function u(e){let t=e.position===`bottom-left`?`left`:`right`;return`
    .asw-launcher {
      position: fixed;
      bottom: 20px;
      ${t}: 20px;
      width: ${l}px;
      height: ${l}px;
      border-radius: 50%;
      background: var(--asw-color-primary);
      color: #ffffff;
      box-shadow: var(--asw-shadow);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 120ms ease;
    }

    .asw-launcher:hover {
      transform: scale(1.05);
    }

    .asw-launcher-icon {
      position: absolute;
      display: flex;
      transition: opacity 120ms ease, transform 120ms ease;
    }

    .asw-launcher-icon-close {
      opacity: 0;
      transform: rotate(-45deg);
    }

    .asw-launcher-open .asw-launcher-icon-chat {
      opacity: 0;
      transform: rotate(45deg);
    }

    .asw-launcher-open .asw-launcher-icon-close {
      opacity: 1;
      transform: none;
    }

    .asw-launcher-badge {
      position: absolute;
      top: -4px;
      ${t===`left`?`right`:`left`}: -4px;
      min-width: 20px;
      height: 20px;
      padding: 0 4px;
      border-radius: 10px;
      background: #ef4444;
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 2px var(--asw-color-bg);
    }
  `}var d=360,f=520,p=480;function m(e){return`
    .asw-window {
      position: fixed;
      bottom: 88px;
      ${e.position===`bottom-left`?`left`:`right`}: 20px;
      width: ${d}px;
      height: ${f}px;
      max-height: calc(100vh - 108px);
      background: var(--asw-color-bg);
      color: var(--asw-color-text);
      border-radius: 16px;
      box-shadow: var(--asw-shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(12px) scale(0.98);
      transition: opacity 160ms ease, transform 160ms ease;
    }

    .asw-window.asw-open {
      opacity: 1;
      transform: none;
    }

    .asw-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      border-bottom: 1px solid var(--asw-color-border);
      flex-shrink: 0;
    }

    .asw-header-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .asw-header-title {
      font-weight: 600;
      font-size: 15px;
    }

    .asw-status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      display: inline-block;
    }

    .asw-icon-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      color: var(--asw-color-text-muted);
    }

    .asw-header-close:hover {
      background: var(--asw-color-surface-alt);
      color: var(--asw-color-text);
    }

    .asw-error-banner {
      margin: 8px 16px 0;
      padding: 8px 12px;
      border-radius: 8px;
      background: #fef2f2;
      color: #b91c1c;
      font-size: 13px;
    }

    .asw-footer {
      flex-shrink: 0;
      padding: 6px 16px 10px;
      text-align: center;
      font-size: 11px;
      color: var(--asw-color-text-muted);
    }

    @media (max-width: ${p}px) {
      .asw-window {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        max-height: none;
        border-radius: 0;
      }
    }
  `}function h(){return`
    .asw-message-list {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .asw-message {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      max-width: 85%;
      animation: asw-message-in 180ms ease;
    }

    .asw-message-visitor {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .asw-message-assistant {
      align-self: flex-start;
    }

    .asw-message-system {
      align-self: center;
      max-width: 100%;
      font-size: 12px;
      color: var(--asw-color-text-muted);
      text-align: center;
    }

    .asw-avatar {
      flex-shrink: 0;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--asw-color-primary);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .asw-bubble-column {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .asw-bubble {
      padding: 10px 12px;
      border-radius: 14px;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .asw-message-visitor .asw-bubble {
      background: var(--asw-color-bubble-visitor-bg);
      color: var(--asw-color-bubble-visitor-text);
      border-bottom-right-radius: 4px;
    }

    .asw-message-assistant .asw-bubble {
      background: var(--asw-color-bubble-assistant-bg);
      color: var(--asw-color-bubble-assistant-text);
      border-bottom-left-radius: 4px;
    }

    .asw-message-pending .asw-bubble {
      opacity: 0.6;
    }

    .asw-message-streaming .asw-bubble::after {
      content: "▍";
      display: inline-block;
      margin-left: 2px;
      animation: asw-cursor-blink 900ms step-start infinite;
    }

    .asw-message-meta {
      display: flex;
      gap: 6px;
      font-size: 11px;
      color: var(--asw-color-text-muted);
    }

    .asw-message-visitor .asw-message-meta {
      justify-content: flex-end;
    }

    .asw-message-error-label {
      color: #dc2626;
      font-weight: 600;
    }

    .asw-empty-state,
    .asw-loading-state {
      margin: auto;
      text-align: center;
      color: var(--asw-color-text-muted);
    }

    .asw-empty-state-title {
      font-weight: 600;
      color: var(--asw-color-text);
      margin: 0 0 4px;
    }

    .asw-empty-state-subtitle {
      margin: 0;
      font-size: 13px;
    }

    .asw-spinner {
      display: inline-block;
      width: 22px;
      height: 22px;
      border: 2px solid var(--asw-color-border);
      border-top-color: var(--asw-color-primary);
      border-radius: 50%;
      animation: asw-spin 700ms linear infinite;
    }

    .asw-typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 16px 8px;
    }

    .asw-typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--asw-color-text-muted);
      animation: asw-typing-bounce 1200ms ease-in-out infinite;
    }

    .asw-typing-dot:nth-child(2) {
      animation-delay: 150ms;
    }

    .asw-typing-dot:nth-child(3) {
      animation-delay: 300ms;
    }
  `}function g(){return`
    .asw-composer {
      flex-shrink: 0;
      border-top: 1px solid var(--asw-color-border);
      padding: 10px 12px;
    }

    .asw-composer-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }

    .asw-composer-input {
      flex: 1;
      resize: none;
      max-height: 120px;
      padding: 8px 10px;
      border: 1px solid var(--asw-color-border);
      border-radius: 10px;
      background: var(--asw-color-surface);
      color: var(--asw-color-text);
      font: inherit;
    }

    .asw-composer-loading .asw-composer-input {
      opacity: 0.7;
    }

    .asw-send-button {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--asw-color-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .asw-send-button:disabled {
      background: var(--asw-color-border);
      color: var(--asw-color-text-muted);
    }

    .asw-composer-footer {
      display: flex;
      justify-content: flex-end;
      min-height: 14px;
      margin-top: 2px;
    }

    .asw-composer-counter {
      font-size: 11px;
      color: var(--asw-color-text-muted);
    }

    .asw-composer-counter-warning {
      color: #dc2626;
      font-weight: 600;
    }
  `}function _(){return`
    @keyframes asw-message-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: none; }
    }

    @keyframes asw-typing-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
      30% { transform: translateY(-4px); opacity: 1; }
    }

    @keyframes asw-spin {
      to { transform: rotate(360deg); }
    }

    @keyframes asw-cursor-blink {
      50% { opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .asw-window,
      .asw-message,
      .asw-typing-dot,
      .asw-spinner,
      .asw-launcher-icon,
      .asw-message-streaming .asw-bubble::after {
        animation: none !important;
        transition: none !important;
      }
    }
  `}function v(e){return[c(e),u(e),m(e),h(),g(),_()].join(`
`)}var y=`aisales-widget-root`,b=`asw-container`;function x(e){let t=document.createElement(`div`);t.id=y,t.style.cssText=`all: initial !important; position: fixed !important; z-index: 2147483647 !important;`;let n=t.attachShadow({mode:`open`}),r=document.createElement(`style`);r.textContent=v(e),n.appendChild(r);let i=document.createElement(`div`);return i.className=b,n.appendChild(i),document.body.appendChild(t),{host:t,shadowRoot:n,container:i,styleEl:r}}function ee(e){e.host.remove()}function te(){return document.getElementById(y)}function ne(e,t){e.styleEl.textContent=v(t)}var re=class{state;listeners=new Set;constructor(e){this.state=e}getState(){return this.state}setState(e){let t=typeof e==`function`?e(this.state):e;this.state={...this.state,...t};for(let e of this.listeners)e(this.state)}subscribe(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}},ie=4e3;function ae(e){return{isOpen:!1,theme:e,connectionStatus:`connecting`,conversationId:null,isLoadingHistory:!0,messages:[],isSending:!1,isAssistantResponding:!1,error:null}}var S=class extends Error{kind;status;code;constructor(e,t,n={}){super(t),this.name=`ApiError`,this.kind=e,this.status=n.status,this.code=n.code}};function C(e){return e instanceof S&&(e.kind===`network`||e.kind===`server`||e.kind===`rate_limited`)}function oe(e,t){let n=t?.error?.code,r=t?.error?.message;return e===401&&n===`INVALID_WIDGET`?new S(`invalid_widget`,`This chat is currently unavailable.`,{status:e,code:n}):e===401?new S(`invalid_session`,`Your session has expired.`,{status:e,code:n}):e===409&&n===`CONVERSATION_CLOSED`?new S(`conversation_closed`,`This conversation has ended.`,{status:e,code:n}):e===429?new S(`rate_limited`,`Too many requests. Please slow down.`,{status:e,code:n}):e===400||e===422?new S(`validation`,r??`That message could not be sent.`,{status:e,code:n}):e>=500?new S(`server`,`Something went wrong on our end. Please try again.`,{status:e,code:n}):new S(`unknown`,`Something went wrong. Please try again.`,{status:e,code:n})}async function se(e,t){let n=e.getReader(),r=new TextDecoder,i=``;try{for(;;){let{done:e,value:a}=await n.read();if(e)return;i+=r.decode(a,{stream:!0});let o;for(;(o=i.indexOf(`

`))!==-1;){let e=i.slice(0,o);i=i.slice(o+2);let n=ce(e);if(n&&t(n)===!1)return}}}finally{n.releaseLock()}}function ce(e){let t=`message`,n=[];for(let r of e.split(`
`))r.startsWith(`:`)||(r.startsWith(`event:`)?t=r.slice(6).trim():r.startsWith(`data:`)&&n.push(r.slice(5).trim()));return n.length===0?null:{event:t,data:n.join(`
`)}}var w=100,T=class{baseUrl;widgetId;constructor(e){this.baseUrl=e.baseUrl.replace(/\/$/,``),this.widgetId=e.widgetId}async createConversation(e){let t=(await this.request(`POST`,`/api/v1/widget/conversations`,{widget_id:this.widgetId,external_id:e})).data;return{conversationId:t.conversation_id,sessionToken:t.session_token,visitorId:t.visitor_id,status:t.status,startedAt:t.started_at}}async sendMessage(e,t,n){return E((await this.request(`POST`,`/api/v1/widget/conversations/${encodeURIComponent(e)}/messages`,{content:n},t)).data)}async loadHistory(e,t,n=1,r=w){let i=new URLSearchParams({page:String(n),limit:String(r)}),a=await this.request(`GET`,`/api/v1/widget/conversations/${encodeURIComponent(e)}/messages?${i.toString()}`,void 0,t);return{messages:a.data.map(E),meta:a.meta}}async reconnect(e,t){return this.loadHistory(e,t,1,w)}async streamReply(e,t,n,r){let i;try{i=await fetch(`${this.baseUrl}/api/v1/widget/conversations/${encodeURIComponent(e)}/messages/stream`,{method:`POST`,headers:{Authorization:`Bearer ${t}`},signal:r})}catch{return r.aborted?{type:`cancelled`}:{type:`error`,message:`We couldn't reach the server. Please check your connection.`}}if(r.aborted)return{type:`cancelled`};if(!i.ok||!i.body)return{type:`error`,message:`Something went wrong on our end. Please try again.`};let a=null;try{await se(i.body,e=>{switch(e.event){case`stream_started`:return n.onStarted?.(),!0;case`content_delta`:{let t=JSON.parse(e.data);return n.onDelta(t.delta),!0}case`stream_finished`:{let t=JSON.parse(e.data);return a={type:`finished`,content:t.content,finishReason:t.finish_reason},!1}case`stream_error`:return a={type:`error`,message:JSON.parse(e.data).message},!1;default:return!0}})}catch{return r.aborted?{type:`cancelled`}:a??{type:`error`,message:`The connection was interrupted. Please try again.`}}return a||(r.aborted?{type:`cancelled`}:{type:`error`,message:`The connection was interrupted. Please try again.`})}async request(e,t,n,r){let i;try{i=await fetch(`${this.baseUrl}${t}`,{method:e,headers:{"Content-Type":`application/json`,...r?{Authorization:`Bearer ${r}`}:{}},body:n===void 0?void 0:JSON.stringify(n)})}catch{throw new S(`network`,`We couldn't reach the server. Please check your connection.`)}let a=await i.text(),o=null;if(a)try{o=JSON.parse(a)}catch{o=null}if(!i.ok)throw oe(i.status,o);return o??{}}};function E(e){return{id:e.id,senderType:e.sender_type,content:e.content,createdAt:e.created_at}}function le(e){return new Promise(t=>setTimeout(t,e))}async function D(e,t,n){let r;for(let i=1;i<=n.maxAttempts;i++)try{return await e()}catch(e){if(r=e,i===n.maxAttempts||!t(e))throw e;await le(n.baseDelayMs*2**(i-1))}throw r}var O=`asw_session:`,ue=`asw_visitor:`;function k(e){try{return window.localStorage.getItem(e)}catch{return null}}function A(e,t){try{window.localStorage.setItem(e,t)}catch{}}function de(e){try{window.localStorage.removeItem(e)}catch{}}function fe(){return typeof crypto<`u`&&typeof crypto.randomUUID==`function`?crypto.randomUUID():`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function pe(e){let t=ue+e,n=k(t);if(n)return n;let r=fe();return A(t,r),r}function me(e){let t=k(O+e);if(!t)return null;try{let e=JSON.parse(t);return typeof e.conversationId==`string`&&typeof e.sessionToken==`string`?{conversationId:e.conversationId,sessionToken:e.sessionToken}:null}catch{return null}}function he(e,t){A(O+e,JSON.stringify(t))}function j(e){de(O+e)}var M={maxAttempts:3,baseDelayMs:600},N=2;function ge(e){switch(e){case`ai`:return`assistant`;case`visitor`:case`employee`:case`system`:return e;default:return`assistant`}}function P(e){return{id:e.id,sender:ge(e.senderType),content:e.content,createdAt:e.createdAt,status:`sent`}}function F(e){return e instanceof S?e.message:`Something went wrong. Please try again.`}function I(){return typeof navigator<`u`&&navigator.onLine===!1}function L(e,t,n){let r=pe(n),i=null,a=null,o=null,s=null,c=!1;function l(){e.getState().connectionStatus!==`error`&&e.setState({connectionStatus:`offline`,error:{message:`You're offline. We'll reconnect once you're back online.`,retryable:!1}})}function u(){e.getState().connectionStatus===`offline`&&e.setState({connectionStatus:`connected`,error:null})}window.addEventListener(`offline`,l),window.addEventListener(`online`,u);async function d(){let r=me(n);if(!r){e.setState({connectionStatus:`connected`,isLoadingHistory:!1});return}e.setState({connectionStatus:`connecting`,isLoadingHistory:!0});try{let n=await D(()=>t.reconnect(r.conversationId,r.sessionToken),C,M);if(c)return;i=r.sessionToken,o=null,e.setState({connectionStatus:`connected`,conversationId:r.conversationId,messages:n.messages.map(P),isLoadingHistory:!1,error:null})}catch(t){if(c)return;if(t instanceof S&&t.kind===`invalid_session`){j(n),o=null,e.setState({connectionStatus:`connected`,isLoadingHistory:!1,conversationId:null,messages:[]});return}o=`reconnect`,e.setState({connectionStatus:I()?`offline`:`error`,isLoadingHistory:!1,error:{message:F(t),retryable:!0}})}}let f=d();async function p(){try{let a=await D(()=>t.createConversation(r),C,M);if(c)return;i=a.sessionToken,o=null,he(n,{conversationId:a.conversationId,sessionToken:a.sessionToken}),e.setState({conversationId:a.conversationId,connectionStatus:`connected`,error:null})}catch(t){if(c)return;o=`create`;let n=!(t instanceof S)||t.kind!==`invalid_widget`;throw e.setState({connectionStatus:I()?`offline`:`error`,error:{message:F(t),retryable:n}}),t}}async function m(){if(await f,!e.getState().conversationId)return a||=p().finally(()=>{a=null}),a}function h(){m().catch(()=>{})}function g(){s?.abort()}async function _(){let n=e.getState().conversationId;if(!n||!i)return;let r=new AbortController;s=r,e.setState({isAssistantResponding:!0});let a=`assistant-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,o=!1;function l(t){if(!c){if(!o){o=!0,e.setState(e=>({messages:[...e.messages,{id:a,sender:`assistant`,content:t,createdAt:new Date().toISOString(),status:`streaming`}]}));return}e.setState(e=>({messages:e.messages.map(e=>e.id===a?{...e,content:e.content+t}:e)}))}}let u={type:`error`,message:`Something went wrong. Please try again.`};for(let e=1;e<=N&&(u=await t.streamReply(n,i,{onDelta:l},r.signal),u.type===`error`&&!o&&e<N);e++);if(s===r&&(s=null),c)return;if(u.type===`finished`){if(o){let t=u.content;e.setState(e=>({messages:e.messages.map(e=>e.id===a?{...e,content:t,status:`sent`}:e),isAssistantResponding:!1}))}else e.setState(e=>({messages:[...e.messages,{id:a,sender:`assistant`,content:u.content,createdAt:new Date().toISOString(),status:`sent`}],isAssistantResponding:!1}));return}if(u.type===`cancelled`){e.setState(e=>({isAssistantResponding:!1,messages:o?e.messages.map(e=>e.id===a?{...e,status:`error`}:e):e.messages}));return}let d=u.message;e.setState(e=>({isAssistantResponding:!1,messages:o?e.messages.map(e=>e.id===a?{...e,status:`error`}:e):e.messages,error:{message:d,retryable:!1}}))}async function v(r){let a=r.trim();if(!a||a.length>4e3)return;let o=`local-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,s={id:o,sender:`visitor`,content:a,createdAt:new Date().toISOString(),status:`sending`};e.setState(e=>({messages:[...e.messages,s],isSending:!0,error:null}));try{await m();let n=e.getState().conversationId;if(!n||!i)throw Error(`conversation is not ready`);let r=await D(()=>t.sendMessage(n,i,a),C,M);if(c)return;let s=P(r);e.setState(e=>({messages:e.messages.map(e=>e.id===o?s:e),isSending:!1})),_()}catch(t){if(c)return;let r=t instanceof S&&t.kind===`invalid_session`;r&&(j(n),i=null),e.setState(e=>({messages:e.messages.map(e=>e.id===o?{...e,status:`error`}:e),isSending:!1,error:{message:F(t),retryable:!1},...r?{conversationId:null}:{}}))}}function y(){e.setState({error:null}),o===`reconnect`?d():m().catch(()=>{})}function b(){c=!0,g(),window.removeEventListener(`offline`,l),window.removeEventListener(`online`,u)}return{ensureConversationStarted:h,sendMessage:v,retryConnection:y,cancelActiveStream:g,destroy:b}}var R={chat:`<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,close:`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`,send:`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>`},z=9;function _e(e){let t=document.createElement(`button`);t.type=`button`,t.className=`asw-launcher`,t.setAttribute(`aria-haspopup`,`dialog`),t.setAttribute(`aria-expanded`,`false`),t.setAttribute(`aria-label`,`Open chat`);let n=document.createElement(`span`);n.className=`asw-launcher-icon asw-launcher-icon-chat`,n.innerHTML=R.chat,n.setAttribute(`aria-hidden`,`true`);let r=document.createElement(`span`);r.className=`asw-launcher-icon asw-launcher-icon-close`,r.innerHTML=R.close,r.setAttribute(`aria-hidden`,`true`);let i=document.createElement(`span`);i.className=`asw-launcher-badge`,i.hidden=!0,t.appendChild(n),t.appendChild(r),t.appendChild(i),t.addEventListener(`click`,e.onClick);function a(e){t.classList.toggle(`asw-launcher-open`,e),t.setAttribute(`aria-expanded`,String(e)),t.setAttribute(`aria-label`,e?`Close chat`:`Open chat`)}function o(e){e>0?(i.hidden=!1,i.textContent=e>z?`${z}+`:String(e)):(i.hidden=!0,i.textContent=``)}return{el:t,setOpen:a,setUnreadCount:o}}function B(e){let t=document.createElement(`button`);return t.type=`button`,t.className=e.className?`asw-icon-button ${e.className}`:`asw-icon-button`,t.setAttribute(`aria-label`,e.label),t.innerHTML=e.icon,t.addEventListener(`click`,e.onClick),t}function ve(){let e=document.createElement(`span`);return e.className=`asw-status-indicator`,e.setAttribute(`role`,`status`),e.setAttribute(`aria-label`,`Online`),e}function ye(e){let t=document.createElement(`div`);t.className=`asw-header`;let n=document.createElement(`div`);n.className=`asw-header-title-wrap`;let r=document.createElement(`span`);r.className=`asw-header-title`,r.textContent=e.title,n.appendChild(r),n.appendChild(ve());let i=B({label:`Close chat`,icon:R.close,className:`asw-header-close`,onClick:e.onClose});return t.appendChild(n),t.appendChild(i),t}function be(){let e=document.createElement(`div`);e.className=`asw-error-banner`,e.setAttribute(`role`,`alert`),e.hidden=!0;let t=document.createElement(`span`);t.className=`asw-error-banner-message`,e.appendChild(t);let n=null;function r(r,i){if(!r){e.hidden=!0,t.textContent=``,n&&=(n.remove(),null);return}e.hidden=!1,t.textContent=r.message,r.retryable&&i?(n||(n=document.createElement(`button`),n.type=`button`,n.className=`asw-error-banner-retry`,n.textContent=`Retry`,e.appendChild(n)),n.onclick=i):n&&=(n.remove(),null)}return{el:e,render:r}}var xe={assistant:`AI`,employee:`S`};function Se(e){let t=document.createElement(`div`);return t.className=`asw-avatar asw-avatar-${e}`,t.setAttribute(`aria-hidden`,`true`),t.textContent=xe[e]??``,t}var Ce={visitor:`You`,assistant:`Assistant`,employee:`Assistant`,system:`System`};function we(e){return e===`visitor`?`Failed to send`:`Failed to complete`}function Te(e){try{return new Date(e).toLocaleTimeString(void 0,{hour:`numeric`,minute:`2-digit`})}catch{return``}}function V(e){if(e.sender===`system`){let t=document.createElement(`div`);return t.className=`asw-message asw-message-system`,t.setAttribute(`role`,`listitem`),t.textContent=e.content,t}let t=document.createElement(`div`);t.className=`asw-message asw-message-${U(e.sender)}`,t.setAttribute(`role`,`listitem`),(e.sender===`assistant`||e.sender===`employee`)&&t.appendChild(Se(e.sender));let n=document.createElement(`div`);n.className=`asw-bubble-column`;let r=document.createElement(`div`);r.className=`asw-bubble`,n.appendChild(r);let i=document.createElement(`div`);i.className=`asw-message-meta`;let a=document.createElement(`time`);a.dateTime=e.createdAt,i.appendChild(a);let o=document.createElement(`span`);return o.className=`asw-message-error-label`,i.appendChild(o),n.appendChild(i),t.appendChild(n),H(t,e),t}function Ee(e,t){H(e,t)}function H(e,t){e.setAttribute(`aria-label`,`${Ce[t.sender]} said: ${t.content}`);let n=e.querySelector(`.asw-bubble`);n&&(n.textContent=t.content);let r=e.querySelector(`.asw-message-meta time`);r&&(r.textContent=Te(t.createdAt));let i=e.querySelector(`.asw-message-error-label`);i&&(i.textContent=t.status===`error`?we(t.sender):``),e.classList.toggle(`asw-message-error`,t.status===`error`),e.classList.toggle(`asw-message-pending`,t.status===`sending`),e.classList.toggle(`asw-message-streaming`,t.status===`streaming`)}function U(e){return e===`employee`?`assistant`:e}function De(){let e=document.createElement(`div`);e.className=`asw-empty-state`;let t=document.createElement(`p`);t.className=`asw-empty-state-title`,t.textContent=`No messages yet`;let n=document.createElement(`p`);return n.className=`asw-empty-state-subtitle`,n.textContent=`Send a message to start the conversation.`,e.appendChild(t),e.appendChild(n),e}function Oe(){let e=document.createElement(`div`);e.className=`asw-loading-state`,e.setAttribute(`role`,`status`),e.setAttribute(`aria-label`,`Loading conversation`);let t=document.createElement(`span`);return t.className=`asw-spinner`,t.setAttribute(`aria-hidden`,`true`),e.appendChild(t),e}function ke(){let e=document.createElement(`div`);e.className=`asw-message-list`,e.setAttribute(`role`,`log`),e.setAttribute(`aria-live`,`polite`),e.setAttribute(`aria-label`,`Conversation`);let t=[],n=new Map,r=!0;function i(e,n){for(let r=0;r<n;r++)if(e[r]?.id!==t[r])return!1;return!0}function a(r){e.innerHTML=``,n=new Map;for(let t of r){let r=V(t);n.set(t.id,r),e.appendChild(r)}t=r.map(e=>e.id)}function o(){requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})}function s(s,c){if(c){e.innerHTML=``,e.appendChild(Oe()),t=[],n=new Map,r=!0;return}if(s.length===0){e.innerHTML=``,e.appendChild(De()),t=[],n=new Map,r=!0;return}if(r){a(s),r=!1,o();return}if(s.length===t.length){if(!i(s,t.length)){a(s),o();return}let e=s[s.length-1],r=n.get(e.id);r&&(Ee(r,e),o());return}if(s.length>t.length&&i(s,t.length)){for(let r of s.slice(t.length)){let t=V(r);n.set(r.id,t),e.appendChild(t)}t=s.map(e=>e.id),o();return}a(s),o()}return{el:e,render:s}}function Ae(){let e=document.createElement(`div`);e.className=`asw-typing-indicator`,e.setAttribute(`role`,`status`),e.setAttribute(`aria-live`,`polite`),e.setAttribute(`aria-label`,`Assistant is typing`),e.hidden=!0;for(let t=0;t<3;t++){let t=document.createElement(`span`);t.className=`asw-typing-dot`,t.setAttribute(`aria-hidden`,`true`),e.appendChild(t)}function t(t){e.hidden=!t}return{el:e,setVisible:t}}var je=40,Me=10,Ne=120;function Pe(e){let t=document.createElement(`div`);t.className=`asw-composer`;let n=document.createElement(`textarea`);n.className=`asw-composer-input`,n.setAttribute(`aria-label`,`Message`),n.setAttribute(`aria-describedby`,`asw-composer-counter`),n.placeholder=`Type your message…`,n.rows=1,n.maxLength=e.maxLength;let r=document.createElement(`span`);r.className=`asw-composer-counter`,r.id=`asw-composer-counter`;let i=B({label:`Send message`,icon:R.send,className:`asw-send-button`,onClick:d});i.disabled=!0;function a(){let t=e.maxLength-n.value.length;r.textContent=t<=je?String(t):``,r.classList.toggle(`asw-composer-counter-warning`,t<=Me)}function o(){n.style.height=`auto`,n.style.height=`${Math.min(n.scrollHeight,Ne)}px`}let s=!1,c=!1;function l(){n.disabled=s||c,u()}function u(){i.disabled=n.disabled||n.value.trim().length===0}function d(){if(i.disabled)return;let t=n.value.trim();t&&(e.onSend(t),g())}n.addEventListener(`input`,()=>{a(),o(),u()}),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),d())});let f=document.createElement(`div`);f.className=`asw-composer-row`,f.appendChild(n),f.appendChild(i);let p=document.createElement(`div`);p.className=`asw-composer-footer`,p.appendChild(r),t.appendChild(f),t.appendChild(p);function m(e){s=e,l()}function h(e){c=e,t.classList.toggle(`asw-composer-loading`,e),l()}function g(){n.value=``,a(),o(),u()}function _(){n.focus()}return a(),{el:t,setDisabled:m,setLoading:h,clear:g,focusInput:_}}function Fe(){return typeof window.matchMedia==`function`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}var Ie=220;function Le(e){let t=document.createElement(`div`);t.className=`asw-window`,t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-modal`,`false`),t.setAttribute(`aria-label`,e.title),t.hidden=!0;let n=ye({title:e.title,onClose:e.onClose}),r=be(),i=ke(),a=Ae(),o=Pe({maxLength:e.maxMessageLength,onSend:e.onSend}),s=document.createElement(`div`);s.className=`asw-footer`,s.textContent=`Powered by AI Sales Platform`,t.appendChild(n),t.appendChild(r.el),t.appendChild(i.el),t.appendChild(a.el),t.appendChild(o.el),t.appendChild(s);function c(e){if(e){t.hidden=!1,requestAnimationFrame(()=>{t.classList.add(`asw-open`)});return}t.classList.remove(`asw-open`);let n=()=>{t.hidden=!0};if(Fe()){n();return}t.addEventListener(`transitionend`,n,{once:!0}),window.setTimeout(n,Ie)}function l(e,t){i.render(e,t)}function u(e){a.setVisible(e)}function d(e){o.setLoading(e)}function f(e){o.setDisabled(e)}function p(e,t){r.render(e,t)}function m(){o.focusInput()}return{el:t,setOpen:c,renderMessages:l,setTyping:u,setSending:d,setConnectionBlocked:f,setError:p,focusComposer:m}}function Re(e,t){let n=new re(ae(t.theme)),r=L(n,new T({baseUrl:t.apiBaseUrl,widgetId:t.widgetId}),t.widgetId),i=_e({onClick:o}),a=Le({title:t.title,maxMessageLength:ie,onClose:c,onSend:l});e.container.appendChild(i.el),e.container.appendChild(a.el);function o(){n.setState(e=>({isOpen:!e.isOpen})),n.getState().isOpen&&r.ensureConversationStarted()}function s(){n.setState({isOpen:!0}),r.ensureConversationStarted()}function c(){n.setState({isOpen:!1}),r.cancelActiveStream()}function l(e){r.sendMessage(e)}function u(){r.retryConnection()}function d(e){e instanceof KeyboardEvent&&e.key===`Escape`&&n.getState().isOpen&&c()}e.shadowRoot.addEventListener(`keydown`,d);function f(e){return e.connectionStatus===`offline`||e.connectionStatus===`error`}function p(e){return e.messages[e.messages.length-1]}function m(e){if(!e.isAssistantResponding)return!1;let t=p(e);return t?.sender!==`assistant`||t.status!==`streaming`}function h(e){a.renderMessages(e.messages,e.isLoadingHistory),a.setTyping(m(e)),a.setSending(e.isSending||e.isAssistantResponding),a.setConnectionBlocked(f(e)),a.setError(e.error,u),i.setOpen(e.isOpen),a.setOpen(e.isOpen)}let g=n.getState();h(g);function _(e){(e.messages!==g.messages||e.isLoadingHistory!==g.isLoadingHistory)&&a.renderMessages(e.messages,e.isLoadingHistory),(e.isAssistantResponding!==g.isAssistantResponding||e.messages!==g.messages)&&a.setTyping(m(e)),(e.isSending!==g.isSending||e.isAssistantResponding!==g.isAssistantResponding)&&a.setSending(e.isSending||e.isAssistantResponding),e.connectionStatus!==g.connectionStatus&&a.setConnectionBlocked(f(e)),e.error!==g.error&&a.setError(e.error,u),e.isOpen!==g.isOpen&&(i.setOpen(e.isOpen),a.setOpen(e.isOpen),e.isOpen?requestAnimationFrame(()=>a.focusComposer()):i.el.focus()),g=e}let v=n.subscribe(_);function y(){r.destroy(),e.shadowRoot.removeEventListener(`keydown`,d),v()}function b(e){n.setState({theme:e.theme})}return{open:s,close:c,destroy:y,applyConfig:b}}var W=`0.1.0`,G=`[AISalesWidget]`;function K(e){console.warn(`${G} ${e}`)}function q(e){console.info(`${G} ${e}`)}var J=null,Y=null,X=null;function ze(e){if(Y){K(`already initialized; ignoring duplicate init() call.`);return}if(!e.widgetId||e.widgetId.trim()===``){K(`a widgetId is required; skipping initialization.`);return}if(te()){K(`a widget is already mounted on this page; skipping duplicate initialization.`);return}J=i(e),Y=x(J),X=Re(Y,J),q(`initialized (v${W}) for widget ${J.widgetId}.`)}function Be(){if(!X){K(`open() called before initialization.`);return}X.open()}function Ve(){X&&X.close()}function He(){!Y||!X||(X.destroy(),ee(Y),Y=null,X=null,J=null,q(`destroyed.`))}function Ue(e){if(!Y||!J||!X){K(`update() called before initialization.`);return}J=a(J,e),ne(Y,J),X.applyConfig(J)}var Z={get version(){return W},init:ze,open:Be,close:Ve,destroy:He,update:Ue};function We(){let e=document.currentScript;if(e instanceof HTMLScriptElement&&e.dataset.widgetId)return e;let t=document.querySelectorAll(`script[data-widget-id]`);return t.length===0?null:t[t.length-1]}var Q=`[AISalesWidget]`;function $(){let e=We();if(!e){console.warn(`${Q} could not locate the widget's own <script> tag; skipping automatic initialization. Call window.AISalesWidget.init({ widgetId }) manually instead.`);return}let t=r(e);if(!t){console.warn(`${Q} data-widget-id is required on the widget <script> tag; skipping automatic initialization.`);return}Z.init(t)}function Ge(){document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,$,{once:!0}):$()}window.AISalesWidget||(window.AISalesWidget=Z),Ge()})();