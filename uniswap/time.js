function time(){
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10)
    console.log(Date.now())
    console.log(deadline)
}

time()