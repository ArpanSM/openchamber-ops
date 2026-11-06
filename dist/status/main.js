"use strict";(()=>{var Ko=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],jo=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],$t=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,i]of Ko)o.style.setProperty(n,e.tokens[i]);for(let[n,i,s]of jo){let u=e.tokens[s]??"";o.style.setProperty(n,u),o.style.setProperty(i,u)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Xe=(e,o)=>{$t(e.theme,o),o.dataset&&(o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode)};var Ae="data-oc-scrolling",$e=`
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
:hover, [${Ae}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Ae}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Ae}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Ae}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Ve(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",i=>{let s=i.target===e?o:i.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let u=n.get(s);u!==void 0&&clearTimeout(u),n.set(s,setTimeout(()=>{n.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Wo=`(${Ve.toString()})(document);`;var zo={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,o)=>`var(--${e}, var(--oc-${zo[e]}, ${o}))`,W=O("surface-background","transparent"),xe=O("surface-elevated","transparent"),oe=O("surface-elevated-foreground","inherit"),X=O("surface-foreground","inherit"),b=O("surface-muted-foreground","gray"),Jo=O("surface-muted","transparent"),q=O("interactive-border","currentColor"),G=O("interactive-hover","transparent"),Q=O("interactive-active","transparent"),Be=O("interactive-selection","transparent"),Ke=O("interactive-selection-foreground","inherit"),j=O("primary","currentColor"),je=O("primary-text","inherit"),We=O("error-text","inherit"),Yo=O("font-sans","inherit"),ze=O("font-mono","monospace"),jt=O("radius","9px"),Je=`calc(${jt} - 2px)`,Vt=`calc(${jt} - 4px)`,g=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Bt=`background-image: linear-gradient(${G}, ${G});`,Ye=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,qe="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Kt="box-shadow: var(--oc-sdk-lit);",Qe=`inset 0 0.5px 0 0 ${g(X,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,qo=`
:root {
  --oc-sdk-edge: ${g(X,16)};
  --oc-sdk-field-bg: ${xe};
  --oc-sdk-raised-bg: ${W};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${g(X,14)};
  --oc-sdk-field-bg: ${g(W,50,xe)};
  --oc-sdk-raised-bg: ${xe};
  --oc-sdk-field-lift: ${Qe};
  --oc-sdk-raised-lift: ${Qe};
  --oc-sdk-lit: ${Qe};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Oe=e=>{let o=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},Qo=`
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
`,Wt=`${qo}
.oc-sdk { color: ${X}; font-family: ${Yo}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Bt} }
.oc-sdk-mono { font-family: ${ze}; }
.oc-sdk-muted { color: ${b}; }
${Oe("success")}${Oe("warning")}${Oe("error")}${Oe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${j}; --oc-sdk-tone-text: ${je}; }

.oc-sdk-btn { border-radius: ${Je}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Vt}; }
.oc-sdk-btn[data-variant="default"] { color: ${je}; background: ${g(j,10,W)}; border-color: ${g(j,12)}; ${Kt} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${g(j,16,W)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${g(j,22,W)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Jo}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${oe}; ${qe} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Q}, ${Q}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${G}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Q}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${We}; background: ${g("var(--oc-sdk-tone)",7,W)}; border-color: ${g("var(--oc-sdk-tone)",12)}; ${Kt} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${g("var(--oc-sdk-tone)",9,W)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${g("var(--oc-sdk-tone)",11,W)}; box-shadow: none; }

.oc-sdk-field-note { color: ${b}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${We}; }
.oc-sdk-input { border-radius: ${Je}; background: var(--oc-sdk-field-bg); color: ${oe}; ${Ye("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${b}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Ye(g(X,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Ye(O("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${ze}; }

.oc-sdk-search-icon { color: ${b}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${j}; }
.oc-sdk-search-clear { border-radius: ${Vt}; color: ${b}; }
.oc-sdk-search-clear:hover { background: ${G}; color: ${X}; }

.oc-sdk-trigger { border-radius: ${Je}; background: var(--oc-sdk-raised-bg); color: ${oe}; ${qe} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${G}, ${G}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${b}; }
.oc-sdk-trigger-chevron { color: ${b}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${oe}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${xe}; background-clip: padding-box; color: ${oe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${G}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Be}; color: ${Ke}; }
.oc-sdk-option-check { color: ${X}; }
.oc-sdk-option[data-destructive="true"] { color: ${We}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${g(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${b}; }
.oc-sdk-popup-empty { color: ${b}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${q}; border-radius: 4px; color: ${X}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${g(X,60,q)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${q}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${W}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${j}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Bt} }
.oc-sdk-check-desc { color: ${b}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${g(X,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${b}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${X}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ke}; background: ${Be}; border-color: ${q}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${oe}; background: var(--oc-sdk-raised-bg); ${qe} }
.oc-sdk-tab-count { color: ${b}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${g(X,6)}; color: ${b}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${g("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${G}; }
.oc-sdk-row[aria-selected="true"] { background: ${Be}; color: ${Ke}; }
.oc-sdk-row-lead { font-family: ${ze}; color: ${b}; }
.oc-sdk-row-sub { color: ${b}; }
.oc-sdk-row-meta { color: ${b}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${b}; }

.oc-sdk-empty-body { color: ${b}; }

.oc-sdk-spinner { color: ${b}; }
.oc-sdk-spinner-ring { border-color: ${q}; border-top-color: ${j}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${g("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${b}; }

.oc-sdk-separator { color: ${b}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${g(q,40)}; }

.oc-sdk-progress-label { color: ${b}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${g(X,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${j}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${O("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${O("success-text","inherit")}; }

.oc-sdk-text a { color: ${je}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${g(q,60)}; }
`,M=`
${$e}
${Qo}
${Wt}`;var zt="oc-sdk-ui-style";var N=e=>{let o=document.getElementById(zt);if(o instanceof HTMLStyleElement){o.textContent!==e&&(o.textContent=e);return}Ve(document);let n=document.createElement("style");n.id=zt,n.textContent=e,document.head.appendChild(n)},m=(e,o)=>{let n=document.createElement(e);return o&&(n.className=o),n},J=e=>{let o=m("button",e);return o.type="button",o},D=(e,o)=>{let n=o??"";e.textContent!==n&&(e.textContent=n)},Y=(e,o,n)=>{n==null||n===""?e.removeAttribute(o):e.getAttribute(o)!==n&&e.setAttribute(o,n)};var Zo=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},re=(e,o)=>{N(M);let n=o,i=J("oc-sdk oc-sdk-btn"),s=Zo(),u=document.createElement("span");i.append(u),e.append(i);let f=()=>{i.dataset.variant=n.variant??"default",i.dataset.size=n.size??"default",i.disabled=!!n.disabled||!!n.loading,i.dataset.loading=n.loading?"true":"false",i.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&s.parentNode!==i?i.prepend(s):!n.loading&&s.parentNode===i&&s.remove(),D(u,n.label)},T=()=>{n.disabled||n.loading||n.onClick()};return i.addEventListener("click",T),f(),{update:v=>{n={...n,...v},f()},dispose:()=>{i.removeEventListener("click",T),i.remove()}}};var Jt="http://www.w3.org/2000/svg",er={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},ne=(e,o,n)=>{let i=document.createElementNS(Jt,"svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("width",String(o)),i.setAttribute("height",String(o)),i.setAttribute("aria-hidden","true"),i.setAttribute("fill","currentColor"),n&&i.setAttribute("class",n);let s=document.createElementNS(Jt,"path");return s.setAttribute("d",er[e]),i.append(s),i};var Ze=(e,o)=>{Y(e,"data-tone",o&&o!=="neutral"?o:null)};var et=(e,o={})=>{N(M);let n=o,i=m("span","oc-sdk oc-sdk-spinner");i.setAttribute("role","status");let s=m("span","oc-sdk-spinner-ring");s.setAttribute("aria-hidden","true");let u=m("span");i.append(s,u),e.append(i);let f=()=>{i.dataset.size=n.size??"default",D(u,n.label),u.hidden=!n.label,i.setAttribute("aria-label",n.label??"Loading")};return f(),{update:T=>{n={...n,...T},f()},dispose:()=>{i.remove()}}};var nr=e=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,ke=(e,o)=>{N(M);let n=o,i=m("div","oc-sdk oc-sdk-progress"),s=m("div","oc-sdk-progress-label"),u=m("span"),f=m("span","oc-sdk-progress-value"),T=m("span"),v=ne("check",14);f.append(v,T),s.append(u,f);let x=m("div","oc-sdk-progress-track");x.setAttribute("role","progressbar"),x.setAttribute("aria-valuemin","0"),x.setAttribute("aria-valuemax","100");let H=m("div","oc-sdk-progress-fill");x.append(H),i.append(s,x),e.append(i);let w=()=>{let R=nr(n.value);Ze(H,n.tone),H.style.transform=`scaleX(${R/100})`,x.setAttribute("aria-valuenow",String(R)),n.label?x.setAttribute("aria-label",n.label):x.removeAttribute("aria-label"),D(u,n.label),D(T,`${R}%`);let k=R===100&&(!n.tone||n.tone==="neutral");Y(i,"data-done",k?"true":null),v.style.display=k?"":"none",s.hidden=!n.label};return w(),{update:R=>{n={...n,...R},w()},dispose:()=>{i.remove()}}};var tt=e=>e===null||!Number.isFinite(e)?"\u2014":`${Math.round(e)}%`,ot=(e,o=1)=>e===null||!Number.isFinite(e)?"\u2014":e.toFixed(o);var _="openchamber.sdk";var Zt=/^[a-z][a-z0-9-]{0,39}$/;var Yt=e=>Object(e)===e&&!Array.isArray(e),rt=(e,o)=>Object.keys(e).every(n=>o.includes(n)),qt=e=>String(e)===e&&e.length>=1&&e.length<=60,Qt=e=>String(e)===e&&e.length>=1&&e.length<=80,eo=e=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!Yt(n)||!Zt.test(n.id)||!qt(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!rt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!rt(n,["kind","id","label","value","options","disabled"])||!Qt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let i=new Set;for(let s of n.options){if(!Yt(s)||!rt(s,["value","label"])||!Qt(s.value)||!qt(s.label)||i.has(s.value))return!1;i.add(s.value)}if(!i.has(n.value))return!1}return!0};var to=["{id}","{segment}","{segments+}"];var Xs=new Set(to);var oo=["turn-finished","turn-failed","permission-asked","question-asked"];var Vs=new Set(oo);var nt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,ro=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var no=/^[A-Za-z0-9_-]{1,80}$/;var so=["left","right","top","bottom"];var io=(e,o=0,n={remaining:16e3})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of i)if(!io(s,o+1,n))return!1;return!0},st=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(o=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(st);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(st)}return String(e)===e||Number.isFinite(e)},it=e=>{try{return String(e.id)!==e.id||!no.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!so.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!io(e.data)||!st(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var co=["file","directory","other","missing"],ct=e=>!!(e&&"sessionId"in e),lt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var lo=/^[0-9a-f]{7,64}$/i,dt=e=>lo.test(e),ye=500,ve=32e3,uo=16e3,po=128,Eo=200,_o=2e3,So=16e3,To=80,fo=200,mo=16e3;var ho=2e3;var ut=2e4,Ie=1024,Ue=2e6;var Ce=64e3,Me=8e3,pt=4e3;var Et=96e4,ir=60*6e4;var Ao=999,Oo=1e4,_e=500,xo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ro=["stopped","starting","ready","failed"],ar=new Set(xo),bo=e=>ar.has(e),go=e=>e&&bo(e)?e:"HOST_REJECTED",se=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(se):Object(e)===e?Object.values(e).every(se):!1,ko=e=>se(e)&&JSON.stringify(e).length<=mo,ao=e=>e?.trim().slice(0,fo)??"",ie=e=>{let o=e.id.trim().slice(0,po),n=e.title.trim().slice(0,Eo),i=e.url.trim().slice(0,_o),s=e.text?.trim().slice(0,So),u=e.author?.trim().slice(0,To),f=e.kind==="pull"?"pull":"issue",T={providerId:e.providerId.trim(),id:o,title:n||o,url:i,kind:f};if(s&&(T.text=s),u&&(T.author=u),f==="pull"){let v=ao(e.branches?.head),x=ao(e.branches?.base);v&&x&&(T.branches={head:v,base:x})}return ko(e.data)&&(T.data=e.data),T},_t=e=>{let o=ie(e);return e.projectId&&(o.projectId=e.projectId),e.navigation&&(o.navigation=e.navigation),e.worktree&&(o.worktree=e.worktree),o},St=e=>{let o={text:e.text.trim().slice(0,uo)};return e.send&&(o.send=!0),o},Tt=e=>e===null||!Number.isFinite(e)?null:Math.min(Ao,Math.max(0,Math.round(e))),ft=e=>Number.isFinite(e)?Math.min(Oo,Math.max(0,Math.ceil(e))):0;var ae=e=>e.length>0&&e.length<=Ie&&!e.includes("\0")&&!e.includes("\\");var Ne=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>ho?!1:!e.split("/").some(n=>n==="."||n===".."),cr=new Set(Ro),mt=e=>!!(e&&"status"in e&&cr.has(String(e.status))&&!("body"in e)),we=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),ht=e=>!!(e&&"content"in e&&String(e.content)===e.content),At=e=>!!(e&&"written"in e&&e.written===!0),Ot=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),lr=new Set(co),xt=e=>!!(e&&"kind"in e&&"size"in e&&lr.has(String(e.kind))&&Number.isFinite(e.size)),Rt=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),dr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ur=e=>Object(e)===e?e:null,at=e=>String(e)===e&&e.length>0,pr=e=>{if(!at(e.id))return null;if(e.ok===!0){let o={channel:_,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(o.payload=e.payload),o}return e.ok===!1&&at(e.error)?{channel:_,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:go(at(e.code)?e.code:void 0)}:null},bt=e=>{let o=ur(e);return!o||o.channel!==_||o.v!==1?null:o.type==="result"?pr(o):!dr.has(String(o.type))||Object(o.payload)!==o.payload?null:o};var yo=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Er=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",l=class extends Error{code;constructor(o,n){super(n),this.name="HostRequestError",this.code=o}},vo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Le=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Ie} characters without NUL or backslash.`)),Pe=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},E=e=>(e.value+=1,`oc-${e.value}`),It=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(t=>t===o.parent),i=e.requestTimeoutMs??ut,s=new Set,u=new Set,f=new Set,T=new Set,v=new Set,x=new Set,H=new Set,w=new Set,R=new Set,k=new Set,P=[],z=null,le=null,Se=new Set,Te=new Set,de=null,ue=null,Ge=!1,Z=new Map,ee=new Map,te=new Map,V=!1,p={value:0},d=null,K=null,pe=!1,Ee=!1,Ut=null,Ct=t=>t?{sessionId:t.id,phase:t.busy?"started":"completed"}:null,F=t=>{o.parent.postMessage(t,"*")},Mt=()=>{V||o.parent===o||k.size===0||d?.features?.lateGenerateResults!==!0||F({channel:_,v:1,type:"generate-late-listen"})},y=(t,r)=>{for(let a of t)try{a(r)}catch(c){console.error(c)}},Nt=t=>{if(!(t instanceof MessageEvent)||!n(t.source))return;let r=bt(t.data);if(!r)return;if(r.type==="workspace"){let c=ee.get(r.payload.subscriptionId);c&&y([c],r.payload.snapshot);return}if(r.type==="shells"){let c=te.get(r.payload.subscriptionId);c&&y([c],r.payload.snapshot);return}if(r.type==="ready"){d=r.payload,K=Ct(r.payload.session),y(s,r.payload),y(u,r.payload.directory),y(f,r.payload.session),K&&y(T,K),y(v,r.payload.connection),y(x,r.payload.settings),y(H,r.payload.item),Mt();return}if(r.type==="generate-late"){k.size===0?P.push(r.payload):y(k,r.payload);return}if(r.type==="directory"){d&&(d={...d,directory:r.payload.directory}),y(u,r.payload.directory);return}if(r.type==="session"){d&&(d={...d,session:r.payload.session}),r.payload.session?K?.sessionId!==r.payload.session.id&&(K=Ct(r.payload.session)):K=null,y(f,r.payload.session);return}if(r.type==="session-lifecycle"){K=r.payload,y(T,r.payload);return}if(r.type==="connection"){d&&(d={...d,connection:r.payload.connection}),y(v,r.payload.connection);return}if(r.type==="settings"){d&&(d={...d,settings:r.payload.settings}),y(x,r.payload.settings);return}if(r.type==="item"){d&&(d={...d,item:r.payload.item}),y(H,r.payload.item);return}if(r.type==="status-control-event"){y(w,r.payload);return}if(r.type==="popover-closed"){y(R,r.payload);return}if(r.type==="action"){let c=h=>{V||F({channel:_,v:1,type:"action-result",id:r.id,payload:h})},A=le;if(!A){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>A(r.payload)).then(()=>c({ok:!0}),h=>{let C=(h instanceof Error?h.message:String(h)).trim();c({ok:!1,error:(C||"Action failed.").slice(0,_e)})});return}if(r.type==="file-open"){let c=r.payload;if(ue&&ro(ue,c))return;ue=c,y(Se,r.payload);return}if(r.type==="file-saved"){y(Te,r.payload.version);return}if(r.type==="file-snapshot"){let c=C=>{V||F({channel:_,v:1,type:"file-snapshot-result",id:r.id,payload:C})},A=C=>c({error:(C.trim()||"Could not read the edited file.").slice(0,_e)}),h=de;if(!h){A("This extension does not edit files.");return}Promise.resolve().then(()=>h(r.payload.purpose)).then(C=>{if(nt(C)>2e7){A(`The file is over ${2e7} ${"bytes"in C?"bytes":"characters"}.`);return}if(C.version.length>256){A(`The snapshot version is over ${256} characters.`);return}c({snapshot:"bytes"in C?{bytes:C.bytes,version:C.version}:{content:C.content,version:C.version}})},C=>A(C instanceof Error?C.message:String(C)));return}if(r.type==="resolve"){let c=h=>{F({channel:_,v:1,type:"resolve-result",id:r.id,payload:h})},A=z;if(!A){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>A(r.payload)).then(h=>c({item:h?ie(h):null}),h=>{let C=(h instanceof Error?h.message:String(h)).trim();c({error:(C||"Command failed.").slice(0,_e)})});return}let a=Z.get(r.id);if(a){if(clearTimeout(a.timer),Z.delete(r.id),r.ok){a.resolve(r.payload);return}a.reject(new l(r.code,r.error))}};o.addEventListener("message",Nt),F({channel:_,v:1,type:"hello"});let L=(t,r=i)=>V||o.parent===o?Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((a,c)=>{let A=setTimeout(()=>{Z.delete(t.id),c(new l("HOST_TIMEOUT","Host did not answer in time."))},r);Z.set(t.id,{resolve:a,reject:c,timer:A}),F(t)}),I=t=>L(t).then(()=>{}),U={channel:_,v:1},De=t=>{!V&&o.parent!==o&&F(t)},wt=()=>De({...U,type:"file-save"}),Lt=t=>{!yo(t)||!Er(t)||(t.preventDefault(),wt())},Pt=t=>{!yo(t)||t.key!=="Escape"||d?.surface!=="popover"||!d.popover||(t.preventDefault(),Ft(d.popover.id,"escape").catch(()=>{}))},fe=()=>{let t=d?.surface==="popover"?d.popover:void 0;if(!t)return;let r=pe||Ee;Ut!==r&&(Ut=r,Xt(t.id,r).catch(()=>{}))},me=()=>{d?.surface!=="popover"||pe||(pe=!0,fe())},Gt=t=>{d?.surface!=="popover"||t.relatedTarget!==null||!pe||(pe=!1,fe())},Dt=()=>{d?.surface!=="popover"||Ee||(Ee=!0,fe())},Ht=()=>{d?.surface!=="popover"||!Ee||(Ee=!1,fe())},$=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},He=async t=>{t.kind!=="projects"&&$(t.projectId);let r=await L({...U,type:"workspace-read",id:E(p),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},Fe=async(t,r)=>{t.kind!=="projects"&&$(t.projectId);let a=E(p);ee.set(a,r);try{await I({...U,type:"workspace-subscribe",id:E(p),payload:{subscriptionId:a,query:t}})}catch(c){throw ee.delete(a),V||F({...U,type:"workspace-unsubscribe",id:E(p),payload:{subscriptionId:a}}),c}return()=>{!ee.delete(a)||V||F({...U,type:"workspace-unsubscribe",id:E(p),payload:{subscriptionId:a}})}},Bo=async(t,r)=>{t.kind==="session"&&$(t.sessionId),t.kind==="project"&&$(t.projectId);let a=E(p);te.set(a,r);try{await I({...U,type:"shells-subscribe",id:E(p),payload:{subscriptionId:a,scope:t}})}catch(c){throw te.delete(a),V||F({...U,type:"shells-unsubscribe",id:E(p),payload:{subscriptionId:a}}),c}return()=>{!te.delete(a)||V||F({...U,type:"shells-unsubscribe",id:E(p),payload:{subscriptionId:a}})}},he=async t=>{if("key"in t&&(t.key.length===0||t.key.length>128))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!se(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>65536)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&d?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await L({...U,type:"storage",id:E(p),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},Ft=(t,r)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):I({...U,type:"popover-close",id:E(p),payload:r?{id:t,reason:r}:{id:t}}),Xt=(t,r)=>d?.features?.popovers!==!0&&!(d?.surface==="popover"&&d.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):I({...U,type:"popover-anchor",id:E(p),payload:{id:t,active:r}});return o.addEventListener("keydown",Pt,!0),o.addEventListener("pointerover",me),o.addEventListener("pointermove",me),o.addEventListener("pointerout",Gt),o.addEventListener("focus",Dt),o.addEventListener("blur",Ht),{onAction:t=>(le=t,()=>{le===t&&(le=null)}),listProjects:async()=>{let t=await He({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async t=>{let r=await He({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async t=>{let r=await He({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:t=>Fe({kind:"projects"},r=>{r.kind==="projects"&&t(r)}),onWorktrees:(t,r)=>Fe({kind:"worktrees",projectId:t},a=>{a.kind==="worktrees"&&r(a)}),onSessions:(t,r)=>Fe({kind:"sessions",projectId:t},a=>{a.kind==="sessions"&&r(a)}),onRunningShells:(t,r)=>Bo(t,r),readShellOutput:async(t,r)=>{$(t,128);let a=r?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=r?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>65536))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let h=await L({...U,type:"shell-output",id:E(p),payload:{shellId:t,cursor:a,tailBytes:c}});if(!h||typeof h.output!="string"||!Number.isFinite(h.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return h},stopShell:async t=>{if($(t,128),(await L({...U,type:"shell-stop",id:E(p),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async t=>{$(t),await I({...U,type:"open-session",id:E(p),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let a=Pe(r),c={op:"get",key:t};a&&(c.scope=a);let A=await he(c);return A.op==="get"&&A.found?A.value:void 0},set:async(t,r,a)=>{let c=Pe(a),A={op:"set",key:t,value:r};c&&(A.scope=c),await he(A)},delete:async(t,r)=>{let a=Pe(r),c={op:"delete",key:t};a&&(c.scope=a),await he(c)},keys:async t=>{let r=Pe(t),a={op:"keys"};r&&(a.scope=r);let c=await he(a);if(c.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:t=>(s.add(t),d&&t(d),()=>{s.delete(t)}),onDirectory:t=>(u.add(t),d&&t(d.directory),()=>{u.delete(t)}),onSession:t=>(f.add(t),d&&t(d.session),()=>{f.delete(t)}),onSessionLifecycle:t=>(T.add(t),K&&t(K),()=>{T.delete(t)}),onConnection:t=>(v.add(t),d&&t(d.connection),()=>{v.delete(t)}),onSettings:t=>(x.add(t),d&&t(d.settings),()=>{x.delete(t)}),onItem:t=>(H.add(t),d&&t(d.item),()=>{H.delete(t)}),onStatusControl:t=>(w.add(t),()=>{w.delete(t)}),onPopoverClosed:t=>(R.add(t),()=>{R.delete(t)}),setStatusControls:t=>d?.features?.statusControls!==!0?Promise.reject(new l("UNSUPPORTED","This host does not support status controls.")):eo(t)?I({...U,type:"status-controls",id:E(p),payload:{controls:t}}):Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:t=>d?.features?.popovers!==!0?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):it(t)?I({...U,type:"popover-open",id:E(p),payload:t}):Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Ft,setPopoverAnchorActive:Xt,onResolve:t=>(z=t,()=>{z===t&&(z=null)}),toast:t=>{let r=t.message.trim();return!r||r.length>ye?Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ye} characters.`)):t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ve)?Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${ve} characters.`)):I({channel:_,v:1,type:"toast",id:E(p),payload:{...t,message:r}})},openUrl:t=>I({channel:_,v:1,type:"open-url",id:E(p),payload:{url:t}}),openCommit:t=>dt(t)?I({channel:_,v:1,type:"open-commit",id:E(p),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:t=>I({channel:_,v:1,type:"open-surface",id:E(p),payload:{surfaceId:t}}),writeClipboard:t=>I({channel:_,v:1,type:"clipboard-write",id:E(p),payload:{text:t}}),compose:t=>I({channel:_,v:1,type:"compose",id:E(p),payload:t}),attach:t=>I({channel:_,v:1,type:"attach",id:E(p),payload:ie(t)}),startSession:async t=>{t.projectId!==void 0&&$(t.projectId);let r=t.worktree;r&&r!==!0&&(r.kind==="existing"?$(r.directory):(r.name!==void 0&&$(r.name,200),r.baseBranch!==void 0&&$(r.baseBranch,200)));let a=await L({channel:_,v:1,type:"start-session",id:E(p),payload:_t(t)},e.requestTimeoutMs??18e4);if(!ct(a))throw new l("HOST_REJECTED","Host did not return a session.");return a},prompt:t=>L({channel:_,v:1,type:"prompt",id:E(p),payload:St(t)}).then(r=>{if(!lt(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:t=>I({channel:_,v:1,type:"session-link",id:E(p),payload:ie(t)}),close:()=>I({channel:_,v:1,type:"close",id:E(p)}),oauthStart:()=>I({channel:_,v:1,type:"oauth-start",id:E(p)}),oauthDisconnect:()=>I({channel:_,v:1,type:"oauth-disconnect",id:E(p)}),request:t=>(Ne(t.path)?L({channel:_,v:1,type:"request",id:E(p),payload:t}):vo()).then(r=>{if(!we(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:t=>(Ne(t.path)?L({channel:_,v:1,type:"service-request",id:E(p),payload:t}):vo()).then(r=>{if(!we(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>L({channel:_,v:1,type:"service-status",id:E(p)}).then(t=>{if(!mt(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:t=>(ae(t)?L({channel:_,v:1,type:"file-read",id:E(p),payload:{path:t}}):Le()).then(r=>{if(!ht(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>ae(t)?r.length>Ue?Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ue} characters.`)):L({channel:_,v:1,type:"file-write",id:E(p),payload:{path:t,content:r}}).then(a=>{if(!At(a))throw new l("HOST_REJECTED","Host did not confirm the write.");return a}):Le(),listDir:t=>(ae(t)?L({channel:_,v:1,type:"file-list",id:E(p),payload:{path:t}}):Le()).then(r=>{if(!Ot(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:t=>(ae(t)?L({channel:_,v:1,type:"file-stat",id:E(p),payload:{path:t}}):Le()).then(r=>{if(!xt(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:t=>{let r=t.prompt.trim(),a=t.system?.trim();if(r.length===0||r.length>Ce)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ce} characters.`));if(a!==void 0&&(a.length===0||a.length>Me))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Me} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(pt,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let A={prompt:r};return a!==void 0&&(A.system=a),c!==void 0&&(A.maxOutputTokens=c),L({channel:_,v:1,type:"generate",id:E(p),payload:A},e.requestTimeoutMs??Et).then(h=>{if(!Rt(h))throw new l("HOST_REJECTED","Host did not return generated text.");return h})},onLateGenerateResult:t=>{k.add(t);for(let r of P.splice(0))y([t],r);return Mt(),()=>{k.delete(t)}},setBadge:t=>I({channel:_,v:1,type:"badge",id:E(p),payload:{count:Tt(t)}}),setHeight:t=>I({channel:_,v:1,type:"resize",id:E(p),payload:{height:ft(t)}}),onFileOpen:t=>(Se.add(t),Ge||(Ge=!0,o.addEventListener("keydown",Lt,!0)),ue&&t(ue),()=>{Se.delete(t)}),onFileSnapshot:t=>(de=t,()=>{de===t&&(de=null)}),onFileSaved:t=>(Te.add(t),()=>{Te.delete(t)}),reportFileChange:t=>De({...U,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:wt,reportFileUnsupported:()=>De({...U,type:"file-unsupported"}),dispose:()=>{for(let t of ee.keys())F({...U,type:"workspace-unsubscribe",id:E(p),payload:{subscriptionId:t}});ee.clear();for(let t of te.keys())F({...U,type:"shells-unsubscribe",id:E(p),payload:{subscriptionId:t}});te.clear(),V=!0,z=null,le=null,de=null,Se.clear(),Te.clear(),Ge&&o.removeEventListener("keydown",Lt,!0),o.removeEventListener("message",Nt),o.removeEventListener("keydown",Pt,!0),o.removeEventListener("pointerover",me),o.removeEventListener("pointermove",me),o.removeEventListener("pointerout",Gt),o.removeEventListener("focus",Dt),o.removeEventListener("blur",Ht);for(let t of Z.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Z.clear(),s.clear(),u.clear(),f.clear(),T.clear(),v.clear(),x.clear(),H.clear(),w.clear(),R.clear(),k.clear(),P.length=0}}};var Co=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ri=new Set(Co);var _r=10*6e4;var Sr=10*6e4;var Tr=10*6e4;var Mo=["none","agent","user"];var si=new Set(Mo);var No=e=>e>=95?"critical":e>=90?"warn":null,wo=e=>{if(e.status!=="ok")return null;let o=null;for(let n of e.devices)n.utilization!==null&&(o===null||n.utilization>o)&&(o=n.utilization);return o},Lo=e=>e.map(o=>`${o.kind}:${o.target??""}:${o.level}`).sort().join("|");var mr=1e4,Po=3,hr=e=>{if(typeof e!="object"||e===null)return null;let o=Reflect.get(e,"code");return typeof o=="string"?o:null},Ar=e=>{if(typeof e!="object"||e===null)return!1;let o=e;return typeof o.sampledAt=="number"&&typeof o.guard=="object"&&o.guard!==null&&Array.isArray(o.warnings)},Go=e=>{let o=!1,n=!1,i=0,s=0,u=0,f=!1,T=null,v=()=>e.intervalMs??5e3,x=k=>{T?.(),T=e.schedule(()=>{T=null,R()},k)},H=()=>Math.min(mr,v()*2**Math.max(0,i-1)),w=k=>{i+=1,k&&(f=!0,e.onState({kind:"blocked",reason:k})),x(H())},R=()=>{n||o||e.visible()&&(o=!0,e.request().then(k=>{if(o=!1,n)return;let P=null;if(k.status===200)try{let z=JSON.parse(k.body);P=Ar(z)?z:null}catch{P=null}if(!P){s+=1,w(s>=Po?"failed":null);return}i=0,s=0,(P.sampledAt>=u||f)&&(u=P.sampledAt,f=!1,e.onState({kind:"ready",stats:P})),x(v())},k=>{if(o=!1,n)return;let P=hr(k);P==="NO_SERVICE"?w("not-allowed"):P==="DISABLED"?w("paused"):P==="HOST_TIMEOUT"?(s+=1,w(s>=Po?"failed":null)):w("failed")}))};return{poll:()=>{T?.(),T=null,R()},dispose:()=>{n=!0,T?.(),T=null}}};var Do=(e,o={})=>{let n=It(),i={kind:"loading"},s=Go({request:()=>n.serviceRequest({method:"GET",path:"/stats"}),onState:f=>{i=f,u(),f.kind==="ready"&&o.onStats?.(f.stats,n)},visible:()=>document.visibilityState==="visible",intervalMs:o.intervalMs,schedule:(f,T)=>{let v=setTimeout(f,T);return()=>clearTimeout(v)}}),u=()=>e({state:i,retry:s.poll});return n.onReady(f=>{Xe(f,document.documentElement),u()}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&s.poll()}),window.addEventListener("pagehide",()=>{s.dispose(),n.dispose()}),u(),s.poll(),n};var Ho=`
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
`,Fo=e=>{let o=document.createElement("style");o.textContent=e,document.head.append(o)},B=(e,o="",n="")=>{let i=document.createElement(e);return o&&(i.className=o),n&&(i.textContent=n),i},Xo=e=>e==="critical"?"error":e==="warn"?"warning":"primary";Fo(`${Ho}
html,body{background:transparent;overflow:hidden}
#root{display:grid;grid-template-columns:auto minmax(34px,1fr) auto;column-gap:8px;row-gap:4px;align-items:center;padding:1px 0 3px}
.line{display:contents}
.line .name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:92px}
.line .pct{text-align:right;color:var(--oc-muted);min-width:44px}
.line .pct.warn{color:var(--oc-warning-text)}
.line .pct.critical{color:var(--oc-error-text)}
.line .na{grid-column:2/4;color:var(--oc-muted);font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.line .oc-sdk-progress-label{display:none}
.note,.tag{grid-column:1/-1}
.note{display:flex;align-items:center;gap:8px;color:var(--oc-muted);min-height:20px}
.tag{color:var(--oc-muted);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`);var ce=document.querySelector("#root");if(!ce)throw new Error("Missing root");var Or=e=>{if(!e.online)return"warn";if(e.memMb===null||e.limitMb<=0)return null;let o=e.memMb/e.limitMb*100;return o>=100?"critical":No(o)},xr=e=>{let o=[],{cpu:n,gpus:i,guard:s}=e;o.push(n.status==="ok"?{name:"CPU",percent:n.total,level:null,value:tt(n.total)}:{name:"CPU",percent:null,level:null,value:"",missing:n.reason});let u=Or(s),f=s.memMb!==null&&s.limitMb>0?s.memMb/s.limitMb*100:null;if(o.push({name:"OC mem",percent:f,level:u,value:`${ot((s.memMb??0)/1024,1)}/${ot(s.limitMb/1024,1)} GB`}),i.status==="ok"||i.reason!=="no-device"){let R=wo(i);o.push(i.status==="ok"?{name:"GPU",percent:R,level:null,value:R===null?"\u2014":tt(R)}:{name:"GPU",percent:null,level:null,value:"",missing:i.reason})}let T=s.jobs.length,v=s.online?s.state==="blocked"?"blocked":s.state==="ok"?"ok":s.state:"offline",x=s.jobs.reduce((R,k)=>Math.max(R,k.idleMin),0),H=T>0&&s.jobsIdleMinutes>0?Math.min(100,x/s.jobsIdleMinutes*100):0,w=s.jobs.some(R=>s.jobsIdleMinutes-R.idleMin<=5);return o.push({name:"Jobs",percent:H,level:w?"warn":null,value:`${T} \xB7 ${v}`}),o},Rr=e=>{let o=B("div","line");if(o.append(B("span","name",e.name)),e.missing||e.percent===null)return o.append(B("span","na",e.missing??"")),o;let n=B("div");return ke(n,{value:e.percent,tone:Xo(e.level),label:e.name}),o.append(n,B("span",`pct${e.level?` ${e.level}`:""}`,e.value)),o},br=e=>e.some(o=>o.level==="critical")?"critical":e.length>0?"warn":null,$o=null,gr=Do(({state:e,retry:o})=>{if(e.kind==="loading"){let u=B("div","note");et(u,{size:"sm",label:"Reading machine and guard"}),ce.replaceChildren(u);return}if(e.kind==="blocked"){let u=B("div","note");u.append(B("span","",e.reason==="not-allowed"?"Service not allowed":e.reason==="paused"?"Ops is paused":"Service is not answering")),e.reason==="failed"&&re(u,{label:"Retry",size:"xs",variant:"ghost",onClick:o}),ce.replaceChildren(u);return}let{stats:n}=e,i=xr(n).map(u=>Rr(u)),s=br(n.warnings);if(s){let u=B("div",`tag${s==="critical"?" critical":""}`);u.style.color=s==="critical"?"var(--oc-error-text)":"var(--oc-warning-text)",u.textContent=n.warnings[0]?.message??"",i.push(u)}ce.replaceChildren(...i)},{intervalMs:1e4,onStats:(e,o)=>{let n=Lo(e.warnings);n!==$o&&($o=n,o.setBadge(e.warnings.length>0?e.warnings.length:null).catch(()=>{}))}}),Vo=-1;new ResizeObserver(()=>{let e=Math.ceil(ce.getBoundingClientRect().height);e!==Vo&&(Vo=e,gr.setHeight(e).catch(()=>{}))}).observe(ce);})();
