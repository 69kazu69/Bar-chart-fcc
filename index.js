let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"


let values

let response = fetch(url).then(res => res.json()).then(d => {
    d
    return d
})

window.onload = async() =>{
    let data = await response
    values = data.data
    console.log(values)
    drawCanvas()
    generateScales()
    drawbars()
    generateAxis()
    
} 

let heightScale//Scale to get the height of the bars
let xScale//Scale for knowing where the baar wiil be
let xAxisScale//Scale for the x axis
let yAxisScale //Scale for the y axis

let width = 800
let height = 600
// dimension of the canvas
let padding = 40

let svg = d3.select('svg') //selects the first svg function in the html component.

let drawCanvas = () => {
    svg.attr("width", width);
    svg.attr("height", height);
}
//to generate a canvas of the given size

let generateScales = () => {

}
//it  is used to generate our scales

let drawbars = () => {

}
// to draw our bars

let generateAxis = () => {

}