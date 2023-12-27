const p = new Promise(function (resolve , reject){
    setTimeout(()=>{
    resolve("Promise resolved");
    },10000)
});


async function handlePromise(){
    console.log("Hello World !!!!");
    
    const val = await p;
    console.log("Namaste Javascript 1.!!!");
    console.log(val);

    const val2 = await p;
    console.log("Namaste Javascript 2.!!!");
    console.log(val2);
}

handlePromise();