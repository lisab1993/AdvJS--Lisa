//  Part 1
const name = 'Lisa'
let age = 28
age += 1
// console.log(name, 'name')
// console.log(age, 'age after being increased')


//  Part 2
function add(num1, num2) {
    return num1 + num2
}
// console.log(add(2, 3), 'add func')

const hello = (name) => {
    return `Hello there ${name}! Have a great day`
}
// console.log(hello('Lisa'))

const isEven = (num) => {
    if (num%2 === 0) {
        return true
    } else {
        return false
    }
}
// console.log(isEven(5))

//  Part 3
const animals = ['dog', 'cat', 'llama', 'bird']

for (animal of animals) {
    console.log(animal.toUpperCase())
}

let kittyIndex = animals.indexOf('cat')
animals.splice(kittyIndex, kittyIndex)
console.log(animals, 'without cat')
animals.push('opossum')


//Part 4