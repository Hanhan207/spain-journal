# 西班牙，十三日

移动端优先的 Astro 静态旅行手记。前台部署在 GitHub Pages，Sanity 管理内容，Cloudinary 承载照片与动态照片，Mux 承载大视频。

## 本地运行（Mac）

安装 Node.js 22.12+ 的受支持偶数版本（推荐 LTS），在此目录执行：

```bash
npm ci
npm run dev
```

在浏览器打开终端显示的 Local 地址。手机与电脑同一 Wi-Fi 时使用 `npm run dev -- --host`，手机打开 Network 地址。

```bash
npm run build
npm run preview
```

构建输出为 `dist/`。未配置 Sanity 时仍可使用本地数据正常开发和构建。

## 云服务结构

- **Astro + GitHub Pages**：生成和托管公开网站。
- **Sanity Studio**：在 `/admin/` 管理旅行、日期、地点、文字和媒体顺序。
- **Cloudinary**：照片及动态照片的静态封面和短视频。
- **Mux**：较大视频的上传、转码和自适应播放。
- **GitHub**：只保存代码和配置，不保存原始相册或云服务密钥。

### Sanity 内容后台

Sanity 项目 `Spain Journal` 和公开的 `production` 数据集已经创建，项目 ID 为 `b2e5omqo`。本地环境与 GitHub Actions 变量均已配置，CORS 已允许本地地址和 GitHub Pages 域名。

1. 本地启动后打开 `http://localhost:4321/admin/`。
2. 使用当前 Sanity 账号登录。
3. “西班牙，十三日”基础旅程已初始化；新增“每日游记”，填写章节、章节内天数、日期、地点和文字。
4. 在“照片与视频”中选择照片、动态照片或视频，并拖动调整顺序。
5. 第一次使用 Cloudinary 或 Mux 字段时，按界面提示连接各自账号。凭证只在服务商与 Sanity 的授权流程中保存，不写入仓库。

```dotenv
PUBLIC_SANITY_PROJECT_ID=你的项目ID
PUBLIC_SANITY_DATASET=production
```

前台在构建时只读取已发布内容。草稿不会公开显示。

### GitHub Pages

`.github/workflows/deploy-pages.yml` 会在每次推送 `main`、手动运行工作流以及每 6 小时自动构建并发布：

```text
https://hanhan207.github.io/spain-journal/
```

仓库 Actions Variables 已写入：

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`（值为 `production`）

在后台发布新内容后，如需立即更新网站，可到仓库 `Actions → Deploy Astro to GitHub Pages → Run workflow` 手动发布；否则最多约 6 小时后自动更新。

## 文件组织

- `src/data/trip.ts`：三段旅程的配置，不代表实际先后顺序。
- `src/pages/index.astro`：首页。
- `src/pages/[chapter].astro`：自动生成三个章节入口。
- `src/layouts/BaseLayout.astro`：公共布局。
- `src/styles/global.css`：手机单列，768px 起三列。
- `src/data/media.ts`：云服务未配置时的本地媒体回退数据。
- `src/lib/journal.ts`：从 Sanity 获取和规范化每日游记。
- `src/components/MediaGallery.astro`：移动端双列、桌面端自适应的媒体画廊。
- `src/components/MotionPhoto.astro`：带静态封面、静音循环播放的动态照片组件。
- `sanity/schemaTypes/`：旅行、每日游记和三种媒体的后台数据模型。
- `sanity.config.ts`：Sanity、Cloudinary 和 Mux 后台配置。
- `public/media/`：仅供本地回退的小型网页素材；不要放完整原始相册。

动态照片使用示例：

```astro
---
import MotionPhoto from '../components/MotionPhoto.astro';
---
<MotionPhoto poster="/media/sample.jpg" video="/media/sample.mp4" alt="照片说明" />
```

组件已准备，首页未展示虚构素材。地图和 PhotoSwipe 尚未集成。

### 本地回退素材

1. 按章节把网页版本的文件放进 `public/media/barcelona/`、`madrid/` 或 `camino/`。
2. 照片优先使用 JPEG/WebP；长边建议 2400px 以内。视频统一为 H.264/AAC 的 MP4，动态照片同时保留一张 JPEG/WebP 封面。
3. 在 `src/data/media.ts` 的对应章节登记。`day` 是章节内第几天，实际总行程顺序确认后再统一编号。

```ts
barcelona: [{
  day: 1,
  title: '抵达巴塞罗那',
  story: '当天的简短手记。',
  media: [
    { kind: 'photo', src: '/media/barcelona/day-01-01.jpg', alt: '无障碍照片描述', caption: '可选图注' },
    { kind: 'motion', src: '/media/barcelona/day-01-02.mp4', poster: '/media/barcelona/day-01-02.jpg', alt: '动态照片描述' },
    { kind: 'video', src: '/media/barcelona/day-01-03.mp4', poster: '/media/barcelona/day-01-03.jpg', alt: '视频描述' },
  ],
}],
```

正式内容应从后台上传到 Cloudinary/Mux。本地素材只用于离线开发；文件名只用小写英文、数字和连字符。发布前应移除照片定位信息，并避免提交原始相册、证件、票据和未压缩大视频。

## 下一步

1. 确认旅行实际日期和顺序：已知三个章节合计12天，总旅程13天，剩余一天待确认。
2. 登录内容后台，连接 Cloudinary 和 Mux 账号。
3. 导入一天的真实照片、动态照片、视频，验证完整流程。
4. 加入 PhotoSwipe，并按真实 GPX 或标记为示意的路线加入地图。
5. 真机验证 Safari、Android 和微信。

## GitHub

远程仓库：`Hanhan207/spain-journal`。不要将原始照片、隐私数据或 Sanity、Cloudinary、Mux 凭证提交到 Git。
