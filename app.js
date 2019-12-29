var data = [
    [ 400, 200 ],
    [ 210, 140 ],
    [ 722, 300 ],
    [ 70, 160 ],
    [ 250, 50 ],
    [ 110, 280 ],
    [ 699, 225 ],
    [ 90, 220 ]
];
var chart_width  = 800;
var chart_height = 400;
var padding      = 50;

// Create SVG Element
var svg = d3.select( '#chart' )
    .append( 'svg' )
    .attr( 'width', chart_width )
    .attr( 'height', chart_height );

// Create Scales
var x_scale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){
        return d[0];
    })])
    .range([ padding, chart_width - padding * 2 ]);

var y_scale = d3.scaleLinear()
    .domain([ 0, d3.max(data, function(d){
        return d[1];
    })])
    .range([ chart_height - padding, padding ]);

// clip Paths
svg.append('clipPath')
   .attr('id', 'plot-area-clip-path')
   .append('rect')
   .attr('x', padding)
   .attr('y', padding)
   .attr('width', chart_width - padding * 3)
   .attr('height', chart_height - padding * 2);

// Create Axis
var x_axis = d3.axisBottom( x_scale );
    svg.append( 'g' )
       .attr( 'class', 'x-axis' )
       .attr(
         'transform',
         'translate(0,' + (chart_height - padding ) + ')'
       )
       .call( x_axis );

var y_axis = d3.axisLeft( y_scale )
    .ticks( 5 );

    svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .attr(
        'transform',
        'translate( ' + padding + ', 0 )'
    )
    .call( y_axis );

// Create Circles
svg.append( 'g' )
   .attr('id', 'plot-area')
   .attr('clip-path', 'url(#plot-area-clip-path')
   .selectAll( 'circle' )
   .data( data )
   .enter()
   .append( 'circle' )
   .attr("cx", function(d) {
        return x_scale(d[0]);
   })
   .attr("cy", function(d) {
        return y_scale(d[1]);
   })
   .attr("r", 15)
   .attr( 'fill', '#7ebfc8' );

// Create Labels
var textLabel = svg.append('g');

textLabel.selectAll( 'text' )
   .data( data )
   .enter()
   .append( 'text' )
   .text(function(d) {
        return d.join( ',' );
   })
   .attr("x", function(d) {
        return x_scale(d[0]-27);
   })
   .attr("y", function(d) {
        return y_scale(d[1]-5);
   });

// Events
d3.select('button').on('click', function () {
    // Create random data
    data = []
    var new_num = Math.random() * 1000;
    for (i = 0; i < 8; i++) {
        var new_x = Math.floor(Math.random() * new_num);
        var new_y = Math.floor(Math.random() * new_num);
        data.push( [new_x, new_y] );
    }
    // console.log(data)
    // Update new scale
    x_scale.domain([ 0, d3.max(data, function(d) {
        return d[0];
    })]);
   
    y_scale.domain([0, d3.max(data, function(d) {
        return d[1];
    })]);

    var colors = ['#FF6B6C', '#7ebfc8', '#F7CA59', '#899878'];
    var colors_index = Math.floor(Math.random() * colors.length);
    // console.log(colors_index);

    // Appling new data to the graph
    svg.selectAll('circle')
        .data(data)
        .transition()
        .duration(1000)
        // .on('start', function() {
        //     d3.select(this)
        //       .attr('fill', '#F26D2D');
        //     // console.log('TransStarted!')
        // })
        .attr("cx", function(d) {
            return x_scale(d[0]);
        })
        .attr("cy", function(d) {
            return y_scale(d[1]);
        })
        // .on('end', function() {    
        //     d3.select(this)
              .transition()
              .duration(500)
              .attr('fill', colors[colors_index]);
        // });

    // Applying the new text into the graph
    textLabel.selectAll( 'text' )
        .data( data )
        .transition()
        .duration(1000)
        //.append( 'text' )
        .text(function(d) {
            return d.join( ',' );
        })
        .attr("x", function(d) {
            return x_scale(d[0]);
        })
        .attr("y", function(d) {
            return y_scale(d[1]);
        });  
   
    // Update axis
    svg.select('.x-axis')
       .transition()
       .duration(1000)
       .call(x_axis);

    svg.select('.y-axis')
       .transition()
       .duration(1000)
       .call(y_axis);
   
});