var DateHelper = {
    fixDate(date){
        var d = new Date(date);
        var month = (d.getMonth() + 1).toString().length === 1 ? '0' + (d.getMonth() + 1).toString() : (d.getMonth() + 1);
        var day = (d.getDate() + 1).toString().length === 1 ? '0' + (d.getDate() + 1).toString() : (d.getDate() + 1);
        return d.getUTCFullYear() + '-' + month + '-' + day;
    },
    daysUntil (date){
        return Math.round(Math.abs(((new Date()).getTime() - date.getTime()) / (24*60*60*1000)));
    }
};
export default DateHelper;
