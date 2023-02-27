import { userSignOut } from "@/helper/redux/slice/auth.slice";
import { getCurrent, getDevices } from "@/helper/redux/slice/device.sliec";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);
  const { current, loading: deviceLoading } = useSelector(
    (state) => state.device
  );
  const logout = () => dispatch(userSignOut());
  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);
  return (
    <aside className="sidebar text-white">
      {!deviceLoading && (
        <>
          <div className="info" onClick={() => router.push("/")}>
            <div className="label">SignIn With:</div>
            <div className="email">{user?.email}</div>
          </div>
          <ul className="devices mt-3">
            {current?.map((item) => (
              <SidebarItem key={item} device={item} router={router} />
            ))}
          </ul>
          <Button
            className="p-button-danger w-full mt-auto"
            label="Sign out"
            loading={loading}
            icon="pi pi-sign-out"
            onClick={logout}
          />
        </>
      )}
    </aside>
  );
}

function SidebarItem({ device, router }) {
  return (
    <div
      className="device"
      key={device}
      onClick={() => router.push(`/devices/${device}`)}
    >
      {device}
    </div>
  );
}
