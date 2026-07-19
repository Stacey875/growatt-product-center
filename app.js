
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
 ["devices","Device Center","SPM WIT SPH MINA MIN MOD"],["capability","Capability Center","Monitoring Control Alarm OTA Energy"],
 ["schema","Device Schema","Telemetry Parameter Alarm Control"],["enablement","New Device Enablement","Capability Schema Test Region Launch"],
 ["metrics","Metrics Center","Migration Stability Core Flow Compatibility Business"],["updates","GPC V1.4","Leadership Preview release notes"],["governance","Product Governance","RACI ownership responsibility"],["reference","Product Handbook PRD Release Notes","Handbook PRD compatibility matrix process"],["residential","Users and Roles","End User Dealer Installer Product R&D Regional Team"]
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
  <div id="nav"></div><div class="sidebar-footer">V1.4 · Product Knowledge MVP<br>Residential-first foundation</div>
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
 return `<div class="breadcrumb">Growatt Product Center / ${L[lang][id]}</div><div class="page-head"><div><h1>${L[lang][id]}</h1><p>${descriptions[id][lang==="zh"?0:1]}</p></div>${badge("V1.4")}</div>`;
}
function homePage(){
 const zh=lang==="zh";
 const docRows=recentDocs.map(d=>`<div class="doc-row"><span class="doc-type">${d.type}</span><div><div class="list-title">${d.title}</div><div class="list-sub">${d.owner} · ${d.updated}</div></div>${badge(d.status)}</div>`).join("");
 return `<section class="hero hero-v14"><div class="hero-kicker">● ${zh?"V1.4 产品知识 MVP":"V1.4 Product Knowledge MVP"}</div>
  <h1>${zh?"Growatt Product Center":"Growatt Product Center"}</h1>
  <p>${zh?"面向户用数字产品线的统一知识入口：连接产品组合、用户场景、设备能力、迁移治理、版本状态与真实产品资料。":"The unified knowledge entry for Residential Digital Products, connecting portfolio, user scenarios, device capabilities, migration governance, release status, and product documentation."}</p>
  <div class="hero-actions"><button class="btn btn-primary" onclick="go('residential')">${L[lang].openResidential}</button><button class="btn btn-ghost" onclick="go('reference')">${zh?"查看产品资料":"Browse product assets"}</button></div>
  <div class="hero-status"><span><b>Current focus</b>${zh?"新版 ShinePhone 与设备能力模型":"New ShinePhone & device capability model"}</span><span><b>Latest update</b>2026-07-19</span><span><b>Owner</b>Residential Product Lead</span></div></section>
 <section class="section"><div class="section-head"><div><h2>${zh?"产品运行概览":"Product Operating Overview"}</h2><p>${zh?"用于汇报产品线建设状态，不代表线上生产数据。":"Leadership view of product-line readiness; not production analytics."}</p></div><span class="release-chip">V1.4 MVP</span></div>
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
 return `${head("devices")}<section class="card"><div class="section-head"><div><h2>${zh?"设备兼容矩阵":"Device Compatibility Matrix"}</h2><p>${zh?"第一阶段展示模型、优先级、能力和固件范围。":"Phase one covers model, priority, capability and firmware range."}</p></div></div>
 <div class="table-wrap"><table><thead><tr><th>Model</th><th>Type</th><th>Status</th><th>Priority</th><th>Capabilities</th><th>Firmware</th></tr></thead><tbody>
 ${devices.map(d=>`<tr class="clickable"><td><b>${d.model}</b></td><td>${d.type}</td><td>${badge(d.status)}</td><td>${badge(d.priority)}</td><td>${d.cap}</td><td>${d.fw}</td></tr>`).join("")}
 </tbody></table></div></section>
 <section class="section grid grid-4">${quick("📊","Monitoring",zh?"实时数据、历史和统计":"Realtime, history and statistics","capability")}${quick("🎛","Control",zh?"参数、模式和计划":"Parameters, modes and schedules","capability")}${quick("⚠","Alarm",zh?"告警模型和排查":"Alarm model and troubleshooting","schema")}${quick("⬆","OTA",zh?"固件资格和灰度":"Firmware eligibility and rollout","enablement")}</section>`;
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

function referencePage(){
 const zh=lang==="zh";
 return `${head("reference")}<div class="grid grid-4">${metric("1",zh?"产品 Handbook":"Product Handbook","Draft",65)}${metric("1",zh?"已批准 PRD":"Approved PRD","Approved",100)}${metric("1",zh?"设备矩阵":"Device Matrix","In Review",70)}${metric("1",zh?"接入流程":"Enablement Process","Draft",60)}</div><section class="section card"><div class="section-head"><div><h2>${zh?"知识资产目录":"Knowledge Asset Catalog"}</h2><p>${zh?"V1.4 先建立资产类型、Owner、状态与更新时间，后续逐步导入正文。":"V1.4 establishes type, owner, status and freshness before importing full content."}</p></div></div><div class="asset-table"><div class="asset-head"><span>Type</span><span>Title</span><span>Owner</span><span>Updated</span><span>Status</span></div>${recentDocs.map(d=>`<div class="asset-row"><span class="doc-type">${d.type}</span><b>${d.title}</b><span>${d.owner}</span><span>${d.updated}</span>${badge(d.status)}</div>`).join("")}</div></section><section class="section grid grid-3">${quick("📘",zh?"产品 Handbook":"Product Handbook",zh?"产品定位、架构、用户、功能与开发指引":"Positioning, architecture, users, features and development guidance","shinephone")}${quick("📄","PRD",zh?"需求背景、方案、边界、验收与决策记录":"Context, solution, boundary, acceptance and decisions","updates")}${quick("🧩",zh?"兼容矩阵":"Compatibility Matrix",zh?"平台、机型、功能、参数与固件支持情况":"Platform, model, feature, parameter and firmware support","devices")}</section>`;
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
 return `${head("roadmap")}<div class="card timeline">${timeline("2026 Q3",zh?"V1.4 产品知识 MVP":"V1.4 Product Knowledge MVP",zh?"首页、导航、产品组合、平台和设备中心。":"Home, navigation, portfolio, platform and device center.")}${timeline("2026 Q4",zh?"真实资料导入":"Production Content Integration",zh?"Handbook、设备矩阵、兼容清单和 Release Notes。":"Handbook, device matrix, compatibility and release notes.")}${timeline("2027 Q1","AI Product Assistant",zh?"自然语言搜索、设备对比和文档问答。":"Natural language search, device comparison and document Q&A.")}</div>`;
}
function updatesPage(){return `${head("updates")}<div class="card timeline">${timeline("2026-07-19","GPC V1.4","Product knowledge MVP: operating dashboard, user model, lifecycle, platform data flow and asset catalog.")}${timeline("2026-07-18","Login Region Experience","Added region consistency guidance and no-plant troubleshooting.")}${timeline("2026-07-17","Residential IA V3","Reorganized around current, legacy, migration, edge EMS and governance.")}</div>`;}
function renderPage(){
 const zh=lang==="zh";
 const views={
  home:homePage,portfolio:portfolioPage,residential:residentialPage,platform:platformPage,devices:devicesPage,migration:migrationPage,roadmap:roadmapPage,updates:updatesPage,
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
