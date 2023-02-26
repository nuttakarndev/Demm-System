import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "./layout.css";

import { db } from "./../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function MainLayout({ children }) {
  const router = useRouter();
  const [devices, setDevices] = useState([]);
  const devicesCollectionRef = collection(db, "devices");

  useEffect(() => {
    (async () => {
      const data = await getDocs(devicesCollectionRef);
      setDevices(data.docs.map((doc) => doc.id));
    })();
  }, []);

  let devicesLinks = devices.map((device) => {
    return (
      <li className="nav-item" key={device}>
        <Link
          href={`/device/${device}`}
          className={
            router.query.id === device ? "nav-link active" : "nav-link"
          }
          aria-current="page"
        >
          {device}
        </Link>
      </li>
    );
  });

  return (
    <main className="main">
      <Head>
        <title>DEMM System Dashboard</title>
      </Head>
      <div className="row">
        <div className="col-3">
          <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
            style={{ height: "100vh" }}
          >
            <Link
              href={`/device/${devices[0]}`}
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-4">Devices</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              {devicesLinks}
            </ul>
            <hr />
            <div className="dropdown">
              <button className="w-100 btn btn-lg btn-danger" type="submit">
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="col-9" style={{ maxHeight: "100vh", overflow: 'scroll' }}>{children}</div>
      </div>
    </main>
  );
}
