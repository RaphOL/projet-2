const hbs = require("hbs");
const dayjs = require("dayjs");
const { format } = require("morgan");

hbs.registerHelper("formatDateInput", function (date) {
  return dayjs(date).format("YYYY-MM-DDTHH:mm");
});

hbs.registerHelper("formatDate", function (date) {
  if (date){
    return dayjs(date).format("YYYY-MM-DD HH:mm");
  }
});

hbs.registerHelper("formatsimpleDate", function (date) {
  if (date){
    return dayjs(date).format("YYYY-MM-DD");
  }
});

hbs.registerHelper("minDate", function(){
  const today = new Date().now;
  return dayjs(today).format("YYYY-MM-DDTHH:mm");
});

hbs.registerHelper("setDate", function(){
  const today = new Date().now;
  return dayjs(today).format("YYYY-MM-DDTHH:mm");
});

hbs.registerHelper("CalcDuration", function(date1, date2){
  if(date2){
    var fromtime = dayjs(date1);
    var totime = dayjs(date2);
    return (totime.diff(fromtime, 'minute'));
  }
});


