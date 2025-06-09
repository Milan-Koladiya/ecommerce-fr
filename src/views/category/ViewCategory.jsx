import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import DynamicModal from '../../components/dynamivModal';
import AddCategory from '../../views/category/AddCategory';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useCategory from '../../hooks/useCategory';
import Alert from '../../components/common/alert';
import EditCategory from '../category/EditCategory'
import ConfirmBox from '../../components/confirmBox'

const ViewCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [selectCategory, setSelectCategory] = useState(null);
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

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmVisible(false);
    const res = await deleteCategory(selectedId);
    handleFetchCategories();

    if (res?.type === 'category/deleteCategory/fulfilled') {
      toast.success("Category deleted successfully");

    } else {
      toast.error("Failed to delete category");
    }
    handleFetchCategories();
  };

  return (
    <div className="category-layout" style={{ marginLeft: '180px', marginTop: '50px', borderRadius: '10px', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <h1>Category</h1>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setShowModal(true)}>+ Add Category</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.length ? category.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td><FaEdit onClick={() => { setSelectCategory(cat); setShowEditModal(true); }} /></td>
              <td><MdDelete onClick={() => handleDeleteClick(cat.id)} /></td>
            </tr>
          )) : (
            <tr><td colSpan="4">No categories found.</td></tr>
          )}
        </tbody>
      </Table>

      <DynamicModal show={showModal} onHide={() => { closeAlert(); setShowModal(false); }} title="Add Category">
        <AddCategory onSuccess={() => { setShowModal(false); handleFetchCategories(); }} />
      </DynamicModal>

      <DynamicModal show={showEditModal} onHide={() => { closeAlert(); setShowEditModal(false); setSelectCategory(null); }} title="Edit Category">
        <EditCategory category={selectCategory} onSuccess={() => {
          setShowEditModal(false); setSelectCategory(null); handleFetchCategories();
        }} />
      </DynamicModal>

      <ConfirmBox
        show={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default ViewCategory;
