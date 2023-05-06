import moment from "./moment";

export const parseDate = (date) => {
  return moment(date).format("dddd, D [de] MMMM [de] YYYY");
};
