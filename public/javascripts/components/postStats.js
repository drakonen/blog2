"use strict";
function nextLetterCounter(text) {
    let matrix = {};
    let last = "";

    console.log("text", text);
    for (let current of text) {
        let lastChar = matrix[last];
        if (!lastChar) {
            matrix[last] = {};
        }

        if (!matrix[last][current]) {
            matrix[last][current] = 0;
        }
        matrix[last][current] = matrix[last][current] + 1;

        last = current;
    }

    return matrix;
}

// {
//     'a': { 'b': 1 },
// }


function getPostStats(post) {
    var nextLetterCount = nextLetterCounter(post.body);

    return { nextLetterCount };
}

function createTree(data) {

    let d = {"name": "root", children: []};
    let root = d.children;

    for (let c in data) {
        let children = [];
        for (let cc in data[c]) {
            children.push({
                "name": cc,
                "count": data[c][cc]
            })
        }
        root.push({
            "name": c,
            "children":	children
        });
    }

    return d;
}



class nextLetterer {
    constructor(elem, data) {
        this.width = 400;
        this.height = 400;

        this.data = data;
        this.svg = d3.select(elem)
            .attr("width", this.width)
            .attr("height", this.height);
        let transform = `translate(${this.width / 2}, ${this.height / 2})`;
        console.log(transform);

        this.canvas = this.svg.append("g")
            .attr("transform", transform)
    }

    getMinMaxFromTree(treeData) {
        let min = Infinity;
        let max = -Infinity;

        treeData.each((node) => {
            min = d3.min([min, node.data.count]);
            max = d3.max([max, node.data.count]);
        });

        return [min, max];

    }

    render() {
        let styles = {
            linear: {
                project: function (x, y) {
                    return [x, y];
                },
                tree: d3.tree()
                    .size([this.width, this.height]),
                render: function (selection) {

                }

            },

            radial: {
                project: function (x, y) {
                    var angle = x / 180 * Math.PI, radius = y;
                    return [radius * Math.cos(angle), radius * Math.sin(angle)];
                },
                tree: d3.tree()
                    .size([360, 170]), // rotation and radius
                render: function (selection) {
                    console.log("selection", selection.size());
                    selection.attr("transform", function (d) {
                        console.log("d", d)
                        return `rotate(${d.x}), translate(${d.y}, 0) rotate(-${d.x})`
                    })
                }
            }

        }

        // let style = "linear";
        let style = "radial";

        let project = styles[style].project;
        this.tree = styles[style].tree;

        let treeData = d3.hierarchy(createTree(this.data));
        this.tree(treeData);

        let [min, max] = this.getMinMaxFromTree(treeData);
        console.log("min", min, max);

        let fontSizeScale = d3.scaleLinear().domain([min, max]).range([12, 20]);




        let links = this.canvas.selectAll(".link").data(treeData.links());

        links
            .enter()
                .append("path")
                .attr("class", "link")
            .merge(links)
                .attr("d", function(d) {
                    return "M" + project(d.source.x, d.source.y)
                        + "C" + project(d.source.x, (d.source.y + d.target.y) / 2)
                        + " " + project(d.target.x, (d.source.y + d.target.y) / 2)
                        + " " + project(d.target.x, d.target.y);
                })
                .attr("stroke", "#ccc")
                .attr("stroke-width", "1")
                .attr("fill", "none")

        let nodes = this.canvas.selectAll("text").data(treeData.descendants());

        nodes.enter()
            .append("text")
                .text(function (d) { return d.data.name; })
                .attr("font-size", function (d) {
                    return fontSizeScale(d.data.count);
                })
                .call(styles[style].render)
                .attr("text-anchor", "middle")


    }

}

angular.module('blog2')
    .directive('postStats', function() {
        return {
            template:
                `<svg class="postStats"></svg>`,
            scope: {
                post: '=post'
            },
            link: function (scope, element, attrs) {
                let unwrappedEl = element[0]; // jqlite is not awesome, lets use the browser instead
                let svgEl = unwrappedEl.querySelector("svg.postStats");
                let post = scope.post;
                let stats = getPostStats(post);
                let nextLetterVis = new nextLetterer(svgEl, stats.nextLetterCount);


                nextLetterVis.render();
            }
        };
    });


// angular
//     .module('blog2')
//     .component('postStats', {
//         template:
//             `<svg class="postStats"></svg>`,
//         controller: function postStats() {
//             debugger;
//             let stats = getPostStats(this.post);
//             let nextLetterVis = new nextLetterer(stats.nextLetterCount);
//
//
//         },
//         bindings: {
//             post: '='
//         }
//     });
