
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

    //  Sortable(s) for Step2 of Pricing Template Creation
    Sortable.create(byId('pricing__template__creation__step2__toolbox'), {
        group: {
            name: "pricing__template__creation__step2",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('pricing__template__creation__step2__workbench'), {
        group: {
            name: "pricing__template__creation__step2",
            pull: false,
            put: true
        },
        animation: animation__speed,
    });

    //  Sortable(s) for Step3 of Pricing Template Creation
    Sortable.create(byId('pricing__template__creation__step3__toolbox'), {
        group: {
            name: "pricing__template__creation__step3",
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: animation__speed,
    });
    Sortable.create(byId('pricing__template__creation__step3__workbench'), {
        group: {
            name: "pricing__template__creation__step3",
            pull: false,
            put: true
        },
        animation: animation__speed,
        // On added item, launch modal
        onAdd: function (e) {
            var itemEl = e.item;
            var itemID = itemEl.getAttribute("id");
            var itemModal = "#" + itemID + "_modal";
            $(itemModal).modal('show');
        },
    });

    //  Sortable(s) for DealerOn Query Language
    Sortable.create(byId('querylang__toolbox'), {
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
        // onAdd: function (e) {
        //     var itemEl = e.item;
        //     var itemID = itemEl.getAttribute("id");
        //     var itemModal = "#" + itemID + "_modal";
        //     $(itemModal).modal('show');
        // },
    });
})();


