import React from "react";
import { Modal, Row, Button } from "react-bootstrap";

export default function ContactAnimalPopup({ show, contact, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contact.email && (
          <Row
            className="d-flex flex-row justify-content-between h-50"
            style={{ margin: "5px" }}
          >
            <span className="w-75">
              <strong>Email:</strong> {contact.email}
            </span>
            <Button
              variant="outline-primary"
              onClick={() => {
                window.location.href = `mailto:${contact.email}`;
              }}
              className="ml-2 w-25"
            >
              Send Email
            </Button>
          </Row>
        )}
        {contact.phone && (
          <Row
            className="d-flex flex-row justify-content-between h-50"
            style={{ margin: "5px" }}
          >
            <span className="w-75">
              <strong>Phone:</strong> {contact.phone}
            </span>
            <Button
              variant="outline-primary"
              onClick={() => {
                navigator.clipboard.writeText(contact.phone);
              }}
              className="ml-2 w-25"
            >
              Copy Phone
            </Button>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
