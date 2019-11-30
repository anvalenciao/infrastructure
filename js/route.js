'use stict';

function Route(name, htmlName, defaultRoute) {
    try {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function (name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name; 
    }
}

// Loading
const $loader = document.getElementById("loader");

var pageInit = {
    home: function() {},
    orderVehicle: function() {    
        $loader.style.display = "block";
        fetch('https://www.backendmantenimiento.somee.com/api/orders/filterAll')
            .then(function(response) {
                return response.json().then(function(json) {
                    $loader.style.display = "none";
                    // process your JSON further
                    //console.log(json.data);
                    new Tabulator("#table-json", {
                        data:json.data,           //load row data from array
                        layout:"fitColumns",      //fit columns to width of table
                        responsiveLayout:"hide",  //hide columns that dont fit on the table
                        pagination:"local",       //paginate the data
                        paginationSize:7,         //allow 7 rows per page of data
                        initialSort:[             //set the initial sort order of the data
                            {column:"id", dir:"desc"},
                        ],
                        columns:[                 //define the table columns
                            {title:"id", field:"id"},
                            {title:"Estado", field:"serviceStatusName"},
                            {title:"Observación", field:"observation"}
                        ],
                    });
                });
        });
    }
}
