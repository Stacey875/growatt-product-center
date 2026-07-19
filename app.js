
const data = {
  zh: {
    navGroups: [
      {title:"总览", items:[
        ["home","⌂","首页"],["portfolio","▦","产品组合"],["roadmap","↗","路线图"],["updates","◷","最近更新"]
      ]},
      {title:"户用数字产品", items:[
        ["residential","⌂","产品线概览"],["shinephone","◉","新版 ShinePhone"],["webportal","▤","户用 Web Portal"],["legacy","◌","旧版产品"],["migration","⇄","迁移中心"],["dealer","♙","经销商与安装商"],["edge","⚡","户用边缘能源管理"]
      ]},
      {title:"平台与设备", items:[
        ["platform","☁","平台架构"],["device","◇","设备中心"],["capability","✦","能力中心"],["schema","⌘","Device Schema"],["enablement","+","新品兼容中心"]
      ]},
      {title:"治理与参考", items:[
        ["governance","✓","产品治理"],["metrics","▥","指标中心"],["reference","≡","参考资料"],["faq","?","FAQ"]
      ]}
    ],
    titles: {
      home:"Growatt Product Center", portfolio:"产品组合", roadmap:"产品路线图", updates:"最近更新",
      residential:"户用数字产品线", shinephone:"新版 ShinePhone", webportal:"户用 Web Portal",
      legacy:"旧版产品管理", migration:"迁移中心", dealer:"经销商与安装商",
      edge:"户用边缘能源管理", platform:"平台架构", device:"设备中心",
      capability:"能力中心", schema:"Device Schema", enablement:"新品兼容中心",
      governance:"产品治理", metrics:"指标中心", reference:"参考资料", faq:"常见问题"
    }
  },
  en: {
    navGroups: [
      {title:"Overview", items:[
        ["home","⌂","Home"],["portfolio","▦","Product Portfolio"],["roadmap","↗","Roadmap"],["updates","◷","Latest Updates"]
      ]},
      {title:"Residential Digital Products", items:[
        ["residential","⌂","Product Line Overview"],["shinephone","◉","New ShinePhone"],["webportal","▤","Residential Web Portal"],["legacy","◌","Legacy Products"],["migration","⇄","Migration Center"],["dealer","♙","Dealer & Installer"],["edge","⚡","Home Edge EMS"]
      ]},
      {title:"Platform & Device", items:[
        ["platform","☁","Platform Architecture"],["device","◇","Device Center"],["capability","✦","Capability Center"],["schema","⌘","Device Schema"],["enablement","+","New Device Enablement"]
      ]},
      {title:"Governance & Reference", items:[
        ["governance","✓","Product Governance"],["metrics","▥","Metrics Center"],["reference","≡","Reference"],["faq","?","FAQ"]
      ]}
    ],
    titles: {
      home:"Growatt Product Center", portfolio:"Product Portfolio", roadmap:"Product Roadmap", updates:"Latest Updates",
      residential:"Residential Digital Product Line", shinephone:"New ShinePhone", webportal:"Residential Web Portal",
      legacy:"Legacy Product Management", migration:"Migration Center", dealer:"Dealer & Installer",
      edge:"Home Edge Energy Management", platform:"Platform Architecture", device:"Device Center",
      capability:"Capability Center", schema:"Device Schema", enablement:"New Device Enablement",
      governance:"Product Governance", metrics:"Metrics Center", reference:"Reference", faq:"FAQ"
    }
  }
};

let lang = localStorage.getItem("gpc-lang") || "zh";
let current = location.hash.replace("#/","") || "home";

const pageMeta = {
  home:["统一承载产品知识、产品组合、设备能力、迁移治理与路线图。","A unified workspace for product knowledge, portfolio, device capability, migration governance, and roadmaps."],
  portfolio:["从产品线视角管理当前产品、旧版产品与平台能力。","Manage current products, legacy products, and platform capabilities from a product-line perspective."],
  residential:["户用 App、Web、经销商能力与边缘能源管理的统一产品线入口。","The unified entry for residential App, Web, dealer capabilities, and edge energy management."],
  shinephone:["新版户用 App 的产品定位、核心场景、设备兼容与版本状态。","Product positioning, core scenarios, compatibility, and release status for the new residential App."],
  webportal:["面向户用终端用户的 Web 门户，与 App 共享核心能力。","Web portal for residential end users, sharing core capabilities with the App."],
  legacy:["维护优先，不进行常规独立功能建设；例外需求需经过产品评审。","Maintenance-first. No routine standalone feature development; exceptions require product review."],
  migration:["管理账号、电站、设备、历史数据与经销商关系从旧版向新版迁移。","Manage migration of accounts, plants, devices, historical data, and dealer relationships."],
  dealer:["覆盖客户、电站、安装、权限与基础运维协作，不包含 ShineTools。","Covers customer, plant, installation, permission, and basic O&M collaboration; excludes ShineTools."],
  edge:["连接云平台与家庭设备，承载本地控制、能源策略、智能调度与离线恢复。","Connects cloud and home devices for local control, energy strategy, smart dispatch, and offline recovery."],
  platform:["统一的 Cloud → Plant → Collector → Device 产品与数据层级。","Unified Cloud → Plant → Collector → Device product and data hierarchy."],
  device:["按设备型号查看能力、参数、告警、OTA 与兼容范围。","Browse capabilities, parameters, alarms, OTA, and compatibility by device model."],
  capability:["定义设备和平台可复用能力，并支撑 App/Web 动态展示。","Defines reusable device and platform capabilities that drive dynamic App/Web experiences."],
  schema:["以结构化模型描述设备数据、参数、控制、告警与元数据。","Structured models for device data, parameters, controls, alarms, and metadata."],
  enablement:["从立项到上线的新品兼容全流程与检查清单。","End-to-end process and checklist from initiation to new device launch."],
  governance:["明确产品负责人、产品专家、平台、设备、研发、测试与区域团队职责。","Clarifies responsibilities across product leads, specialists, platform, device, engineering, QA, and regions."],
  metrics:["围绕迁移、稳定性、核心流程、兼容性与业务价值建立指标体系。","Metrics across migration, stability, core flows, compatibility, and business value."],
  roadmap:["统一呈现产品线阶段目标、版本节奏与关键依赖。","A unified view of product-line goals, release cadence, and critical dependencies."],
  updates:["记录产品、平台、设备与文档的近期变化。","Tracks recent changes across products, platform, devices, and documentation."],
  reference:["集中管理 Handbook、PRD、规范、流程图、发布说明与 FAQ。","Centralized handbook, PRD, standards, flows, release notes, and FAQ."],
  faq:["常见产品、平台、设备与治理问题的统一入口。","Unified answers for common product, platform, device, and governance questions."]
};

const products = [
  ["New ShinePhone","Current","Residential","App"],
  ["Residential Web Portal","Current","Residential","Web"],
  ["Legacy ShinePhone","Maintenance","Residential","App"],
  ["Legacy Residential Web","Maintenance","Residential","Web"],
  ["Dealer Capabilities","Current","Residential","Web/App"],
  ["Home Edge EMS","Current","Residential","Edge"]
];

const devices = [
  ["SPM","Storage / Energy Management","Active","High"],
  ["WIT","Hybrid Inverter","Active","High"],
  ["SPH","Hybrid Inverter","Active","High"],
  ["MINA","Inverter","Planning","Medium"],
  ["MIN","Inverter","Active","Medium"],
  ["MOD","Inverter","Active","Medium"],
  ["EV Charger","Charging","Active","Medium"],
  ["Meter","Measurement","Active","High"]
];

const searchIndex = [
  ["home","Growatt Product Center","产品知识平台 / Product knowledge platform"],
  ["residential","户用数字产品线","Residential Digital Product Line"],
  ["shinephone","新版 ShinePhone","New ShinePhone"],
  ["webportal","户用 Web Portal","Residential Web Portal"],
  ["migration","迁移中心","Migration Center"],
  ["edge","户用边缘能源管理","Home Edge EMS"],
  ["device","设备中心","SPM WIT SPH MINA MIN MOD"],
  ["capability","能力中心","Capability Center"],
  ["schema","Device Schema","设备模型 参数 告警 控制"],
  ["enablement","新品兼容中心","New Device Enablement"],
  ["metrics","指标中心","Migration Stability Core Flow Compatibility Business"],
  ["governance","产品治理","RACI responsibilities"]
];

function badgeClass(status){
  if(["Current","Active","Ready","Verified"].includes(status)) return "green";
  if(["Planning","In Migration"].includes(status)) return "blue";
  if(["Maintenance","Blocked"].includes(status)) return "warn";
  return "gray";
}

function shell(){
  return `
  <div class="app">
    <div class="overlay" id="overlay"></div>
    <aside class="sidebar" id="sidebar">
      <div class="brand">
        <div class="brand-mark">G</div>
        <div><div class="brand-title">Growatt Product Center</div><div class="brand-sub">Product Knowledge Platform</div></div>
      </div>
      <div id="nav"></div>
      <div class="sidebar-footer">V1.0 · Residential-first</div>
    </aside>
    <main class="main">
      <header class="topbar">
        <button class="mobile-menu" id="mobileMenu">☰</button>
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input id="search" class="search" placeholder="${lang==="zh"?"搜索产品、设备、能力或文档":"Search products, devices, capabilities or docs"}" />
          <span class="kbd">/</span>
          <div id="searchResults" class="search-results"></div>
        </div>
        <div class="top-actions">
          <button class="icon-btn" title="Notifications">◷</button>
          <button class="lang-btn" id="langBtn">${lang==="zh"?"EN":"中文"}</button>
        </div>
      </header>
      <div class="content" id="content"></div>
    </main>
  </div>`;
}

function renderNav(){
  const d=data[lang];
  document.getElementById("nav").innerHTML=d.navGroups.map(g=>`
    <div class="nav-group">
      <div class="nav-title">${g.title}</div>
      ${g.items.map(i=>`<div class="nav-item ${current===i[0]?"active":""}" data-page="${i[0]}"><span class="nav-icon">${i[1]}</span><span>${i[2]}</span></div>`).join("")}
    </div>`).join("");
  document.querySelectorAll(".nav-item").forEach(el=>el.onclick=()=>go(el.dataset.page));
}

function head(title, desc){
  return `<div class="breadcrumb">Growatt Product Center / ${title}</div>
  <div class="page-head"><div><h1>${title}</h1><p>${desc}</p></div><span class="badge green">V1.0</span></div>`;
}

function homePage(){
  const zh=lang==="zh";
  return `
  <section class="hero">
    <h1>${zh?"Growatt 产品知识与治理中心":"Growatt Product Knowledge & Governance Center"}</h1>
    <p>${zh?"统一沉淀产品组合、业务场景、设备能力、Schema、迁移治理、指标与路线图，为产品、研发、测试与区域团队提供一致的信息入口。":"A unified source of truth for product portfolio, business scenarios, device capabilities, schemas, migration governance, metrics, and roadmaps."}</p>
    <div class="hero-actions">
      <button class="btn btn-primary" onclick="go('residential')">${zh?"进入户用数字产品线":"Open Residential Product Line"}</button>
      <button class="btn btn-ghost" onclick="go('device')">${zh?"查看设备中心":"Browse Device Center"}</button>
    </div>
  </section>
  <section class="section">
    <div class="section-head"><div><h2>${zh?"产品健康概览":"Product Health Overview"}</h2><p>${zh?"当前为结构演示数据，后续替换为真实指标。":"Illustrative metrics to be replaced with production data."}</p></div></div>
    <div class="grid grid-4">
      ${metric("68%",zh?"新版用户占比":"New App User Share","+8.4%")}
      ${metric("97.8%",zh?"控制成功率":"Control Success","+0.6%")}
      ${metric("24",zh?"已兼容设备型号":"Enabled Device Models","+3")}
      ${metric("82%",zh?"迁移完成率":"Migration Completion","+12%")}
    </div>
  </section>
  <section class="section">
    <div class="section-head"><div><h2>${zh?"快速入口":"Quick Access"}</h2><p>${zh?"按产品线、平台与设备能力快速进入。":"Fast entry by product line, platform, and device capability."}</p></div></div>
    <div class="grid grid-4">
      ${quick("🏡",zh?"户用数字产品":"Residential Products",zh?"App、Web、经销商与边缘能源管理":"App, Web, dealer, and edge EMS","residential")}
      ${quick("☁",zh?"平台架构":"Platform",zh?"Cloud → Plant → Collector → Device":"Cloud → Plant → Collector → Device","platform")}
      ${quick("◇",zh?"设备中心":"Device Center",zh?"机型、能力、参数、告警与 OTA":"Models, capabilities, parameters, alarms, OTA","device")}
      ${quick("⇄",zh?"迁移中心":"Migration Center",zh?"旧版向新版迁移与退场治理":"Legacy migration and retirement governance","migration")}
    </div>
  </section>
  <section class="section grid grid-2">
    <div class="card">
      <div class="section-head"><div><h2>${zh?"最近更新":"Latest Updates"}</h2></div><button class="icon-btn" onclick="go('updates')">${zh?"查看全部":"View all"}</button></div>
      <div class="timeline">
        ${timeline("2026-07-18",zh?"登录地区异常体验优化":"Login region experience optimization",zh?"新增无电站排查入口与地区一致性提示。":"Added troubleshooting entry and region consistency guidance.")}
        ${timeline("2026-07-17",zh?"户用产品线信息架构升级":"Residential IA upgraded",zh?"按 Current / Legacy / Migration 重构产品结构。":"Restructured by Current / Legacy / Migration.")}
        ${timeline("2026-07-16",zh?"新品兼容流程补充":"Device enablement process updated",zh?"补充 Capability、Schema、测试与区域验证。":"Added capability, schema, test, and regional validation steps.")}
      </div>
    </div>
    <div class="card">
      <div class="section-head"><div><h2>${zh?"产品组合状态":"Portfolio Status"}</h2></div><button class="icon-btn" onclick="go('portfolio')">${zh?"查看组合":"View portfolio"}</button></div>
      <div class="list">
        ${products.slice(0,4).map(p=>`<div class="list-row"><div><div class="list-title">${p[0]}</div><div class="list-sub">${p[2]} · ${p[3]}</div></div><span>${p[2]}</span><span>${p[3]}</span><span class="badge ${badgeClass(p[1])}">${p[1]}</span></div>`).join("")}
      </div>
    </div>
  </section>`;
}

function metric(v,l,d){return `<div class="card"><div class="metric">${v}</div><div class="metric-label">${l}</div><div style="margin-top:12px"><span class="badge green">${d}</span></div></div>`}
function quick(icon,title,desc,page){return `<div class="card clickable" onclick="go('${page}')"><div class="card-icon">${icon}</div><h3>${title}</h3><p>${desc}</p></div>`}
function timeline(date,title,desc){return `<div class="timeline-item"><div class="timeline-title">${title}</div><div class="timeline-meta">${date}</div><div style="color:var(--muted);font-size:14px;line-height:1.55">${desc}</div></div>`}

function portfolioPage(){
  return `${head(data[lang].titles.portfolio,pageMeta.portfolio[lang==="zh"?0:1])}
  <div class="grid grid-3">
    ${quick("📱","New ShinePhone","Current · Residential App","shinephone")}
    ${quick("🌐","Residential Web Portal","Current · Residential Web","webportal")}
    ${quick("🧭","Dealer Capabilities","Current · Dealer & Installer","dealer")}
    ${quick("⚡","Home Edge EMS","Current · Edge Energy Management","edge")}
    ${quick("◌","Legacy ShinePhone","Maintenance Only","legacy")}
    ${quick("◌","Legacy Residential Web","Maintenance Only","legacy")}
  </div>
  <section class="section card">
    <div class="section-head"><div><h2>${lang==="zh"?"产品组合清单":"Portfolio Inventory"}</h2></div></div>
    ${productTable()}
  </section>`;
}
function productTable(){return `<div class="table-wrap"><table><thead><tr><th>Product</th><th>Status</th><th>Line</th><th>Channel</th></tr></thead><tbody>${products.map(p=>`<tr><td><b>${p[0]}</b></td><td><span class="badge ${badgeClass(p[1])}">${p[1]}</span></td><td>${p[2]}</td><td>${p[3]}</td></tr>`).join("")}</tbody></table></div>`}

function residentialPage(){
  const zh=lang==="zh";
  return `${head(data[lang].titles.residential,pageMeta.residential[zh?0:1])}
  <div class="grid grid-4">
    ${metric("6",zh?"核心产品模块":"Core Product Modules","Current")}
    ${metric("14",zh?"核心业务场景":"Core Business Scenarios","Mapped")}
    ${metric("24",zh?"兼容设备型号":"Enabled Device Models","Growing")}
    ${metric("5",zh?"指标分组":"Metric Groups","Defined")}
  </div>
  <section class="section grid grid-2">
    <div class="card"><h3>${zh?"产品线职责":"Product Line Ownership"}</h3><p>${zh?"负责新版/旧版 ShinePhone、户用 Web Portal、经销商能力、户用边缘 EMS，以及户用电站、设备与能源场景。":"Owns new/legacy ShinePhone, residential Web Portal, dealer capabilities, home edge EMS, and residential plant/device/energy scenarios."}</p></div>
    <div class="card"><h3>${zh?"明确不包含":"Explicitly Excluded"}</h3><p>${zh?"ShineTools 属于服务与运维产品线，不纳入户用数字产品线职责范围。":"ShineTools belongs to the Service & Operations product line and is outside this product line scope."}</p></div>
  </section>
  <section class="section">
    <div class="section-head"><div><h2>${zh?"产品线地图":"Product Line Map"}</h2></div></div>
    <div class="grid grid-3">
      ${quick("📱",zh?"用户应用":"User Applications","New + Legacy App / Web","portfolio")}
      ${quick("♙",zh?"经销商与安装商":"Dealer & Installer",zh?"客户、电站、安装与权限":"Customer, plant, installation, permissions","dealer")}
      ${quick("⚡",zh?"户用边缘 EMS":"Home Edge EMS",zh?"本地控制、策略与调度":"Local control, strategy, dispatch","edge")}
      ${quick("⇄",zh?"迁移中心":"Migration Center",zh?"迁移、验证、回滚与退场":"Migration, verification, rollback, retirement","migration")}
      ${quick("＋",zh?"新品兼容":"New Device Enablement",zh?"Capability、Schema、测试与上线":"Capability, schema, test, launch","enablement")}
      ${quick("▥",zh?"指标中心":"Metrics Center",zh?"迁移、稳定性、流程、兼容与业务":"Migration, stability, flows, compatibility, business","metrics")}
    </div>
  </section>`;
}

function standardPage(id, blocks){
  return `${head(data[lang].titles[id],pageMeta[id][lang==="zh"?0:1])}${blocks}`;
}

function shinePage(){
  const zh=lang==="zh";
  return standardPage("shinephone",`
  <div class="grid grid-3">
    ${quick("👤",zh?"面向用户":"Target Users",zh?"终端用户、经销商与安装商":"End users, dealers, installers","shinephone")}
    ${quick("⚙",zh?"核心能力":"Core Capabilities",zh?"监控、控制、能量、告警、OTA":"Monitoring, control, energy, alarms, OTA","capability")}
    ${quick("◇",zh?"设备驱动":"Device-driven UI",zh?"根据设备能力动态生成页面与参数":"Dynamic UI based on device capability","schema")}
  </div>
  <section class="section card">
    <h3>${zh?"核心业务场景":"Core Business Scenarios"}</h3>
    <div class="grid grid-4" style="margin-top:16px">
      ${["登录与注册","电站创建","设备绑定","实时监控","远程控制","储能管理","能量分析","告警与 OTA"].map((x,i)=>quick(["🔐","🏠","🔗","📈","🎛","🔋","⚡","⚠"][i],zh?x:["Login & Registration","Plant Creation","Device Binding","Monitoring","Remote Control","ESS","Energy Analysis","Alarm & OTA"][i],"","shinephone")).join("")}
    </div>
  </section>`);
}

function migrationPage(){
  const zh=lang==="zh";
  const states=["Not Started","Ready","In Migration","Blocked","Migrated","Verified","Rollback"];
  return standardPage("migration",`
  <div class="grid grid-4">
    ${metric("82%",zh?"整体迁移完成率":"Overall Migration","In progress")}
    ${metric("91%",zh?"账号迁移成功率":"Account Migration","Stable")}
    ${metric("76%",zh?"设备迁移完成率":"Device Migration","Tracking")}
    ${metric("12",zh?"当前阻塞项":"Open Blockers","Review")}
  </div>
  <section class="section card">
    <h3>${zh?"迁移状态模型":"Migration State Model"}</h3>
    <div class="arch" style="margin-top:18px">${states.map((s,i)=>`<div class="arch-box"><span class="badge ${badgeClass(s)}">${s}</span></div>${i<states.length-1?'<span class="arch-arrow">→</span>':''}`).join("")}</div>
  </section>
  <section class="section grid grid-2">
    ${quick("👤",zh?"账号迁移":"Account Migration",zh?"账号、地区、权限与身份":"Account, region, permissions, identity","migration")}
    ${quick("🏠",zh?"电站迁移":"Plant Migration",zh?"电站关系、历史数据与分享关系":"Plant relation, history, sharing","migration")}
    ${quick("◇",zh?"设备迁移":"Device Migration",zh?"采集器、设备、能力与固件兼容":"Collector, device, capability, firmware","migration")}
    ${quick("♙",zh?"经销商迁移":"Dealer Migration",zh?"组织、客户、电站与角色关系":"Organization, customers, plants, roles","migration")}
  </section>`);
}

function platformPage(){
  const zh=lang==="zh";
  return standardPage("platform",`
  <section class="card">
    <h3>${zh?"统一产品与数据层级":"Unified Product & Data Hierarchy"}</h3>
    <div class="arch" style="margin-top:20px">
      <div class="arch-box">☁ Cloud</div><span class="arch-arrow">→</span>
      <div class="arch-box">🏠 Plant</div><span class="arch-arrow">→</span>
      <div class="arch-box">📡 Collector</div><span class="arch-arrow">→</span>
      <div class="arch-box">◇ Device</div>
    </div>
  </section>
  <section class="section grid grid-3">
    ${quick("☁",zh?"云平台":"Cloud Platform",zh?"账号、区域、数据与服务编排":"Account, region, data, service orchestration","platform")}
    ${quick("🏠",zh?"电站":"Plant",zh?"用户能源资产与业务场景容器":"User energy asset and scenario container","residential")}
    ${quick("📡",zh?"采集器":"Collector",zh?"设备接入、通信与参数下发":"Device access, communication, parameter delivery","device")}
    ${quick("◇",zh?"设备":"Device",zh?"逆变器、储能、电表、充电桩等":"Inverter, ESS, meter, EV charger, etc.","device")}
    ${quick("✦","Capability",zh?"可复用设备与平台能力":"Reusable device and platform abilities","capability")}
    ${quick("⌘","Schema",zh?"结构化数据、参数、控制与告警模型":"Structured data, parameter, control, alarm models","schema")}
  </section>`);
}

function devicePage(){
  return standardPage("device",`
  <section class="card">
    <div class="section-head"><div><h2>${lang==="zh"?"设备兼容矩阵":"Device Compatibility Matrix"}</h2><p>${lang==="zh"?"当前为示例数据结构。":"Illustrative data structure."}</p></div></div>
    <div class="table-wrap"><table><thead><tr><th>Model</th><th>Type</th><th>Status</th><th>Priority</th></tr></thead><tbody>${devices.map(d=>`<tr><td><b>${d[0]}</b></td><td>${d[1]}</td><td><span class="badge ${badgeClass(d[2])}">${d[2]}</span></td><td>${d[3]}</td></tr>`).join("")}</tbody></table></div>
  </section>
  <section class="section grid grid-4">
    ${quick("📊","Monitoring","Realtime data & history","device")}
    ${quick("🎛","Control","Parameters & operating modes","device")}
    ${quick("⚠","Alarm","Alarm model & troubleshooting","device")}
    ${quick("⬆","OTA","Firmware eligibility & rollout","device")}
  </section>`);
}

function edgePage(){
  const zh=lang==="zh";
  return standardPage("edge",`
  <section class="card">
    <h3>${zh?"云边端架构":"Cloud–Edge–Device Architecture"}</h3>
    <div class="arch" style="margin-top:20px">
      <div class="arch-box">User · App / Web</div><span class="arch-arrow">↓</span>
      <div class="arch-box">Cloud</div><span class="arch-arrow">↓</span>
      <div class="arch-box">Edge Controller</div><span class="arch-arrow">↓</span>
      <div class="arch-box">Inverter / ESS / Meter / EV Charger / Smart Loads</div>
    </div>
  </section>
  <section class="section grid grid-3">
    ${quick("🎛",zh?"本地控制":"Local Control",zh?"参数与运行模式本地下发":"Local parameter and mode delivery","edge")}
    ${quick("🧠",zh?"能源策略":"Energy Strategy",zh?"自发自用、备电、峰谷套利":"Self-consumption, backup, tariff arbitrage","edge")}
    ${quick("⚡",zh?"智能调度":"Smart Dispatch",zh?"每个电站仅一台设备参与智能调度":"One dispatch participant per plant","edge")}
    ${quick("📴",zh?"离线行为":"Offline Behavior",zh?"断网时的策略保持与降级":"Strategy persistence and fallback","edge")}
    ${quick("↻",zh?"恢复机制":"Recovery",zh?"重连、状态恢复与异常兜底":"Reconnect, state recovery, exception handling","edge")}
    ${quick("◇",zh?"设备兼容":"Device Compatibility",zh?"型号、固件、Capability 与参数差异":"Model, firmware, capability, parameter differences","device")}
  </section>`);
}

function genericGrid(id, cards){
  return standardPage(id,`<div class="grid grid-3">${cards.map(c=>quick(c[0],c[1],c[2],c[3]||id)).join("")}</div>`);
}

function roadmapPage(){
  const zh=lang==="zh";
  return standardPage("roadmap",`
  <div class="timeline card">
    ${timeline("2026 Q3",zh?"GPC V1.0 基础平台":"GPC V1.0 Foundation",zh?"首页、产品组合、户用数字产品、迁移、设备与治理。":"Home, portfolio, residential products, migration, device, governance.")}
    ${timeline("2026 Q4",zh?"真实内容与矩阵接入":"Content & Matrix Integration",zh?"导入 Handbook、设备能力矩阵、兼容清单与发布说明。":"Import handbook, capability matrix, compatibility, and release notes.")}
    ${timeline("2027 Q1",zh?"AI Product Assistant":"AI Product Assistant",zh?"支持自然语言搜索、设备对比与文档问答。":"Natural language search, device comparison, and document Q&A.")}
  </div>`);
}

function updatesPage(){ return standardPage("updates",`<div class="card timeline">
  ${timeline("2026-07-18","Login Region Experience","Added region consistency guidance and no-plant troubleshooting.")}
  ${timeline("2026-07-17","Residential IA V3","Reorganized around current, legacy, migration, edge EMS, and governance.")}
  ${timeline("2026-07-16","Device Enablement","Added schema, capability, test, and region validation checkpoints.")}
  ${timeline("2026-07-15","Legacy Governance","Established maintenance-first policy and exception review.")}
</div>`);}

function metricsPage(){
  const zh=lang==="zh";
  const groups=[
    ["⇄",zh?"迁移指标":"Migration","New MAU ratio · Migration success · Remaining users"],
    ["✓",zh?"稳定性":"Stability","Crash · ANR · API failure · Device offline"],
    ["↗",zh?"核心流程":"Core Flows","Login · Plant creation · Binding · Control · OTA"],
    ["◇",zh?"兼容性":"Compatibility","Enablement cycle · Firmware coverage · Matrix completeness"],
    ["▥",zh?"业务指标":"Business","MAU · Energy adoption · ESS usage · Satisfaction"]
  ];
  return genericGrid("metrics",groups);
}

function renderPage(){
  const views={
    home:homePage,
    portfolio:portfolioPage,
    residential:residentialPage,
    shinephone:shinePage,
    webportal:()=>genericGrid("webportal",[["📈","Monitoring","Realtime and historical data"],["🎛","Control","Shared control capabilities with App"],["⚡","Energy","Energy flow and analysis"],["⚠","Alarm","Alarm overview and handling"],["👤","Account","User, plant, sharing"],["◇","Device","Device status and compatibility"]]),
    legacy:()=>genericGrid("legacy",[["🛠","Maintenance First","Bug fixes, compliance, critical stability"],["⛔","No Routine Features","No standalone routine feature development"],["⚖","Exception Review","Exceptions require product review"],["⇄","Migration Support","Guide users and data to new products"],["📉","Retirement Metrics","Track usage decline and remaining users"],["📘","Lifecycle","Maintain status, scope, owner, lifecycle"]]),
    migration:migrationPage,
    dealer:()=>genericGrid("dealer",[["♙","Dealer Organization","Organization and role management"],["👤","Customer Management","Customer and account relationship"],["🏠","Plant Management","Residential plant portfolio"],["🔧","Installation","Binding and commissioning workflow"],["🔐","Permissions","Dealer-user collaboration and access"],["🛠","Basic O&M","Basic residential diagnostics"]]),
    edge:edgePage,
    platform:platformPage,
    device:devicePage,
    capability:()=>genericGrid("capability",[["📊","Monitoring Capability","Realtime, history, statistics"],["🎛","Control Capability","Parameters, modes, schedules"],["⚠","Alarm Capability","Alarm schema and troubleshooting"],["⬆","OTA Capability","Firmware eligibility and rollout"],["⚡","Energy Capability","Energy flow, analysis, optimization"],["🔐","Permission Capability","Role and access control"]]),
    schema:()=>genericGrid("schema",[["🧩","Device Type","Parent-child device type model"],["🧾","Device Model","Model and firmware metadata"],["📊","Telemetry Schema","Realtime and historical points"],["🎛","Parameter Schema","Readable/writable parameter definitions"],["⚠","Alarm Schema","Codes, levels, causes, actions"],["✦","Capability Mapping","Schema-to-capability relationship"]]),
    enablement:()=>genericGrid("enablement",[["1","Initiation","Business goal and target regions"],["2","Capability Model","Device type, schema, capability"],["3","Platform Enablement","Cloud, account, data services"],["4","App / Web","UI, interaction, feature exposure"],["5","Validation","Firmware, test, region validation"],["6","Launch","Gradual rollout, metrics, checklist"]]),
    governance:()=>genericGrid("governance",[["👤","Residential PM","Portfolio, priority, outcomes"],["📘","Product Specialist","Requirement detail and delivery support"],["☁","Platform PM","Shared platform capability"],["◇","Device PM","Device model and enablement"],["🧪","QA","Quality strategy and validation"],["🌍","Regional Teams","Market requirements and launch validation"]]),
    metrics:metricsPage,
    roadmap:roadmapPage,
    updates:updatesPage,
    reference:()=>genericGrid("reference",[["📘","Product Handbook","Product overview and operating model"],["📄","PRD","Requirements and decisions"],["🧭","Process","Product and delivery workflows"],["🧩","Feature Matrix","Product and device feature support"],["📝","Release Notes","Version changes and impacts"],["?","FAQ","Common questions and answers"]]),
    faq:()=>genericGrid("faq",[["?","Why product-line centric?","To manage portfolio, lifecycle, migration, and ownership consistently."],["?","Who owns ShineTools?","Service & Operations product line."],["?","How are legacy products handled?","Maintenance first; exceptions require review."],["?","How is UI generated?","By device schema and capability mapping."],["?","What is migration success?","Migrated, verified, and reversible when required."],["?","How are new devices enabled?","Through capability, schema, platform, UI, test, and launch gates."]])
  };
  const fn=views[current]||views.home;
  document.getElementById("content").innerHTML=fn();
  renderNav();
  window.scrollTo({top:0,behavior:"instant"});
}

function go(page){
  current=page;location.hash="#/"+page;renderPage();
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

function setupSearch(){
  const input=document.getElementById("search"), box=document.getElementById("searchResults");
  input.addEventListener("input",()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){box.classList.remove("show");box.innerHTML="";return}
    const found=searchIndex.filter(x=>(x[1]+" "+x[2]).toLowerCase().includes(q)).slice(0,8);
    box.innerHTML=found.length?found.map(x=>`<div class="search-result" data-page="${x[0]}"><b>${x[1]}</b><span>${x[2]}</span></div>`).join(""):`<div class="empty">${lang==="zh"?"未找到结果":"No results"}</div>`;
    box.classList.add("show");
    box.querySelectorAll(".search-result").forEach(el=>el.onclick=()=>{go(el.dataset.page);input.value="";box.classList.remove("show")});
  });
  document.addEventListener("keydown",e=>{if(e.key==="/" && document.activeElement!==input){e.preventDefault();input.focus()}});
  document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap"))box.classList.remove("show")});
}

document.getElementById("app").innerHTML=shell();
renderNav();renderPage();setupSearch();

document.getElementById("langBtn").onclick=()=>{
  lang=lang==="zh"?"en":"zh";localStorage.setItem("gpc-lang",lang);
  document.getElementById("app").innerHTML=shell();renderNav();renderPage();setupSearch();
  document.getElementById("langBtn").onclick=arguments.callee;
  bindMobile();
};
function bindMobile(){
  const btn=document.getElementById("mobileMenu"), sidebar=document.getElementById("sidebar"), overlay=document.getElementById("overlay");
  btn.onclick=()=>{sidebar.classList.add("open");overlay.classList.add("show")};
  overlay.onclick=()=>{sidebar.classList.remove("open");overlay.classList.remove("show")};
}
bindMobile();
window.addEventListener("hashchange",()=>{current=location.hash.replace("#/","")||"home";renderPage()});
window.go=go;
