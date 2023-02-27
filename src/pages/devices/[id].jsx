import Page from "@/component/Page";
import { useRouter } from "next/router";
import { Chart } from "primereact/chart";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import PrivateRoute from "@/component/PrivateRouter/PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { TabMenu } from "primereact/tabmenu";
import { getRecords } from "@/helper/redux/slice/device.sliec";
import ChartUtils from "@/helper/utils/ChartUtils";
import { useFormik } from "formik";
import { date, object } from "yup";
import DateUtils from "@/helper/utils/DateUtils";
import useVoltage from "@/helper/hook/useVoltage";
import { DateTime } from "luxon";
import useCurrent from "@/helper/hook/useCurrent";
import usePower from "@/helper/hook/usePower";
const Device = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [active, setActive] = useState(0);
  const { records } = useSelector((state) => state.device);
  const [filtered, setFiltered] = useState([]);
  const { voltageData, voltageOption } = useVoltage(filtered);
  const { currentData, currentOption } = useCurrent(filtered);
  const { powerData, powerOption } = usePower(filtered);
  const formik = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
    },
    validationSchema: object().shape({
      startDate: date()
        .nullable()
        .required("field required!")
        .typeError("field required!"),
      endDate: date()
        .nullable()
        .required("field required!")
        .typeError("field required!"),
    }),
    onSubmit: (values) => {
      setFiltered(ChartUtils.filter(records, values.startDate, values.endDate));
    },
  });
  useEffect(() => {
    if (id) {
      dispatch(getRecords(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (!formik.values.startDate && !formik.values.endDate) {
      setFiltered(ChartUtils.filter(records, new Date(), new Date()));
    }
  }, [records]);
  return (
    <PrivateRoute>
      <Page>
        <section className="flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2>Device: {id}</h2>
            <span>DateTime (Today): {DateUtils.getCurrent()}</span>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            className="flex align-items-center gap-3"
          >
            <div className="relative">
              <Calendar
                showIcon
                placeholder="Start Date"
                className={formik.errors.startDate && "p-invalid"}
                value={formik.values.startDate}
                name="startDate"
                dateFormat="dd/mm/yy"
                onChange={formik.handleChange}
                maxDate={formik.values.endDate}
              />
              {formik.errors.startDate && (
                <small
                  className="text-red-500 absolute"
                  style={{ width: "100%", bottom: "-20px", left: "5px" }}
                >
                  {formik.errors.startDate}
                </small>
              )}
            </div>
            <div className="relative">
              <Calendar
                showIcon
                placeholder="End Date"
                className={formik.errors.endDate && "p-invalid"}
                value={formik.values.endDate}
                name="endDate"
                dateFormat="dd/mm/yy"
                onChange={formik.handleChange}
                minDate={formik.values.startDate}
              />
              {formik.errors.endDate && (
                <small
                  className="text-red-500 absolute"
                  style={{ width: "100%", bottom: "-20px", left: "5px" }}
                >
                  {formik.errors.endDate}
                </small>
              )}
            </div>
            <div className="flex gap-1">
              <Button icon="pi pi-search" type="submit" />
              <Button
                icon="pi pi-refresh"
                type="reset"
                className="p-button-secondary"
              />
            </div>
          </form>
        </section>
        <section>
          <div className="grid">
            <div className="col-4">
              <h4>Voltage (avg)</h4>
              <div>{ChartUtils.getAvg(filtered, "voltage")}</div>
            </div>
            <div className="col-4">
              <h4>Current (avg)</h4>
              <div>{ChartUtils.getAvg(filtered, "current")}</div>
            </div>
            <div className="col-4">
              <h4>Power (avg)</h4>
              <div>{ChartUtils.getAvg(filtered, "power")}</div>
            </div>
          </div>
        </section>
        <section>
          <TabMenu
            model={[
              { label: "Voltage" },
              { label: "Current" },
              { label: "Power" },
            ]}
            onTabChange={(e) => setActive(e.index)}
            activeIndex={active}
          />
          <div className="grid mt-3">
            <div className="col-12">
              {active === 0 && (
                <Chart type="line" data={voltageData} options={voltageOption} />
              )}
              {active === 1 && (
                <Chart type="line" data={currentData} options={currentOption} />
              )}
              {active === 2 && (
                <Chart type="line" data={powerData} options={powerOption} />
              )}
            </div>
          </div>
        </section>
        <section>
          <DataTable
            responsiveLayout="stack"
            value={filtered}
            paginator
            rowsPerPageOptions={[10, 25, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rows={10}
          >
            <Column
              field="timestamp"
              header="Timestamp"
              body={(record) => (
                <span>
                  {DateTime.fromJSDate(record.timestamp.toDate()).toFormat(
                    "dd/MM/yyyy hh:mm"
                  )}
                </span>
              )}
            ></Column>
            <Column field="voltage" header="Voltage"></Column>
            <Column field="current" header="Current"></Column>
            <Column
              field="power"
              header="Power"
              align="center"
              body={(record) => record.power || "-"}
            ></Column>
          </DataTable>
        </section>
      </Page>
    </PrivateRoute>
  );
};

export default Device;
