# 云仓 · 智能仓储管理平台 — 官方项目站

本目录是 **云仓（YUNCANG Inventory Management）** 开源项目的官方介绍站源码。

- 项目仓库：GitHub <https://github.com/yuejiaxinabc/cloud-warehouse> ｜ Gitee <https://gitee.com/yuejiaxinabc/cloud-warehouse>
- 技术栈：纯 HTML + Tailwind CSS（Play CDN），零构建、零后端。
- 板块：项目简介与产品功能、版本发布、更新日志、安全日志。

## 目录结构

```
cloud-warehouse-site/
├── index.html            # 单页站点（所有板块集中于此）
├── assets/
│   ├── css/style.css     # 品牌渐变、时间线、滚动渐显、导航吸顶等
│   └── js/main.js        # 移动端菜单、吸顶、渐显、锚点高亮、回到顶部
└── README.md             # 本文件（部署说明）
```

## 本地预览（零依赖）

直接用浏览器打开 `index.html` 即可。若浏览器对本地文件有跨域限制，可启动一个静态服务器：

```bash
# 任选其一，在项目根目录执行
python3 -m http.server 8080
# 或
npx serve .
```

然后访问 <http://localhost:8080>。

> 注意：页面通过 CDN 加载 Tailwind，首次打开需联网；离线环境会丢失部分样式。如需完全离线，可将 Tailwind 构建为本地 CSS（见下方「完全离线」）。

## 一键部署教程

### 方案 A：Vercel（最快，免备案，适合海外/个人）

1. 把本目录推送到 GitHub 仓库（新建一个仓库，例如 `cloud-warehouse-site`）。
2. 打开 <https://vercel.com> → New Project → 导入该仓库。
3. Framework Preset 选 **Other**，Build Command 留空，Output Directory 填 `.`（根目录）。
4. Deploy，等待数十秒即可获得 `*.vercel.app` 域名。

### 方案 B：Netlify（拖拽即传，表单友好）

1. 打开 <https://app.netlify.com> → **Add new site → Deploy manually**。
2. 将本目录（含 `index.html` 与 `assets/`）整体拖入上传区。
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
2. 将 `index.html` 与 `assets/` 上传为公共读对象。
3. 绑定自定义域名并开启 CDN + HTTPS。按流量计费，成本极低。

## 后续修改维护

| 需求 | 改哪里 |
|------|--------|
| 改文案 / 版本号 | `index.html` 内对应区块，搜索 `v1.0.2` 等关键字 |
| 改配色 | `index.html` 顶部 `tailwind.config` 的 `brand` / `accent`；`assets/css/style.css` 的 `:root` 变量 |
| 加功能卡片 | 复制 `#features` 里任意 `.card-hover` 卡片块 |
| 加版本 / 日志 | 复制 `#releases`、`#changelog` 内对应条目 |
| 安全漏洞表 | 编辑 `#security` 内的 `<table>` 行 |
| 换仓库链接 | 全文替换 `yuejiaxinabc/cloud-warehouse` |
| 完全离线 | 用 `npx tailwindcss -i` 构建 Tailwind 为本地 `assets/css/tailwind.css`，移除 CDN `<script>` |

## 待替换 / 可自定义清单

- 版本号、发布日期如与仓库实际不一致，以 `docs/CHANGELOG.md`、`docs/SECURITY.md` 为准。
- 如需真实 Logo 图片，替换导航与页脚中的「云」字占位块（替换为 `<img>` 即可）。
- 页脚作者名「小岳 (xiao yue)」如与实际署名不符请修改。
