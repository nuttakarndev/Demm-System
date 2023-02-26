import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function useDevice(id) {
  const [devices, setDevices] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const devicesCollectionRef = collection(db, "devices");
      const data = await getDocs(devicesCollectionRef);
      setDevices(data.docs.map((doc) => doc.id));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (id) {
        const dataCollectionRef = collection(db, "devices", id, "data");
        const data = await getDocs(dataCollectionRef);
        setRecords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    })();
  }, [id]);
  return { devices, records };
}
