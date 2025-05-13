import { h } from 'preact';
import { CMS } from 'netlify-cms-app';
import { useState, useEffect } from 'preact/hooks';

const CategoriesControl = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/.netlify/functions/get-categories')
      .then(response => response.json())
      .then(setCategories) // 直接设置 state
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <select value={value || ''} onChange={e => onChange(e.target.value)} multiple>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
};

CMS.registerWidget('categories', CategoriesControl);
console.log('Categories widget registered successfully.');
