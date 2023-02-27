import { chain, gte, lte } from "lodash";

export default class ChartUtils {
  static getDeviceLabel(records) {
    const days = records.map((item) => item.timestamp.toDate().getDate());
    return Array.from(new Set(days.sort((a, b) => a - b)));
  }

  static getVoltage(records, name) {
    const label = [];
    const data = {};
    records.forEach((record) => {
      const recordDate = record.timestamp.toDate();
      if (!!data[recordDate.getDate()]) {
        data[recordDate.getDate()] += record[name];
      } else {
        data[recordDate.getDate()] = record[name];
      }
      label.push(recordDate.getDate());
    });
    return {
      label: Array.from(new Set(label)),
      data: Object.keys(data).map((key) => {
        const length = label.filter((l) => l == key).length;
        return data[key] / length;
      }),
    };
  }
  static filter(data = [], startDate, endDate) {
    return chain(data)
      .filter(({ timestamp }) => {
        const recordDate = timestamp.toDate();
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
        return gte(recordDate, startDate) && lte(recordDate, endDate);
      })
      .value();
  }

  static getAvg(records = [], name) {
    if (records.length === 0) return 0;
    const sum = records
      .filter((record) => record[name])
      .map((record) => record[name])
      .reduce((prev, curr) => prev + curr, 0);
    return String((sum / records.length).toFixed(2));
  }
}
