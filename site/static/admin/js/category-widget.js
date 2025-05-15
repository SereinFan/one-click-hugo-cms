(function() {
  // 从全局对象获取 Preact 依赖
  const { createElement: h } = window.preact;
  const { useState, useEffect } = window.preactHooks;

  const CategoriesControl = ({ value, onChange }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      console.log('开始加载分类数据...');
      fetch('/.netlify/functions/get-categories')
        .then(response => {
          if (!response.ok) throw new Error(`HTTP 错误 ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log('收到分类数据:', data);
          if (Array.isArray(data) && data.every(item => item.label && item.value)) {
            setCategories(data);
          } else {
            throw new Error('无效数据格式，需要 { label, value } 数组');
          }
        })
        .catch(error => {
          console.error('加载分类失败:', error);
          setError(error.message);
        });
    }, []);

    return h('div', { style: { margin: '10px 0' } }, 
      error ? h('p', { style: { color: 'red' } }, `错误: ${error}`) : 
      h('select', {
        value: value || '',
        onChange: e => onChange(e.target.value),
        style: {
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }
      }, [
        h('option', { value: '' }, '请选择分类'),
        ...categories.map(category => 
          h('option', {
            key: category.value,
            value: category.value
          }, category.label)
        )
      ])
    );
  };

  // 注册到 Netlify CMS
  if (typeof CMS !== 'undefined') {
    CMS.registerWidget('categories', CategoriesControl);
    console.log('✅ 分类控件注册成功');
  } else {
    console.error(' CMS 对象未定义，请检查脚本加载顺序');
  }
})();
