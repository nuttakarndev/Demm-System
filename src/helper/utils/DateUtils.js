import { DateTime } from "luxon";

export default class DateUtils {
  static getCurrent(format = "dd MMMM yyyy") {
    return DateTime.now().toFormat(format);
  }
}
