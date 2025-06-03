import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import Slidebar from './Slidebar';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../css/category.css'
import DynamicModal from './DynamicDialog'
import AddCategory from './AddCategory'

const Category = () => {
    const [category, setCategory] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const token = useSelector((state) => state.auth.token);


    const fetchCategory = async () => {
        try {
            const res = await fetch('http://localhost:5500/categories/', {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                console.log('Error fetching categories');
                return;
            }

            const data = await res.json();
            setCategory(data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchCategory();
        }
    }, [token]);

    return (
        <div className="ml-50 category-layout" style={{ borderRadius: '10px', backgroundColor: '#f8f9fa', marging: '10px', padding: '20px' }}>
            <Slidebar />
            <div className="main-content">
                <h1 style={{ marginBottom: '10px', padding: '10px' }}>Category</h1>
                <div className="d-flex justify-content-end mb-3">
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
                                        <td>{<FaEdit/>}</td>
                                        <td>{<MdDelete />}</td>
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No categories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            <DynamicModal show={showModal} onHide={() => setShowModal(false)} title="Add Category">
                <AddCategory onSuccess={() => {
                    setShowModal(false);
                    fetchCategory();
                }} />
            </DynamicModal>
        </div>
    );
};

export default Category;
