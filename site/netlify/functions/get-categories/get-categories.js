const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 自动生成slug的辅助函数
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .substring(0, 50);
};

exports.handler = async function(event, context) {
  try {
    // 保持原有路径逻辑
    const categoriesPath = path.resolve(__dirname, '../../../content/categories/_index.md');
    console.log('[DEBUG] 解析路径:', categoriesPath);

    // 增强文件存在性检查
    if (!fs.existsSync(categoriesPath)) {
      throw new Error(`分类文件未找到，请检查路径: ${categoriesPath}
      预期路径结构应为: site/content/categories/_index.md
      当前解析路径基于: ${__dirname}`);
    }

    // 读取并解析文件内容
    const fileContent = fs.readFileSync(categoriesPath, 'utf8');
    const { data } = matter(fileContent);
    console.log('[DEBUG] 解析后的Front Matter:', JSON.stringify(data, null, 2));

    // 动态兼容不同字段名
    const categoryField = data.categories_list || data.categories;
    if (!categoryField) {
      throw new Error('未找到分类字段（请检查使用categories_list或categories）');
    }

    // 构建符合CMS要求的数据格式
    const options = categoryField.map((item, index) => {
      // 兼容对象和字符串格式
      const isObject = typeof item === 'object';
      
      return {
        label: isObject ? item.name : item,
        value: isObject ? 
          (item.slug || generateSlug(item.name)) :
          generateSlug(item)
      };
    });

    console.log('[INFO] 生成的分类选项:', options);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    };
  } catch (err) {
    // 增强错误日志
    console.error(`[ERROR] ${new Date().toISOString()} 分类加载失败:`, {
      message: err.message,
      stack: err.stack,
      env: {
        node_version: process.version,
        cwd: process.cwd(),
        platform: process.platform
      }
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: '分类数据加载失败',
        debug: process.env.NODE_ENV === 'development' ? {
          message: err.message,
          expected_path: path.normalize('site/content/categories/_index.md')
        } : null
      })
    };
  }
};
