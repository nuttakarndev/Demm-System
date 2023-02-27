import Page from "@/component/Page";
import PrivateRoute from "@/component/PrivateRouter/PrivateRouter";
import { changeDevice, getDevices } from "@/helper/redux/slice/device.sliec";
import { PickList } from "primereact/picklist";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  const dispatch = useDispatch();
  const { devices, current } = useSelector((state) => state.device);
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            possimus earum cupiditate aspernatur reprehenderit, molestiae
            corporis! Facere minima corrupti amet consequatur sapiente maiores
            est in id dolorum dicta, magni aut! Voluptates consequatur autem
            reiciendis vitae quos pariatur, consectetur quod hic?
          </span>
        </section>
        <section>
          <h4>Manage Devices</h4>
          <PickList
            source={devices.filter((d) => !current.includes(d))}
            target={current}
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
