import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceKey = require("./service_key.json");

let app: App;
const servicekey = serviceKey;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(servicekey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };