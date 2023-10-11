import { auth } from './firebase';
import { getIdToken } from 'firebase/auth';

async function fetchFromCloudFunction(endpoint, queryParams = {}) {
    const url = new URL(endpoint);
    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

    const idToken = await getIdToken(auth.currentUser);

    const response = await fetch(url.toString(), {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch from Cloud Function: ${endpoint}. Status: ${response.status}`);
    }

    return await response.json();
}

export async function fetchAnimal(id) {
    return fetchFromCloudFunction('https://fetchanimal-m65pqwyajq-uc.a.run.app', { id });
}

// accepted params: type, breed, size, gender, age, color, location, distance, page (results are paginated) 
export async function fetchAnimals(params) {
    return fetchFromCloudFunction('https://fetchanimals-m65pqwyajq-uc.a.run.app', params);
}

export async function fetchAnimalTypes() {
    return fetchFromCloudFunction('https://fetchanimaltypes-m65pqwyajq-uc.a.run.app'); 
}

export async function fetchAnimalBreeds(type) {
    return fetchFromCloudFunction('https://fetchanimalbreeds-m65pqwyajq-uc.a.run.app', { type });
}
