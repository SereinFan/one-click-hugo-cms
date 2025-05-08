const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // 导入 gray-matter

exports.handler = async function(event, context) {
  try {
    const categoriesPath = path.resolve(__dirname, '../../../content/categories/_index.md');
    console.log('Resolved file path:', categoriesPath);

    if (!fs.existsSync(categoriesPath)) {
      throw new Error(`File not found at path: ${categoriesPath}`);
    }

    const fileContent = fs.readFileSync(categoriesPath, 'utf8');
    console.log('File content:', fileContent);

    // 使用 gray-matter 解析 Front Matter
    const { data } = matter(fileContent);
    console.log('Parsed data:', data);

    const categories = data.categories_list ? data.categories_list.map(category => category.name) : [];
    console.log('Categories:', categories);

    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    };
  } catch (err) {
    console.error('Error reading or parsing categories file:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
