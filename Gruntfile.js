var fs = require('fs');

module.exports = function (grunt) {

    var port = grunt.option('port') || 35729;
    var base = grunt.option('base') || '../demoapp.Web';

    // use hostname so that endpoints are dynamic
    var buildConfigs = {
        'dev': {
            apiBaseUrl: 'http://\' + location.hostname + \':3000'
        },
        'e2e': {
            apiBaseUrl: 'http://\' + location.hostname + \':3000'
        }
    };

    // build a list of all module names based off of the directories.
    var modules = (function () {
        var dir = 'src/modules',
            files = fs.readdirSync(dir),
            stat, file, i,
            result = [];
        for (i = 0; i < files.length; i++) {
            file = files[i];
            stat = fs.statSync(dir + '/' + file);
            if (stat.isDirectory()) {
                result.push(file);
            }
        }
        return result;
    })();


    //load some basic configuration from the package.json
    var pkg = grunt.file.readJSON('package.json'),
    //get the time and create a "build number".
        build = grunt.template.today('yyyymmdd_HHMMss_l');

    // an array to contain the names of the unminified module files.
    var requiredJsFiles = [
            'node_modules/underscore/underscore.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/moment/moment.js'
        ],
        concatConfig = {
            requirements: {
                options: {
                    banner: '/*\n' +
                        ' * Requirements v <%=pkg.version%> (build <%=build%>)\n' +
                        ' */\n\n'
                },
                dest: 'web/js/requirements.js',
                src: requiredJsFiles
            }
        },
        jshintFiles = [],
        jasmineConfig = {
            all: {
                src: [
                ],
                options: {
                    specs: 'src/tests/**/*.spec.js',
                    outfile: 'test-results.html',
                    keepRunner: true,
                    helpers: [
                        'web/js/requirements.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        '_ngTmplSpecHelper.js',
                        'web/js/config.js',
                        'web/js/demo-common.js'
                    ]
                }
            }
        },
        uglifyConfig = {
            requirements: {
                options: {
                    banner: '/*\n' +
                        ' * Requirements v <%=pkg.version%> (build <%=build%>)\n' +
                        ' */\n\n'
                },
                files: {
                    'web/js/requirements.min.js': 'web/js/requirements.js'
                }
            }
        };

    function createBannerTemplate(name) {
        return '/*\n' +
            ' * ' + name + ' v <%=pkg.version%> (build <%=build%>)\n' +
            ' */\n\n'
    }

    //builds the config options.
    (function () {
        for (var i = 0; i < modules.length; i++) {
            var module = modules[i],
                scriptsdir = 'web/js/',
                concatenatedFile = scriptsdir + module + '.js',
                minified = scriptsdir + module + '.min.js',
                moduledir = 'src/modules/' + module + '/',
                bannerTemplate = createBannerTemplate(module);

            concatConfig[module] = {
                options: {
                    banner: bannerTemplate
                },
                dest: concatenatedFile,
                src: [
                    'src/intro.js',
                    moduledir + module + '.js',
                    moduledir + '/**/*.js',
                    'src/outro.js'
                ]
            };
            uglifyConfig[module] = {
                options: {
                    banner: bannerTemplate
                },
                files: {}
            };

            uglifyConfig[module].files[minified] = [concatenatedFile];
            jshintFiles.push(concatenatedFile);
            jasmineConfig.all.src.push(concatenatedFile);
        }
    })();

    grunt.initConfig({
            pkg: pkg,
            build: build,
            buildConfigs: buildConfigs,
            concat: concatConfig,
            jshint: {
                options: {
                    //require curly braces
                    curly: true,
                    //require === to be used.
                    eqeqeq: true,
                    //complain about undeclared variables.
                    undef: true,
                    //complain about trailing whitespace.
                    trailing: true,
                    //complain about variables used before they're defined.
                    latedef: true,
                    //require immediately called anon functions to be wraped in parens.
                    immed: true,
                    //prohibit arguments.caller and arguments.callee use.
                    noarg: true,
                    //require single quotes.
                    quotmark: 'single',
                    //prohibit bitwise operators to prevent typoed && and ||
                    bitwise: true,
                    //require if hasDefinedProperty check in for(var x in y) blocks.
                    forin: true,
                    //define browser globals such as window, document, navigator, etc. (not console or alert)
                    browser: true,
                    //disallow empty code blocks
                    noempty: true
                },
                all: {
                    files: {
                        src: jshintFiles
                    }
                }
            },
            jasmine: jasmineConfig,
            uglify: uglifyConfig,
            connect: {
                server: {
                    options: {
                        port: port,
                        base: base,
                        livereload: 35729,
                        open: 'http://localhost:35729/demoapp/#',
                        hostname:'localhost'
                    }
                }
            },
            watch: {
                scripts: {
                    files: [
                        'src/modules/**/*.js',
                        'src/tests/**/*.spec.js'
                    ],
                    tasks: ['js-dev', 'copy']
                },
                tmplHtml: {
                    files: [
                        '**/*.tmpl.html'
                    ],
                    tasks: ['preprocess', 'copy']
                },
                markdown: {
                    files: ['**/*.md'],
                    tasks: ['markdown']
                },
                less: {
                    files: ['src/less/**/*.less'],
                    tasks: ['less:dev', 'copy']
                },
                templates: {
                    files: [
                        'web/templates/**/*.html'
                    ],
                    tasks: ['copy']
                }
            },
            markdown: {
                options: {
                    template: 'md_template.html'
                },
                all: {
                    files: [
                        {
                            expand: true,
                            src: '*.md',
                            dest: '',
                            ext: '.html'
                        }
                    ]
                }
            },
            preprocess: {
                options: {
                    context: {
			            version : '<%=pkg.version%>',
			            buildNumber : '<%=build%>',
                        requirements: (function () {
                            var one = '<script src="../js/requirements.min.js" type="text/javascript"></script>',
                                all = '';
                            for (var i = 0; i < requiredJsFiles.length; i++) {
                                all += '<script src="' + requiredJsFiles[i].replace('web/', '../') + '"></script>'
                            }
                            return '<%=!process.env.NODE_ENV || process.env.NODE_ENV !== "dev" ? \'' + one + '\' : \'' + all + '\'%>';
                        }()),
                        stamp: '?b=<%=build%>',
                        apiBaseUrl: '<%=buildConfigs[process.env.NODE_ENV].apiBaseUrl%>'
                    }
                },
                all: {
                    files: {
                        'web/demoapp/index.html': 'web/demoapp/index.tmpl.html',
                        'web/js/config.js': 'web/js/config.tmpl.js'
                    }
                }
            },
            preloadTemplates: {
                files: ['web/templates/**/*.html'],
                options: {
                    approot: 'web'
                }
            },
            docular: {
                groups: [],
                showDocularDocs: true,
                showAngularDocs: true
            },
            less: {
                dev: {
                    options: {
                        paths: ['src/less/bootstrap']
                    },
                    files: {
                        'web/bootstrap/css/bootstrap-custom.css': 'src/less/bootstrap/bootstrap.less'
                    }
                }
            },
            copy: {
                main: {
                    files: [
                        {
                            expand: true,
                            cwd: 'web/',
                            src: ['**', '!**/*.tmpl.html', '!**/*.tmpl.js'],
                            dest: 'test/../../demoapp.Web/'
                        }
                    ]
                }
            }
        }
    );

    //simple task to display information about the build being run.
    grunt.registerTask('info', 'echos important information to user in console', function () {
        var envname = process.env.NODE_ENV;
        grunt.log.write(
            '*********************************\n' +
                '* NODE_ENV: ' + envname + '\n' +
                '* build: ' + build + '\n' +
                '*********************************\n\n'
        );
    });

    /**
     * E2E Server management.
     */
    (function () {
        var e2eServer = null,
            testsDone;

        grunt.registerTask('e2eServerStart', 'Start E2E Mock API', function () {
            e2eServer = e2eServer || require('./e2e/mock-api/app');
            grunt.log.writeln('# starting E2E Mock API..');
            e2eServer.listen(3000, function () {
                grunt.log.writeln('running on port ' + 3000);
            });
        });

        grunt.registerTask('e2eChromeTests', 'Run E2E tests in Chrome', function () {
            testsDone = grunt.task.current.async();
            var tests = grunt.util.spawn({
                cmd: 'node',
                args: ['node_modules\\protractor\\lib\\cli.js', 'runUITestsInChrome.js'],
                env: '',
            }, function (error, result, code) {
                if (error) {
                    throw error;
                }
                testsDone();
                grunt.log.writeln('Tests exited with code ' + code);
            });

            tests.stdout.pipe(process.stdout);
            tests.stderr.pipe(process.stderr);
        });

        grunt.registerTask('e2eServerStop', 'Stop E2E Mock API', function () {
            if (e2eServer && typeof e2eServer.close === 'function') {
                grunt.log.writeln('# stopping E2E Mock API...');
                e2eServer.close(function () {
                    grunt.log.writeln('stopped.');
                    if (done) {
                        serverDone();
                    }
                });
            }
        });
    })();


    /**
     * NODE_ENV setting task.
     */
    grunt.registerTask('setenv', 'setting NODE_ENV', function (env) {
        process.env.NODE_ENV = env;
        grunt.log.writeln('NODE_ENV = "' + process.env.NODE_ENV + '"');
    });

    /*
     Register a task that updates a helper .js file
     with an array of preloaded .html for Angular to use when loading templates
     for directives. This is important because the $http mocks from
     angular-mocks.js want to test in isolation from making actual
     http requests. So requesting a template vomits on you unless the
     template is already loaded into the $templateCache.
     */
    grunt.registerMultiTask('preloadTemplates', function () {
        var options = this.options({
                helperFile: '_ngTmplSpecHelper.js',
                approot: 'web/'
            }),
            gen = 'function preloadTemplate($templateCache, templateName) {\n' +
                'var templates = {};\n';

        this.files.forEach(function (f) {
            f.src.forEach(function (filename) {
                var content = grunt.file.read(filename),
                    key = filename;
                if (key.indexOf(options.approot) === 0) {
                    key = key.substr(options.approot.length + 1);
                }
                gen += 'templates["' + key + '"] = "' + content.replace(/"/g, '\\"')
                    .replace(/\r{0,1}\n/g, '\\\n') + '";\n';
            });
        });
        gen += '$templateCache.put(templateName, templates[templateName]);\n};';
        grunt.file.write(options.helperFile, gen);
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks( 'grunt-contrib-connect' );

    //general
    grunt.registerTask('test', ['preloadTemplates', 'jasmine:all']);
    grunt.registerTask('js-dev', ['info', 'concat', 'jshint', 'test', 'watch']);

    //dev tasks
    grunt.registerTask('dev-build', ['setenv:dev', 'preprocess', 'uglify', 'js-dev', 'copy']);
    grunt.registerTask('dev', ['dev-build', 'watch']);

    //e2e tasks
    grunt.registerTask('e2e-build', ['setenv:e2e', 'preprocess', 'js-dev', 'uglify', 'less', 'copy']);
    grunt.registerTask('e2e', ['e2e-build', 'e2eServerStart', 'e2eChromeTests', 'e2eServerStop']);

};