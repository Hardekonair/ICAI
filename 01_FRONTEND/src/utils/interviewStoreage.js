// import {openDB} from "idb";

// const DB_NAME = "InterviewAI";
// const STORE_NAME = "recordings";

// const dbPromise = openDB(DB_NAME, 1, {      //openDB() opens (or creates) an IndexedDB database.
//     upgrade(db) {
//         db.createObjectStore(STORE_NAME);
//     }
// });

// export async function saveInterview(data) {
//     const db=await dbPromise;   //After await, db becomes the actual database instance:

//     await db.put(
//         STORE_NAME,     // object store name
//         data,
//         "currentInterview"      // data
//     );
// }

// export async function getInterview() {
//     const db=await dbPromise;   //After await, db becomes the actual database instance:

//     return db.get(
//         STORE_NAME,
//         "currentInterview"
//     );
// }

// export async function clearInterview(){
//     const db= await dbPromise;

//     await db.delete(
//         STORE_NAME,
//         "currentInterview"
//     );
// }



import { openDB } from "idb";

const DB_NAME = "InterviewAI";
const DB_VERSION = 1;

const SESSION_STORE = "session";
const RECORDING_STORE = "recording";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {

    if (!db.objectStoreNames.contains(SESSION_STORE)) {
      db.createObjectStore(SESSION_STORE);
    }

    if (!db.objectStoreNames.contains(RECORDING_STORE)) {
      db.createObjectStore(RECORDING_STORE);
    }

  },
});

/* ==========================================
   SESSION FUNCTIONS
   Stores:
   {
      userId,
      question
   }
========================================== */

export async function saveSession(sessionData) {
  const db = await dbPromise;

  await db.put(
    SESSION_STORE,
    sessionData,
    "current"
  );
}

export async function getSession() {
  const db = await dbPromise;

  return db.get(
    SESSION_STORE,
    "current"
  );
}

export async function clearSession() {
  const db = await dbPromise;

  await db.delete(
    SESSION_STORE,
    "current"
  );
}

/* ==========================================
   RECORDING FUNCTIONS
   Stores:
   {
      transcript,
      videoBlob
   }
========================================== */

export async function saveRecording(recordingData) {
  const db = await dbPromise;

  await db.put(
    RECORDING_STORE,
    recordingData,
    "latest"
  );
}

export async function getRecording() {
  const db = await dbPromise;

  return db.get(
    RECORDING_STORE,
    "latest"
  );
}

export async function clearRecording() {
  const db = await dbPromise;

  await db.delete(
    RECORDING_STORE,
    "latest"
  );
}

/* ==========================================
   CLEAR ENTIRE DRAFT
========================================== */

export async function clearInterviewDraft() {
  await clearSession();
  await clearRecording();
}