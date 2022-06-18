import React from 'react';
import Card from '@mui/material/Card';
import Col from 'react-bootstrap/Col';

const OtherUser = ({user}) => (

  <Col xs={12} md={6} lg={4} key={user.id}>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{user}</Card.Title>
        <Card.Text>
          {user}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
)

export default OtherUser;