import sys

with open('app/admin/banner/HeroBannerForm.tsx', 'r') as f:
    content = f.read()

old_subtitle = """      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Link đích (Khi click)</label>"""

new_subtitle = """      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề phụ (Subtitle)</label>
        <input 
          defaultValue={currentData?.subtitle} 
          name="subtitle" 
          type="text" 
          placeholder="Nhập tiêu đề phụ..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Link đích (Khi click)</label>"""

content = content.replace(old_subtitle, new_subtitle)

with open('app/admin/banner/HeroBannerForm.tsx', 'w') as f:
    f.write(content)
