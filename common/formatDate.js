
/**
 * toTwo - 将小于0的数变成00格式
 *
 * @param  {type} val description
 * @return {type}     description
 */
function toTwo(val) {
    if(val < 10){
        return "0" + val.toString();
    }
    return val;
}

function formatData(date){
    var d = new Date(date);
    var ret = [];
    ret.push(d.getFullYear());
    ret.push("-");
    ret.push(toTwo(d.getMonth()+1));
    ret.push("-");
    ret.push(toTwo(d.getDate()));
    ret.push(" ");
    ret.push(toTwo(d.getHours()));
    ret.push(":");
    ret.push(toTwo(d.getMinutes()));
    ret.push(":");
    ret.push(toTwo(d.getSeconds()));
    return ret.join("");
}

module.exports = formatData;
