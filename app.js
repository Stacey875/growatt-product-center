
const L={
 zh:{
  search:"搜索产品、设备、能力或文档", openResidential:"进入户用数字产品线", browseDevices:"查看设备中心",
  home:"首页", portfolio:"产品组合", residential:"户用数字产品线", shinephone:"新版 ShinePhone", web:"户用 Web Portal",
  legacy:"旧版产品", migration:"迁移中心", dealer:"经销商与安装商", edge:"户用边缘 EMS", platform:"平台架构",
  devices:"设备中心", capability:"能力中心", schema:"Device Schema", enablement:"新品兼容", governance:"产品治理",
  metrics:"指标中心", roadmap:"产品路线图", updates:"最近更新", handbook:"产品手册", compatibility:"兼容矩阵", prd:"PRD 与决策", reference:"参考资料", faq:"FAQ"
 },
 en:{
  search:"Search products, devices, capabilities or docs", openResidential:"Open Residential Product Line", browseDevices:"Browse Device Center",
  home:"Home", portfolio:"Product Portfolio", residential:"Residential Product Line", shinephone:"New ShinePhone", web:"Residential Web Portal",
  legacy:"Legacy Products", migration:"Migration Center", dealer:"Dealer & Installer", edge:"Home Edge EMS", platform:"Platform Architecture",
  devices:"Device Center", capability:"Capability Center", schema:"Device Schema", enablement:"New Device Enablement", governance:"Product Governance",
  metrics:"Metrics Center", roadmap:"Product Roadmap", updates:"Latest Updates", handbook:"Product Handbook", compatibility:"Compatibility Matrix", prd:"PRD & Decisions", reference:"Reference", faq:"FAQ"
 }
};
let lang=localStorage.getItem("gpc-lang")||"zh";
let current=location.hash.replace("#/","")||"home";
let portfolioFilter="All";
let deviceTypeFilter="All";
let deviceQuery="";

const nav=[
 ["Overview",[["home","⌂"],["portfolio","▦"],["roadmap","↗"],["updates","◷"]]],
 ["Residential",[["residential","⌂"],["shinephone","◉"],["web","▤"],["legacy","◌"],["migration","⇄"],["dealer","♙"],["edge","⚡"]]],
 ["Platform & Device",[["platform","☁"],["devices","◇"],["capability","✦"],["schema","⌘"],["enablement","+"]]],
 ["Knowledge",[["handbook","📘"],["compatibility","▦"],["prd","📄"],["reference","≡"]]],
 ["Governance",[["governance","✓"],["metrics","▥"],["faq","?"]]]
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
 handbook:["将产品定位、当前功能、兼容机型与统一设备体系沉淀为可浏览的正文。","Browse product positioning, current capabilities, compatible models, and unified device architecture."],
 compatibility:["基于真实兼容清单查看机型、DTC、监控场景、区域验收与功能覆盖。","Browse real compatibility data by model, DTC, monitoring scenario, region validation, and feature coverage."],
 prd:["集中沉淀需求背景、方案、边界、验收标准、决策记录与上线结果。","Centralize problem context, solution, scope, acceptance criteria, decisions, and outcomes."],
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
 {id:"sph",model:"SPH",family:"Hybrid",type:"Hybrid Inverter",status:"Active",priority:"P0",regions:["EU","AU","Global"],collectors:["ShineWiFi-X","ShineLAN-X","Shine4G-X"],capabilities:["Monitoring","Control","Alarm","History","Energy","OTA"],firmware:"Latest",dtc:"3502 / 3503",summary:"Residential hybrid inverter family for PV, battery and backup energy management.",parameters:["Operating mode","Backup SOC","Charge/discharge schedule","Export limit"],docs:["Product Handbook","Compatibility Matrix","Login Region PRD"]},
 {id:"wit",model:"WIT",family:"Hybrid",type:"Hybrid Inverter",status:"Active",priority:"P0",regions:["EU","AU","CN"],collectors:["ShineWiFi-X","Shine4G-X","ShineMaster"],capabilities:["Monitoring","Control","Alarm","History","Energy","OTA","Scheduler"],firmware:"Latest",dtc:"5603",summary:"Hybrid inverter family supporting advanced energy control and storage scenarios.",parameters:["Work mode","SOC reserve","TOU schedule","Grid limit"],docs:["Product Handbook","Device Matrix","Enablement Workflow"]},
 {id:"spm",model:"SPM",family:"Storage",type:"Storage / EMS",status:"Active",priority:"P0",regions:["AU"],collectors:["Integrated Gateway"],capabilities:["Monitoring","Control","Alarm","History","Energy","OTA","Scheduler"],firmware:"2.x+",dtc:"21300",summary:"Integrated residential storage and energy management platform.",parameters:["Charge SOC","Discharge SOC","Work mode","Smart dispatch"],docs:["SPM Parameters","Compatibility Matrix","EMS Handbook"]},
 {id:"min",model:"MIN",family:"Inverter",type:"PV Inverter",status:"Active",priority:"P1",regions:["EU","AU","Global"],collectors:["ShineWiFi-X","ShineLAN-X"],capabilities:["Monitoring","Alarm","History","Energy","OTA"],firmware:"Latest",dtc:"5100",summary:"Residential string inverter family for compact PV installations.",parameters:["Export limit","Power factor","Grid code"],docs:["Compatibility Matrix","Alarm Dictionary"]},
 {id:"mod",model:"MOD",family:"Inverter",type:"PV / Hybrid Inverter",status:"Active",priority:"P1",regions:["EU","AU"],collectors:["ShineWiFi-X","Shine4G-X"],capabilities:["Monitoring","Control","Alarm","History","Energy","OTA"],firmware:"Latest",dtc:"5400",summary:"Three-phase residential inverter family with storage-ready variants.",parameters:["Export limit","Battery mode","Grid parameters"],docs:["Compatibility Matrix","Device Schema"]},
 {id:"mina",model:"MINA",family:"Inverter",type:"PV Inverter",status:"Planning",priority:"P1",regions:["TBD"],collectors:["TBD"],capabilities:["Monitoring","Energy"],firmware:"TBD",dtc:"TBD",summary:"Planned inverter family pending capability and regional validation.",parameters:["TBD"],docs:["Enablement Workflow"]},
 {id:"neo",model:"NEO",family:"Microinverter",type:"Microinverter",status:"Active",priority:"P1",regions:["EU"],collectors:["NEO Gateway"],capabilities:["Monitoring","Alarm","History","Energy","OTA"],firmware:"Latest",dtc:"5202 / 5203",summary:"Microinverter family for distributed residential PV systems.",parameters:["Power limit","Grid profile"],docs:["Compatibility Matrix"]},
 {id:"noah",model:"NOAH 2000",family:"Storage",type:"Balcony Storage",status:"Active",priority:"P1",regions:["EU"],collectors:["Integrated Wi-Fi"],capabilities:["Monitoring","Control","Alarm","Energy","OTA","Scheduler"],firmware:"Latest",dtc:"30040",summary:"Balcony storage product for self-consumption and scheduled energy use.",parameters:["SOC reserve","Charge schedule","Discharge power"],docs:["Compatibility Matrix"]},
 {id:"ev",model:"EV Charger",family:"Charging",type:"EV Charging",status:"Active",priority:"P1",regions:["EU","AU"],collectors:["Wi-Fi","LAN"],capabilities:["Monitoring","Control","History","Energy","Scheduler","OTA"],firmware:"Latest",dtc:"Multiple",summary:"Residential EV charging family integrated with plant energy flows.",parameters:["Charge current","Schedule","PV surplus mode"],docs:["Charging Handbook"]},
 {id:"meter",model:"Smart Meter",family:"Meter",type:"Measurement",status:"Active",priority:"P0",regions:["Global"],collectors:["RS485 via inverter / collector"],capabilities:["Monitoring","History","Energy"],firmware:"Latest",dtc:"Multiple",summary:"Metering devices providing grid, load and export measurements.",parameters:["Address","Direction","CT ratio"],docs:["Meter Integration Guide"]},
 {id:"logger",model:"Datalogger",family:"Collector",type:"Collector / Gateway",status:"Active",priority:"P0",regions:["Global"],collectors:["N/A"],capabilities:["Connectivity","Discovery","Command","OTA","Offline Recovery"],firmware:"Latest",dtc:"Multiple",summary:"Communication gateway connecting cloud, plant and field devices.",parameters:["Network","RS485 address","RF pairing","Reporting interval"],docs:["Collector Protocol","Enablement Workflow"]},
 {id:"battery",model:"Battery System",family:"Battery",type:"Battery",status:"Active",priority:"P1",regions:["EU","AU","Global"],collectors:["Via compatible inverter"],capabilities:["Monitoring","Alarm","History","Energy"],firmware:"Model dependent",dtc:"Multiple",summary:"Battery families exposed through compatible inverter and storage systems.",parameters:["SOC limits","Charge current","Reserve SOC"],docs:["Battery Compatibility Guide"]}
];
const recentDocs=[
 {type:"Handbook",title:"New ShinePhone & ShineServer Product Design Handbook",owner:"Residential PM",updated:"2026-07-19",status:"Draft"},
 {type:"PRD",title:"Login Region & No-Plant Troubleshooting",owner:"Residential PM",updated:"2026-07-18",status:"Approved"},
 {type:"Matrix",title:"Residential Device Compatibility Matrix",owner:"Device Platform",updated:"2026-07-17",status:"In Review"},
 {type:"Process",title:"New Device Enablement Workflow",owner:"Platform PM",updated:"2026-07-16",status:"Draft"}
];
const audiences=[
 {icon:"🏠",name:"End User",goal:"Monitor plants, manage energy and control devices",entry:"ShinePhone / Web"},
 {icon:"♙",name:"Dealer & Installer",goal:"Create plants, onboard devices and support customers",entry:"App / Web"},
 {icon:"🧑‍💻",name:"Product & R&D",goal:"Align requirements, capabilities and release scope",entry:"GPC"},
 {icon:"🌍",name:"Regional Team",goal:"Validate market fit, compliance and rollout readiness",entry:"GPC / Release"}
];
const searchIndex=[
 ["home","Growatt Product Center","产品知识平台 / Product knowledge platform"],["portfolio","Product Portfolio","生命周期 Owner Scope Status"],
 ["residential","Residential Digital Products","户用数字产品线"],["shinephone","New ShinePhone","新版 ShinePhone App"],
 ["migration","Migration Center","账号 电站 设备 历史数据"],["edge","Home Edge EMS","本地控制 能源策略 智能调度"],
 ["devices","Device Center","SPM WIT SPH MINA MIN MOD NEO NOAH EV Charger Meter Datalogger Battery"],["capability","Capability Center","Monitoring Control Alarm OTA Energy"],
 ["schema","Device Schema","Telemetry Parameter Alarm Control"],["enablement","New Device Enablement","Capability Schema Test Region Launch"],
 ["metrics","Metrics Center","Migration Stability Core Flow Compatibility Business"],["updates","GPC V2.0","Device center detail capability parameter firmware collector"],["governance","Product Governance","RACI ownership responsibility"],["handbook","New ShinePhone Product Handbook","产品定位 主要客户 功能 页面 设备体系"],["prd","Login Region PRD","登录地区 无电站 异常排查 决策 验收"],["compatibility","Residential Compatibility Matrix","机型 DTC 参数设置 故障告警 历史数据 智能调度"],["reference","Product Handbook PRD Release Notes","Handbook PRD compatibility matrix process"],["residential","Users and Roles","End User Dealer Installer Product R&D Regional Team"]
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
  <div id="nav"></div><div class="sidebar-footer">V2.0 · Device Center<br>Incremental product platform</div>
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
 return `<div class="breadcrumb">Growatt Product Center / ${L[lang][id]}</div><div class="page-head"><div><h1>${L[lang][id]}</h1><p>${descriptions[id][lang==="zh"?0:1]}</p></div>${badge("V2.0")}</div>`;
}
function homePage(){
 const zh=lang==="zh";
 const docRows=recentDocs.map(d=>`<div class="doc-row"><span class="doc-type">${d.type}</span><div><div class="list-title">${d.title}</div><div class="list-sub">${d.owner} · ${d.updated}</div></div>${badge(d.status)}</div>`).join("");
 return `<section class="hero hero-v14"><div class="hero-kicker">● ${zh?"V2.0 正式开发版":"V2.0 Product Platform"}</div>
  <h1>${zh?"Growatt Product Center":"Growatt Product Center"}</h1>
  <p>${zh?"面向户用数字产品线的统一知识入口：连接产品组合、用户场景、设备能力、迁移治理、版本状态与真实产品资料。":"The unified knowledge entry for Residential Digital Products, connecting portfolio, user scenarios, device capabilities, migration governance, release status, and product documentation."}</p>
  <div class="hero-actions"><button class="btn btn-primary" onclick="go('residential')">${L[lang].openResidential}</button><button class="btn btn-ghost" onclick="go('reference')">${zh?"查看产品资料":"Browse product assets"}</button></div>
  <div class="hero-status"><span><b>Current focus</b>${zh?"新版 ShinePhone 与设备能力模型":"New ShinePhone & device capability model"}</span><span><b>Latest update</b>2026-07-20</span><span><b>Owner</b>Residential Product Lead</span></div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"产品运行概览":"Product Operating Overview"}</h2><p>${zh?"用于汇报产品线建设状态，不代表线上生产数据。":"Leadership view of product-line readiness; not production analytics."}</p></div><span class="release-chip">V2.0</span></div>
 <div class="grid grid-4">${metric("6",zh?"产品模块":"Product Modules","Mapped",100)}${metric("8",zh?"设备族":"Device Families","Phase 1",72)}${metric("4",zh?"知识资产":"Knowledge Assets","Connected",75)}${metric("3",zh?"关键工作流":"Core Workflows","Defined",68)}</div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"快速入口":"Quick Access"}</h2><p>${zh?"从产品、平台、设备和迁移四个视角进入。":"Enter from product, platform, device, or migration views."}</p></div></div><div class="grid grid-4">
 ${quick("📱",zh?"户用产品线":"Residential Products",zh?"产品定位、用户、组合与生命周期":"Positioning, users, portfolio and lifecycle","residential")}${quick("☁",zh?"平台架构":"Platform Architecture",zh?"Cloud、Plant、Collector、Device":"Cloud, plant, collector and device","platform")}${quick("◇",zh?"设备中心":"Device Center",zh?"型号、能力、固件与接入状态":"Model, capability, firmware and enablement","devices")}${quick("⇄",zh?"迁移中心":"Migration Center",zh?"账号、电站、设备、历史数据与回滚":"Account, plant, device, history and rollback","migration")}</div></section>
 <section class="section grid grid-2"><div class="card"><div class="section-head"><div><h2>${zh?"最近知识资产":"Recently Updated Assets"}</h2><p>${zh?"网站内容从“菜单”开始转向“可复用资产”。":"Moving from navigation to reusable product assets."}</p></div><button class="icon-btn" onclick="go('reference')">${zh?"资料中心":"Reference"}</button></div>${docRows}</div>
 <div class="card"><div class="section-head"><div><h2>${zh?"当前决策与风险":"Decisions & Risks"}</h2></div></div>
 <div class="decision-item"><span class="decision-dot green-dot"></span><div><b>${zh?"产品线边界已明确":"Product-line boundary defined"}</b><p>${zh?"ShineTools 归属服务与运维产品线。":"ShineTools belongs to Service & Operations."}</p></div></div>
 <div class="decision-item"><span class="decision-dot amber-dot"></span><div><b>${zh?"跨区账号查询受限":"Cross-region account lookup constrained"}</b><p>${zh?"当前通过地区提示与排查入口缓解，长期建设账号平台能力。":"Mitigate through region guidance now; build account-platform capability long term."}</p></div></div>
 <div class="decision-item"><span class="decision-dot blue-dot"></span><div><b>${zh?"设备页面动态生成":"Device-driven UI"}</b><p>${zh?"基于 Device Type、Schema、Capability 和固件范围。":"Driven by device type, schema, capability, and firmware range."}</p></div></div></div></section>`;
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
 return `${head("residential")}<section class="strategy-strip"><div><span>${zh?"使命":"MISSION"}</span><b>${zh?"让家庭能源设备更易理解、更易使用、更易持续演进":"Make home energy easier to understand, operate and evolve"}</b></div><div><span>${zh?"产品范围":"SCOPE"}</span><b>App · Web · Dealer · Edge EMS · Migration</b></div><div><span>${zh?"核心原则":"PRINCIPLE"}</span><b>${zh?"设备能力驱动体验":"Capability-driven experience"}</b></div></section>
 <section class="section grid grid-2"><div class="card"><h3>${zh?"产品定位":"Product Positioning"}</h3><p>${zh?"统一面向户用终端用户与经销商，覆盖电站监控、设备控制、能源管理、告警服务、账号与电站管理。":"A unified residential experience for end users and dealers across monitoring, control, energy, alarms, service, account, and plant management."}</p></div><div class="card"><h3>${zh?"产品边界":"Product Boundary"}</h3><p>${zh?"产品线负责用户体验与业务闭环；云平台、设备平台提供共享底座；ShineTools 不在本产品线范围。":"The product line owns user experience and business loops; cloud and device platforms provide shared foundations; ShineTools is out of scope."}</p></div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"核心用户":"Core Users"}</h2><p>${zh?"同一产品知识平台服务业务用户与内部交付团队。":"The same knowledge platform serves business users and delivery teams."}</p></div></div><div class="grid grid-4">${audiences.map(a=>`<div class="card audience-card"><div class="audience-icon">${a.icon}</div><h3>${a.name}</h3><p>${a.goal}</p><div class="audience-entry">${a.entry}</div></div>`).join("")}</div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"产品生命周期":"Product Lifecycle"}</h2><p>${zh?"从探索到退场，统一管理产品状态、投入边界和迁移责任。":"Manage status, investment boundaries and migration responsibility from discovery to retirement."}</p></div></div><div class="lifecycle"><div class="life-step"><b>1</b><span>${zh?"探索":"Discover"}</span><small>${zh?"用户问题与商业价值":"Problem & value"}</small></div><div class="life-step active"><b>2</b><span>${zh?"建设":"Build"}</span><small>${zh?"新版产品与平台能力":"New product & platform"}</small></div><div class="life-step"><b>3</b><span>${zh?"增长":"Scale"}</span><small>${zh?"区域、设备与用户规模":"Region, device & user scale"}</small></div><div class="life-step"><b>4</b><span>${zh?"维护":"Maintain"}</span><small>${zh?"稳定性与合规优先":"Stability & compliance"}</small></div><div class="life-step"><b>5</b><span>${zh?"退场":"Retire"}</span><small>${zh?"迁移、回滚与关闭":"Migration, rollback & shutdown"}</small></div></div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"产品线地图":"Product Line Map"}</h2></div></div><div class="grid grid-3">${quick("📱",zh?"当前产品":"Current Products","New ShinePhone · Residential Web","portfolio")}${quick("◌",zh?"旧版产品":"Legacy Products",zh?"维护边界、例外与退场":"Maintenance boundary, exception and retirement","legacy")}${quick("♙",L[lang].dealer,zh?"客户、电站、安装与权限":"Customer, plant, installation and permission","dealer")}${quick("⚡",L[lang].edge,zh?"本地控制、策略与调度":"Local control, strategy and dispatch","edge")}${quick("⇄",L[lang].migration,zh?"迁移、验证、回滚与退场":"Migration, verification, rollback and retirement","migration")}${quick("+",L[lang].enablement,zh?"设备能力模型与新品上线":"Capability model and new-device launch","enablement")}</div></section>`;
}
function platformPage(){
 const zh=lang==="zh";
 return `${head("platform")}<section class="card platform-canvas"><div class="platform-flow"><div class="layer cloud-layer"><span>01</span><div><b>☁ Cloud Platform</b><p>${zh?"账号、区域、权限、数据服务、消息与业务编排":"Account, region, permission, data services, messaging and orchestration"}</p></div></div><div class="flow-arrow">↓</div><div class="layer plant-layer"><span>02</span><div><b>🏠 Plant Domain</b><p>${zh?"用户能源资产容器，组织设备、角色、场景与历史数据":"Energy-asset container organizing devices, roles, scenarios and history"}</p></div></div><div class="flow-arrow">↓</div><div class="layer collector-layer"><span>03</span><div><b>📡 Collector / Edge</b><p>${zh?"通过 RS485 或 RF 接入多个设备，负责通信、发现、下发与恢复":"Connects multiple devices via RS485 or RF; handles communication, discovery, delivery and recovery"}</p></div></div><div class="flow-arrow">↓</div><div class="layer device-layer"><span>04</span><div><b>◇ Device</b><p>${zh?"逆变器、储能、电表、充电桩等；能力和参数随型号与固件变化":"Inverters, ESS, meters, EV chargers; capabilities vary by model and firmware"}</p></div></div></div>
 <div class="flow-notes"><div><b>${zh?"上行数据":"Upstream"}</b><p>${zh?"实时数据、历史数据、状态、告警与设备元数据。":"Telemetry, history, status, alarms and metadata."}</p></div><div><b>${zh?"下行控制":"Downstream"}</b><p>${zh?"工作模式、SOC、充放电计划、参数与 OTA 指令。":"Operating mode, SOC, charge/discharge plan, parameters and OTA commands."}</p></div><div><b>${zh?"关键约束":"Key Constraint"}</b><p>${zh?"一个电站可包含多个采集器；每个采集器可连接多个设备；每个电站仅一台设备参与智能调度。":"A plant may contain multiple collectors; each collector may connect multiple devices; one device per plant joins smart dispatch."}</p></div></div></section>
 <section class="section grid grid-3">${quick("✦","Capability Model",zh?"定义可复用的监控、控制、告警、能源与 OTA 能力":"Reusable monitoring, control, alarm, energy and OTA capabilities","capability")}${quick("⌘","Device Schema",zh?"结构化定义数据点、参数、控制、告警与元数据":"Structured telemetry, parameter, control, alarm and metadata definitions","schema")}${quick("+",L[lang].enablement,zh?"从设备立项、模型定义到区域验证和上线":"From initiation and modeling to regional validation and launch","enablement")}</section>`;
}
function devicesPage(){
 const zh=lang==="zh";
 const types=["All",...new Set(devices.map(d=>d.family))];
 const q=deviceQuery.trim().toLowerCase();
 const rows=devices.filter(d=>(deviceTypeFilter==="All"||d.family===deviceTypeFilter)&&(!q||[d.model,d.type,d.family,d.dtc,...d.capabilities,...d.regions].join(" ").toLowerCase().includes(q)));
 return `${head("devices")}<section class="device-hero"><div><span class="eyebrow">V2.0 DEVICE PLATFORM</span><h2>${zh?"以设备为中心连接能力、参数、固件与产品资料":"Connect capabilities, parameters, firmware and product assets around each device"}</h2><p>${zh?"当前为第一阶段设备主数据。点击任一设备进入详情页。":"Phase-one device master data. Open any device for a structured detail view."}</p></div><div class="device-summary"><b>${devices.length}</b><span>${zh?"设备记录":"device records"}</span></div></section>
 <div class="device-toolbar"><div class="segment device-segment">${types.map(t=>`<button class="${deviceTypeFilter===t?"active":""}" onclick="setDeviceTypeFilter('${t}')">${t}</button>`).join("")}</div><input class="matrix-search" value="${deviceQuery}" oninput="setDeviceQuery(this.value)" placeholder="${zh?"搜索型号、DTC、能力或区域":"Search model, DTC, capability or region"}"></div>
 <div class="device-layout"><aside class="device-taxonomy card"><h3>${zh?"设备分类":"Device taxonomy"}</h3>${types.slice(1).map(t=>`<button onclick="setDeviceTypeFilter('${t}')"><span>${t}</span><b>${devices.filter(d=>d.family===t).length}</b></button>`).join("")}</aside>
 <section><div class="result-meta">${zh?`找到 ${rows.length} 个设备`:`${rows.length} devices found`}</div><div class="device-grid">${rows.map(d=>`<article class="device-card" onclick="openDevice('${d.id}')"><div class="device-card-top"><span class="device-family">${d.family}</span>${badge(d.status)}</div><div class="device-monogram">${d.model.slice(0,3)}</div><h3>${d.model}</h3><p>${d.type}</p><div class="device-tags">${d.capabilities.slice(0,4).map(c=>`<span>${c}</span>`).join("")}${d.capabilities.length>4?`<span>+${d.capabilities.length-4}</span>`:""}</div><div class="device-card-foot"><span>DTC ${d.dtc}</span><b>${zh?"查看详情 →":"View details →"}</b></div></article>`).join("")||`<div class="card empty-state">${zh?"没有匹配的设备":"No matching devices"}</div>`}</div></section></div>`;
}
function deviceDetailPage(id){
 const zh=lang==="zh",d=devices.find(x=>x.id===id)||devices[0];
 return `<div class="breadcrumb"><a onclick="go('devices')">${L[lang].devices}</a> / ${d.model}</div><section class="device-detail-head"><button class="back-btn" onclick="go('devices')">← ${zh?"返回设备中心":"Back to Device Center"}</button><div class="device-title-row"><div><span class="eyebrow">${d.family} · DTC ${d.dtc}</span><h1>${d.model}</h1><p>${d.summary}</p></div><div>${badge(d.status)} ${badge(d.priority)}</div></div></section>
 <div class="device-detail-grid"><main><section class="card"><div class="section-head"><div><h2>${zh?"能力覆盖":"Capability coverage"}</h2><p>${zh?"能力决定 App 与 Web 可展示的页面和操作。":"Capabilities determine the pages and actions exposed in App and Web."}</p></div></div><div class="capability-board">${["Monitoring","Control","Alarm","History","Energy","OTA","Scheduler","Connectivity"].map(c=>`<div class="capability-cell ${d.capabilities.includes(c)?"supported":""}"><span>${d.capabilities.includes(c)?"✓":"—"}</span><b>${c}</b></div>`).join("")}</div></section>
 <section class="section card"><h2>${zh?"参数与控制项":"Parameters & controls"}</h2><div class="parameter-list">${d.parameters.map((p,i)=>`<div><span>${String(i+1).padStart(2,"0")}</span><b>${p}</b><small>${zh?"具体范围取决于型号、固件与区域配置":"Exact range depends on model, firmware and region"}</small></div>`).join("")}</div></section>
 <section class="section card"><h2>${zh?"关联知识资产":"Linked knowledge assets"}</h2><div class="linked-assets">${d.docs.map(x=>`<button onclick="go('${x.includes("Compatibility")?"compatibility":x.includes("Handbook")?"handbook":"reference"}')"><span>📄</span><b>${x}</b><small>${zh?"打开资料":"Open asset"} →</small></button>`).join("")}</div></section></main>
 <aside><section class="card facts"><h3>${zh?"设备信息":"Device facts"}</h3><div><span>Type</span><b>${d.type}</b></div><div><span>Firmware</span><b>${d.firmware}</b></div><div><span>Regions</span><b>${d.regions.join(" · ")}</b></div><div><span>Priority</span><b>${d.priority}</b></div></section><section class="section card facts"><h3>${zh?"支持采集器":"Supported collectors"}</h3>${d.collectors.map(x=>`<div><span>◇</span><b>${x}</b></div>`).join("")}</section></aside></div>`;
}
function shinephonePage(){
 const zh=lang==="zh";
 return `${head("shinephone")}
 <section class="section grid grid-2"><div class="card"><h3>${zh?"产品定位":"Product Positioning"}</h3><p>${zh?"新版 ShinePhone 是面向户用终端用户与经销商的统一移动端入口，承载电站监控、设备控制、能源管理、告警、服务与账号能力。":"New ShinePhone is the unified mobile entry for residential end users and dealers, covering plant monitoring, device control, energy management, alarms, services, and account capabilities."}</p></div>
 <div class="card"><h3>${zh?"建设原则":"Build Principles"}</h3><p>${zh?"完全重构、兼容旧版核心能力；页面与参数根据用户设备、型号、固件、Capability 与 Schema 动态生成。":"Rebuilt from the ground up while preserving core legacy capabilities; UI and parameters are dynamically driven by devices, models, firmware, capabilities, and schema."}</p></div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"核心用户与入口":"Core Users & Entry Points"}</h2></div></div><div class="grid grid-3">
 ${quick("🏠",zh?"终端用户":"End Users",zh?"查看电站、能源、设备与告警，并完成日常控制。":"Monitor plants, energy, devices and alarms, and perform daily controls.","shinephone")}
 ${quick("♙",zh?"经销商/安装商":"Dealers / Installers",zh?"协助客户建站、设备接入、基础诊断和权限协作。":"Support plant setup, device onboarding, basic diagnosis and permissions.","dealer")}
 ${quick("🌐",zh?"Web 协同":"Web Collaboration",zh?"ShineServer 作为户用 Web 入口，与 App 共享核心能力。":"ShineServer is the residential Web entry and shares core capabilities with the App.","web")}</div></section>
 <section class="section card"><div class="section-head"><div><h2>${zh?"功能结构":"Feature Architecture"}</h2><p>${zh?"实际功能与数据根据用户所拥有的设备动态决定。":"Actual functions and data are determined dynamically by the user’s devices."}</p></div></div>
 <div class="grid grid-4">${quick("📊",zh?"监控与分析":"Monitoring & Analytics",zh?"实时数据、历史曲线、能量流与收益。":"Realtime data, history, energy flow and revenue.","capability")}${quick("🎛",zh?"设备控制":"Device Control",zh?"工作模式、SOC、充放电和计划。":"Modes, SOC, charge/discharge and schedules.","capability")}${quick("⚠",zh?"告警与服务":"Alarms & Service",zh?"告警详情、排查建议与服务入口。":"Alarm details, troubleshooting guidance and service entry.","schema")}${quick("👤",zh?"账号与电站":"Account & Plant",zh?"登录地区、账号、电站、分享与权限。":"Login region, account, plant, sharing and permissions.","migration")}</div></section>
 <section class="section card"><div class="section-head"><div><h2>${zh?"当前重点问题":"Current Focus"}</h2></div></div><div class="callout">${zh?"账号与数据按地区服务器隔离，后端不支持跨区搜索。当前版本通过登录地区提示、异常排查与无电站帮助入口降低误选地区带来的登录和数据困惑；长期需要建设账号平台能力。":"Accounts and data are isolated by regional servers and cross-region lookup is not supported. The current release mitigates confusion through region guidance, troubleshooting and no-plant help; the long-term direction is an account platform capability."}</div></section>
 <section class="section grid grid-3">${quick("◇",zh?"设备兼容":"Device Compatibility",zh?"SPM、WIT、SPH、MINA 等机型能力与参数存在差异。":"Models such as SPM, WIT, SPH and MINA differ in capabilities and parameters.","devices")}${quick("+",zh?"新设备接入":"New Device Enablement",zh?"Device Type、Schema、Capability、测试与区域验证。":"Device type, schema, capability, testing and regional validation.","enablement")}${quick("⇄",zh?"迁移与旧版治理":"Migration & Legacy Governance",zh?"迁移、回滚、维护边界和旧版退场。":"Migration, rollback, maintenance boundary and retirement.","migration")}</section>`;
}


const compatibilityRows=[
 {model:"MIN 2500-6000TL-XH/XH2/XE/XA",dtc:"5100",scene:"光储充",region:"澳洲",validation:"市场已验收 / 项目组进行中",features:["参数设置","故障告警","历史数据","智能调度"]},
 {model:"MOD 3-10KTL3-XH / MID XH 系列",dtc:"5400",scene:"光储充",region:"澳洲",validation:"市场已验收 / 项目组进行中",features:["参数设置","故障告警","历史数据","智能调度"]},
 {model:"WIT 4-25K-HU",dtc:"5603",scene:"工商储",region:"国内",validation:"待补充",features:["参数设置","故障告警","历史数据"]},
 {model:"SPH 3000-6000TL BL-UP",dtc:"3502",scene:"光储充",region:"—",validation:"待补充",features:["参数设置","故障告警","历史数据","智能调度"]},
 {model:"SPH 3000-6000TL HU",dtc:"3503",scene:"光储充",region:"澳洲",validation:"市场已验收 / 项目组已验收",features:["参数设置","故障告警","历史数据"]},
 {model:"SPA 3000-6000TL AU",dtc:"3715",scene:"光储充",region:"澳洲",validation:"市场已验收 / 项目组已验收",features:["参数设置","故障告警","历史数据"]},
 {model:"SPH / SPA 4-10KTL3 BH-UP",dtc:"3601 / 3725",scene:"光储充",region:"—",validation:"待补充",features:["参数设置","故障告警","历史数据","智能调度"]},
 {model:"NEO 600-2000M-X",dtc:"5202 / 5203",scene:"微逆",region:"—",validation:"待补充",features:["故障告警","历史数据"]},
 {model:"NOAH 2000",dtc:"30040",scene:"阳台储能",region:"—",validation:"待补充",features:["参数设置","故障告警"]},
 {model:"NEXA 2000",dtc:"30070",scene:"阳台储能",region:"—",validation:"待补充",features:["参数设置","故障告警"]},
 {model:"SPM 8-10KTL-HU(AU)",dtc:"21300",scene:"光储充",region:"澳洲",validation:"待补充",features:["参数设置","故障告警","历史数据"]},
 {model:"SPF / SPE 部分系列",dtc:"20006 / 20806 / 20701 / 20600",scene:"未兼容",region:"国内 / 待确认",validation:"未验收",features:[]}
];
let compatibilityQuery="";
function featurePills(features){return features.length?features.map(x=>`<span class="feature-pill">${x}</span>`).join(""):`<span class="badge red">未兼容</span>`}
function handbookPage(){
 const zh=lang==="zh";
 return `${head("handbook")}
 <div class="grid grid-4">${metric("4",zh?"核心章节":"Core Chapters","Imported",100)}${metric("2",zh?"主要客户":"Primary Users","End user / Dealer",100)}${metric("4",zh?"统一建设目标":"Build Principles","One Platform",100)}${metric("3",zh?"关键边界":"Key Boundaries","Verified",100)}</div>
 <section class="section card"><div class="section-head"><div><h2>${zh?"手册导航":"Handbook Navigation"}</h2><p>${zh?"本页已将前四章核心内容转为网站正文，后续继续细化页面、功能清单与设备接入内容。":"Core content from the first four chapters is now available as web content."}</p></div></div>
 <div class="chapter-grid">
 <div class="chapter-card"><span>01</span><h3>${zh?"产品定位与主要客户":"Positioning & Users"}</h3><p>${zh?"为什么建设新版、服务谁、App/Web/云平台/Tools 如何分工。":"Why the new product exists, who it serves, and how App, Web, cloud and Tools divide responsibilities."}</p></div>
 <div class="chapter-card"><span>02</span><h3>${zh?"当前功能与页面体系":"Current Features & Pages"}</h3><p>${zh?"按一级、二级页面说明监控、控制、告警、历史、账号与电站能力。":"Monitoring, control, alarms, history, account and plant capabilities by page hierarchy."}</p></div>
 <div class="chapter-card"><span>03</span><h3>${zh?"兼容机型与区域":"Compatibility & Regions"}</h3><p>${zh?"区分设备兼容、功能兼容、区域验收和正式上线状态。":"Separates device support, feature support, regional validation and production release."}</p></div>
 <div class="chapter-card"><span>04</span><h3>${zh?"统一设备体系与接入":"Unified Device Enablement"}</h3><p>${zh?"Device Type、Schema、Capability、兼容矩阵和验收闭环。":"Device Type, Schema, Capability, compatibility matrix and validation loop."}</p></div></div></section>
 <section class="section grid grid-2"><div class="card"><h2>${zh?"一句话定位":"Product Positioning"}</h2><div class="quote-block">${zh?"用统一账号、统一电站、统一设备模型和统一能力体系，把复杂的能源设备变成用户看得懂、能操作、可持续优化的能源服务。":"Use unified accounts, plants, device models and capabilities to turn complex energy equipment into understandable, operable and continuously optimizable energy services."}</div></div>
 <div class="card"><h2>${zh?"四个建设目标":"Four Build Principles"}</h2><ul class="clean-list"><li><b>One Platform</b> — ${zh?"统一账号、电站、设备、权限和数据":"Unified accounts, plants, devices, permissions and data"}</li><li><b>One Device Integration</b> — ${zh?"通过模型和能力复用接入":"Model- and capability-driven enablement"}</li><li><b>One Experience</b> — ${zh?"统一名称、单位、交互和反馈":"Consistent naming, units, interaction and feedback"}</li><li><b>Energy Platform</b> — ${zh?"从设备监控走向能源服务":"Move from device monitoring to energy services"}</li></ul></div></section>
 <section class="section card"><h2>${zh?"主要客户与任务闭环":"Primary Users & Task Loops"}</h2><div class="grid grid-2"><div class="journey"><h3>🏠 ${zh?"终端用户":"End User"}</h3><p>${zh?"看懂能源流、系统状态和收益，在安全范围内完成常用设置，并知道异常时如何处理。":"Understand energy flow, system status and value, perform safe settings, and know how to respond to issues."}</p><div class="journey-flow">${zh?"注册/授权 → 电站总览 → 设备/历史/告警 → 参数或策略 → 设备回读确认":"Register/Authorize → Plant Overview → Device/History/Alarm → Settings/Strategy → Device Readback"}</div></div><div class="journey"><h3>♙ ${zh?"经销商":"Dealer & Installer"}</h3><p>${zh?"更快建站、绑定、调试和交付，并持续管理多个客户和电站。":"Create, bind, commission and deliver plants faster while supporting multiple customers."}</p><div class="journey-flow">${zh?"创建客户/电站 → 绑定采集器 → 调试校验 → 验证数据与控制 → 交付与持续服务":"Create Customer/Plant → Bind Collector → Commission → Validate Data & Control → Handover & Service"}</div></div></div></section>
 <section class="section card"><h2>${zh?"必须分开的三类结论":"Three Conclusions That Must Stay Separate"}</h2><div class="boundary-grid"><div><b>1</b><p>${zh?"功能完成 ≠ 全部设备可用":"Feature complete ≠ available on every device"}</p></div><div><b>2</b><p>${zh?"设备兼容 ≠ 所有功能兼容":"Device compatible ≠ all features compatible"}</p></div><div><b>3</b><p>${zh?"设备在售区域 ≠ App 正式上线区域":"Device sales region ≠ App production region"}</p></div></div></section>`;
}
function compatibilityPage(){
 const zh=lang==="zh"; const q=compatibilityQuery.toLowerCase();
 const rows=compatibilityRows.filter(r=>(r.model+r.dtc+r.scene+r.region+r.features.join(" ")).toLowerCase().includes(q));
 return `${head("compatibility")}<div class="grid grid-4">${metric("12",zh?"代表机型组":"Representative Model Groups","Imported",100)}${metric("4",zh?"核心能力":"Core Capabilities","Parameters · Alarm · History · Dispatch",100)}${metric("4",zh?"业务场景":"Business Scenarios","Residential-first",80)}${metric("3",zh?"结论维度":"Conclusion Dimensions","Support · Validation · Region",100)}</div>
 <section class="section card"><div class="section-head"><div><h2>${zh?"真实设备兼容数据":"Real Device Compatibility Data"}</h2><p>${zh?"来源于《新版 Server_ShinePhone 功能兼容清单》，当前展示代表性机型组。":"Sourced from the New Server/ShinePhone compatibility workbook; representative model groups are shown."}</p></div><input class="matrix-search" value="${compatibilityQuery}" oninput="setCompatibilityQuery(this.value)" placeholder="${zh?"搜索机型、DTC、区域或能力":"Search model, DTC, region or feature"}"></div>
 <div class="compat-table"><div class="compat-head"><span>${zh?"机型":"Model"}</span><span>DTC</span><span>${zh?"场景":"Scenario"}</span><span>${zh?"区域/验收":"Region / Validation"}</span><span>${zh?"功能覆盖":"Feature Coverage"}</span></div>${rows.map(r=>`<div class="compat-row"><div><b>${r.model}</b></div><span class="mono">${r.dtc}</span><span>${r.scene}</span><div><b>${r.region}</b><small>${r.validation}</small></div><div class="feature-list">${featurePills(r.features)}</div></div>`).join("")||`<div class="empty">${zh?"未找到匹配机型":"No matching model"}</div>`}</div></section>
 <section class="section grid grid-3">${quick("✓",zh?"支持状态":"Support Status",zh?"监控场景与具体功能是否已兼容":"Whether the monitoring scenario and features are supported","compatibility")}${quick("🧪",zh?"验收状态":"Validation Status",zh?"市场验收与项目组验收需分别记录":"Market and project validation are tracked separately","compatibility")}${quick("🌍",zh?"区域状态":"Region Status",zh?"设备在售、区域验收和正式上线不能混用":"Sales, validation and production release must not be conflated","compatibility")}</section>`;
}


const prdItems=[
 {id:"PRD-2026-0718",title:"登录地区与无电站异常排查",type:"Experience",status:"Approved",owner:"Residential PM",release:"Emergency Release",updated:"2026-07-18",problem:"用户选择错误登录地区时，可能出现账号不存在、登录成功但无电站等困惑。",decision:"在不跨区查询的合规约束下，通过登录地区提示、账号异常弹窗和无电站帮助入口降低误判。",scope:["登录地区辅助说明","未找到匹配账号弹窗","无电站异常排查入口","多语言文案"],out:["跨区账号搜索","自动合并跨区账号","跨区电站数据迁移"],acceptance:["用户可明确理解登录地区与注册地区需一致","错误账号与错误地区均有可执行的下一步","登录成功但无电站时可进入排查说明","不新增跨区数据查询"]},
 {id:"PRD-2026-0701",title:"新版 ShinePhone 设备能力动态展示",type:"Platform",status:"In Review",owner:"Residential PM / Device Platform",release:"2026 Q4",updated:"2026-07-19",problem:"不同设备型号和固件支持的数据、参数、告警、控制与 OTA 能力不同，静态页面难以持续维护。",decision:"由 Device Type、Schema、Capability 和 Feature Matrix 共同驱动 App/Web 页面与参数展示。",scope:["设备类型模型","能力模型","参数与告警 Schema","页面动态渲染规则"],out:["所有旧设备一次性改造","业务策略直接写入设备协议"],acceptance:["同一页面可按设备能力差异化展示","不支持的参数不展示或明确禁用","新增设备可复用已有能力组件","兼容矩阵可追踪到型号与固件"]},
 {id:"PRD-2026-0625",title:"旧版产品迁移与退场治理",type:"Governance",status:"Draft",owner:"Residential PM",release:"2027 Q1",updated:"2026-07-16",problem:"新旧 App/Web 并行期间缺少统一迁移口径、回滚机制和退场条件。",decision:"按账号、电站、设备、经销商、历史数据和区域拆分迁移工作包，并设置可验证、可回滚、可追踪的上线门槛。",scope:["迁移工作包","灰度与回滚","遗留用户指标","退场评审"],out:["无验证直接全量切换","只按版本时间强制退场"],acceptance:["迁移成功率与失败原因可量化","关键数据迁移后可核验","发生严重异常时可回滚","旧版退场具备明确门槛"]}
];
let prdFilter="All";
function prdPage(){
 const zh=lang==="zh"; const rows=prdFilter==="All"?prdItems:prdItems.filter(x=>x.status===prdFilter);
 return `${head("prd")}<div class="grid grid-4">${metric("3",zh?"核心 PRD":"Core PRDs","Tracked",100)}${metric("1",zh?"已批准":"Approved","Ready",100)}${metric("1",zh?"评审中":"In Review","Review",65)}${metric("1",zh?"草稿":"Draft","Draft",35)}</div>
 <section class="section card"><div class="section-head"><div><h2>${zh?"需求与决策台账":"Requirement & Decision Register"}</h2><p>${zh?"每一项需求同时记录问题、决策、范围、排除项、验收标准和目标版本。":"Each requirement records the problem, decision, scope, exclusions, acceptance criteria, and target release."}</p></div><div class="filter-bar">${["All","Approved","In Review","Draft"].map(x=>`<button class="filter ${prdFilter===x?"active":""}" onclick="setPrdFilter('${x}')">${x}</button>`).join("")}</div></div>
 <div class="prd-list">${rows.map(x=>`<article class="prd-card"><div class="prd-top"><div><span class="mono prd-id">${x.id}</span><h3>${x.title}</h3></div><div>${badge(x.status)}</div></div><div class="prd-meta"><span>${x.type}</span><span>${x.owner}</span><span>${x.release}</span><span>${x.updated}</span></div><div class="prd-grid"><div><b>${zh?"问题":"Problem"}</b><p>${x.problem}</p></div><div><b>${zh?"产品决策":"Decision"}</b><p>${x.decision}</p></div></div><div class="prd-grid"><div><b>${zh?"本期范围":"In Scope"}</b><ul>${x.scope.map(i=>`<li>${i}</li>`).join("")}</ul></div><div><b>${zh?"明确排除":"Out of Scope"}</b><ul>${x.out.map(i=>`<li>${i}</li>`).join("")}</ul></div></div><div class="acceptance"><b>${zh?"验收标准":"Acceptance Criteria"}</b>${x.acceptance.map((i,n)=>`<div><span>${n+1}</span>${i}</div>`).join("")}</div></article>`).join("")}</div></section>
 <section class="section card"><h2>${zh?"统一 PRD 模板":"Standard PRD Template"}</h2><div class="template-flow"><span>01 ${zh?"问题与目标":"Problem & Goal"}</span><span>02 ${zh?"用户与场景":"Users & Scenario"}</span><span>03 ${zh?"方案与流程":"Solution & Flow"}</span><span>04 ${zh?"范围与边界":"Scope & Boundary"}</span><span>05 ${zh?"验收与指标":"Acceptance & Metrics"}</span><span>06 ${zh?"决策与变更":"Decision & Change"}</span></div></section>`;
}

function referencePage(){
 const zh=lang==="zh";
 return `${head("reference")}<div class="grid grid-4">${metric("1",zh?"产品 Handbook":"Product Handbook","Draft",65)}${metric("1",zh?"已批准 PRD":"Approved PRD","Approved",100)}${metric("1",zh?"设备矩阵":"Device Matrix","In Review",70)}${metric("1",zh?"接入流程":"Enablement Process","Draft",60)}</div><section class="section card"><div class="section-head"><div><h2>${zh?"知识资产目录":"Knowledge Asset Catalog"}</h2><p>${zh?"V1.6 已增加 PRD、决策与验收标准的结构化台账。":"V1.5 imports core handbook content and real device compatibility data."}</p></div></div><div class="asset-table"><div class="asset-head"><span>Type</span><span>Title</span><span>Owner</span><span>Updated</span><span>Status</span></div>${recentDocs.map(d=>`<div class="asset-row"><span class="doc-type">${d.type}</span><b>${d.title}</b><span>${d.owner}</span><span>${d.updated}</span>${badge(d.status)}</div>`).join("")}</div></section><section class="section grid grid-3">${quick("📘",zh?"产品 Handbook":"Product Handbook",zh?"产品定位、架构、用户、功能与开发指引":"Positioning, architecture, users, features and development guidance","shinephone")}${quick("📄","PRD",zh?"需求背景、方案、边界、验收与决策记录":"Context, solution, boundary, acceptance and decisions","updates")}${quick("🧩",zh?"兼容矩阵":"Compatibility Matrix",zh?"平台、机型、功能、参数与固件支持情况":"Platform, model, feature, parameter and firmware support","devices")}</section>`;
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
 return `${head("roadmap")}<div class="card timeline">${timeline("2026 Q3",zh?"V1.6 PRD 与决策中心":"V1.6 PRD & Decision Center",zh?"Handbook 核心正文、真实兼容矩阵和知识导航。":"Handbook content, real compatibility matrix and knowledge navigation.")}${timeline("2026 Q4",zh?"真实资料导入":"Production Content Integration",zh?"Handbook、设备矩阵、兼容清单和 Release Notes。":"Handbook, device matrix, compatibility and release notes.")}${timeline("2027 Q1","AI Product Assistant",zh?"自然语言搜索、设备对比和文档问答。":"Natural language search, device comparison and document Q&A.")}</div>`;
}
function updatesPage(){return `${head("updates")}<div class="card timeline">${timeline("2026-07-19","GPC V1.6","Imported handbook core content and real device compatibility data with searchable model matrix.")}${timeline("2026-07-19","GPC V1.6","Product knowledge MVP: operating dashboard, user model, lifecycle, platform data flow and asset catalog.")}${timeline("2026-07-18","Login Region Experience","Added region consistency guidance and no-plant troubleshooting.")}${timeline("2026-07-17","Residential IA V3","Reorganized around current, legacy, migration, edge EMS and governance.")}</div>`;}
function renderPage(){
 const zh=lang==="zh";
 if(current.startsWith("device-")){document.getElementById("content").innerHTML=deviceDetailPage(current.slice(7));renderNav();window.scrollTo(0,0);return;}
 const views={
  home:homePage,portfolio:portfolioPage,residential:residentialPage,platform:platformPage,devices:devicesPage,migration:migrationPage,roadmap:roadmapPage,updates:updatesPage,handbook:handbookPage,compatibility:compatibilityPage,prd:prdPage,
  shinephone:shinephonePage,
  web:()=>generic("web",[["📈","Monitoring","Realtime and historical data"],["🎛","Control","Shared control capabilities with App"],["⚡","Energy","Energy flow and analysis"],["⚠","Alarm","Alarm overview and handling"],["👤","Account","User, plant and sharing"],["◇","Device","Device status and compatibility"]]),
  legacy:()=>generic("legacy",[["🛠","Maintenance First","Bug fixes, compliance and critical stability"],["⛔","No Routine Features","No routine standalone feature development"],["⚖","Exception Review","Exceptions require product review"],["⇄","Migration Support","Guide users and data to new products"],["📉","Retirement Metrics","Track usage decline and remaining users"],["📘","Lifecycle","Status, owner, scope and lifecycle"]]),
  dealer:()=>generic("dealer",[["♙","Dealer Organization","Organization and role management"],["👤","Customer Management","Customer and account relationship"],["🏠","Plant Management","Residential plant portfolio"],["🔧","Installation","Binding and commissioning workflow"],["🔐","Permissions","Dealer-user collaboration and access"],["🛠","Basic O&M","Basic residential diagnostics"]]),
  edge:()=>generic("edge",[["🎛",zh?"本地控制":"Local Control",zh?"参数与运行模式本地下发":"Local parameter and mode delivery"],["🧠",zh?"能源策略":"Energy Strategy",zh?"自发自用、备电和峰谷套利":"Self-consumption, backup and tariff arbitrage"],["⚡",zh?"智能调度":"Smart Dispatch",zh?"每个电站仅一台设备参与调度":"One dispatch participant per plant"],["📴",zh?"离线行为":"Offline Behavior",zh?"断网时策略保持和降级":"Strategy persistence and fallback"],["↻",zh?"恢复机制":"Recovery",zh?"重连、状态恢复和异常兜底":"Reconnect, state recovery and exception handling"],["◇",zh?"设备兼容":"Compatibility",zh?"型号、固件和参数差异":"Model, firmware and parameter differences"]]),
  capability:()=>generic("capability",[["📊","Monitoring Capability","Realtime, history and statistics"],["🎛","Control Capability","Parameters, modes and schedules"],["⚠","Alarm Capability","Alarm schema and troubleshooting"],["⬆","OTA Capability","Firmware eligibility and rollout"],["⚡","Energy Capability","Energy flow and optimization"],["🔐","Permission Capability","Role and access control"]]),
  schema:()=>generic("schema",[["🧩","Device Type","Parent-child type model"],["🧾","Device Model","Model and firmware metadata"],["📊","Telemetry Schema","Realtime and historical points"],["🎛","Parameter Schema","Readable and writable parameters"],["⚠","Alarm Schema","Codes, levels, causes and actions"],["✦","Capability Mapping","Schema-to-capability relationship"]]),
  enablement:()=>generic("enablement",[["1","Initiation","Business goal and target regions"],["2","Capability Model","Device type, schema and capability"],["3","Platform Enablement","Cloud, account and data services"],["4","App / Web","UI, interaction and feature exposure"],["5","Validation","Firmware, test and region validation"],["6","Launch","Gradual rollout, metrics and checklist"]]),
  governance:()=>generic("governance",[["👤","Residential PM","Portfolio, priority and outcomes"],["📘","Product Specialist","Requirement detail and delivery support"],["☁","Platform PM","Shared platform capability"],["◇","Device PM","Device model and enablement"],["🧪","QA","Quality strategy and validation"],["🌍","Regional Teams","Market needs and launch validation"]]),
  metrics:()=>generic("metrics",[["⇄","Migration","New MAU ratio · Success · Remaining users"],["✓","Stability","Crash · ANR · API failure · Offline"],["↗","Core Flows","Login · Plant · Binding · Control · OTA"],["◇","Compatibility","Enablement cycle · Firmware coverage"],["▥","Business","MAU · Energy adoption · ESS usage"],["💬","Experience","Complaints · Satisfaction · Task success"]]),
  reference:referencePage,
  faq:()=>generic("faq",[["?","Why product-line centric?","To manage portfolio, lifecycle, migration and ownership consistently."],["?","Who owns ShineTools?","Service & Operations product line."],["?","How are legacy products handled?","Maintenance first; exceptions require review."],["?","How is UI generated?","By device schema and capability mapping."],["?","What is migration success?","Migrated, verified and reversible when required."],["?","How are new devices enabled?","Capability, schema, platform, UI, test and launch gates."]])
 };
 document.getElementById("content").innerHTML=(views[current]||views.home)(); renderNav(); window.scrollTo(0,0);
}
function go(page){current=page;location.hash="#/"+page;renderPage();document.getElementById("sidebar").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function setPortfolioFilter(f){portfolioFilter=f;renderPage()}
function setDeviceTypeFilter(v){deviceTypeFilter=v;renderPage()}
function setDeviceQuery(v){deviceQuery=v;renderPage();setTimeout(()=>{const el=document.querySelector(".device-toolbar .matrix-search");if(el){el.focus();el.setSelectionRange(v.length,v.length)}},0)}
function openDevice(id){go("device-"+id)}
function setPrdFilter(v){prdFilter=v;renderPage()}
function setCompatibilityQuery(v){compatibilityQuery=v;renderPage();setTimeout(()=>{const el=document.querySelector(".matrix-search");if(el){el.focus();el.setSelectionRange(v.length,v.length)}},0)}
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
window.go=go;window.openDevice=openDevice;window.setDeviceTypeFilter=setDeviceTypeFilter;window.setDeviceQuery=setDeviceQuery;window.setPortfolioFilter=setPortfolioFilter;window.setPrdFilter=setPrdFilter;window.setCompatibilityQuery=setCompatibilityQuery;init();
window.onhashchange=()=>{current=location.hash.replace("#/","")||"home";renderPage()};
