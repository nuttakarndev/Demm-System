export default class ChartUtils {
  static getDeviceLabel(records) {
    const days = records.map((item) => item.timestamp.toDate().getDate());
    return Array.from(new Set(days.sort((a, b) => a - b)));
  }
}
