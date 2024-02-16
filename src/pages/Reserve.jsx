import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';

const Reserve = () => {
  return (
    <div className="main-container">
      <section className="reservation-form">
        <Form >
          <h2 className="mb-5">Reservation Form:</h2>
          <Row>
            <Col lg={6} md={7}>
              <Form.Group className="mb-3" controlId="client_name">
                <Form.Control required type="text" placeholder="Name of Client" className="form-control" name="client_name" />
              </Form.Group>
            </Col>
            <Col lg={6} md={7}>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control required type="text" placeholder="Description" className="form-control" name="description" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="contact">
                <Form.Control required type="text" placeholder="Contact" className="form-control" name="contact" />
              </Form.Group>
            </Col>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="appointment_date">
                <Form.Control required type="date" placeholder="Appointment Date" className="form-control" name="appointment_date" />
              </Form.Group>
            </Col>
            <Col lg={4} md={7}>
              <Form.Group className="mb-3" controlId="serviceId">
                <Form.Control as="select" required className="form-control" name="service_id">
                  <option value="">Select a service</option>
                  <option value="1">Inquiry</option>
                  <option value="2">Regular</option>
                  <option value="3">Premium</option>
                  <option value="2">Urgent Meeting</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className="submit-btn" type="submit">
            Submit
          </Button>
        </Form>
      </section>
    </div>
  );
}

export default Reserve