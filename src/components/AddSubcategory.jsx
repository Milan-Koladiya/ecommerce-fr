import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AddSubcategory = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('http://localhost:5500/categories/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await res.json();
      setCategories(data.data || []);
    };

    if (token) fetchCategories();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5500/subcategories/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        category_id: categoryId,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      onSuccess();
    } else {
      alert(result.message || 'Failed to add subcategory');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="subcategoryName">
        <Form.Label>Subcategory Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="categorySelect" className="mt-3">
        <Form.Label>Category</Form.Label>
        <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required > 
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Add Subcategory
      </Button>
    </Form>
  );
};

export default AddSubcategory;
