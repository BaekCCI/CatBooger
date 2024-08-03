import { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "@lib/firebase"; // 올바른 경로로 수정
import { useFirestoreQuery } from "@lib/useFirestoreQuery"; // 올바른 경로로 수정

export function useFirestoreQuery(query) {
  const [docs, setDocs] = useState([]);

  // Store current query in ref
  const queryRef = useRef(query);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!queryRef.current || !queryRef.current.isEqual(query)) {
      queryRef.current = query;
    }
  }, [query]);

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return;
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setDocs(data);
    });

    // Detach listener
    return unsubscribe;
  }, [queryRef]);

  return docs;
}
