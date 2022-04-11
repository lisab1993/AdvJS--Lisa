// Part 1
// In a file called hello-world.js write a program that contains 2 fat-arrow functions, one called speak and another called capitalize.
function capitalize(stringy) {
    //takes in a string and capitalizes the first letter
    const firstLetter = stringy[0]
    const firstLetterUpper = firstLetter.toUpperCase()
    const output = stringy.replace(firstLetter, firstLetterUpper)
    return output
}

function speak(name) {
    const nameUpper = capitalize(name)
    return `Hello there ${nameUpper}!`
}

function capitalizeMany(...words) {
    let output = words.map((word) => {
        return capitalize(word)
    })
    return output.join(' ')
}

console.log(capitalizeMany('hello', 'world', 'how', 'are', 'you'))

module.exports = {
    capitalize,
    speak
}