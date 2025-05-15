import { h } from 'preact';
import { CMS } from 'netlify-cms-app';
import { useState, useEffect } from 'preact/hooks';

const CategoriesControl = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories from the server
    fetch('/.netlify/functions/get-categories')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Ensure data is in the correct format (array of objects with `label` and `value`)
        if (Array.isArray(data) && data.every(item => item.label && item.value)) {
          setCategories(data);
        } else {
          throw new Error('Invalid data format. Expected an array of objects with `label` and `value`.');
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError(error.message);
      });
  }, []);

  // Render the select dropdown
  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>Error loading categories: {error}</p>
      ) : (
        <select
          value={value || ''}
          onChange={e => onChange(e.target.value)}
        >
          <option value="">请选择分类</option>
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

// Register the custom widget with Netlify CMS
CMS.registerWidget('categories', CategoriesControl);
console.log('Categories widget registered successfully.');
