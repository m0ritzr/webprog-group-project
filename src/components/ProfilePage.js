import { React, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";

export default function SettingsPage() {
  const { settings, setSettings } = useData();
  
  const [selectedLocation, setSelectedLocation] = useState(
    settings.location || "10001",
  );
  const [selectedDistance, setSelectedDistance] = useState(
    settings.distance || "100",
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const changedSettings = { ...settings };
    changedSettings.location = selectedLocation;
    changedSettings.distance = selectedDistance;

    setSettings(changedSettings);
  }

  return (
    <div className="p-4">
      <h2>Filter and Settings</h2>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter US postal code"
                defaultValue={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                pattern="^\d{5}$" // A basic regex pattern for 5-digit US postal code
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Distance: max {selectedDistance} miles</Form.Label>
              <Form.Control
                type="range"
                min="0"
                max="500"
                step="10"
                name="distance"
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
              />
              <Form.Text className="text-muted">
                Slide to adjust the distadnce range.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Apply Profile Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}


