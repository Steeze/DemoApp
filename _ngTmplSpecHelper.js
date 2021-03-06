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
\
        <form class=\"form-horizontal\" ng-submit=\"addSession(addSessionForm.$valid)\" name=\"addSessionForm\" role=\"form\" novalidate>\
            <div class=\"form-group\">\
                <div class=\"row\">\
                    <div class=\"col-sm-3 control-label\">\
                        <label for=\"txtSessionName\">Session Name :</label>\
                    </div>\
                    <div class=\"col-sm-4\">\
                        <div class=\"controls\">\
                            <input id=\"txtSessionName\"\
                                   name=\"sessionName\"\
                                   type=\"text\"\
                                   ng-model=\"session.name\"\
                                   required\
                                   class=\"form-control\"\
                                   ng-maxlength=\"50\"/>\
                        </div>\
                        <div ng-if=\"addSessionForm.$submitted  || addSessionForm.sessionName.$dirty\" ng-messages=\"addSessionForm.sessionName.$error\">\
                            <div ng-message=\"required\" class=\"text-danger\" >Please enter a session name</div>\
                            <div ng-message=\"maxlength\" class=\"text-danger\">Please shorten your session name</div>\
                        </div>\
                    </div>\
                </div>\
                <div class=\"row\">\
                    <div class=\"col-sm-3 control-label\">\
                        <label for=\"txtSessionAbstract\">Session Abstract :</label>\
                    </div>\
                    <div class=\"col-sm-4\">\
                        <div class=\"controls\">\
                            <input id=\"txtSessionAbstract\"\
                                   name=\"sessionAbstract\"\
                                   type=\"text\"\
                                   ng-model=\"session.abstract\"\
                                   required\
                                   class=\"form-control\"\
                                   ng-maxlength=\"50\"/>\
                        </div>\
                        <div ng-if=\"addSessionForm.$submitted  || addSessionForm.sessionName.$dirty\" ng-messages=\"addSessionForm.sessionName.$error\">\
                            <div ng-message=\"required\" class=\"text-danger\" >Please enter a abstract</div>\
                            <div ng-message=\"maxlength\" class=\"text-danger\">Please shorten your abstract</div>\
                        </div>\
                    </div>\
                </div>\
\
                <div class=\"row\">\
                    <div class=\"col-sm-9 col-sm-offset-2\">\
                        <div class=\"row\">\
                            <div class=\"col-sm-2 col-xs-6\">\
                                <button id=\"submitButton\" type=\"submit\" class=\"btn btn-primary\" >Continue</button>\
                            </div>\
                            <div class=\"col-sm-2 col-xs-6\">\
                                <button type=\"button\" class=\"btn\">Cancel</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
\
            </div>\
        </form>\
\
\
    </div>\
</div>\
\
\
";
templates["templates/demo-app/list.html"] = "<h2>List</h2>\
<pre>{{breweries | json}}</pre>";
$templateCache.put(templateName, templates[templateName]);
};