const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // 引入 gray-matter 库

exports.handler = async function(event, context) {
  try {
    // 修改路径为相对于函数文件的路径
    const categoriesPath = path.resolve(__dirname, '../content/categories/_index.md');
    const fileContent = fs.readFileSync(categoriesPath, 'utf8');

    // 使用 gray-matter 解析文件内容
    const parsedContent = matter(fileContent);
    const categories = parsedContent.data.categories_list.map(category => category.name);

    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    };
  } catch (err) {
    console.error('Error reading categories file:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
