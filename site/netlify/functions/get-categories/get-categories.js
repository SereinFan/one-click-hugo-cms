const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    const categoriesPath = path.join(process.cwd(), 'site', 'content', 'categories', '_index.md');
    const fileContent = fs.readFileSync(categoriesPath, 'utf8');
    
    // 简单解析Markdown front matter获取分类
    const categories = fileContent.match(/name: "(.+)"/g)
      .map(match => match.replace(/name: "/, '').replace(/"/, ''));
    
    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
