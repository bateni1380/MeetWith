
function farsiField(text){
    if(text == "Applied Mathematics"){
        return("ریاضی کاربردی");
    }else if(text == "Pure Mathematics"){
        return("ریاضی محض");
    }else if(text == "Computer science"){
        return("علوم کامپیوتر");
    }else if(text == "Statistics"){
        return("آمار");
    }
    return("همه");
}

function farsiDegree(text){
    if(text == "BA"){
        return("کارشناسی");
    }else if(text == "MA"){
        return("کارشناسی ارشد");
    }else if(text == "DR"){
        return("دکترا");
    }
    return(text);
}

function farsiMHDegree(text){
    if(text == "P1"){
        return("استاد");
    }else if(text == "P2"){
        return("دانشیار");
    }else if(text == "P3"){
        return("استاد");
    }
    return(text);
}

function farsiUni(text){
    if(text == "AUT"){
        return("دانشگاه صنعتی امیرکبیر");
    }
    return(text);
}

function filterMeetingFarsi(text){
    if(text == "past"){
        return("جلسات گذشته");
    }else if(text == "toDay"){
        return("جلسات امروز");
    }if(text == "future"){
        return("جلسات آینده");
    }
    return ("");
}

function dateFarsi(year , month , date){
    var d = new Date();
    d.setFullYear(year);
    d.setMonth(month-1);
    d.setDate(date);
    var s = d.toLocaleDateString('fa-IR');
    var res = '';
    var i = 0;
    for(i = 0; i < s.length ; i++){
        if(s.substring(i,i+1) == '۰'){res = res + '0';}
        else if(s.substring(i,i+1)=='۱'){res = res + '1';}
        else if(s.substring(i,i+1)=='۲'){res = res + '2';}
        else if(s.substring(i,i+1)=='۳'){res = res + '3';}
        else if(s.substring(i,i+1)=='۴'){res = res + '4';}
        else if(s.substring(i,i+1)=='۵'){res = res + '5';}
        else if(s.substring(i,i+1)=='۶'){res = res + '6';}
        else if(s.substring(i,i+1)=='۷'){res = res + '7';}
        else if(s.substring(i,i+1)=='۸'){res = res + '8';}
        else if(s.substring(i,i+1)=='۹'){res = res + '9';}
        else{res = res + s.substring(i,i+1);}
    }
    return res;
}

export {farsiField, farsiDegree, farsiUni, filterMeetingFarsi, farsiMHDegree , dateFarsi}
