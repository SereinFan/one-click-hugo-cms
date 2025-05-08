import { CMS } from 'netlify-cms-app';

const CategoriesControl = createClass({
  getInitialState: function() {
    return {
      categories: []
    };
  },

  componentDidMount: function() {
    fetch('/.netlify/functions/get-categories')
      .then(response => response.json())
      .then(categories => {
        console.log('Fetched categories:', categories); // 添加调试日志
        this.setState({ categories });
      })
      .catch(error => console.error('Error fetching categories:', error));
  },

  render: function() {
    const { value, onChange } = this.props;
    const options = this.state.categories.map(category =>
      h('option', { value: category }, category)
    );

    return h('select', {
      value: value || '',
      onChange: (e) => onChange(e.target.value),
      multiple: true
    }, options);
  }
});

// 注册控件
CMS.registerWidget('categories', CategoriesControl);
console.log('Categories widget registered successfully.'); // 添加调试日志
