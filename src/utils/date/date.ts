import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Sao_Paulo");

export const currentTime = dayjs().toDate();

export const afterDate = async (after: number) => {
  const request = await dayjs().isAfter(dayjs.unix(after));
  return request;
};
