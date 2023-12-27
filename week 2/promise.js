//Apporoach-1
function myOwnSetTimeout(fn,duration){
    setTimeout(fn,duration);
}

myOwnSetTimeout(()=>{
console.log("hi there");
},1000);


//Approach-2

function promisifiedMyOwnSetTimeout(duration){
    return new Promise(function(resolve){
        setTimeout(resolve,duration);
    });
}



promisifiedMyOwnSetTimeout(10).then(()=>{
    console.log("Hello I am using promises");
})


