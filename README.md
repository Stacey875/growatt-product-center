# Growatt Product Center V1.4 — Product Knowledge MVP

可直接部署至 GitHub Pages 的静态产品知识平台。

## V1.4 新增

- 产品运行 Dashboard：产品模块、设备族、知识资产与核心工作流
- 户用数字产品线：使命、范围、核心用户、生命周期与产品地图
- 平台架构：Cloud → Plant → Collector / Edge → Device，以及上下行数据流
- 知识资产目录：Handbook、PRD、设备矩阵与新品接入流程
- 决策与风险区：产品边界、跨区账号限制、设备能力驱动 UI
- 全站版本升级为 V1.4，并增加静态资源缓存版本号

## 核心页面

- Dashboard
- Residential Digital Products
- Product Portfolio
- New ShinePhone
- Platform Architecture
- Device Center
- Migration Center
- Reference / Knowledge Assets
- Governance / Metrics / Roadmap

## 部署

将仓库根目录中的以下文件覆盖上传：

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `CHANGELOG.md`
- `LEADERSHIP-DEMO.md`
- `.nojekyll`

GitHub Pages 配置：`main` 分支、`/ (root)`。
