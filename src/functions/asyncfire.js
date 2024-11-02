import { useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { firestoreC } from "./fire";

const useVisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);

  const visitsRef = doc(firestoreC, "visits", "counter");

  // Fetch the current visit count from the database
  getDoc(visitsRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        setVisitCount(docSnap.data().count);
      } else {
        // If the document doesn't exist, initialize it with 0
        updateDoc(visitsRef, { count: 0 });
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });

  // Increment the visit count in the database
  updateDoc(visitsRef, { count: visitCount + 1 });

  return visitCount;
};

export default useVisitCounter;
