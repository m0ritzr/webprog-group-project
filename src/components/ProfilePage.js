import { React, useEffect, useState } from "react";
import { Form, Button, Card, Accordion } from "react-bootstrap";
import { useData } from "../dataContext";
import { useLoaderData } from "react-router";
import { fetchAnimalBreeds } from "../petfinder";

import 'bootstrap/dist/js/bootstrap.bundle.min';


function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

export default function SettingsPage() {
  const { settings, setSettings } = useData();
  
  const [selectedLocation, setSelectedLocation] = useState(
    settings.location || "10001",
  );
  const [selectedDistance, setSelectedDistance] = useState(
    settings.distance || "100",
  );

  return (
    <div className="p-4">
      <h2>Filter and Settings</h2>
      <Card className="mt-4">
        <Card.Body>
          <Outlet />
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
              Apply Filters
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}


