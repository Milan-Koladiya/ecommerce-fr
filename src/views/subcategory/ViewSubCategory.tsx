import  { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import DynamicModal from '../../components/dynamivModal'
import AddSubcategory from './AddSubcategory'
import useSubcategory from '../../hooks/useSubcategory'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import EditSubcategory from './EditSubcategory'
import type { ISubcategory } from '../../types/subcategory.type'

const ViewSubCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectSubcategory, setSelectSubcategory] = useState<ISubcategory|null>(null)
    const { viewSubcategory, closeAlert, deleteSubcategory } = useSubcategory();
    const [subcategory, setSubcategory] = useState<ISubcategory[]>([]);

    useEffect(() => {
        handleFetchSubCategories();
    }, []);

    const handleFetchSubCategories = async () => {
        const res:any = await viewSubcategory();
        if (res.payload) {
            setSubcategory(res.payload);
        }
    };

    const handleDelete = async (id:string) => {
        if (window.confirm("Are you sure you want to delete this subcategory?")) {
             await deleteSubcategory(id);
            handleFetchSubCategories();

        }
    };
    return (
        <div className="subcategory ml-50 category-layout" style={{ marginLeft: '180px', marginBlockStart: '50px', borderRadius: '10px', backgroundColor: '#f8f9fa', padding: '20px' }} >
            <div className="main-content">
                <h1>Subcategory</h1>
                <div className=' d-flex justify-content-end mb-3'>
                    <Button onClick={() => { closeAlert(); setShowModal(true) }} variant='primary'>+ Add SubCategory</Button>
                </div>
                <div className="table-container">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Subcategory</th>
                                <th>Category</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategory.length > 0 ? (
                                subcategory.map((sub, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{sub.name}</td>
                                        <td>{sub.category?.name || '—'}</td>
                                        <td>{<FaEdit onClick={() => { setSelectSubcategory(sub), setTimeout(() => setShowEditModal(true), 0) }} />}</td>
                                        <td>{<MdDelete onClick={() => handleDelete(sub.id)} />}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>No Subcategories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>

            <DynamicModal show={showModal} onHide={() => { closeAlert(), setShowModal(false) }} title={'Add Subcategory'}>
                <AddSubcategory onSuccess={() => {
                    setShowModal(false)
                    handleFetchSubCategories();
                }} />
            </DynamicModal>

            <DynamicModal show={showEditModal} onHide={() => { closeAlert(); setShowEditModal(false); setSelectSubcategory(null) }} title="Edit Subcategory">
                <EditSubcategory
                    subcategory={selectSubcategory}
                    onSuccess={() => {
                        setShowEditModal(false);
                        setSelectSubcategory(null)
                        handleFetchSubCategories();
                    }} />
            </DynamicModal>

        </div>
    );

}

export default ViewSubCategory
