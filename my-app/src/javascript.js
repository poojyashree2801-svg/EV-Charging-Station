 let name = "pooja";
const usn = "564";

name = "poojashri";

console.log(name);// op: poojashri
console.log(usn);// op: 564

let colors = ["red", "green","blue"];
console.log(colors);
colors.push("yellow");
console.log(colors[10]);// op: undefined


function getcolors() {
    colors.forEach((color) => {
        console.log(color);
    });
}

const names=["uma","shankar","kumar","reddy"];
const findnames = names.find((name) => name.length>4);

console.log(findnames);
//ternary operator
const name = "pooja";
const result = name == "pooja" ? "true" : "false";
console.log(result);

