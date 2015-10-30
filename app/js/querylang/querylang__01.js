//
//
//
//
//  Remove items in workbench on clicking "x"
$(document).on("click", ".sortable-remove", function() {
    $(this).parent('.sortable').remove();
});
//  Remove all items in workbench on clicking "clear all"
$(".sortable-remove-all").on("click", function() {
    $('.sortable-workbench').empty();
    //  Replace with function
    $(".btn[data-type='operator']").removeClass("sortable-is-enabled");
    $(".btn[data-type='parameter']").removeClass("sortable-is-enabled");
    $(".btn[data-type='value']").removeClass("sortable-is-enabled");
    $(".btn[data-type='joiner']").removeClass("sortable-is-enabled");
});
//
//
//
//
//  Check possible tags
function checkPossibleTags(el) {
    //  Config
    var toggleClass = "sortable-is-enabled";
    var toolboxClass = ".sortable-toolbox";

    //  Reset Tag ** refactor... i kno
    $(".sortable-finished").on("click", function() {
        //  Replace with function
        $(".btn[data-type='operator']").removeClass(toggleClass);
        $(".btn[data-type='parameter']").removeClass(toggleClass);
        $(".btn[data-type='value']").removeClass(toggleClass);
        $(".btn[data-type='joiner']").removeClass(toggleClass);
    });

    //  Replace with function
    $(".btn[data-type='operator']").removeClass(toggleClass);
    $(".btn[data-type='parameter']").removeClass(toggleClass);
    $(".btn[data-type='value']").removeClass(toggleClass);
    $(".btn[data-type='joiner']").removeClass(toggleClass);

    //  Get this data-type
    var this__type = $(el).data("type");

    //  Display next possible element for this data-type
    if (this__type == "parameter") {
        var this__accepts = $(el).data("accepts");
        $.each( this__accepts, function(i, val) {
            $(toolboxClass + " .btn[data-type='operator'][data-id='" + val + "']").addClass(toggleClass);
        });
    }

    if (this__type == "joiner") {
        $(toolboxClass + " .btn[data-type='parameter']").addClass(toggleClass);
    }

    if (this__type == "operator") {
        $(toolboxClass + " .btn[data-type='value']").addClass(toggleClass);
    }

    if (this__type == "value") {
        $(toolboxClass + " .btn[data-type='joiner']").addClass(toggleClass);
    }
}

(function () {
    'use strict';

    var byId = function (id) { return document.getElementById(id); },

        loadScripts = function (desc, callback) {
        var deps = [], key, idx = 0;

        for (key in desc) {
            deps.push(key);
        }

        (function _next() {
            var pid,
            name = deps[idx],
                script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = desc[deps[idx]];

            pid = setInterval(function () {
                if (window[name]) {
                    clearTimeout(pid);

                    deps[idx++] = window[name];

                    if (deps[idx]) {
                        _next();
                    } else {
                        callback.apply(null, deps);
                    }
                }
            }, 30);

            document.getElementsByTagName('head')[0].appendChild(script);

        })()
    },

    console = window.console;


    if (!console.log) {
        console.log = function () {
            alert([].join.apply(arguments, ' '));
        };
    }

    //  Global Animation Speed
    var animation__speed = 300;

    //  Sortable(s) for DealerOn Query Language
    Sortable.create(byId('querylang__toolbox-operator'), {
        group: {
            name: "querylang",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('querylang__toolbox-parameter'), {
        group: {
            name: "querylang",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('querylang__workbench'), {
        group: {
            name: "querylang",
            pull: false,
            put: true
        },
        animation: animation__speed,
        // On added item, launch modal
        onAdd: function (e) {
            var itemEl = e.item;
            checkPossibleTags(itemEl);
        },
    });
})();


