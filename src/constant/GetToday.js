const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const date2 = new Date().toLocaleTimeString();
    const newdate = day + "-" + month + "-" + year + " " + date2;
    export default newdate