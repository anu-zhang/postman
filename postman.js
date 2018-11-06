var arrayObj = [];

var app_id = pm.environment.get("app_id");
console.log('app_id',app_id);
arrayObj.push({"app_id":app_id});

var time = Date.parse(new Date()).toString().substr(0,10);
console.log('time',time);
pm.environment.set("time", time);
arrayObj.push({"time":time});

var app_key =  pm.environment.get("app_key");
console.log('app_key',app_key);


var datalist= [
    {'customer_id':95744257},
    {'cpsId':2},
    {'company_id':85}
];

for ( var i = 0; i < datalist.length; i++){
    console.log();
    pm.variables.set(Object.keys(datalist[i])[0], Object.values(datalist[i])[0]);
    var value = pm.variables.get(Object.keys(datalist[i])[0]);
    arrayObj.push(datalist[i]);
}

var str = 'http://192.168.50.1:10609/api/md5?';
for ( var i = 0; i < arrayObj.length; i++){
    str += Object.keys(arrayObj[i])[0]+'=';
    str += Object.values(arrayObj[i])[0]+'&';
}


pm.sendRequest(str, function (err, response) {
    pm.environment.set("sign_key", response.json().result);
});
