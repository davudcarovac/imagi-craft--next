import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

export default function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem("anonUserId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("anonUserId", id);
    }
    setUserId(id);
  }, []);

  return userId;
}
