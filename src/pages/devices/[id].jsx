import Page from "@/component/Page";
import { useRouter } from "next/router";
import { Chart } from "primereact/chart";
import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import useDevice from "@/helper/hook/useDevice";
import ChartUtils from "@/helper/utils/ChartUtils";
const Device = () => {
  const router = useRouter();
  const { id } = router.query;
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [filterDate, setFilterDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [voltage, setVoltage] = useState(true);
  const [current, setCurrent] = useState(true);
  const [power, setPower] = useState(true);
  const { records } = useDevice(id);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ChartUtils.getDeviceLabel(records),
      datasets: [
        voltage
          ? {
              label: "Voltage",
              data: [4, 3],
              fill: false,
              borderColor: documentStyle.getPropertyValue("--blue-500"),
              tension: 0.4,
            }
          : null,
        power
          ? {
              label: "Power",
              data: [1, 3],
              fill: false,
              borderColor: documentStyle.getPropertyValue("--yellow-500"),
              tension: 0.4,
            }
          : null,
        current
          ? {
              label: "Current",
              data: [3, 2],
              fill: false,
              borderColor: documentStyle.getPropertyValue("--pink-500"),
              tension: 0.4,
            }
          : null,
      ].filter((i) => i != null),
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
          position: "bottom",
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [records, voltage, power, current]);
  const handleReset = () => setFilterDate({ startDate: null, endDate: null });
  return (
    <Page>
      <section className="flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h2>Device: {id}</h2>
          <span>DateTime (Today): {new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex align-items-center gap-3">
          <Calendar
            showIcon
            placeholder="Start Date"
            value={filterDate.startDate}
            onChange={(e) =>
              setFilterDate((f) => ({ ...f, startDate: e.value }))
            }
            maxDate={filterDate.endDate}
          />
          <Calendar
            showIcon
            placeholder="End Date"
            value={filterDate.endDate}
            onChange={(e) => setFilterDate((f) => ({ ...f, endDate: e.value }))}
            minDate={filterDate.startDate}
          />
          <div className="flex gap-1">
            <Button icon="pi pi-search" />
            <Button
              icon="pi pi-refresh"
              className="p-button-secondary"
              onClick={handleReset}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="grid">
          <div className="col-4">
            <h4>Voltage (avg)</h4>
            <div>14.5</div>
          </div>
          <div className="col-4">
            <h4>Current (avg)</h4>
            <div>14.5</div>
          </div>
          <div className="col-4">
            <h4>Power (avg)</h4>
            <div>14.5</div>
          </div>
        </div>
      </section>
      <section>
        <div className="grid">
          <div className="col-12">
            <div className="flex gap-3 justify-content-center">
              <div className="field-checkbox">
                <Checkbox
                  inputId="voltage"
                  name="voltage"
                  value="voltage"
                  checked={voltage}
                  onChange={() => setVoltage((e) => !e)}
                />
                <label htmlFor="voltage">Voltage</label>
              </div>
              <div className="field-checkbox">
                <Checkbox
                  inputId="current"
                  name="current"
                  value="current"
                  checked={current}
                  onChange={() => setCurrent((e) => !e)}
                />
                <label htmlFor="current">Current</label>
              </div>
              <div className="field-checkbox">
                <Checkbox
                  inputId="power"
                  name="power"
                  value="power"
                  checked={power}
                  onChange={() => setPower((e) => !e)}
                />
                <label htmlFor="power">Power</label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        </div>
      </section>
      <section>
        <DataTable
          responsiveLayout="stack"
          value={records}
          paginator
          rowsPerPageOptions={[10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rows={10}
        >
          <Column
            field="timestamp"
            header="Timestamp"
            body={(record) => (
              <span>{record.timestamp.toDate().toLocaleString()}</span>
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
  );
};

export default Device;
