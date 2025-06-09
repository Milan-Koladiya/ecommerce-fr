import React from 'react';
import useDashboard from '../hooks/useDashboard';
import { Card, Spinner } from 'react-bootstrap';
import '../css/dashboard.css';

const Dashboard = () => {
  const { loading, data } = useDashboard();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="mt-10 dashboard-container">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <Card className="dashboard-card border-primary">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="fs-4 fw-bold">{data.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4 mb-3">
          <Card className="dashboard-card border-success">
            <Card.Body>
              <Card.Title>Total Categories</Card.Title>
              <Card.Text className="fs-4 fw-bold">{data.totalCategories}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4 mb-3">
          <Card className="dashboard-card border-warning">
            <Card.Body>
              <Card.Title>Total Subcategories</Card.Title>
              <Card.Text className="fs-4 fw-bold">{data.totalSubcategories}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
