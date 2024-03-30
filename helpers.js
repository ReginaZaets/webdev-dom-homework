export const getDate = () => {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minute = currentDate.getMinutes();
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return date + '.' + month + '.' + year + ' ' + hours + ':' + minute;
  };

  export const commentDate = new Date().toLocaleDateString('default', {year: '2-digit', day: '2-digit', month: '2-digit'}) + " " + new Date().toTimeString();