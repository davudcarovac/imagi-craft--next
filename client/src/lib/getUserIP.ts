import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Dodaj like ili utisak ako korisnik nije do sada
export async function addUserLike(userId: string) {
  const likeDocRef = doc(db, "likes", userId);
  const likeDocSnap = await getDoc(likeDocRef);

  if (likeDocSnap.exists()) {
    // Već postoji lajk za tog korisnika
    return { success: false, message: "User already liked" };
  } else {
    // Dodaj novi dokument sa ID-em korisnika
    await setDoc(likeDocRef, {
      likedAt: new Date(),
    });
    return { success: true };
  }
}
