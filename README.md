# 西班牙，十三日

移动端优先的 Astro 静态旅行手记。当前为基础工程，真实媒体与路线尚未导入。

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

构建输出为 `dist/`。Vercel 导入仓库时使用 Astro 预设；此工程是静态站，不需要 Vercel adapter。

## 文件组织

- `src/data/trip.ts`：三段旅程的配置，不代表实际先后顺序。
- `src/pages/index.astro`：首页。
- `src/pages/[chapter].astro`：自动生成三个章节入口。
- `src/layouts/BaseLayout.astro`：公共布局。
- `src/styles/global.css`：手机单列，768px 起三列。
- `src/data/media.ts`：真实照片、动态照片和视频的唯一登记入口。
- `src/components/MediaGallery.astro`：移动端双列、桌面端自适应的媒体画廊。
- `src/components/MotionPhoto.astro`：带静态封面、静音循环播放的动态照片组件。
- `public/media/`：少量已处理的网页素材；不要放完整原始相册。

动态照片使用示例：

```astro
---
import MotionPhoto from '../components/MotionPhoto.astro';
---
<MotionPhoto poster="/media/sample.jpg" video="/media/sample.mp4" alt="照片说明" />
```

组件已准备，首页未展示虚构素材。地图和 PhotoSwipe 尚未集成。

### 导入真实素材

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

素材文件名只用小写英文、数字和连字符。发布前应移除照片定位信息，并避免提交原始相册、证件、票据和未压缩大视频。

## 下一步

1. 确认旅行实际日期和顺序：已知三个章节合计12天，总旅程13天，剩余一天待确认。
2. 导入一天的真实照片、动态照片、视频，先验证兼容性。
3. 加入图片优化、PhotoSwipe、每日游记。
4. 按真实 GPX 或标记为示意的路线加入地图。
5. 真机验证 Safari、Android 和微信，再发布。

## GitHub

已核验连接账号：Hanhan207。尚未指定远程仓库，未推送或部署。不要将原始照片、隐私数据或凭证提交到 Git。
