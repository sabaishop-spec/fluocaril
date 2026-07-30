import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fluocaril.vn';
  const routes = [
    '',
    '/san-pham',
    '/tai-sao-chon-fluocaril',
    '/goc-kien-thuc',
    '/cau-hoi-thuong-gap',
    '/cham-soc-theo-giai-doan',
    '/chinh-sach-bao-mat',
    '/dieu-khoan-su-dung',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
