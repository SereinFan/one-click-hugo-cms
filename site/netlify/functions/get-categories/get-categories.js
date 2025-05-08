const fs = require('fs');
const path = require('path');


exports.handler = async function(event, context) {
  try {
    // 修改路径为相对于函数文件的路径
    const categoriesPath = path.resolve(__dirname, '../../../content/categories/_index.md');
    console.log('Resolved file path:', categoriesPath); // 打印解析后的路径


    // 使用正则解析文件内容
    const categories = fileContent.match(/name: "(.+)"/g)
      .map(match => match.replace(/name: "/, '').replace(/"/, ''));
    
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
