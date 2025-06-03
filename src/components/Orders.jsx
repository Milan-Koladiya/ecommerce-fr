import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import Slidebar from './Slidebar';
import '../css/orders.css'

const Orders = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchUsersWithOrders = async () => {
      try {
        const res = await fetch('http://localhost:5500/orders/userOrders', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }

        const data = await res.json();
        setUsers(data.data || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (token) {
      fetchUsersWithOrders();
    }
  }, [token]);

  return (
    <div className="d-flex">
      <div className="sidebar-container">     
         <Slidebar />
      </div>

      <div className="content-area p-4">
        <h2 className="mb-4">Users and Their Orders</h2>
        <Accordion defaultActiveKey="0">
          {users.map((user, index) => (
            <Accordion.Item eventKey={index.toString()} key={user.id}>
              <Accordion.Header>
                {user.first_name} {user.last_name}
              </Accordion.Header>
              <Accordion.Body>
                {user.order.length > 0 ? (
                  <ListGroup>
                    {user.order.map(order => (
                      <ListGroup.Item key={order.id}>
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>Status:</strong> {order.status} <br />
                        <strong>Amount:</strong> ${order.total_amount} <br />
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
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Orders;
