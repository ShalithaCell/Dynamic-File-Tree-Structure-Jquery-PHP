//ajax call to controller
$.ajax({
    url: 'controller.php',
    type: 'get',
    data: { "getFilePaths": ''},
    beforeSend: function(){

    },
    complete: function(){

    },
    success: function(response) {

        //create file array
        var files = Array();

        //fetch each paths from json
        $.each(JSON.parse(response), function (i, p) {
            files.push({webkitRelativePath: p});
        });

        var idcount = 0;
        var treeJSON = [];
        var idmap = {};

        //fetching paths by seperating '/'
        //more documentation - https://www.jstree.com/
        function add(dirs) {
            if (!dirs.length) return "#";
            var name = dirs.join("/");
            if (name in idmap) return idmap[name];
            var dir = dirs.pop();
            var parent = add(dirs);
            var id = "ajson" + ++idcount;
            treeJSON.push({
                id: id,
                parent: parent,
                text: dir
            });
            return idmap[name] = id;
        }
        for (var i = 0; i < files.length; ++i) {
            var name = files[i].webkitRelativePath;
            add(name.split("/"));
        }
        //console.log(treeJSON);
        $('#tree')
            .jstree({
                'core': {
                    'check_callback': true,
                    'data': function (node, cb) {
                        cb.call(this, treeJSON);
                    }
                }
            });
        var tree = $('#tree').jstree(true);
        tree.refresh();

    }
});