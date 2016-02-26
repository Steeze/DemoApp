function preloadTemplate($templateCache, templateName) {
var templates = {};
templates["templates/demo-app/home.html"] = "<div class=\"page-header-block\">\
    <div class=\"row\">\
        <div class=\"col-sm-9\">\
            <div class=\"page-header-block-title\">\
               Angular Sessions\
            </div>\
        </div>\
    </div>\
</div>\
<div class=\"panel panel-default\" >\
\
    <div class=\"panel-body\">\
\
        <div class=\"panel-body panel-list\" ng-hide=\"slips.length === 0\" >\
            <div class=\"list-group\">\
                <div class=\"list-group-item\" ng-repeat=\"session in results.sessions\">\
                    <div class=\"row\">\
                        <div class=\"col-sm-10\">\
                            <div class=\"row\">\
                                <h4>\
                                    <span ng-bind=\"session.name\"></span>\
                                </h4>\
                                <div>\
                                    {{sessions.abstract}}\
                                </div>\
\
                            </div>\
                        </div>\
                        <div class=\"col-sm-2\">\
                            <div class=\"row\">\
\
                                <div class=\"col-sm-12 text-right\" responsibility-show=\"ReceivePurchaseOrders >= $ACT\">\
                                    <button id=\"btnReceipt\" class=\"btn btn-default\">\
                                        Edit\
                                    </button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>\
\
\
";
templates["templates/demo-app/list.html"] = "<h2>List</h2>\
<pre>{{breweries | json}}</pre>";
$templateCache.put(templateName, templates[templateName]);
};