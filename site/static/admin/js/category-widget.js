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
      .then(categories => this.setState({ categories }));
  },
  
  render: function() {
    const { value, onChange } = this.props;
    return h('select', {
      value: value || '',
      onChange: (e) => onChange(e.target.value),
      multiple: true
    },
      this.state.categories.map(category => 
        h('option', { value: category }, category)
      )
    );
  }
});

CMS.registerWidget('categories', CategoriesControl);
