import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import { Spinner } from 'react-bootstrap';
import useOrder from '../../hooks/useOrder';
import Alert from '../../components/common/alert';
import type { IUserWithOrders } from '../../types/orderType';
const ViewOrder = () => {
  const [users, setUsers] = useState<IUserWithOrders[]>([]);

  const {
    viewOrder,
    loading,
    alertType,
    message,
    closeAlert,
  } = useOrder();

  useEffect(() => {
    const fetchOrders = async () => {
      const res:any = await viewOrder();
      if (res?.payload) {
        setUsers(res.payload); 
          }
    };

    fetchOrders();
  }, []);

  return (
    <div className="ml-50 d-flex">
     

      <div className="content-area p-4 w-100">
        {alertType && message && (
          <Alert type={alertType} message={message} showButton={true} closeAlert={closeAlert} />
        )}

        <h2 className="mb-4">Users and Their Orders</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Accordion defaultActiveKey="0">
            {users.length > 0 ? (
              users.map((user, index) => (
                <Accordion.Item eventKey={index.toString()} key={user.id}>
                  <Accordion.Header>
                    {user.first_name} {user.last_name}
                  </Accordion.Header>
                  <Accordion.Body>
                    {user.order && user.order.length > 0 ? (
                      <ListGroup>
                        {user.order.map((order) => (
                          <ListGroup.Item key={order.id}>
                            <strong>Order ID:</strong> {order.id} <br />
                            <strong>Status:</strong> {order.status} <br />
                            <strong>Amount:</strong> {order.total_amount} <br />
                            <strong>Payment Ref:</strong> {order.payment_reference} <br />
                            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <p>No orders found for this user.</p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <p>No users with orders found.</p>
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
