// 修正后的 category-widget.js
   import CMS from 'netlify-cms-app';
   import { createClass, h } from 'netlify-cms-ui-default';

   const CategoriesControl = createClass({
     getInitialState: function() {
       return { categories: [] };
     },

     componentDidMount: function() {
       fetch('/.netlify/functions/get-categories')
         .then(response => response.json())
         .then(categories => this.setState({ categories }))
         .catch(console.error);
     },

     render: function() {
       const { value, onChange } = this.props;
       return h('select', {
           value: value || '',
           onChange: (e) => onChange([...e.target.selectedOptions].map(o => o.value)),
           multiple: true
         },
         this.state.categories.map(category =>
           h('option', { value: category, key: category }, category)
         )
       );
     }
   });

   CMS.registerWidget('categories', CategoriesControl);
