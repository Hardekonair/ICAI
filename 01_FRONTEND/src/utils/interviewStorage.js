import { openDB } from "idb";

const DB_NAME = "InterviewAI";
const DB_VERSION = 1;

const SESSION_STORE = "session";
const RECORDING_STORE = "recording";

/*
=====================================================
DATABASE STRUCTURE

InterviewAI
│
├── session
│
│   {
│      userId,
│      questionId,
│      question,
│      createdAt
│   }
│
└── recording
    {
      transcript,

      videoBlob,

      duration,

      createdAt,
      startedAt,
      endedAt,

      updatedAt
    }

=====================================================
*/

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

/* =====================================================
   SESSION STORE
===================================================== */

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

/* =====================================================
   RECORDING STORE
===================================================== */

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

/* =====================================================
   DRAFT HELPERS
===================================================== */

export async function getInterviewDraft() {

  const session =
    await getSession();

  const recording =
    await getRecording();

  return {
    session,
    recording
  };
}

export async function clearInterviewDraft() {

  await clearSession();

  await clearRecording();

}
