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
    //drawbars()
    generateAxis()
    drawbars()
    
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

let generateScales = () => { //it  is used to generate our scales


    heightScale = d3.scaleLinear()
    .domain([0, d3.max(values, (item) => { // it means the range of the input , in this case it is the gdp.
            return item[1]
    })])
    .range([0, height - 2*padding]) //range of the output in the method of visualisation and in this case it the height of the bars.





    xScale = d3.scaleLinear() // this scale will be used to position ourr bars in the x axis.
    .domain([0, values.length - 1]) // range of the input , this time it is going to be the total no. of in dexex in the values array.
    .range([padding, width - padding])// range of the output visualisation or the positions in the x axis in this case.

    const dates = values.map((item) => {
        return new Date(item[0])
    
    })



    xAxisScale = d3.scaleTime()
        .domain([d3.min(dates), d3.max(dates)])// the range of input i.e the dates of the records.
        .range([padding, width-padding])// the range of the output visualised i.e the x axis scale these arguments are the coordinates

        yAxisScale = d3.scaleLinear()
        .domain([0, d3.max(values, (items) => { // it means the range of the input , in this case it is the gdp.
            return items[1]
    })])
        .range([height - padding, padding])// the range of the visualised output or the starting and the ending coordinates of the scale
}




   
let generateAxis = () => {

            let xAxis = d3.axisBottom(xAxisScale)//function to create the x axis
            let yAxis = d3.axisLeft(yAxisScale)//function to create the y axis
        
            svg.append('g')
                .call(xAxis)
                .attr('id', 'x-axis')
                .attr('transform', 'translate(0, ' + (height - padding) + ')')  // this here is used to move the scale with the help of coordinates.

            svg.append('g')
                .call(yAxis)
                .attr("id", "y-axis")
                .attr("transform", ' translate( ' + (padding) + ' ,0) ')
            
        }
    
   
let drawbars =() => {

            let tooltip = d3.select('body')
                            .append('div')
                            .attr('id', 'tooltip')
                            .style('visibility', 'hidden')
                            .style('width', 'auto')
                            .style('height', 'auto')
        
            svg.selectAll('rect')
                .data(values)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('width', (width - (2 * padding)) / values.length)
                .attr('data-date', (item) => {
                    return item[0]
                })
                .attr('data-gdp', (item) => {
                    return item[1]
                })
                .attr('height', (item) => {
                    return heightScale(item[1])
                })
                .attr('x', (item, index) => {
                    return xScale(index)
                })
                .attr('y', (item) => {
                    return (height - padding) - heightScale(item[1])
                })
                .on('mouseover', (event, item) => {
                    tooltip.transition()
                        .style('visibility', 'visible')
        
                    tooltip.text(item[0])
        
                    document.querySelector('#tooltip').setAttribute('data-date', item[0])
                })
                .on('mouseout', (item) => {
                    tooltip.transition()
                        .style('visibility', 'hidden')
                })        
        }
        
// to draw our bars



