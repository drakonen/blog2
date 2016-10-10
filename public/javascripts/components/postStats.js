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
            children.push({"name": cc})
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
        this.width = 300;
        this.height = 300;

        this.data = data;
        this.svg = d3.select(elem)
            .attr("width", this.width)
            .attr("height", this.height);
        let transform = `translate(${this.width / 2}, ${this.height / 2})`;
        console.log(transform);

        this.canvas = this.svg.append("g")
            .attr("transform", transform)
    }

    render() {

        this.tree = d3.tree()
            .size([350, 150])

        let treeData = d3.hierarchy(createTree(this.data));
        this.tree(treeData);

        treeData.each((node) => {
            this.canvas.append("text")
                .text(node.data.name)
                .attr("transform", function () {
                    return `rotate(${node.x}), translate(${node.y}, 0) rotate(-${node.x})`
                });
        })
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
