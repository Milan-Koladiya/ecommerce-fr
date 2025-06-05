import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import DynamicModal from '../../components/dynamivModal';
import AddCategory from '../../views/category/AddCategory';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useCategory from '../../hooks/useCategory';

const ViewCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const { viewCategory, loading, message, error, alertType } = useCategory();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const handleFetchCategories = async () => {
    const res = await viewCategory();
    if (res.payload) {
      setCategory(res.payload);
    }
  };

  return (
    <div className="category-layout" style={{ marginLeft: '180px', marginBlockStart: '50px', borderRadius: '10px', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div className="main-content">
        <h1 style={{ marginBottom: '10px', padding: '10px' }}>Category</h1>
        <div className="addButton d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>+ Add Category</Button>
        </div>

        <div className="table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {category.length > 0 ? (
                category.map((cat, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td><FaEdit /></td>
                    <td><MdDelete /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No categories found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <DynamicModal show={showModal} onHide={() => setShowModal(false)} title="Add Category">
        <AddCategory onSuccess={() => {
          setShowModal(false);
          handleFetchCategories();
        }} />
      </DynamicModal>
    </div>
  );
};

export default ViewCategory;
