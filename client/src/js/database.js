import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Add the content to the database
    await store.add({ content });

    // Complete the transaction
    await tx.complete;
    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Retrieve all content from the database
    const allContent = await store.getAll();

    // Complete the transaction
    await tx.complete;
    console.log('All content retrieved from the database:', allContent);

    return allContent;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return null;
  }
};

initdb();
