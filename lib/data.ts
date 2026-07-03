export const stages = [
  { id: 'sap-nieng', title: 'Tôi sắp niềng', desc: 'Chuẩn bị nền tảng răng miệng khỏe mạnh.', icon: 'Sparkles' },
  { id: 'dang-nieng', title: 'Tôi đang niềng', desc: 'Làm sạch mảng bám quanh mắc cài và dây cung.', icon: 'Smile' },
  { id: 'thao-nieng', title: 'Tôi vừa tháo niềng', desc: 'Phục hồi men răng và làm sáng nụ cười.', icon: 'CheckCircle2' },
  { id: 'khay-trong-suot', title: 'Khay trong suốt', desc: 'Vệ sinh khay và bảo vệ hơi thở thơm mát.', icon: 'ShieldCheck' },
];

export const categories = [
  { id: 'kem-danh-rang', name: 'Kem đánh răng chuyên biệt', image: 'https://picsum.photos/seed/cat1/400/300' },
  { id: 'nuoc-suc-mieng', name: 'Nước súc miệng', image: 'https://picsum.photos/seed/cat2/400/300' },
  { id: 'ban-chai-ke', name: 'Bàn chải kẽ', image: 'https://picsum.photos/seed/cat3/400/300' },
  { id: 'lam-sach-khay', name: 'Làm sạch khay & hàm duy trì', image: 'https://picsum.photos/seed/cat4/400/300' },
];

export const products = [
  { id: 'p1', name: 'Kem Đánh Răng Fluocaril Ortho', category: 'Kem đánh răng', benefit: 'Sạch sâu mắc cài', price: '125.000đ', image: 'https://picsum.photos/seed/p1/400/400', stage: 'Đang niềng' },
  { id: 'p2', name: 'Nước Súc Miệng Fluocaril Rinse', category: 'Nước súc miệng', benefit: 'Kháng khuẩn 24h', price: '150.000đ', image: 'https://picsum.photos/seed/p2/400/400', stage: 'Mọi giai đoạn' },
  { id: 'p3', name: 'Bàn Chải Kẽ Fluocaril', category: 'Bàn chải kẽ', benefit: 'Mềm mại, dễ uốn', price: '85.000đ', image: 'https://picsum.photos/seed/p3/400/400', stage: 'Đang niềng' },
  { id: 'p4', name: 'Viên Sủi Fluocaril Clear', category: 'Làm sạch khay', benefit: 'Diệt 99% vi khuẩn', price: '190.000đ', image: 'https://picsum.photos/seed/p4/400/400', stage: 'Khay trong suốt' },
];

export const articles = [
  { id: 'a1', title: 'Cách vệ sinh răng khi đeo mắc cài chuẩn nha khoa', category: 'Chăm sóc răng niềng', date: '12/10/2023', image: 'https://picsum.photos/seed/a1/600/400', description: 'Hướng dẫn chi tiết từng bước vệ sinh răng miệng khi niềng răng để tránh sâu răng và viêm nướu hiệu quả.' },
  { id: 'a2', title: 'Bàn chải kẽ dùng như thế nào để không tụt lợi?', category: 'Vệ sinh đúng cách', date: '05/11/2023', image: 'https://picsum.photos/seed/a2/600/400', description: 'Tìm hiểu cách sử dụng bàn chải kẽ đúng cách để làm sạch các kẽ răng và vùng xung quanh mắc cài an toàn.' },
  { id: 'a3', title: 'Làm sạch hàm duy trì đúng cách sau khi tháo niềng', category: 'Giai đoạn chỉnh nha', date: '20/11/2023', image: 'https://picsum.photos/seed/a3/600/400', description: 'Bảo quản và vệ sinh hàm duy trì đúng cách để đảm bảo hiệu quả lâu dài sau khi kết thúc quá trình niềng răng.' },
  { id: 'a4', title: 'Tại sao cần bổ sung Fluoride khi niềng răng?', category: 'Kiến thức tổng quát', date: '01/12/2023', image: 'https://picsum.photos/seed/a4/600/400', description: 'Tầm quan trọng của Fluoride trong việc bảo vệ men răng và ngăn ngừa tình trạng đốm trắng khi mang mắc cài.' },
  { id: 'a5', title: 'Những thực phẩm nên tránh để không bung mắc cài', category: 'Chăm sóc răng niềng', date: '15/12/2023', image: 'https://picsum.photos/seed/a5/600/400', description: 'Danh sách các loại thực phẩm cứng, dính, dai cần hạn chế để tránh làm bung tuột mắc cài và kéo dài thời gian niềng.' },
  { id: 'a6', title: 'Giải đáp: Niềng răng có làm yếu răng không?', category: 'Kiến thức tổng quát', date: '10/01/2024', image: 'https://picsum.photos/seed/a6/600/400', description: 'Chuyên gia giải đáp thắc mắc về việc niềng răng có ảnh hưởng đến độ bền chắc của răng trong tương lai hay không.' },
  { id: 'a7', title: 'Bí quyết giảm đau nhức sau mỗi lần siết răng', category: 'Giai đoạn chỉnh nha', date: '25/01/2024', image: 'https://picsum.photos/seed/a7/600/400', description: 'Các mẹo hữu ích giúp giảm thiểu tình trạng đau nhức và khó chịu sau mỗi lần siết mắc cài định kỳ.' },
];

export const topViewedArticles = [
  { id: 't1', title: 'Dùng tăm nước hay bàn chải kẽ tốt hơn cho người niềng răng?' },
  { id: 't2', title: '5 Dấu hiệu cho thấy bạn cần vệ sinh lấy cao răng ngay lập tức' },
  { id: 't3', title: 'Nhổ răng khôn khi niềng: Những điều cần lưu ý' },
  { id: 't4', title: 'Review chi tiết các dòng nước súc miệng cho răng niềng' },
  { id: 't5', title: 'Xử lý tình huống bung mắc cài tại nhà như thế nào?' },
];

export const articleCategories = [
  'Chăm sóc răng niềng',
  'Kiến thức tổng quát',
  'Giai đoạn chỉnh nha',
  'Vệ sinh đúng cách',
  'Dinh dưỡng nha khoa'
];

export const faqs = [
  { question: 'Sản phẩm có dùng được cho trẻ em không?', answer: 'Có, các dòng sản phẩm của chúng tôi được thiết kế an toàn cho thanh thiếu niên từ 12 tuổi trở lên đang trong quá trình chỉnh nha. Các thành phần được kiểm nghiệm lâm sàng và tuân thủ tiêu chuẩn an toàn.' },
  { question: 'Người dùng khay trong suốt (Invisalign) nên chọn sản phẩm nào?', answer: 'Bạn nên sử dụng viên sủi làm sạch khay chuyên dụng kết hợp với nước súc miệng để bảo vệ mảng bám và duy trì hơi thở thơm mát. Bàn chải lông mềm cũng là trợ thủ đắc lực.' },
  { question: 'Mua hàng chính hãng ở đâu?', answer: 'Bạn có thể mua trực tiếp tại gian hàng Shopee Mall và TikTok Shop chính thức của thương hiệu để đảm bảo quyền lợi, hoặc mua qua các đối tác phòng khám nha khoa ủy quyền.' },
  { question: 'Nên dùng bàn chải kẽ bao nhiêu lần một ngày?', answer: 'Khuyến nghị dùng bàn chải kẽ ít nhất 1 lần/ngày vào buổi tối trước khi đi ngủ, hoặc sau các bữa ăn chính để loại bỏ hoàn toàn thức ăn thừa kẹt quanh mắc cài.' },
];
