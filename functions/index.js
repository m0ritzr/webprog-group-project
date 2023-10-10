const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const fetch = require('node-fetch');
const cors = require('cors');
const logger = require("firebase-functions/logger");

admin.initializeApp();

async function getPetfinderToken() {
    const db = admin.firestore();
    const docRef = db.collection('auth').doc('petfinder');
    const doc = await docRef.get();

    if (!doc.exists) {
        throw new Error("Petfinder document not found in Firestore.");
    }

    const { apiKey, apiSecret, token, token_expiry } = doc.data();

    if (token && token_expiry.toDate() > new Date()) {
        return token;
    }

    const petfinderResponse = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
    });

    if (!petfinderResponse.ok) {
        throw new Error("Failed to fetch token from Petfinder.");
    }

    const data = await petfinderResponse.json();
    const expiryDate = new Date(Date.now() + data.expires_in * 1000);
    await docRef.update({
        token: data.access_token,
        token_expiry: expiryDate
    });

    return data.access_token;
}

async function safeFetchJson(url) {
    const token = await getPetfinderToken();

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
    }

    return await response.json();
}

async function verifyToken(request) {
    if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
        throw new Error('Missing or malformed authorization header.');
    }

    const idToken = request.headers.authorization.split('Bearer ')[1];
    return await admin.auth().verifyIdToken(idToken);
}

const corsHandler = cors({ origin: true });

const fetchAnimal = onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            response.set('Access-Control-Allow-Origin', '*');
            response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
            response.set('Access-Control-Allow-Headers', '*');
            
            if (request.method === 'OPTIONS') {
                response.status(200).end();
                return;
            }

        await verifyToken(request);
        
            const { id } = request.query;
            const result = await safeFetchJson(`https://api.petfinder.com/v2/animals/${id}`);
            response.send(result);
        } catch (error) {
            logger.error("Error occurred:", error);
            response.status(403).send("Unauthorized");
        }
    });
});

const fetchAnimals = onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            response.set('Access-Control-Allow-Origin', '*');
            response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
            response.set('Access-Control-Allow-Headers', '*');

            if (request.method === 'OPTIONS') {
                response.status(200).end();
                return;
            }

            await verifyToken(request);
            
            const { type, breed, size, gender, age, color, location, distance, page } = request.query;
            const queryParams = new URLSearchParams();
            if (type) queryParams.append('type', type);
            if (breed) queryParams.append('breed', breed); 
            if (size) queryParams.append('size', size);
            if (gender) queryParams.append('gender', gender);
            if (age) queryParams.append('age', age);
            if (color) queryParams.append('color', color);
            if (location) queryParams.append('location', location);
            if (distance) queryParams.append('distance', distance);
            if (page) queryParams.append('page', page);
            const url = `https://api.petfinder.com/v2/animals?${queryParams.toString()}`;
            const result = await safeFetchJson(url);
            response.send(result);
        } catch (error) {
            logger.error("Error occurred:", error);
            response.status(403).send("Unauthorized");
        }
    });
});

const fetchAnimalTypes = onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            response.set('Access-Control-Allow-Origin', '*');
            response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
            response.set('Access-Control-Allow-Headers', '*');

            if (request.method === 'OPTIONS') {
                response.status(200).end();
                return;
            }
    
            await verifyToken(request);

            const result = await safeFetchJson('https://api.petfinder.com/v2/types');
            response.send(result);
        } catch (error) {
            logger.error("Error occurred:", error);
            response.status(403).send("Unauthorized");
        }
    });
});

const fetchAnimalBreeds = onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
        try {
            response.set('Access-Control-Allow-Origin', '*');
            response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
            response.set('Access-Control-Allow-Headers', '*');
            
            if (request.method === 'OPTIONS') {
                response.status(200).end();
                return;
            }

            await verifyToken(request);

            const { type } = request.query;
            const result = await safeFetchJson(`https://api.petfinder.com/v2/types/${type}/breeds`);
            response.send(result);
        } catch (error) {
            logger.error("Error occurred:", error);
            response.status(403).send("Unauthorized");
        }
    });
});

module.exports = {
    fetchAnimal,
    fetchAnimals,
    fetchAnimalTypes,
    fetchAnimalBreeds
};
