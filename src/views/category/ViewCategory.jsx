import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import DynamicModal from '../../components/dynamivModal';
import AddCategory from '../../views/category/AddCategory';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useCategory from '../../hooks/useCategory';
import Alert from '../../components/common/alert';
import EditCategory from '../category/EditCategory'


const ViewCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null)
  const { viewCategory, deleteCategory, loading, message, error, alertType, closeAlert } = useCategory();
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const res = await deleteCategory(id);
      handleFetchCategories();
    }
  };




  return (
    <div className="category-layout" style={{ marginLeft: '180px', marginBlockStart: '50px', borderRadius: '10px', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div className="main-content">
        <h1 style={{ marginBottom: '10px', padding: '10px' }}>Category</h1>

        {/* {alertType && message && (
          <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
        )} */}

        <div className="addButton d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>+ Add Category</Button>
        </div>

        <div className="table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th colSpan={4}>Action</th>
              </tr>
            </thead>
            <tbody>
              {category.length > 0 ? (
                category.map((cat, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td><FaEdit onClick={() => { setSelectCategory(cat), setShowEditModal(true) }} /></td>
                    <td><MdDelete onClick={() => handleDelete(cat.id)} /></td>
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

      <DynamicModal show={showModal} onHide={() => { closeAlert(); setShowModal(false); }} title="Add Category">
        <AddCategory onSuccess={() => {
          setShowModal(false);
          handleFetchCategories();
        }} />
      </DynamicModal>

      <DynamicModal show={showEditModal} onHide={() => { closeAlert(); setShowEditModal(false); setSelectCategory(null) }} title="Edit Category">
        <EditCategory
        category={selectCategory} 
        onSuccess={() => {
          setShowEditModal(false);
          setSelectCategory(null)
          handleFetchCategories();
        }} />
      </DynamicModal>
    </div>
  );
};

export default ViewCategory;
