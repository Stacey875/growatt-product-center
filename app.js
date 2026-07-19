
const L={
 zh:{
  search:"搜索产品、设备、能力或文档", openResidential:"进入户用数字产品线", browseDevices:"查看设备中心",
  home:"首页", portfolio:"产品组合", residential:"户用数字产品线", shinephone:"新版 ShinePhone", web:"户用 Web Portal",
  legacy:"旧版产品", migration:"迁移中心", dealer:"经销商与安装商", edge:"户用边缘 EMS", platform:"平台架构",
  devices:"设备中心", capability:"能力中心", schema:"Device Schema", enablement:"新品兼容", governance:"产品治理",
  metrics:"指标中心", roadmap:"产品路线图", updates:"最近更新", reference:"参考资料", faq:"FAQ"
 },
 en:{
  search:"Search products, devices, capabilities or docs", openResidential:"Open Residential Product Line", browseDevices:"Browse Device Center",
  home:"Home", portfolio:"Product Portfolio", residential:"Residential Product Line", shinephone:"New ShinePhone", web:"Residential Web Portal",
  legacy:"Legacy Products", migration:"Migration Center", dealer:"Dealer & Installer", edge:"Home Edge EMS", platform:"Platform Architecture",
  devices:"Device Center", capability:"Capability Center", schema:"Device Schema", enablement:"New Device Enablement", governance:"Product Governance",
  metrics:"Metrics Center", roadmap:"Product Roadmap", updates:"Latest Updates", reference:"Reference", faq:"FAQ"
 }
};
let lang=localStorage.getItem("gpc-lang")||"zh";
let current=location.hash.replace("#/","")||"home";
let portfolioFilter="All";

const nav=[
 ["Overview",[["home","⌂"],["portfolio","▦"],["roadmap","↗"],["updates","◷"]]],
 ["Residential",[["residential","⌂"],["shinephone","◉"],["web","▤"],["legacy","◌"],["migration","⇄"],["dealer","♙"],["edge","⚡"]]],
 ["Platform & Device",[["platform","☁"],["devices","◇"],["capability","✦"],["schema","⌘"],["enablement","+"]]],
 ["Governance",[["governance","✓"],["metrics","▥"],["reference","≡"],["faq","?"]]]
];
const descriptions={
 home:["统一承载产品知识、产品组合、设备能力、迁移治理与路线图。","A unified workspace for product knowledge, portfolio, device capability, migration governance, and roadmaps."],
 portfolio:["管理当前产品、旧版产品、生命周期、负责人和迁移状态。","Manage current and legacy products, lifecycle, ownership, and migration state."],
 residential:["户用 App、Web、经销商能力与边缘能源管理的统一产品线入口。","The unified entry for residential App, Web, dealer capabilities, and edge energy management."],
 shinephone:["新版户用 App 的产品定位、核心场景、设备兼容与版本状态。","Product positioning, core scenarios, compatibility, and release status for the new residential App."],
 web:["面向户用终端用户的 Web 门户，与 App 共享核心能力。","Web portal for residential end users, sharing core capabilities with the App."],
 legacy:["维护优先，不进行常规独立功能建设；例外需求需经过产品评审。","Maintenance-first. No routine standalone feature development; exceptions require product review."],
 migration:["管理账号、电站、设备、历史数据和经销商关系从旧版向新版迁移。","Manage migration of accounts, plants, devices, history, and dealer relationships."],
 dealer:["覆盖客户、电站、安装、权限与基础运维协作，不包含 ShineTools。","Covers customer, plant, installation, permission, and basic O&M collaboration; excludes ShineTools."],
 edge:["连接云平台与家庭设备，承载本地控制、能源策略、智能调度与离线恢复。","Connects cloud and home devices for local control, energy strategy, smart dispatch, and offline recovery."],
 platform:["统一的 Cloud → Plant → Collector → Device 产品与数据层级。","Unified Cloud → Plant → Collector → Device hierarchy."],
 devices:["按型号查看能力、参数、告警、OTA 与兼容范围。","Browse capabilities, parameters, alarms, OTA, and compatibility by model."],
 capability:["定义设备和平台可复用能力，并支撑 App/Web 动态展示。","Defines reusable capabilities that drive dynamic App/Web experiences."],
 schema:["以结构化模型描述设备数据、参数、控制、告警与元数据。","Structured models for data, parameters, controls, alarms, and metadata."],
 enablement:["从立项到上线的新品兼容全流程与检查清单。","End-to-end process and checklist from initiation to launch."],
 governance:["明确产品负责人、产品专家、平台、设备、研发、测试与区域团队职责。","Clarifies responsibilities across product, platform, device, engineering, QA, and regions."],
 metrics:["围绕迁移、稳定性、核心流程、兼容性与业务价值建立指标体系。","Metrics across migration, stability, core flows, compatibility, and business value."],
 roadmap:["统一呈现阶段目标、版本节奏和关键依赖。","A unified view of stage goals, release cadence, and dependencies."],
 updates:["记录产品、平台、设备和文档的近期变化。","Tracks recent changes across products, platform, devices, and documentation."],
 reference:["集中管理 Handbook、PRD、规范、流程图、发布说明与 FAQ。","Centralized handbook, PRD, standards, flows, release notes, and FAQ."],
 faq:["常见产品、平台、设备和治理问题的统一入口。","Unified answers for common product, platform, device, and governance questions."]
};
const portfolio=[
 {name:"New ShinePhone",channel:"App",status:"Current",owner:"Residential PM",scope:"End user / Dealer",release:"2026 Q3",migration:"In Migration"},
 {name:"Residential Web Portal",channel:"Web",status:"Current",owner:"Residential PM",scope:"End user",release:"2026 Q4",migration:"Ready"},
 {name:"Legacy ShinePhone",channel:"App",status:"Maintenance",owner:"Residential PM",scope:"Legacy users",release:"Maintenance",migration:"In Migration"},
 {name:"Legacy Residential Web",channel:"Web",status:"Maintenance",owner:"Residential PM",scope:"Legacy users",release:"Maintenance",migration:"Not Started"},
 {name:"Dealer Capabilities",channel:"App / Web",status:"Current",owner:"Residential PM",scope:"Dealer / Installer",release:"2026 Q4",migration:"Planning"},
 {name:"Home Edge EMS",channel:"Edge",status:"Current",owner:"Residential PM",scope:"Home energy",release:"2027 Q1",migration:"N/A"}
];
const devices=[
 {model:"SPM",type:"Storage / EMS",status:"Active",priority:"P0",cap:"Monitoring · Control · Energy · OTA",fw:"2.x+"},
 {model:"WIT",type:"Hybrid Inverter",status:"Active",priority:"P0",cap:"Monitoring · Control · Alarm · OTA",fw:"Latest"},
 {model:"SPH",type:"Hybrid Inverter",status:"Active",priority:"P0",cap:"Monitoring · Control · Alarm",fw:"Latest"},
 {model:"MINA",type:"Inverter",status:"Planning",priority:"P1",cap:"Monitoring · Energy",fw:"TBD"},
 {model:"MIN",type:"Inverter",status:"Active",priority:"P1",cap:"Monitoring · Energy · Alarm",fw:"Latest"},
 {model:"MOD",type:"Inverter",status:"Active",priority:"P1",cap:"Monitoring · Energy · Alarm",fw:"Latest"},
 {model:"EV Charger",type:"Charging",status:"Active",priority:"P1",cap:"Monitoring · Control · Schedule",fw:"Latest"},
 {model:"Meter",type:"Measurement",status:"Active",priority:"P0",cap:"Realtime · History · Energy",fw:"Latest"}
];
const searchIndex=[
 ["home","Growatt Product Center","产品知识平台 / Product knowledge platform"],["portfolio","Product Portfolio","生命周期 Owner Scope Status"],
 ["residential","Residential Digital Products","户用数字产品线"],["shinephone","New ShinePhone","新版 ShinePhone App"],
 ["migration","Migration Center","账号 电站 设备 历史数据"],["edge","Home Edge EMS","本地控制 能源策略 智能调度"],
 ["devices","Device Center","SPM WIT SPH MINA MIN MOD"],["capability","Capability Center","Monitoring Control Alarm OTA Energy"],
 ["schema","Device Schema","Telemetry Parameter Alarm Control"],["enablement","New Device Enablement","Capability Schema Test Region Launch"],
 ["metrics","Metrics Center","Migration Stability Core Flow Compatibility Business"],["governance","Product Governance","RACI ownership responsibility"]
];

function badge(s){
 const cls=["Current","Active","Ready","Verified"].includes(s)?"green":["Planning","In Migration"].includes(s)?"blue":["Maintenance","Blocked"].includes(s)?"warn":["Retired"].includes(s)?"red":"gray";
 return `<span class="badge ${cls}">${s}</span>`;
}
function metric(v,label,delta,pct){
 return `<div class="card"><div class="metric">${v}</div><div class="metric-label">${label}</div><div class="progress"><span style="width:${pct}%"></span></div><div class="metric-foot"><span>${delta}</span><span>${pct}%</span></div></div>`;
}
function quick(icon,title,desc,page){
 return `<div class="card clickable" onclick="go('${page}')"><div class="card-icon">${icon}</div><h3>${title}</h3><p>${desc}</p></div>`;
}
function timeline(date,title,desc){
 return `<div class="timeline-item"><div class="timeline-title">${title}</div><div class="timeline-meta">${date}</div><div style="color:var(--muted);font-size:14px;line-height:1.55">${desc}</div></div>`;
}
function shell(){
 return `<div class="app"><div class="overlay" id="overlay"></div><aside class="sidebar" id="sidebar">
  <div class="brand"><div class="brand-mark">G</div><div><div class="brand-title">Growatt Product Center</div><div class="brand-sub">Product Knowledge Platform</div></div></div>
  <div id="nav"></div><div class="sidebar-footer">V1.1 · Phase 1<br>Residential-first foundation</div>
 </aside><main class="main"><header class="topbar">
  <button class="mobile-menu" id="mobileMenu">☰</button><div class="search-wrap"><span class="search-icon">⌕</span>
  <input id="search" class="search" placeholder="${L[lang].search}"><span class="kbd">/</span><div id="searchResults" class="search-results"></div></div>
  <div class="top-actions"><button class="icon-btn">◷</button><button id="langBtn" class="lang-btn">${lang==="zh"?"EN":"中文"}</button></div>
 </header><div class="content" id="content"></div></main></div>`;
}
function renderNav(){
 document.getElementById("nav").innerHTML=nav.map(g=>`<div class="nav-group"><div class="nav-title">${g[0]}</div>${g[1].map(([id,ic])=>`<div class="nav-item ${current===id?"active":""}" data-page="${id}"><span class="nav-icon">${ic}</span><span>${L[lang][id]}</span>${["portfolio","migration","devices"].includes(id)?`<span class="nav-badge">${id==="devices"?"8":id==="portfolio"?"6":"12"}</span>`:""}</div>`).join("")}</div>`).join("");
 document.querySelectorAll(".nav-item").forEach(el=>el.onclick=()=>go(el.dataset.page));
}
function head(id){
 return `<div class="breadcrumb">Growatt Product Center / ${L[lang][id]}</div><div class="page-head"><div><h1>${L[lang][id]}</h1><p>${descriptions[id][lang==="zh"?0:1]}</p></div>${badge("V1.1")}</div>`;
}
function homePage(){
 const zh=lang==="zh";
 return `<section class="hero"><div class="hero-kicker">● ${zh?"户用数字产品线优先建设":"Residential-first build"}</div>
  <h1>${zh?"Growatt 产品知识与治理中心":"Growatt Product Knowledge & Governance Center"}</h1>
  <p>${zh?"统一沉淀产品组合、业务场景、设备能力、Schema、迁移治理、指标与路线图，为产品、研发、测试和区域团队提供一致的信息入口。":"A unified source of truth for portfolio, scenarios, device capabilities, schemas, migration governance, metrics, and roadmaps."}</p>
  <div class="hero-actions"><button class="btn btn-primary" onclick="go('residential')">${L[lang].openResidential}</button><button class="btn btn-ghost" onclick="go('devices')">${L[lang].browseDevices}</button></div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"产品健康概览":"Product Health Overview"}</h2><p>${zh?"第一阶段使用结构示例数据，后续接入真实指标。":"Illustrative phase-one metrics; production data will follow."}</p></div></div>
  <div class="grid grid-4">${metric("68%",zh?"新版用户占比":"New App User Share","+8.4% MoM",68)}${metric("97.8%",zh?"控制成功率":"Control Success","+0.6% WoW",98)}${metric("24",zh?"已兼容设备型号":"Enabled Models","+3 this quarter",80)}${metric("82%",zh?"迁移完成率":"Migration Completion","+12% quarter",82)}</div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"核心工作区":"Core Workspaces"}</h2></div></div>
  <div class="grid grid-4">${quick("🏡",L[lang].residential,zh?"App、Web、经销商和边缘 EMS":"App, Web, dealer and edge EMS","residential")}
  ${quick("▦",L[lang].portfolio,zh?"生命周期、Owner、Scope 和状态":"Lifecycle, owner, scope and status","portfolio")}
  ${quick("◇",L[lang].devices,zh?"机型、能力、参数、告警和 OTA":"Models, capabilities, parameters, alarms and OTA","devices")}
  ${quick("⇄",L[lang].migration,zh?"迁移、验证、回滚和退场":"Migration, verification, rollback and retirement","migration")}</div></section>
 <section class="section grid grid-2"><div class="card"><div class="section-head"><div><h2>${zh?"最近更新":"Latest Updates"}</h2></div><button class="icon-btn" onclick="go('updates')">${zh?"查看全部":"View all"}</button></div>
  <div class="timeline">${timeline("2026-07-18",zh?"登录地区异常体验优化":"Login region experience optimization",zh?"新增无电站排查入口和地区一致性提示。":"Added no-plant troubleshooting and region consistency guidance.")}
  ${timeline("2026-07-17",zh?"户用产品线信息架构升级":"Residential IA upgraded",zh?"按 Current / Legacy / Migration 重构产品结构。":"Restructured around Current / Legacy / Migration.")}
  ${timeline("2026-07-16",zh?"新品兼容流程补充":"Device enablement updated",zh?"补充 Capability、Schema、测试和区域验证。":"Added capability, schema, testing and regional validation.")}</div></div>
  <div class="card"><div class="section-head"><div><h2>${zh?"关键风险与待办":"Key Risks & Actions"}</h2></div></div>
   <div class="callout">${zh?"当前关键风险：跨区账号搜索受数据合规限制；需要通过登录地区提示、异常排查和后续账号平台能力建设降低用户困惑。":"Key risk: cross-region account search is constrained by data compliance. Mitigate through region guidance, troubleshooting, and future account-platform capabilities."}</div>
   <div style="margin-top:16px">${portfolio.slice(0,3).map(p=>`<div class="list-row"><div><div class="list-title">${p.name}</div><div class="list-sub">${p.scope}</div></div><span>${p.channel}</span><span>${p.owner}</span>${badge(p.status)}</div>`).join("")}</div>
  </div></section>`;
}
function portfolioPage(){
 const zh=lang==="zh";
 const filters=["All","Current","Maintenance"];
 const rows=portfolio.filter(p=>portfolioFilter==="All"||p.status===portfolioFilter);
 return `${head("portfolio")}<div class="toolbar"><div class="segment">${filters.map(f=>`<button class="${portfolioFilter===f?"active":""}" onclick="setPortfolioFilter('${f}')">${f}</button>`).join("")}</div></div>
 <section class="card"><div class="table-wrap"><table><thead><tr><th>Product</th><th>Status</th><th>Channel</th><th>Owner</th><th>Scope</th><th>Release</th><th>Migration</th></tr></thead><tbody>
 ${rows.map(p=>`<tr class="clickable"><td><b>${p.name}</b></td><td>${badge(p.status)}</td><td>${p.channel}</td><td><div class="owner"><div class="avatar">PM</div>${p.owner}</div></td><td>${p.scope}</td><td>${p.release}</td><td>${badge(p.migration)}</td></tr>`).join("")}
 </tbody></table></div></section>
 <section class="section grid grid-3">${quick("📱","Current Products",zh?"新版 ShinePhone 和户用 Web":"New ShinePhone and Residential Web","shinephone")}
 ${quick("◌","Legacy Products",zh?"维护优先和退场治理":"Maintenance-first and retirement governance","legacy")}
 ${quick("⇄","Migration Center",zh?"账号、电站、设备和经销商迁移":"Account, plant, device and dealer migration","migration")}</section>`;
}
function residentialPage(){
 const zh=lang==="zh";
 return `${head("residential")}<div class="grid grid-4">${metric("6",zh?"核心产品模块":"Core Product Modules","Current",100)}${metric("14",zh?"核心业务场景":"Core Scenarios","Mapped",88)}${metric("24",zh?"兼容设备型号":"Enabled Models","Growing",80)}${metric("5",zh?"指标分组":"Metric Groups","Defined",100)}</div>
 <section class="section grid grid-2"><div class="card"><h3>${zh?"产品线职责":"Product Line Ownership"}</h3><p>${zh?"负责新版/旧版 ShinePhone、户用 Web Portal、经销商能力、户用边缘 EMS，以及户用电站、设备和能源场景。":"Owns new/legacy ShinePhone, residential Web Portal, dealer capabilities, home edge EMS, and residential plant/device/energy scenarios."}</p></div>
 <div class="card"><h3>${zh?"明确不包含":"Explicitly Excluded"}</h3><p>${zh?"ShineTools 属于服务与运维产品线，不纳入户用数字产品线职责范围。":"ShineTools belongs to Service & Operations and is outside this scope."}</p></div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"产品线地图":"Product Line Map"}</h2></div></div><div class="grid grid-3">
 ${quick("📱",zh?"用户应用":"User Applications","New + Legacy App / Web","portfolio")}${quick("♙",L[lang].dealer,zh?"客户、电站、安装和权限":"Customer, plant, installation and permissions","dealer")}
 ${quick("⚡",L[lang].edge,zh?"本地控制、策略和调度":"Local control, strategy and dispatch","edge")}${quick("⇄",L[lang].migration,zh?"迁移、验证、回滚和退场":"Migration, verification, rollback and retirement","migration")}
 ${quick("+",L[lang].enablement,zh?"Capability、Schema、测试和上线":"Capability, schema, test and launch","enablement")}${quick("▥",L[lang].metrics,zh?"迁移、稳定性、流程、兼容和业务":"Migration, stability, flows, compatibility and business","metrics")}</div></section>`;
}
function platformPage(){
 const zh=lang==="zh";
 return `${head("platform")}<section class="card"><div class="arch">
  <div class="arch-box"><div class="arch-title">☁ Cloud</div><div class="arch-sub">${zh?"账号、区域、数据与服务编排":"Account, region, data and service orchestration"}</div></div>
  <div class="arch-box"><div class="arch-title">🏠 Plant</div><div class="arch-sub">${zh?"用户能源资产和业务场景容器":"User energy asset and scenario container"}</div></div>
  <div class="arch-box"><div class="arch-title">📡 Collector</div><div class="arch-sub">${zh?"设备接入、通信和参数下发":"Device access, communication and parameter delivery"}</div></div>
  <div class="arch-box"><div class="arch-title">◇ Device</div><div class="arch-sub">${zh?"逆变器、储能、电表、充电桩等":"Inverter, ESS, meter, EV charger and more"}</div></div>
 </div></section>
 <section class="section grid grid-3">${quick("✦","Capability",zh?"可复用设备与平台能力":"Reusable device and platform abilities","capability")}${quick("⌘","Schema",zh?"数据、参数、控制和告警模型":"Data, parameter, control and alarm models","schema")}${quick("+",L[lang].enablement,zh?"新品从立项到上线":"New device from initiation to launch","enablement")}</section>`;
}
function devicesPage(){
 const zh=lang==="zh";
 return `${head("devices")}<section class="card"><div class="section-head"><div><h2>${zh?"设备兼容矩阵":"Device Compatibility Matrix"}</h2><p>${zh?"第一阶段展示模型、优先级、能力和固件范围。":"Phase one covers model, priority, capability and firmware range."}</p></div></div>
 <div class="table-wrap"><table><thead><tr><th>Model</th><th>Type</th><th>Status</th><th>Priority</th><th>Capabilities</th><th>Firmware</th></tr></thead><tbody>
 ${devices.map(d=>`<tr class="clickable"><td><b>${d.model}</b></td><td>${d.type}</td><td>${badge(d.status)}</td><td>${badge(d.priority)}</td><td>${d.cap}</td><td>${d.fw}</td></tr>`).join("")}
 </tbody></table></div></section>
 <section class="section grid grid-4">${quick("📊","Monitoring",zh?"实时数据、历史和统计":"Realtime, history and statistics","capability")}${quick("🎛","Control",zh?"参数、模式和计划":"Parameters, modes and schedules","capability")}${quick("⚠","Alarm",zh?"告警模型和排查":"Alarm model and troubleshooting","schema")}${quick("⬆","OTA",zh?"固件资格和灰度":"Firmware eligibility and rollout","enablement")}</section>`;
}
function generic(id,cards){
 return `${head(id)}<div class="grid grid-3">${cards.map(c=>quick(c[0],c[1],c[2],c[3]||id)).join("")}</div>`;
}
function migrationPage(){
 const zh=lang==="zh";
 return `${head("migration")}<div class="grid grid-4">${metric("82%",zh?"整体迁移完成率":"Overall Migration","In progress",82)}${metric("91%",zh?"账号迁移成功率":"Account Migration","Stable",91)}${metric("76%",zh?"设备迁移完成率":"Device Migration","Tracking",76)}${metric("12",zh?"当前阻塞项":"Open Blockers","Review",35)}</div>
 <section class="section card"><div class="section-head"><div><h2>${zh?"迁移工作包":"Migration Workstreams"}</h2></div></div><div class="grid grid-3">
 ${quick("👤",zh?"账号迁移":"Account Migration",zh?"账号、地区、权限和身份":"Account, region, permissions and identity","migration")}${quick("🏠",zh?"电站迁移":"Plant Migration",zh?"电站关系、历史数据和分享":"Plant relation, history and sharing","migration")}
 ${quick("◇",zh?"设备迁移":"Device Migration",zh?"采集器、设备、能力和固件":"Collector, device, capability and firmware","migration")}${quick("♙",zh?"经销商迁移":"Dealer Migration",zh?"组织、客户、电站和角色":"Organization, customers, plants and roles","migration")}
 ${quick("↩",zh?"回滚机制":"Rollback",zh?"失败检测、恢复和人工兜底":"Failure detection, recovery and manual fallback","migration")}${quick("📉",zh?"旧版退场":"Legacy Retirement",zh?"用户下降、例外和关闭计划":"User decline, exceptions and shutdown plan","legacy")}</div></section>`;
}
function roadmapPage(){
 const zh=lang==="zh";
 return `${head("roadmap")}<div class="card timeline">${timeline("2026 Q3",zh?"V1.1 第一阶段完善":"V1.1 Phase One",zh?"首页、导航、产品组合、平台和设备中心。":"Home, navigation, portfolio, platform and device center.")}${timeline("2026 Q4",zh?"真实资料导入":"Production Content Integration",zh?"Handbook、设备矩阵、兼容清单和 Release Notes。":"Handbook, device matrix, compatibility and release notes.")}${timeline("2027 Q1","AI Product Assistant",zh?"自然语言搜索、设备对比和文档问答。":"Natural language search, device comparison and document Q&A.")}</div>`;
}
function updatesPage(){return `${head("updates")}<div class="card timeline">${timeline("2026-07-19","GPC V1.1","Phase-one content and navigation upgraded.")}${timeline("2026-07-18","Login Region Experience","Added region consistency guidance and no-plant troubleshooting.")}${timeline("2026-07-17","Residential IA V3","Reorganized around current, legacy, migration, edge EMS and governance.")}</div>`;}
function renderPage(){
 const zh=lang==="zh";
 const views={
  home:homePage,portfolio:portfolioPage,residential:residentialPage,platform:platformPage,devices:devicesPage,migration:migrationPage,roadmap:roadmapPage,updates:updatesPage,
  shinephone:()=>generic("shinephone",[["👤",zh?"目标用户":"Target Users",zh?"终端用户、经销商和安装商":"End users, dealers and installers"],["⚙",zh?"核心能力":"Core Capabilities",zh?"监控、控制、能量、告警和 OTA":"Monitoring, control, energy, alarm and OTA"],["◇",zh?"设备驱动 UI":"Device-driven UI",zh?"根据 Capability 和 Schema 动态展示":"Dynamic UI based on capability and schema"]]),
  web:()=>generic("web",[["📈","Monitoring","Realtime and historical data"],["🎛","Control","Shared control capabilities with App"],["⚡","Energy","Energy flow and analysis"],["⚠","Alarm","Alarm overview and handling"],["👤","Account","User, plant and sharing"],["◇","Device","Device status and compatibility"]]),
  legacy:()=>generic("legacy",[["🛠","Maintenance First","Bug fixes, compliance and critical stability"],["⛔","No Routine Features","No routine standalone feature development"],["⚖","Exception Review","Exceptions require product review"],["⇄","Migration Support","Guide users and data to new products"],["📉","Retirement Metrics","Track usage decline and remaining users"],["📘","Lifecycle","Status, owner, scope and lifecycle"]]),
  dealer:()=>generic("dealer",[["♙","Dealer Organization","Organization and role management"],["👤","Customer Management","Customer and account relationship"],["🏠","Plant Management","Residential plant portfolio"],["🔧","Installation","Binding and commissioning workflow"],["🔐","Permissions","Dealer-user collaboration and access"],["🛠","Basic O&M","Basic residential diagnostics"]]),
  edge:()=>generic("edge",[["🎛",zh?"本地控制":"Local Control",zh?"参数与运行模式本地下发":"Local parameter and mode delivery"],["🧠",zh?"能源策略":"Energy Strategy",zh?"自发自用、备电和峰谷套利":"Self-consumption, backup and tariff arbitrage"],["⚡",zh?"智能调度":"Smart Dispatch",zh?"每个电站仅一台设备参与调度":"One dispatch participant per plant"],["📴",zh?"离线行为":"Offline Behavior",zh?"断网时策略保持和降级":"Strategy persistence and fallback"],["↻",zh?"恢复机制":"Recovery",zh?"重连、状态恢复和异常兜底":"Reconnect, state recovery and exception handling"],["◇",zh?"设备兼容":"Compatibility",zh?"型号、固件和参数差异":"Model, firmware and parameter differences"]]),
  capability:()=>generic("capability",[["📊","Monitoring Capability","Realtime, history and statistics"],["🎛","Control Capability","Parameters, modes and schedules"],["⚠","Alarm Capability","Alarm schema and troubleshooting"],["⬆","OTA Capability","Firmware eligibility and rollout"],["⚡","Energy Capability","Energy flow and optimization"],["🔐","Permission Capability","Role and access control"]]),
  schema:()=>generic("schema",[["🧩","Device Type","Parent-child type model"],["🧾","Device Model","Model and firmware metadata"],["📊","Telemetry Schema","Realtime and historical points"],["🎛","Parameter Schema","Readable and writable parameters"],["⚠","Alarm Schema","Codes, levels, causes and actions"],["✦","Capability Mapping","Schema-to-capability relationship"]]),
  enablement:()=>generic("enablement",[["1","Initiation","Business goal and target regions"],["2","Capability Model","Device type, schema and capability"],["3","Platform Enablement","Cloud, account and data services"],["4","App / Web","UI, interaction and feature exposure"],["5","Validation","Firmware, test and region validation"],["6","Launch","Gradual rollout, metrics and checklist"]]),
  governance:()=>generic("governance",[["👤","Residential PM","Portfolio, priority and outcomes"],["📘","Product Specialist","Requirement detail and delivery support"],["☁","Platform PM","Shared platform capability"],["◇","Device PM","Device model and enablement"],["🧪","QA","Quality strategy and validation"],["🌍","Regional Teams","Market needs and launch validation"]]),
  metrics:()=>generic("metrics",[["⇄","Migration","New MAU ratio · Success · Remaining users"],["✓","Stability","Crash · ANR · API failure · Offline"],["↗","Core Flows","Login · Plant · Binding · Control · OTA"],["◇","Compatibility","Enablement cycle · Firmware coverage"],["▥","Business","MAU · Energy adoption · ESS usage"],["💬","Experience","Complaints · Satisfaction · Task success"]]),
  reference:()=>generic("reference",[["📘","Product Handbook","Product overview and operating model"],["📄","PRD","Requirements and decisions"],["🧭","Process","Product and delivery workflows"],["🧩","Feature Matrix","Product and device support"],["📝","Release Notes","Version changes and impacts"],["?","FAQ","Common questions and answers"]]),
  faq:()=>generic("faq",[["?","Why product-line centric?","To manage portfolio, lifecycle, migration and ownership consistently."],["?","Who owns ShineTools?","Service & Operations product line."],["?","How are legacy products handled?","Maintenance first; exceptions require review."],["?","How is UI generated?","By device schema and capability mapping."],["?","What is migration success?","Migrated, verified and reversible when required."],["?","How are new devices enabled?","Capability, schema, platform, UI, test and launch gates."]])
 };
 document.getElementById("content").innerHTML=(views[current]||views.home)(); renderNav(); window.scrollTo(0,0);
}
function go(page){current=page;location.hash="#/"+page;renderPage();document.getElementById("sidebar").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function setPortfolioFilter(f){portfolioFilter=f;renderPage()}
function setupSearch(){
 const input=document.getElementById("search"),box=document.getElementById("searchResults");
 input.oninput=()=>{const q=input.value.trim().toLowerCase();if(!q){box.classList.remove("show");box.innerHTML="";return}
 const found=searchIndex.filter(x=>(x[1]+" "+x[2]).toLowerCase().includes(q)).slice(0,8);
 box.innerHTML=found.length?found.map(x=>`<div class="search-result" data-page="${x[0]}"><b>${x[1]}</b><span>${x[2]}</span></div>`).join(""):`<div class="empty">${lang==="zh"?"未找到结果":"No results"}</div>`;
 box.classList.add("show");box.querySelectorAll(".search-result").forEach(el=>el.onclick=()=>{go(el.dataset.page);input.value="";box.classList.remove("show")})};
 document.addEventListener("keydown",e=>{if(e.key==="/"&&document.activeElement!==input){e.preventDefault();input.focus()}});
 document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap"))box.classList.remove("show")});
}
function bind(){
 document.getElementById("langBtn").onclick=()=>{lang=lang==="zh"?"en":"zh";localStorage.setItem("gpc-lang",lang);init()};
 const btn=document.getElementById("mobileMenu"),side=document.getElementById("sidebar"),overlay=document.getElementById("overlay");
 btn.onclick=()=>{side.classList.add("open");overlay.classList.add("show")};overlay.onclick=()=>{side.classList.remove("open");overlay.classList.remove("show")};
}
function init(){document.getElementById("app").innerHTML=shell();renderNav();renderPage();setupSearch();bind()}
window.go=go;window.setPortfolioFilter=setPortfolioFilter;init();
window.onhashchange=()=>{current=location.hash.replace("#/","")||"home";renderPage()};
