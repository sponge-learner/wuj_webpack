let root = document.getElementById("root")

root.style.width = "100px";
root.style.height = "100px"
root.style.background = "pink"
console.log(root)


fetch('http://localhost:3000/api/123').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})