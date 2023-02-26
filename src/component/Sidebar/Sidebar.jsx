import useDevice from "@/helper/hook/useDevice";
import { userSignOut } from "@/helper/redux/slice/auth.slice";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);
  const logout = () => dispatch(userSignOut());
  const { devices } = useDevice();
  return (
    <aside className="sidebar text-white">
      <div className="info" onClick={() => router.push("/")}>
        <div className="label">SignIn With:</div>
        <div className="email">{user?.email}</div>
      </div>
      <ul className="devices mt-3">
        {devices.map((item) => (
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
