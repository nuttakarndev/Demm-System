import Page from "@/component/Page";
import PrivateRoute from "@/component/PrivateRouter/PrivateRouter";
import { useFunction } from "@/helper/context/AppProvider";
import { changeDevice, getDevices } from "@/helper/redux/slice/device.sliec";
import { PickList } from "primereact/picklist";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  const dispatch = useDispatch();
  const { devices, current } = useSelector((state) => state.device);
  const { settings, loading } = useFunction();
  useEffect(() => {
    dispatch(getDevices());
  }, [dispatch]);
  const onChange = (e) => {
    dispatch(changeDevice(e.target));
  };
  return (
    <PrivateRoute>
      <Page>
        <section>
          <h3>Welcome</h3>
          <span className="text-gray-700">
            {!loading && <>{settings.welcome_desc}</>}
          </span>
        </section>
        <section>
          <h4>Manage Devices</h4>
          <PickList
            source={devices.filter((d) => !current?.includes(d))}
            target={current || []}
            onChange={onChange}
            sourceHeader="Available"
            showSourceControls={false}
            showTargetControls={false}
            targetHeader="Selected"
            sourceStyle={{ height: "30rem" }}
            targetStyle={{ height: "30rem" }}
          />
        </section>
      </Page>
    </PrivateRoute>
  );
}
