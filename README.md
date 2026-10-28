# 云仓 · 智能仓储管理平台 — 官方项目站

本目录是 **云仓（YUNCANG Inventory Management）** 开源项目的官方介绍站源码。

- 项目仓库：GitHub <https://github.com/yuejiaxinabc/cloud-warehouse> ｜ Gitee <https://gitee.com/yuejiaxinabc/cloud-warehouse>
- 技术栈：纯 HTML + 手写 CSS 设计系统 + 原生 JS。**零构建、零后端、零外部 CDN 依赖**，离线也能完整渲染。
- 架构：多页面站点，每个板块独立成页，单页只加载自身内容；共享样式与脚本由浏览器跨页面缓存。

## 目录结构

```
cloudwarehouse-index/
├── index.html            # 首页：Hero、数据指标、业务流程、项目简介、功能精选、部署服务速览
├── features.html         # 产品功能：8 大核心模块、v1.2.0 新增能力、扩展能力、系统底座、适用行业
├── pricing.html          # 部署服务：私有化部署单次 ¥299（服务包含/不包含、流程、FAQ）
├── releases.html         # 版本发布：发布时间线（v1.2.0 / v1.1.1 / v1.0.2 / v1.0.1 / v1.0.0）
├── changelog.html        # 更新日志：按版本聚合的变更记录
├── security.html         # 安全日志：安全机制、漏洞修复清单、披露政策
├── 404.html              # 404 页面
├── robots.txt / sitemap.xml
├── assets/
│   ├── css/style.css     # 多页面共享设计系统（设计令牌 + 全部组件样式）
│   ├── js/main.js        # 共享交互：移动端菜单、导航吸顶、滚动渐显、数字滚动、回到顶部
│   └── logo.svg          # 品牌 Logo（与 favicon 共用）
└── .github/workflows/static.yml   # GitHub Pages 自动部署
```

## 本地预览（零依赖）

直接用浏览器打开任意 `*.html` 即可。推荐起一个静态服务器：

```bash
# 任选其一，在项目根目录执行
python3 -m http.server 8080
# 或
npx serve .
```

然后访问 <http://localhost:8080>。

## 一键部署教程

### 方案 A：Vercel（最快，免备案，适合海外/个人）

1. 把本目录推送到 GitHub 仓库（当前仓库 `cloudwarehouse-index` 即可）。
2. 打开 <https://vercel.com> → New Project → 导入该仓库。
3. Framework Preset 选 **Other**，Build Command 留空，Output Directory 填 `.`（根目录）。
4. Deploy，等待数十秒即可获得 `*.vercel.app` 域名。

### 方案 B：Netlify（拖拽即传，表单友好）

1. 打开 <https://app.netlify.com> → **Add new site → Deploy manually**。
2. 将本目录（全部 `*.html` 与 `assets/`）整体拖入上传区。
3. 自动发布，获得 `*.netlify.app` 域名；后续可在 Domain settings 绑定自有域名。

### 方案 C：国内云服务器 + Nginx（可控、需备案）

```bash
# 1) 上传文件到服务器（以 /var/www/cloud-warehouse 为例）
scp -r ./ yun@your-server:/var/www/cloud-warehouse

# 2) 配置 Nginx
sudo tee /etc/nginx/conf.d/cloud-warehouse.conf <<'EOF'
server {
    listen 80;
    server_name your-domain.com;   # 改成你的域名
    root /var/www/cloud-warehouse;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
EOF

# 3) 生效并（建议）配置 HTTPS
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com   # 自动签发并开启 HTTPS/HSTS
```

> ⚠️ **ICP 备案提醒**：域名指向中国大陆服务器必须完成备案，否则无法访问。备案材料：营业执照/身份证、域名证书、接入商信息，周期通常 1–3 周。使用境外服务器（Vercel/Netlify）可免备案，但国内访问速度较慢。

### 方案 D：国内静态托管（阿里云 OSS / 腾讯云 COS / EdgeOne）

1. 在对应控制台创建存储桶，开启「静态网站托管」。
2. 将全部 `*.html` 与 `assets/` 上传为公共读对象。
3. 绑定自定义域名并开启 CDN + HTTPS。按流量计费，成本极低。

## 后续修改维护

| 需求 | 改哪里 |
|------|--------|
| 改文案 / 版本号 | 对应页面内搜索 `v1.2.0` 等关键字；注意**每个页面页脚都有版本号**，全局替换最快（发布新版本时同步 `releases.html` 与 `changelog.html`） |
| 改配色 / 设计令牌 | `assets/css/style.css` 顶部 `:root` 变量（品牌色、渐变、圆角、阴影都在这里） |
| 加功能卡片 | `features.html` 中复制任意 `.card` 卡片块 |
| 加版本 / 日志 | `releases.html` 复制 `.tl-item` 条目；`changelog.html` 复制版本卡片 |
| 安全漏洞表 | `security.html` 中的 `<table>` 行 |
| 改价格 / 服务范围 | `pricing.html` 价格卡与「服务包含 / 不包含」清单；首页速览区同步改 |
| 换仓库链接 | 全局替换 `yuejiaxinabc/cloud-warehouse` |
| 换部署服务联系方式 | `pricing.html` 中搜索 `TODO`，替换为微信 / 邮箱等直连方式 |
| 加新页面 | 复制任意现有页面，改 `<head>` TDK、导航 active 类、页脚「页面导航」；并在 `sitemap.xml` 补一条 |
| 导航加项 | 每个页面的 `.main-nav`、`.mobile-menu`、页脚「页面导航」三处 |

## 版本同步（Version Alignment）

本站文案与主仓库 <https://github.com/yuejiaxinabc/cloud-warehouse> 的发布状态保持一致，当前对齐：

| 项 | 值 |
|----|----|
| 站点展示版本 | **v1.2.0** |
| 主仓库 HEAD | `4d1e676`（2026-10-28，「更新版本」） |
| 主仓库 `package.json` version | `1.2.0` |
| GitHub Releases | 1.1.1 / 1.0.2 / 1.0.0（1.2.0 已并入 main，Release tag 可后续补建） |
| 更新日志来源 | 主仓库 `docs/CHANGELOG.md`（v1.2.0 分五批 · 13 项需求） |

发布新版本时的同步清单：

1. 主仓库打 tag、发 Release，更新 `package.json` 与 `docs/CHANGELOG.md`；
2. 本站全局替换页脚版本号（`当前版本 vX.Y.Z`，6 个页面）；
3. `releases.html` 顶部插入时间线条目，`Latest` 徽章移到新版本，旧版降为 `Stable`；
4. `changelog.html` 顶部插入版本卡片，按「新增 / 修复 / 优化 / 安全 / 文档」分标签；
5. `features.html` 的「v1.2.0 新增能力」区块与首页能力区同步增删；
6. `security.html` 仅在出现安全相关修复时补表行与机制卡；
7. 更新 `sitemap.xml` 的 `lastmod`，提交推送，GitHub Pages 由 `.github/workflows/static.yml` 自动部署。

## 待替换 / 可自定义清单

- 版本号、发布日期以主仓库 `cloud-warehouse` 的 `package.json` version、`docs/CHANGELOG.md`、GitHub Releases 为准；本站当前对齐 **v1.2.0**（主仓库 `4d1e676`，2026-10-28）。
- 本站为纯静态展示站，**不承载业务代码**；版本号只在这里跟随主仓库，改动顺序永远是先主仓库、后本站。
- Logo 已接入 `assets/logo.svg`（导航、页脚、favicon 共用），换 Logo 时直接替换该文件即可。
- 页脚作者名「小岳 (xiao yue)」如与实际署名不符请修改。
- `pricing.html` 部署服务的联系方式目前指向 GitHub Issue，建议替换为微信 / 邮箱（页面内有 `TODO` 注释标记）。
