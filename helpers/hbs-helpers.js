const hbs = require("hbs");
const dayjs = require("dayjs");

hbs.registerHelper("formatDateInput", function (date) {
  return dayjs(date).format("YYYY-MM-DDTHH:mm");
});

hbs.registerHelper("formatDate", function (date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
});

hbs.registerHelper("minDate", function(){
  const today = new Date().now;
  return dayjs(today).format("YYYY-MM-DDTHH:mm");
});

hbs.registerHelper("setDate", function(){
  const today = new Date().now;
  return dayjs(today).format("YYYY-MM-DDTHH:mm");
});

