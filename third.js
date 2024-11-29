//harry = {
//
//data: "api notify",
//value: "note",
//developer: "flutter"
//
//}
//
//module.exports = harry;

function generateRandomNumber() {
return Math.floor(Math.random() * 100) +1;

}

function celciusToFahrenheit(celcius){
return (celcius *9)/5 +32;
}

module.exports = {generateRandomNumber,celciusToFahrenheit};