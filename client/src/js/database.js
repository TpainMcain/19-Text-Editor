import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the 'jate' objectStore already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // If not, create the 'jate' objectStore
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate DB Created');
    },
  });

// Function to save content to the database
export const putDb = async (content)  => {
    console.log('Attempting to PUT to the database...');
  
    // Establish a connection to the 'jate' database
    const contactDb = await openDB('jate', 1);
  
    // Initiate a new transaction with 'readwrite' access
    const tx = contactDb.transaction('jate', 'readwrite');
  
    // Select the 'jate' objectStore for interaction
    const store = tx.objectStore('jate');
  
    // Attempt to save the provided content to the store
    const request = store.put({ id: 1, value: content });
  
    // Wait for the save operation to complete and log the result
    const result = await request;
    console.log('Saved to the DB', result);
  };

// Function to retrieve all content from the database
export const getDb = async () => {
    console.log('Attempting to GET from the DB');
  
    // Establish a connection to the 'jate' database
    const contactDb = await openDB('jate', 1);
  
    // Initiate a new transaction with 'readonly' access
    const tx = contactDb.transaction('jate', 'readonly');
  
    // Select the 'jate' objectStore for interaction
    const store = tx.objectStore('jate');
  
    // Attempt to retrieve all data from the store
    const request = store.getAll();
  
    // Wait for the retrieval operation to complete and log the result
    const result = await request;
    console.log('Retrieved data', result);
    return result?.value;
  };
  
// Call the initdb function to ensure the database is ready
initdb();
