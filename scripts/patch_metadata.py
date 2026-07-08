import sys

def add_metadata(filepath, new_metadata):
    content = open(filepath).read()
    if 'export const metadata: Metadata =' in content:
        return # already added
    
    # insert after the imports
    lines = content.split('\n')
    import_index = 0
    for i, line in enumerate(lines):
        if line.startswith('import '):
            import_index = i
    
    # Needs import type { Metadata } from 'next';
    if 'import type { Metadata } from "next"' not in content and "import type { Metadata } from 'next'" not in content:
        lines.insert(import_index + 1, "import type { Metadata } from 'next';")
    
    lines.insert(import_index + 2, "\n" + new_metadata + "\n")
    open(filepath, 'w').write('\n'.join(lines))


add_metadata('app/page.tsx', """export const metadata: Metadata = {
  title: 'Chăm Sóc Răng Niềng Chuyên Biệt | Trang Chủ | Fluocaril',
  description: 'Khám phá sản phẩm chăm sóc răng miệng chuyên biệt từ Fluocaril dành cho người niềng răng, chỉnh nha, và đeo khay trong suốt.',
};""")

add_metadata('app/san-pham/page.tsx', """export const metadata: Metadata = {
  title: 'Danh Mục Sản Phẩm Chăm Sóc Răng Niềng | Fluocaril',
  description: 'Danh mục các sản phẩm kem đánh răng, nước súc miệng, và bàn chải chuyên biệt cho quá trình chỉnh nha từ Fluocaril.',
};""")

add_metadata('app/cau-hoi-thuong-gap/page.tsx', """export const metadata: Metadata = {
  title: 'Câu Hỏi Thường Gặp | Fluocaril',
  description: 'Giải đáp các thắc mắc phổ biến về sản phẩm và phương pháp chăm sóc răng niềng cùng Fluocaril.',
};""")

add_metadata('app/cham-soc-theo-giai-doan/page.tsx', """export const metadata: Metadata = {
  title: 'Chăm Sóc Răng Theo Giai Đoạn Niềng | Fluocaril',
  description: 'Hướng dẫn cách chăm sóc răng niềng hiệu quả cho từng giai đoạn chỉnh nha với bộ sản phẩm Fluocaril.',
};""")

add_metadata('app/goc-kien-thuc/page.tsx', """export const metadata: Metadata = {
  title: 'Góc Kiến Thức Chăm Sóc Răng Niềng | Fluocaril',
  description: 'Các bài viết, chia sẻ kinh nghiệm và hướng dẫn từ chuyên gia về cách vệ sinh, chăm sóc răng miệng khi niềng.',
};""")

