"use strict";(()=>{var tr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],or=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Qt=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,s]of tr)t.style.setProperty(r,e.tokens[s]);for(let[r,s,i]of or){let l=e.tokens[i]??"";t.style.setProperty(r,l),t.style.setProperty(s,l)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Je=(e,t)=>{Qt(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var ge="data-oc-scrolling",Ye=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${ge}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${ge}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${ge}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${ge}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function qe(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",s=>{let i=s.target===e?t:s.target;if(!(i instanceof Element))return;i.hasAttribute("data-oc-scrolling")||i.setAttribute("data-oc-scrolling","");let l=r.get(i);l!==void 0&&clearTimeout(l),r.set(i,setTimeout(()=>{r.delete(i),i.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var rr=`(${qe.toString()})(document);`;var nr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},v=(e,t)=>`var(--${e}, var(--oc-${nr[e]}, ${t}))`,K=v("surface-background","transparent"),ke=v("surface-elevated","transparent"),ne=v("surface-elevated-foreground","inherit"),F=v("surface-foreground","inherit"),I=v("surface-muted-foreground","gray"),sr=v("surface-muted","transparent"),q=v("interactive-border","currentColor"),H=v("interactive-hover","transparent"),Q=v("interactive-active","transparent"),Qe=v("interactive-selection","transparent"),Ze=v("interactive-selection-foreground","inherit"),z=v("primary","currentColor"),et=v("primary-text","inherit"),tt=v("error-text","inherit"),ir=v("font-sans","inherit"),ot=v("font-mono","monospace"),oo=v("radius","9px"),rt=`calc(${oo} - 2px)`,Zt=`calc(${oo} - 4px)`,U=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,eo=`background-image: linear-gradient(${H}, ${H});`,nt=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,st="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",to="box-shadow: var(--oc-sdk-lit);",it=`inset 0 0.5px 0 0 ${U(F,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,ar=`
:root {
  --oc-sdk-edge: ${U(F,16)};
  --oc-sdk-field-bg: ${ke};
  --oc-sdk-raised-bg: ${K};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${U(F,14)};
  --oc-sdk-field-bg: ${U(K,50,ke)};
  --oc-sdk-raised-bg: ${ke};
  --oc-sdk-field-lift: ${it};
  --oc-sdk-raised-lift: ${it};
  --oc-sdk-lit: ${it};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Re=e=>{let t=v(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${v(`${e}-text`,"inherit")}; }`},cr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,ro=`${ar}
.oc-sdk { color: ${F}; font-family: ${ir}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${eo} }
.oc-sdk-mono { font-family: ${ot}; }
.oc-sdk-muted { color: ${I}; }
${Re("success")}${Re("warning")}${Re("error")}${Re("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${z}; --oc-sdk-tone-text: ${et}; }

.oc-sdk-btn { border-radius: ${rt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Zt}; }
.oc-sdk-btn[data-variant="default"] { color: ${et}; background: ${U(z,10,K)}; border-color: ${U(z,12)}; ${to} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${U(z,16,K)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${U(z,22,K)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${sr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ne}; ${st} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Q}, ${Q}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Q}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${v("status-error","red")}; color: ${tt}; background: ${U("var(--oc-sdk-tone)",7,K)}; border-color: ${U("var(--oc-sdk-tone)",12)}; ${to} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${U("var(--oc-sdk-tone)",9,K)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${U("var(--oc-sdk-tone)",11,K)}; box-shadow: none; }

.oc-sdk-field-note { color: ${I}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${tt}; }
.oc-sdk-input { border-radius: ${rt}; background: var(--oc-sdk-field-bg); color: ${ne}; ${nt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${I}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${nt(U(F,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${nt(v("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${ot}; }

.oc-sdk-search-icon { color: ${I}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search-clear { border-radius: ${Zt}; color: ${I}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${F}; }

.oc-sdk-trigger { border-radius: ${rt}; background: var(--oc-sdk-raised-bg); color: ${ne}; ${st} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${I}; }
.oc-sdk-trigger-chevron { color: ${I}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ne}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${ke}; background-clip: padding-box; color: ${ne}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Qe}; color: ${Ze}; }
.oc-sdk-option-check { color: ${F}; }
.oc-sdk-option[data-destructive="true"] { color: ${tt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${U(v("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${I}; }
.oc-sdk-popup-empty { color: ${I}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${q}; border-radius: 4px; color: ${F}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${U(F,60,q)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${q}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${K}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${eo} }
.oc-sdk-check-desc { color: ${I}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${U(F,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${I}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${F}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ze}; background: ${Qe}; border-color: ${q}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ne}; background: var(--oc-sdk-raised-bg); ${st} }
.oc-sdk-tab-count { color: ${I}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${U(F,6)}; color: ${I}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${U("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${Qe}; color: ${Ze}; }
.oc-sdk-row-lead { font-family: ${ot}; color: ${I}; }
.oc-sdk-row-sub { color: ${I}; }
.oc-sdk-row-meta { color: ${I}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${I}; }

.oc-sdk-empty-body { color: ${I}; }

.oc-sdk-spinner { color: ${I}; }
.oc-sdk-spinner-ring { border-color: ${q}; border-top-color: ${z}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${U("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${I}; }

.oc-sdk-separator { color: ${I}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${U(q,40)}; }

.oc-sdk-progress-label { color: ${I}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${U(F,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${z}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${v("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${v("success-text","inherit")}; }

.oc-sdk-text a { color: ${et}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${U(q,60)}; }
`,L=`
${Ye}
${cr}
${ro}`;var no="oc-sdk-ui-style";var P=e=>{let t=document.getElementById(no);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}qe(document);let r=document.createElement("style");r.id=no,r.textContent=e,document.head.appendChild(r)},A=(e,t)=>{let r=document.createElement(e);return t&&(r.className=t),r},W=e=>{let t=A("button",e);return t.type="button",t},G=(e,t)=>{let r=t??"";e.textContent!==r&&(e.textContent=r)},J=(e,t,r)=>{r==null||r===""?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)};var lr=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Se=(e,t)=>{P(L);let r=t,s=W("oc-sdk oc-sdk-btn"),i=lr(),l=document.createElement("span");s.append(l),e.append(s);let d=()=>{s.dataset.variant=r.variant??"default",s.dataset.size=r.size??"default",s.disabled=!!r.disabled||!!r.loading,s.dataset.loading=r.loading?"true":"false",s.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&i.parentNode!==s?s.prepend(i):!r.loading&&i.parentNode===s&&i.remove(),G(l,r.label)},c=()=>{r.disabled||r.loading||r.onClick()};return s.addEventListener("click",c),d(),{update:E=>{r={...r,...E},d()},dispose:()=>{s.removeEventListener("click",c),s.remove()}}};var so="http://www.w3.org/2000/svg",dr={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},se=(e,t,r)=>{let s=document.createElementNS(so,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("width",String(t)),s.setAttribute("height",String(t)),s.setAttribute("aria-hidden","true"),s.setAttribute("fill","currentColor"),r&&s.setAttribute("class",r);let i=document.createElementNS(so,"path");return i.setAttribute("d",dr[e]),s.append(i),s};var Ue=(e,t)=>{J(e,"data-tone",t&&t!=="neutral"?t:null)},we=(e,t)=>{P(L);let r=t,s=A("span","oc-sdk oc-sdk-badge");e.append(s);let i=()=>{G(s,r.label),Ue(s,r.tone)};return i(),{update:l=>{r={...r,...l},i()},dispose:()=>{s.remove()}}};var at=(e,t={})=>{P(L);let r=t,s=A("span","oc-sdk oc-sdk-spinner");s.setAttribute("role","status");let i=A("span","oc-sdk-spinner-ring");i.setAttribute("aria-hidden","true");let l=A("span");s.append(i,l),e.append(s);let d=()=>{s.dataset.size=r.size??"default",G(l,r.label),l.hidden=!r.label,s.setAttribute("aria-label",r.label??"Loading")};return d(),{update:c=>{r={...r,...c},d()},dispose:()=>{s.remove()}}};var ct=(e,t)=>{P(L);let r=t,s=A("div","oc-sdk oc-sdk-banner"),i=A("div","oc-sdk-banner-text"),l=A("div","oc-sdk-banner-title"),d=A("div","oc-sdk-banner-body"),c=A("div","oc-sdk-banner-action");i.append(l,d),s.append(i,c),e.append(s);let E=null,p=()=>{if(s.dataset.tone=r.tone,s.setAttribute("role",r.tone==="error"||r.tone==="warning"?"alert":"status"),G(l,r.title),G(d,r.body),d.hidden=!r.body,c.hidden=!r.action,!r.action){E?.dispose(),E=null;return}let f={label:r.action.label,onClick:r.action.onClick};E?E.update(f):E=Se(c,{...f,variant:"outline",size:"xs"})};return p(),{update:f=>{r={...r,...f},p()},dispose:()=>{E?.dispose(),E=null,s.remove()}}};var _r=e=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,lt=(e,t)=>{P(L);let r=t,s=A("div","oc-sdk oc-sdk-progress"),i=A("div","oc-sdk-progress-label"),l=A("span"),d=A("span","oc-sdk-progress-value"),c=A("span"),E=se("check",14);d.append(E,c),i.append(l,d);let p=A("div","oc-sdk-progress-track");p.setAttribute("role","progressbar"),p.setAttribute("aria-valuemin","0"),p.setAttribute("aria-valuemax","100");let f=A("div","oc-sdk-progress-fill");p.append(f),s.append(i,p),e.append(s);let R=()=>{let O=_r(r.value);Ue(f,r.tone),f.style.transform=`scaleX(${O/100})`,p.setAttribute("aria-valuenow",String(O)),r.label?p.setAttribute("aria-label",r.label):p.removeAttribute("aria-label"),G(l,r.label),G(c,`${O}%`);let y=O===100&&(!r.tone||r.tone==="neutral");J(s,"data-done",y?"true":null),E.style.display=y?"":"none",i.hidden=!r.label};return R(),{update:O=>{r={...r,...O},R()},dispose:()=>{s.remove()}}};var io=["B","KB","MB","GB","TB"],X=(e,t=1)=>{if(e===null||!Number.isFinite(e))return"\u2014";let r=Math.abs(e),s=0;for(;r>=1024&&s<io.length-1;)r/=1024,s+=1;let i=e<0?"-":"",l=r>=100||s===0?0:t;return`${i}${r.toFixed(l)} ${io[s]}`},Y=e=>X(e===null?null:e*1024*1024),Z=e=>e===null||!Number.isFinite(e)?"\u2014":`${Math.round(e)}%`,Ce=(e,t=1)=>e===null||!Number.isFinite(e)?"\u2014":e.toFixed(t),dt=e=>{if(e===null||!Number.isFinite(e))return"\u2014";if(e<1)return`${Math.max(0,Math.round(e*60))}s`;if(e<60)return`${Math.round(e)}m`;let t=Math.floor(e/60),r=Math.round(e%60);return r>0?`${t}h ${r}m`:`${t}h`},ao=e=>{if(e===null||!Number.isFinite(e))return"\u2014";let t=Math.max(0,Math.round((Date.now()-e)/1e3));if(t<45)return"just now";let r=Math.round(t/60);if(r<60)return`${r}m ago`;let s=Math.round(r/60);return s<24?`${s}h ago`:`${Math.round(s/24)}d ago`},co=e=>{let t=e.trim();return t.length<=18?t:`${t.slice(0,17)}\u2026`};var x="openchamber.sdk";var Eo=/^[a-z][a-z0-9-]{0,39}$/;var lo=e=>Object(e)===e&&!Array.isArray(e),pt=(e,t)=>Object.keys(e).every(r=>t.includes(r)),po=e=>String(e)===e&&e.length>=1&&e.length<=60,uo=e=>String(e)===e&&e.length>=1&&e.length<=80,_o=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!lo(r)||!Eo.test(r.id)||!po(r.label)||r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1||t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!pt(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!pt(r,["kind","id","label","value","options","disabled"])||!uo(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let s=new Set;for(let i of r.options){if(!lo(i)||!pt(i,["value","label"])||!uo(i.value)||!po(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(r.value))return!1}return!0};var fo=["{id}","{segment}","{segments+}"];var ti=new Set(fo);var So=["turn-finished","turn-failed","permission-asked","question-asked"];var ri=new Set(So);var ut=e=>"bytes"in e?e.bytes.byteLength:e.content.length,To=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var mo=/^[A-Za-z0-9_-]{1,80}$/;var ho=["left","right","top","bottom"];var xo=(e,t=0,r={remaining:16e3})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!xo(i,t+1,r))return!1;return!0},Et=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Et);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Et)}return String(e)===e||Number.isFinite(e)},_t=e=>{try{return String(e.id)!==e.id||!mo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ho.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!xo(e.data)||!Et(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Ao=["file","directory","other","missing"],St=e=>!!(e&&"sessionId"in e),Tt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Oo=/^[0-9a-f]{7,64}$/i,mt=e=>Oo.test(e),Me=500,Ne=32e3,go=16e3,Ro=128,ko=200,vo=2e3,yo=16e3,Io=80,Uo=200,wo=16e3;var Co=2e3;var ht=2e4,Le=1024,Pe=2e6;var Ge=64e3,De=8e3,xt=4e3;var bt=96e4,Sr=60*6e4;var Mo=999,No=1e4,Te=500,Lo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Po=["stopped","starting","ready","failed"],Tr=new Set(Lo),Go=e=>Tr.has(e),Do=e=>e&&Go(e)?e:"HOST_REJECTED",ie=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(ie):Object(e)===e?Object.values(e).every(ie):!1,Ho=e=>ie(e)&&JSON.stringify(e).length<=wo,bo=e=>e?.trim().slice(0,Uo)??"",ae=e=>{let t=e.id.trim().slice(0,Ro),r=e.title.trim().slice(0,ko),s=e.url.trim().slice(0,vo),i=e.text?.trim().slice(0,yo),l=e.author?.trim().slice(0,Io),d=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:r||t,url:s,kind:d};if(i&&(c.text=i),l&&(c.author=l),d==="pull"){let E=bo(e.branches?.head),p=bo(e.branches?.base);E&&p&&(c.branches={head:E,base:p})}return Ho(e.data)&&(c.data=e.data),c},At=e=>{let t=ae(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},Ot=e=>{let t={text:e.text.trim().slice(0,go)};return e.send&&(t.send=!0),t},gt=e=>e===null||!Number.isFinite(e)?null:Math.min(Mo,Math.max(0,Math.round(e))),Rt=e=>Number.isFinite(e)?Math.min(No,Math.max(0,Math.ceil(e))):0;var ce=e=>e.length>0&&e.length<=Le&&!e.includes("\0")&&!e.includes("\\");var He=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Co?!1:!e.split("/").some(r=>r==="."||r===".."),mr=new Set(Po),kt=e=>!!(e&&"status"in e&&mr.has(String(e.status))&&!("body"in e)),$e=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),vt=e=>!!(e&&"content"in e&&String(e.content)===e.content),yt=e=>!!(e&&"written"in e&&e.written===!0),It=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),hr=new Set(Ao),Ut=e=>!!(e&&"kind"in e&&"size"in e&&hr.has(String(e.kind))&&Number.isFinite(e.size)),wt=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),xr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),br=e=>Object(e)===e?e:null,ft=e=>String(e)===e&&e.length>0,Ar=e=>{if(!ft(e.id))return null;if(e.ok===!0){let t={channel:x,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&ft(e.error)?{channel:x,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Do(ft(e.code)?e.code:void 0)}:null},Ct=e=>{let t=br(e);return!t||t.channel!==x||t.v!==1?null:t.type==="result"?Ar(t):!xr.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var $o=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Or=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",S=class extends Error{code;constructor(t,r){super(r),this.name="HostRequestError",this.code=t}},Fo=()=>Promise.reject(new S("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Fe=()=>Promise.reject(new S("BAD_PATH",`File path must be 1 to ${Le} characters without NUL or backslash.`)),Xe=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new S("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},h=e=>(e.value+=1,`oc-${e.value}`),Gt=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new S("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??(o=>o===t.parent),s=e.requestTimeoutMs??ht,i=new Set,l=new Set,d=new Set,c=new Set,E=new Set,p=new Set,f=new Set,R=new Set,O=new Set,y=new Set,ee=[],de=null,pe=null,he=new Set,xe=new Set,ue=null,Ee=null,je=!1,te=new Map,oe=new Map,re=new Map,B=!1,m={value:0},T=null,j=null,_e=!1,fe=!1,$t=null,Ft=o=>o?{sessionId:o.id,phase:o.busy?"started":"completed"}:null,$=o=>{t.parent.postMessage(o,"*")},Xt=()=>{B||t.parent===t||y.size===0||T?.features?.lateGenerateResults!==!0||$({channel:x,v:1,type:"generate-late-listen"})},w=(o,n)=>{for(let u of o)try{u(n)}catch(_){console.error(_)}},Vt=o=>{if(!(o instanceof MessageEvent)||!r(o.source))return;let n=Ct(o.data);if(!n)return;if(n.type==="workspace"){let _=oe.get(n.payload.subscriptionId);_&&w([_],n.payload.snapshot);return}if(n.type==="shells"){let _=re.get(n.payload.subscriptionId);_&&w([_],n.payload.snapshot);return}if(n.type==="ready"){T=n.payload,j=Ft(n.payload.session),w(i,n.payload),w(l,n.payload.directory),w(d,n.payload.session),j&&w(c,j),w(E,n.payload.connection),w(p,n.payload.settings),w(f,n.payload.item),Xt();return}if(n.type==="generate-late"){y.size===0?ee.push(n.payload):w(y,n.payload);return}if(n.type==="directory"){T&&(T={...T,directory:n.payload.directory}),w(l,n.payload.directory);return}if(n.type==="session"){T&&(T={...T,session:n.payload.session}),n.payload.session?j?.sessionId!==n.payload.session.id&&(j=Ft(n.payload.session)):j=null,w(d,n.payload.session);return}if(n.type==="session-lifecycle"){j=n.payload,w(c,n.payload);return}if(n.type==="connection"){T&&(T={...T,connection:n.payload.connection}),w(E,n.payload.connection);return}if(n.type==="settings"){T&&(T={...T,settings:n.payload.settings}),w(p,n.payload.settings);return}if(n.type==="item"){T&&(T={...T,item:n.payload.item}),w(f,n.payload.item);return}if(n.type==="status-control-event"){w(R,n.payload);return}if(n.type==="popover-closed"){w(O,n.payload);return}if(n.type==="action"){let _=g=>{B||$({channel:x,v:1,type:"action-result",id:n.id,payload:g})},k=pe;if(!k){_({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>k(n.payload)).then(()=>_({ok:!0}),g=>{let N=(g instanceof Error?g.message:String(g)).trim();_({ok:!1,error:(N||"Action failed.").slice(0,Te)})});return}if(n.type==="file-open"){let _=n.payload;if(Ee&&To(Ee,_))return;Ee=_,w(he,n.payload);return}if(n.type==="file-saved"){w(xe,n.payload.version);return}if(n.type==="file-snapshot"){let _=N=>{B||$({channel:x,v:1,type:"file-snapshot-result",id:n.id,payload:N})},k=N=>_({error:(N.trim()||"Could not read the edited file.").slice(0,Te)}),g=ue;if(!g){k("This extension does not edit files.");return}Promise.resolve().then(()=>g(n.payload.purpose)).then(N=>{if(ut(N)>2e7){k(`The file is over ${2e7} ${"bytes"in N?"bytes":"characters"}.`);return}if(N.version.length>256){k(`The snapshot version is over ${256} characters.`);return}_({snapshot:"bytes"in N?{bytes:N.bytes,version:N.version}:{content:N.content,version:N.version}})},N=>k(N instanceof Error?N.message:String(N)));return}if(n.type==="resolve"){let _=g=>{$({channel:x,v:1,type:"resolve-result",id:n.id,payload:g})},k=de;if(!k){_({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>k(n.payload)).then(g=>_({item:g?ae(g):null}),g=>{let N=(g instanceof Error?g.message:String(g)).trim();_({error:(N||"Command failed.").slice(0,Te)})});return}let u=te.get(n.id);if(u){if(clearTimeout(u.timer),te.delete(n.id),n.ok){u.resolve(n.payload);return}u.reject(new S(n.code,n.error))}};t.addEventListener("message",Vt),$({channel:x,v:1,type:"hello"});let D=(o,n=s)=>B||t.parent===t?Promise.reject(new S("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((u,_)=>{let k=setTimeout(()=>{te.delete(o.id),_(new S("HOST_TIMEOUT","Host did not answer in time."))},n);te.set(o.id,{resolve:u,reject:_,timer:k}),$(o)}),C=o=>D(o).then(()=>{}),M={channel:x,v:1},ze=o=>{!B&&t.parent!==t&&$(o)},Bt=()=>ze({...M,type:"file-save"}),jt=o=>{!$o(o)||!Or(o)||(o.preventDefault(),Bt())},zt=o=>{!$o(o)||o.key!=="Escape"||T?.surface!=="popover"||!T.popover||(o.preventDefault(),Yt(T.popover.id,"escape").catch(()=>{}))},be=()=>{let o=T?.surface==="popover"?T.popover:void 0;if(!o)return;let n=_e||fe;$t!==n&&($t=n,qt(o.id,n).catch(()=>{}))},Ae=()=>{T?.surface!=="popover"||_e||(_e=!0,be())},Kt=o=>{T?.surface!=="popover"||o.relatedTarget!==null||!_e||(_e=!1,be())},Wt=()=>{T?.surface!=="popover"||fe||(fe=!0,be())},Jt=()=>{T?.surface!=="popover"||!fe||(fe=!1,be())},V=(o,n=1024)=>{if(!o.trim()||o.length>n)throw new S("HOST_REJECTED",`Identity must contain 1 to ${n} characters.`)},Ke=async o=>{o.kind!=="projects"&&V(o.projectId);let n=await D({...M,type:"workspace-read",id:h(m),payload:o});if(!n||!("kind"in n)||!("state"in n)||n.kind!==o.kind)throw new S("HOST_REJECTED","Host did not return workspace data.");return n},We=async(o,n)=>{o.kind!=="projects"&&V(o.projectId);let u=h(m);oe.set(u,n);try{await C({...M,type:"workspace-subscribe",id:h(m),payload:{subscriptionId:u,query:o}})}catch(_){throw oe.delete(u),B||$({...M,type:"workspace-unsubscribe",id:h(m),payload:{subscriptionId:u}}),_}return()=>{!oe.delete(u)||B||$({...M,type:"workspace-unsubscribe",id:h(m),payload:{subscriptionId:u}})}},er=async(o,n)=>{o.kind==="session"&&V(o.sessionId),o.kind==="project"&&V(o.projectId);let u=h(m);re.set(u,n);try{await C({...M,type:"shells-subscribe",id:h(m),payload:{subscriptionId:u,scope:o}})}catch(_){throw re.delete(u),B||$({...M,type:"shells-unsubscribe",id:h(m),payload:{subscriptionId:u}}),_}return()=>{!re.delete(u)||B||$({...M,type:"shells-unsubscribe",id:h(m),payload:{subscriptionId:u}})}},Oe=async o=>{if("key"in o&&(o.key.length===0||o.key.length>128))throw new S("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(o.op==="set"&&!ie(o.value))throw new S("HOST_REJECTED","Storage values must be JSON.");if(o.op==="set"&&new TextEncoder().encode(JSON.stringify(o.value)).length>65536)throw new S("HOST_REJECTED","Storage value exceeds 64 KiB.");if(o.scope==="device"&&T?.features?.deviceStorage!==!0)throw new S("UNSUPPORTED","This host does not support device storage.");let n=await D({...M,type:"storage",id:h(m),payload:o});if(!n||!("storage"in n)||n.op!==o.op)throw new S("HOST_REJECTED","Host did not return storage data.");return n},Yt=(o,n)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===o)?Promise.reject(new S("UNSUPPORTED","This host does not support popovers.")):C({...M,type:"popover-close",id:h(m),payload:n?{id:o,reason:n}:{id:o}}),qt=(o,n)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===o)?Promise.reject(new S("UNSUPPORTED","This host does not support popovers.")):C({...M,type:"popover-anchor",id:h(m),payload:{id:o,active:n}});return t.addEventListener("keydown",zt,!0),t.addEventListener("pointerover",Ae),t.addEventListener("pointermove",Ae),t.addEventListener("pointerout",Kt),t.addEventListener("focus",Wt),t.addEventListener("blur",Jt),{onAction:o=>(pe=o,()=>{pe===o&&(pe=null)}),listProjects:async()=>{let o=await Ke({kind:"projects"});if(o.kind!=="projects")throw new S("HOST_REJECTED","Expected projects.");return o},listWorktrees:async o=>{let n=await Ke({kind:"worktrees",projectId:o});if(n.kind!=="worktrees")throw new S("HOST_REJECTED","Expected worktrees.");return n},listSessions:async o=>{let n=await Ke({kind:"sessions",projectId:o});if(n.kind!=="sessions")throw new S("HOST_REJECTED","Expected sessions.");return n},onProjects:o=>We({kind:"projects"},n=>{n.kind==="projects"&&o(n)}),onWorktrees:(o,n)=>We({kind:"worktrees",projectId:o},u=>{u.kind==="worktrees"&&n(u)}),onSessions:(o,n)=>We({kind:"sessions",projectId:o},u=>{u.kind==="sessions"&&n(u)}),onRunningShells:(o,n)=>er(o,n),readShellOutput:async(o,n)=>{V(o,128);let u=n?.cursor;if(u!==void 0&&(!Number.isInteger(u)||u<0))throw new S("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let _=n?.tailBytes;if(_!==void 0&&(!Number.isInteger(_)||_<1||_>65536))throw new S("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let g=await D({...M,type:"shell-output",id:h(m),payload:{shellId:o,cursor:u,tailBytes:_}});if(!g||typeof g.output!="string"||!Number.isFinite(g.cursor))throw new S("HOST_REJECTED","Host did not return shell output.");return g},stopShell:async o=>{if(V(o,128),(await D({...M,type:"shell-stop",id:h(m),payload:{shellId:o}}))?.stopped!==!0)throw new S("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async o=>{V(o),await C({...M,type:"open-session",id:h(m),payload:{sessionId:o}})},storage:{get:async(o,n)=>{let u=Xe(n),_={op:"get",key:o};u&&(_.scope=u);let k=await Oe(_);return k.op==="get"&&k.found?k.value:void 0},set:async(o,n,u)=>{let _=Xe(u),k={op:"set",key:o,value:n};_&&(k.scope=_),await Oe(k)},delete:async(o,n)=>{let u=Xe(n),_={op:"delete",key:o};u&&(_.scope=u),await Oe(_)},keys:async o=>{let n=Xe(o),u={op:"keys"};n&&(u.scope=n);let _=await Oe(u);if(_.op!=="keys")throw new S("HOST_REJECTED","Expected storage keys.");return _.keys}},onReady:o=>(i.add(o),T&&o(T),()=>{i.delete(o)}),onDirectory:o=>(l.add(o),T&&o(T.directory),()=>{l.delete(o)}),onSession:o=>(d.add(o),T&&o(T.session),()=>{d.delete(o)}),onSessionLifecycle:o=>(c.add(o),j&&o(j),()=>{c.delete(o)}),onConnection:o=>(E.add(o),T&&o(T.connection),()=>{E.delete(o)}),onSettings:o=>(p.add(o),T&&o(T.settings),()=>{p.delete(o)}),onItem:o=>(f.add(o),T&&o(T.item),()=>{f.delete(o)}),onStatusControl:o=>(R.add(o),()=>{R.delete(o)}),onPopoverClosed:o=>(O.add(o),()=>{O.delete(o)}),setStatusControls:o=>T?.features?.statusControls!==!0?Promise.reject(new S("UNSUPPORTED","This host does not support status controls.")):_o(o)?C({...M,type:"status-controls",id:h(m),payload:{controls:o}}):Promise.reject(new S("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:o=>T?.features?.popovers!==!0?Promise.reject(new S("UNSUPPORTED","This host does not support popovers.")):_t(o)?C({...M,type:"popover-open",id:h(m),payload:o}):Promise.reject(new S("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Yt,setPopoverAnchorActive:qt,onResolve:o=>(de=o,()=>{de===o&&(de=null)}),toast:o=>{let n=o.message.trim();return!n||n.length>Me?Promise.reject(new S("HOST_REJECTED",`Toast message must contain 1 to ${Me} characters.`)):o.copy&&o.copy!==!0&&(!o.copy.text.length||o.copy.text.length>Ne)?Promise.reject(new S("HOST_REJECTED",`Toast copy text must contain 1 to ${Ne} characters.`)):C({channel:x,v:1,type:"toast",id:h(m),payload:{...o,message:n}})},openUrl:o=>C({channel:x,v:1,type:"open-url",id:h(m),payload:{url:o}}),openCommit:o=>mt(o)?C({channel:x,v:1,type:"open-commit",id:h(m),payload:{sha:o}}):Promise.reject(new S("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:o=>C({channel:x,v:1,type:"open-surface",id:h(m),payload:{surfaceId:o}}),writeClipboard:o=>C({channel:x,v:1,type:"clipboard-write",id:h(m),payload:{text:o}}),compose:o=>C({channel:x,v:1,type:"compose",id:h(m),payload:o}),attach:o=>C({channel:x,v:1,type:"attach",id:h(m),payload:ae(o)}),startSession:async o=>{o.projectId!==void 0&&V(o.projectId);let n=o.worktree;n&&n!==!0&&(n.kind==="existing"?V(n.directory):(n.name!==void 0&&V(n.name,200),n.baseBranch!==void 0&&V(n.baseBranch,200)));let u=await D({channel:x,v:1,type:"start-session",id:h(m),payload:At(o)},e.requestTimeoutMs??18e4);if(!St(u))throw new S("HOST_REJECTED","Host did not return a session.");return u},prompt:o=>D({channel:x,v:1,type:"prompt",id:h(m),payload:Ot(o)}).then(n=>{if(!Tt(n))throw new S("HOST_REJECTED","Host did not return a prompt result.");return n}),sessionLink:o=>C({channel:x,v:1,type:"session-link",id:h(m),payload:ae(o)}),close:()=>C({channel:x,v:1,type:"close",id:h(m)}),oauthStart:()=>C({channel:x,v:1,type:"oauth-start",id:h(m)}),oauthDisconnect:()=>C({channel:x,v:1,type:"oauth-disconnect",id:h(m)}),request:o=>(He(o.path)?D({channel:x,v:1,type:"request",id:h(m),payload:o}):Fo()).then(n=>{if(!$e(n))throw new S("HOST_REJECTED","Host request result was empty.");return n}),serviceRequest:o=>(He(o.path)?D({channel:x,v:1,type:"service-request",id:h(m),payload:o}):Fo()).then(n=>{if(!$e(n))throw new S("HOST_REJECTED","Host service request result was empty.");return n}),serviceStatus:()=>D({channel:x,v:1,type:"service-status",id:h(m)}).then(o=>{if(!kt(o))throw new S("HOST_REJECTED","Host did not return service status.");return o}),readFile:o=>(ce(o)?D({channel:x,v:1,type:"file-read",id:h(m),payload:{path:o}}):Fe()).then(n=>{if(!vt(n))throw new S("HOST_REJECTED","Host did not return file content.");return n}),writeFile:(o,n)=>ce(o)?n.length>Pe?Promise.reject(new S("FILE_TOO_LARGE",`Content is over ${Pe} characters.`)):D({channel:x,v:1,type:"file-write",id:h(m),payload:{path:o,content:n}}).then(u=>{if(!yt(u))throw new S("HOST_REJECTED","Host did not confirm the write.");return u}):Fe(),listDir:o=>(ce(o)?D({channel:x,v:1,type:"file-list",id:h(m),payload:{path:o}}):Fe()).then(n=>{if(!It(n))throw new S("HOST_REJECTED","Host did not return directory entries.");return n}),stat:o=>(ce(o)?D({channel:x,v:1,type:"file-stat",id:h(m),payload:{path:o}}):Fe()).then(n=>{if(!Ut(n))throw new S("HOST_REJECTED","Host did not return file status.");return n}),generate:o=>{let n=o.prompt.trim(),u=o.system?.trim();if(n.length===0||n.length>Ge)return Promise.reject(new S("HOST_REJECTED",`Prompt must be 1 to ${Ge} characters.`));if(u!==void 0&&(u.length===0||u.length>De))return Promise.reject(new S("HOST_REJECTED",`System prompt must be 1 to ${De} characters.`));let _=o.maxOutputTokens===void 0?void 0:Math.min(xt,Math.max(1,Math.floor(o.maxOutputTokens)));if(_!==void 0&&!Number.isFinite(_))return Promise.reject(new S("HOST_REJECTED","maxOutputTokens must be a number."));let k={prompt:n};return u!==void 0&&(k.system=u),_!==void 0&&(k.maxOutputTokens=_),D({channel:x,v:1,type:"generate",id:h(m),payload:k},e.requestTimeoutMs??bt).then(g=>{if(!wt(g))throw new S("HOST_REJECTED","Host did not return generated text.");return g})},onLateGenerateResult:o=>{y.add(o);for(let n of ee.splice(0))w([o],n);return Xt(),()=>{y.delete(o)}},setBadge:o=>C({channel:x,v:1,type:"badge",id:h(m),payload:{count:gt(o)}}),setHeight:o=>C({channel:x,v:1,type:"resize",id:h(m),payload:{height:Rt(o)}}),onFileOpen:o=>(he.add(o),je||(je=!0,t.addEventListener("keydown",jt,!0)),Ee&&o(Ee),()=>{he.delete(o)}),onFileSnapshot:o=>(ue=o,()=>{ue===o&&(ue=null)}),onFileSaved:o=>(xe.add(o),()=>{xe.delete(o)}),reportFileChange:o=>ze({...M,type:"file-change",payload:{dirty:o.dirty,edited:o.edited}}),requestFileSave:Bt,reportFileUnsupported:()=>ze({...M,type:"file-unsupported"}),dispose:()=>{for(let o of oe.keys())$({...M,type:"workspace-unsubscribe",id:h(m),payload:{subscriptionId:o}});oe.clear();for(let o of re.keys())$({...M,type:"shells-unsubscribe",id:h(m),payload:{subscriptionId:o}});re.clear(),B=!0,de=null,pe=null,ue=null,he.clear(),xe.clear(),je&&t.removeEventListener("keydown",jt,!0),t.removeEventListener("message",Vt),t.removeEventListener("keydown",zt,!0),t.removeEventListener("pointerover",Ae),t.removeEventListener("pointermove",Ae),t.removeEventListener("pointerout",Kt),t.removeEventListener("focus",Wt),t.removeEventListener("blur",Jt);for(let o of te.values())clearTimeout(o.timer),o.reject(new S("HOST_UNAVAILABLE","Host client was disposed."));te.clear(),i.clear(),l.clear(),d.clear(),c.clear(),E.clear(),p.clear(),f.clear(),R.clear(),O.clear(),y.clear(),ee.length=0}}};var Bo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Ti=new Set(Bo);var gr=10*6e4;var Rr=10*6e4;var kr=10*6e4;var jo=["none","agent","user"];var hi=new Set(jo);var Ve=e=>e>=95?"critical":e>=90?"warn":null;var zo=e=>e.map(t=>`${t.kind}:${t.target??""}:${t.level}`).sort().join("|");var vr=1e4,Wo=3,yr=e=>{if(typeof e!="object"||e===null)return null;let t=Reflect.get(e,"code");return typeof t=="string"?t:null},Ir=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.sampledAt=="number"&&typeof t.guard=="object"&&t.guard!==null&&Array.isArray(t.warnings)},Jo=e=>{let t=!1,r=!1,s=0,i=0,l=0,d=!1,c=null,E=O=>{c?.(),c=e.schedule(()=>{c=null,R()},O)},p=()=>Math.min(vr,2e3*2**Math.max(0,s-1)),f=O=>{s+=1,O&&(d=!0,e.onState({kind:"blocked",reason:O})),E(p())},R=()=>{r||t||e.visible()&&(t=!0,e.request().then(O=>{if(t=!1,r)return;let y=null;if(O.status===200)try{let ee=JSON.parse(O.body);y=Ir(ee)?ee:null}catch{y=null}if(!y){i+=1,f(i>=Wo?"failed":null);return}s=0,i=0,(y.sampledAt>=l||d)&&(l=y.sampledAt,d=!1,e.onState({kind:"ready",stats:y})),E(2e3)},O=>{if(t=!1,r)return;let y=yr(O);y==="NO_SERVICE"?f("not-allowed"):y==="DISABLED"?f("paused"):y==="HOST_TIMEOUT"?(i+=1,f(i>=Wo?"failed":null)):f("failed")}))};return{poll:()=>{c?.(),c=null,R()},dispose:()=>{r=!0,c?.(),c=null}}};var Yo=(e,t={})=>{let r=Gt(),s={kind:"loading"},i=Jo({request:()=>r.serviceRequest({method:"GET",path:"/stats"}),onState:d=>{s=d,l(),d.kind==="ready"&&t.onStats?.(d.stats,r)},visible:()=>document.visibilityState==="visible",schedule:(d,c)=>{let E=setTimeout(d,c);return()=>clearTimeout(E)}}),l=()=>e({state:s,retry:i.poll});return r.onReady(d=>{Je(d,document.documentElement),l()}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&i.poll()}),window.addEventListener("pagehide",()=>{i.dispose(),r.dispose()}),l(),i.poll(),r};var qo=`
*{box-sizing:border-box}
[data-oc-theme="dark"]{color-scheme:dark}
[data-oc-theme="light"]{color-scheme:light}
html,body{margin:0;color:var(--oc-fg);font:12px/1.4 var(--oc-font);font-variant-numeric:tabular-nums}
[hidden]{display:none!important}
.muted{color:var(--oc-muted)}
.meter{display:flex;flex-direction:column;gap:3px;min-width:0}
.meter-head{display:flex;align-items:baseline;gap:8px;min-width:0}
.meter-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.meter-value{flex:none;color:var(--oc-muted)}
.meter-value.warn{color:var(--oc-warning-text)}
.meter-value.critical{color:var(--oc-error-text)}
.meter .oc-sdk-progress{margin:0}
.unavailable{color:var(--oc-muted);font-style:italic}
.spark{display:block;width:100%;height:34px;margin-top:6px;color:var(--oc-primary)}
.spark.warn{color:var(--oc-warning-text)}
.spark.critical{color:var(--oc-error-text)}
`,Qo=e=>{let t=document.createElement("style");t.textContent=e,document.head.append(t)},a=(e,t="",r="")=>{let s=document.createElement(e);return t&&(s.className=t),r&&(s.textContent=r),s},Ur=e=>e==="critical"?"error":e==="warn"?"warning":"primary",me=e=>{let t=a("div","meter"),r=a("div","meter-head"),s=a("span","meter-label"),i=a("span","meter-value");r.append(s,i);let l=a("div");t.append(r,l),e.append(t);let d=null;return{node:t,update:c=>{s.textContent=c.label,i.textContent=c.value,i.className=`meter-value${c.unavailable?" unavailable":c.level?` ${c.level}`:""}`;let E=c.percent!==null&&!c.unavailable;if(l.hidden=!E,!E)return;let p={value:c.percent??0,tone:Ur(c.level),label:void 0};d?d.update(p):d=lt(l,p),l.querySelector('[role="progressbar"]')?.setAttribute("aria-label",c.label)}}},Dt=(e,t=null)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("class",`spark${t?` ${t}`:""}`),r.setAttribute("viewBox","0 0 300 34"),r.setAttribute("preserveAspectRatio","none"),r.setAttribute("role","img"),r.setAttribute("aria-label","History");let s=e.filter(f=>f!==null);if(s.length<2)return r;let i=Math.min(...s),d=Math.max(...s)-i||1,c=300/Math.max(1,e.length-1),E=[];e.forEach((f,R)=>{if(f===null)return;let O=R*c,y=32-(f-i)/d*28;E.push(`${O.toFixed(1)},${y.toFixed(1)}`)});let p=document.createElementNS("http://www.w3.org/2000/svg","polyline");return p.setAttribute("points",E.join(" ")),p.setAttribute("fill","none"),p.setAttribute("stroke","currentColor"),p.setAttribute("stroke-width","1.6"),p.setAttribute("vector-effect","non-scaling-stroke"),r.append(p),r};Qo(`${qo}
html,body{background:var(--oc-bg);min-height:100%}
#root{display:flex;flex-direction:column;gap:14px;padding:12px 12px 20px;container-type:inline-size}
.head{display:flex;align-items:center;gap:8px;padding:0 2px 2px}
.head .name{font-size:13px;font-weight:650;letter-spacing:.01em}
.head .sub{color:var(--oc-muted);font-size:10px;margin-top:1px}
.head .grow{flex:1}
section{display:flex;flex-direction:column;gap:7px;min-width:0}
section+section{border-top:1px solid var(--oc-border);padding-top:12px}
h2{margin:0;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--oc-muted);display:flex;align-items:baseline;gap:7px;min-width:0}
h2 .sub{font-weight:400;color:var(--oc-muted);letter-spacing:0;text-transform:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hero{display:flex;align-items:flex-end;justify-content:space-between;gap:8px}
.big{font-size:21px;font-weight:680;letter-spacing:-.02em;line-height:1.05}
.big small{font-size:11px;color:var(--oc-muted);font-weight:500;letter-spacing:0}
.meta{color:var(--oc-muted);font-size:10px;text-align:right;line-height:1.35}
.meta b{color:var(--oc-fg);font-weight:600}
.caption{display:flex;justify-content:space-between;gap:8px;color:var(--oc-muted);font-size:10px;min-width:0}
.caption span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.caption .warn{color:var(--oc-warning-text)}
.caption .critical{color:var(--oc-error-text)}
.warnline{display:flex;align-items:center;gap:6px;color:var(--oc-warning-text);font-size:10.5px;padding:6px 8px;border:1px solid color-mix(in srgb,var(--oc-warning-text) 28%,transparent);border-radius:var(--oc-radius);background:color-mix(in srgb,var(--oc-warning-text) 7%,transparent)}
.warnline.critical{color:var(--oc-error-text);border-color:color-mix(in srgb,var(--oc-error-text) 28%,transparent);background:color-mix(in srgb,var(--oc-error-text) 7%,transparent)}
.jobs{display:flex;flex-direction:column;gap:0}
.job{display:grid;grid-template-columns:1fr auto;gap:2px 8px;padding:7px 0;min-width:0}
.job+.job{border-top:1px solid var(--oc-border)}
.job .jname{font-weight:600;font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.job .jkind{color:var(--oc-muted);font-size:9.5px;margin-left:5px;font-weight:500}
.job .jnums{color:var(--oc-muted);font-size:10px;white-space:nowrap;text-align:right}
.job .jnums b{color:var(--oc-fg);font-weight:600}
.job .jfoot{grid-column:1/-1;display:flex;align-items:center;gap:7px;color:var(--oc-muted);font-size:9.5px;min-width:0}
.job .jfoot .grow{flex:1}
.cores{display:grid;gap:2px;height:24px;align-items:end}
.core{background:color-mix(in srgb,var(--oc-primary) 16%,transparent);border-radius:2px 2px 0 0;height:100%;position:relative;overflow:hidden}
.core>i{position:absolute;left:0;right:0;bottom:0;background:var(--oc-primary)}
.rows{display:flex;flex-direction:column;gap:6px}
.row{display:grid;grid-template-columns:46px 1fr auto;gap:7px;align-items:center;min-width:0}
.row .rlabel{color:var(--oc-muted);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.row .rval{color:var(--oc-muted);font-size:10px;text-align:right;white-space:nowrap}
.row .rval b{color:var(--oc-fg);font-weight:600}
.row .meter{grid-column:2}
.row .meter .meter-head{display:none}
.row .meter .oc-sdk-progress{margin:0}
table{width:100%;border-collapse:collapse;font-size:10px}
th{text-align:left;color:var(--oc-muted);font-weight:600;font-size:9px;letter-spacing:.04em;text-transform:uppercase;padding:0 0 4px}
th.r,td.r{text-align:right}
td{padding:3px 0;border-top:1px solid var(--oc-border);color:var(--oc-muted)}
td.pname{color:var(--oc-fg);max-width:132px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
td .pid{color:var(--oc-muted);font-size:9px;margin-left:4px}
.event{display:flex;gap:7px;align-items:baseline;padding:4px 0;font-size:10px;min-width:0}
.event+.event{border-top:1px solid var(--oc-border)}
.event .when{color:var(--oc-muted);white-space:nowrap;font-size:9.5px}
.event .what{flex:1;color:var(--oc-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.event .what b{color:var(--oc-fg);font-weight:600}
.event .reclaim{color:var(--oc-success-text);font-weight:600;white-space:nowrap}
.event .failed{color:var(--oc-error-text)}
.center{display:flex;align-items:center;gap:8px;color:var(--oc-muted);padding:18px 0}
`);var Be=document.querySelector("#root");if(!Be)throw new Error("Missing root");var le=(e,t=null)=>{let r=a("section"),s=a("h2","",e);return t&&s.append(a("span","sub",t)),r.append(s),r},Ht=(e,t)=>{let r=t.reason==="tool-missing"&&t.tool?`${t.tool} not found`:t.reason==="no-device"?"no device":t.reason==="unsupported"?"not supported":"unavailable";e.append(a("div","unavailable",r))};var wr=e=>e.online?e.state==="blocked"?{label:"Blocked",tone:"warning",level:"warn"}:e.state==="restarting"?{label:"Restarting",tone:"warning",level:"warn"}:e.state==="ok"?{label:"OK",tone:"success",level:null}:{label:e.state==="unknown"?"Unknown":e.state,tone:"neutral",level:null}:{label:"Offline",tone:"warning",level:"warn"},Cr=e=>{if(!e.online)return e.error??"state file is stale";if(e.state==="blocked"){let t=e.runningSessions;return`over limit \xB7 waiting for ${t} session${t===1?"":"s"}`}return e.memMb!==null&&e.limitMb>0&&e.memMb>e.limitMb?"over limit \xB7 restarts when idle":e.reasons[0]??"below the limit"},Mr=e=>e.state==="busy"?"success":e.state==="waiting"?"warning":e.state==="idle"?"error":"neutral",Nr=(e,t)=>{if(e.state==="busy")return`${Ce(e.cpu,1)}% CPU`;let r=Math.max(0,t.jobsIdleMinutes-e.idleMin);return r<=0?"due to close":`closes in ${dt(r)}`},Lr=e=>{let t=le("OpenChamber memory","guard"),r=e.memMb!==null&&e.limitMb>0?e.memMb/e.limitMb*100:null,s=r===null?null:r>=100?"critical":Ve(r),i=a("div","hero"),l=a("div","big");l.append(document.createTextNode(Y(e.memMb)));let d=a("small");d.textContent=` / ${Y(e.limitMb)} limit`,l.append(d),i.append(l);let c=a("div","meta");c.append(document.createTextNode("idle "));let E=a("b","",dt(e.idleMin));c.append(E),i.append(c),t.append(i),me(t).update({label:"memory",percent:r,value:r===null?"\u2014":Z(r),level:s});let p=a("div",`caption${s?` ${s}`:""}`);p.append(a("span","",Cr(e))),p.append(a("span","",r===null?"":Z(r))),t.append(p);let f=e.memHistory.map(([,O])=>O);f.length>1&&t.append(Dt(f,s));let R=a("div","caption");return R.append(a("span","","last hour")),R.append(a("span","",`${e.runningSessions} sessions \xB7 ${e.processCount??"\u2014"} processes`)),t.append(R),t},Pr=e=>{let t=le("Jobs",`${e.jobs.length} tracked`);if(e.jobs.length===0)return t.append(a("div","unavailable","no tracked jobs")),t;let r=a("div","jobs");for(let s of e.jobs){let i=a("div","job"),l=a("div","jname");l.append(document.createTextNode(s.label)),l.append(a("span","jkind",s.kind)),i.append(l);let d=a("div","jnums"),c=a("b","",Y(s.rssMb));d.append(c),s.swapMb>=1&&d.append(document.createTextNode(` + ${Y(s.swapMb)} swap`)),i.append(d);let E=a("div","jfoot"),p=a("span");we(p,{label:s.state,tone:Mr(s)}),E.append(p),E.append(a("span","",Nr(s,e))),E.append(a("span","grow")),s.port!==null&&E.append(a("span","",`:${s.port}`)),s.unit&&E.append(a("span","",s.unit)),i.append(E),r.append(i)}return t.append(r),t},Gr=(e,t)=>{let r=le("CPU",e.status==="ok"?e.model:null);if(e.status!=="ok")return Ht(r,e),r;let s=a("div","hero");s.append(a("div","big",Z(e.total)));let i=a("div","meta");if(e.load&&(i.append(document.createTextNode("load ")),i.append(a("b","",e.load.map(c=>Ce(c,2)).join(" \xB7 ")))),s.append(i),r.append(s),r.append(Dt(t.history.cpu,e.total>=90?"warn":null)),e.perCore.length>1){let c=a("div","cores");c.style.gridTemplateColumns=`repeat(${e.perCore.length}, minmax(0, 1fr))`,c.setAttribute("role","img"),c.setAttribute("aria-label","Per-core CPU usage"),e.perCore.forEach((E,p)=>{let f=a("div","core");f.title=`#${p+1}: ${Z(E)}`;let R=a("i");R.style.height=`${Math.round(E)}%`,f.append(R),c.append(f)}),r.append(c)}let l=a("div","caption");l.append(a("span","",`${e.cores} cores${e.freqMhz?` \xB7 ${Math.round(e.freqMhz)} MHz`:""}${e.tempC!==null?` \xB7 ${Math.round(e.tempC)}\xB0C`:""}`));let d=t.gpus;if(d.status==="ok"&&d.devices[0]){let c=d.devices[0];l.append(a("span","",`GPU ${Z(c.utilization)} \xB7 ${X(c.memUsed)} / ${X(c.memTotal)}`))}return r.append(l),r},Dr=e=>{let t=le("Memory");if(e.status!=="ok")return Ht(t,e),t;let r=a("div","rows"),s=e.total>0?e.used/e.total*100:0,i=Ve(s),l=a("div","row");if(l.append(a("span","rlabel","RAM")),me(l).update({label:"RAM",percent:s,value:"",level:i}),l.append(a("span","rval",`${X(e.used)} / ${X(e.total)}`)),r.append(l),e.swapTotal!==null&&e.swapUsed!==null){let p=e.swapTotal>0?e.swapUsed/e.swapTotal*100:0,f=a("div","row");f.append(a("span","rlabel","Swap")),me(f).update({label:"Swap",percent:p,value:"",level:Ve(p)}),f.append(a("span","rval",`${X(e.swapUsed)} / ${X(e.swapTotal)}`)),r.append(f)}if(e.zram){let p=e.zram.disksize>0?e.zram.data/e.zram.disksize*100:0,f=a("div","row");f.append(a("span","rlabel","zram")),me(f).update({label:"zram",percent:p,value:"",level:null}),f.append(a("span","rval",`${X(e.zram.data)} \u2192 ${X(e.zram.memUsed)}`)),r.append(f)}t.append(r);let c=a("div","caption");if(e.zram){let p=e.zram.memUsed>0?e.zram.data/e.zram.memUsed:null;c.append(a("span","",`${e.zram.algo}${p?` \xB7 ${Ce(p,1)}\xD7 compression`:""}`))}let E=e.swapDevices.map(p=>`${p.name} ${X(p.used)}`).join(" \xB7 ");return c.append(a("span","",E||"no swap devices")),t.append(c),t},Hr=e=>{let t=le("Processes","top by RAM");if(e.status!=="ok")return Ht(t,e),t;if(e.rows.length===0)return t.append(a("div","unavailable","no processes")),t;let r=a("table"),s=a("thead"),i=a("tr");for(let[d,c]of[["Process",!1],["CPU",!0],["RAM",!0],["Swap",!0],["GPU",!0]]){let E=a("th",c?"r":"",d);i.append(E)}s.append(i),r.append(s);let l=a("tbody");for(let d of e.rows.slice(0,8)){let c=a("tr"),E=a("td","pname");E.append(document.createTextNode(co(d.name))),E.append(a("span","pid",String(d.pid))),c.append(E),c.append(a("td","r",Z(d.cpu))),c.append(a("td","r",X(d.rss))),c.append(a("td","r",d.swap>0?X(d.swap):"\u2014"));let p=d.gpuType?`${d.gpuType}${d.gpuSm!==null?` ${Math.round(d.gpuSm)}%`:""}`:"\u2014";c.append(a("td","r",p)),l.append(c)}return r.append(l),t.append(r),t},$r=e=>{let t=le("History","guard actions");if(e.history.length===0)return t.append(a("div","unavailable","no guard actions yet")),t;for(let r of e.history.slice(0,5)){let s=a("div","event");s.append(a("span","when",ao(r.at)));let i=a("span","what"),l=a("b","",r.kind==="restart"?"OpenChamber":r.label);i.append(l),r.kind==="restart"&&i.append(document.createTextNode(" restarted")),r.kind==="job-close"&&i.append(document.createTextNode(" closed")),r.kind==="job-failed"&&i.append(document.createTextNode(" close failed")),r.beforeMb!==null&&r.afterMb!==null&&i.append(document.createTextNode(` \xB7 ${Y(r.beforeMb)} \u2192 ${Y(r.afterMb)}`)),s.append(i),r.reclaimedMb!==null?s.append(a("span","reclaim",Y(r.reclaimedMb))):r.ok===!1&&s.append(a("span","failed","failed")),t.append(s)}return t},Fr=e=>{if(e.length===0)return null;let t=e.some(s=>s.level==="critical"),r=a("div",`warnline${t?" critical":""}`);return r.append(document.createTextNode(`\u26A0 ${e.length} warning${e.length===1?"":"s"} \xB7 ${e[0]?.message??""}`)),r},Zo=null;Yo(({state:e,retry:t})=>{if(e.kind==="loading"){let f=a("div","center");at(f,{size:"sm",label:"Reading machine and guard"}),Be.replaceChildren(f);return}if(e.kind==="blocked"){let f=a("div"),R=e.reason==="not-allowed"?{title:"Service not allowed",body:"Allow the Ops local service in Settings \u2192 Extensions."}:e.reason==="paused"?{title:"Ops is paused",body:"Enable Ops in Settings \u2192 Extensions."}:{title:"Service is not answering",body:"The local service did not answer. Retry, or check Settings \u2192 Extensions."};ct(f,{tone:e.reason==="failed"?"error":"warning",title:R.title,body:R.body,action:e.reason==="failed"?{label:"Retry",onClick:t}:void 0}),Be.replaceChildren(f);return}let{stats:r}=e,s=r.guard,i=wr(s),l=[],d=a("div","head"),c=a("div");c.append(a("div","sub","machine + guard")),d.append(c),d.append(a("div","grow"));let E=a("span");we(E,{label:i.label,tone:i.tone}),d.append(E),l.push(d);let p=r.warnings.length>1||r.warnings.some(f=>f.kind!=="guard")?Fr(r.warnings):null;p&&l.push(p),l.push(Lr(s),Pr(s),Gr(r.cpu,r),Dr(r.memory),Hr(r.processes),$r(s)),Be.replaceChildren(...l)},{onStats:(e,t)=>{let r=zo(e.warnings);r!==Zo&&(Zo=r,t.setBadge(e.warnings.length>0?e.warnings.length:null).catch(()=>{}))}});})();
