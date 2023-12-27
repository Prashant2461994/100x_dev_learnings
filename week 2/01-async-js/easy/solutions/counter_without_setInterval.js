let count = 0;

function updateCounter() {
    count++;
    console.clear(); 
    console.log(`Counter: ${count}`);

    
    setTimeout(updateCounter, 1000);
}


updateCounter();
