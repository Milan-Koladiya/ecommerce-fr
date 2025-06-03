import React from 'react'
import { Form,Button} from 'react-bootstrap'
const AddProduct = () => {
    return (
        <div>

            <Form>
                <Form.Group controlId="productName">
                    <Form.Label>Subcategory Name</Form.Label>
                    <Form.Control type="text" value={name} />
                </Form.Group>

                <Form.Group controlId="categorySelect" className="mt-3">
                    <Form.Label>Category</Form.Label>
                    
                </Form.Group>


                <Form.Group controlId="subcategorySelect" className="mt-3">
                    <Form.Label>Category</Form.Label>
                   
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Add Subcategory
                </Button>
            </Form>
        </div>
    )
}

export default AddProduct
