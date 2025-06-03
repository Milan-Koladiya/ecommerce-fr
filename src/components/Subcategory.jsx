import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Slidebar from './Slidebar'
import Table from 'react-bootstrap/Table'
import '../css/subcategory.css'
import { Button } from 'react-bootstrap'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DynamicDialog from './DynamicDialog'
import AddSubcategory from './AddSubcategory'

const Subcategory = () => {
    const [subcategory, setSubcategory] = useState([])
    const [modal, setModal] = useState(false)
    const token = useSelector((state) => state.auth.token)


    const fetchSubcategory = async () => {
        try {

            const res = await fetch('http://localhost:5500/subcategories/allsubcategory', {
                method: 'get',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!res.ok) {
                console.log(res.message)
                return
            }
            const data = await res.json()
            setSubcategory(data.data || [])
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            fetchSubcategory()
        }
    }, [token])

    return (


        <div className="subcategory ml-50 category-layout bg-">
            <Slidebar />
            <div className="main-content">
                <h1>Subcategory</h1>
                <div className='addButton'>
                    <Button onClick={() => setModal(true)} variant='primary'>+ Add SubCategory</Button>
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
                                        <td>{sub.category.name}</td>
                                        <td>{<MdDelete />}</td>
                                        <td>{<FaEdit />}</td>

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
            <DynamicDialog show={modal} onHide={() => setModal(false)} title={'Add Subcategory'}>
                <AddSubcategory onSuccess={() => {
                    setModal(false)
                    fetchSubcategory();
                }} />
            </DynamicDialog>
        </div>
    );


}

export default Subcategory
