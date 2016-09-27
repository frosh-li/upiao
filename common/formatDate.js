
function formatData(date){
    var d = new Date(date);
    var ret = [];
    ret.push(d.getFullYear());
    ret.push("-");
    ret.push(d.getMonth()+1);
    ret.push("-");
    ret.push(d.getDate());
    ret.push(" ");
    ret.push(d.getHours());
    ret.push(":");
    ret.push(d.getMinutes());
    ret.push(":");
    ret.push(d.getSeconds());
    return ret.join("");
}

module.exports = formatData;
