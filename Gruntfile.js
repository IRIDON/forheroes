module.exports = function (grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    curl: {
			'data.json': 'http://app.forheroes.org.ua:8082/api/projects'
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: false,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: false,
				eqnull: false,
				browser: true,
				globals: {
					jQuery: true,
					$: true,
					console: true
				}
			},
			'<%= pkg.name %>': {
				src: [ 'access/src/js/script.js' ]
			}
		},

	    bower: {
	        dev: {
	            base: 'bower_components', /* the path to the bower_components directory */
	            dest: 'bower_components',
	            options: {
	                checkExistence: true,
	                debugging: true,
	                paths: {
	                    bowerDirectory: 'bower_components',
	                    bowerrc: '.bowerrc',
	                    bowerJson: 'bower.json'
	                }
	            }
	        },
	        flat: { /* flat folder/file structure */
	            dest: 'access/bower',
	            options: {
	                debugging: true
	            }
	        }
	    },

		handlebars: {
			compile: {
				namespace: function(filename) {
					var names = filename.replace(/modules\/(.*)(\/\w+\.hbs)/, '$1');

					return names.split('/').join('.');
				},
				files: {
					'tmp/appTemplates.js': 'access/src/handlebars/*.hbs'
				}
			}
		},

		'compile-handlebars': {
			allStatic: {
				files: [{
					src: 'access/src/handlebars/*.hbs',
					dest: 'access/src/templates/handlebarsStatic.html'
				}],
				templateData: 'data.json'
			},
		},

		includes: {
			files: {
				flatten: true,
				src: ['access/src/templates/*.html'],
				dest: 'tmp/html'
			}
		},

	    concat: {
	    	dist: {
	    		src: [
	    			'access/bower/handlebars.js',
	    			'tmp/appTemplates.js',
	    			'access/bower/jquery.flexslider.js',
	    			'access/bower/blueimp-gallery.js',
	    			'access/src/js/jquery.blueimp-gallery.js',
	    			'access/bower/jquery.lazy.min.js',
	    			// 'access/bower/bootstrap-modal.js', - Disable modal
	    			// 'access/bower/bootstrap-modalmanager.js',
	    			'access/src/js/script.js'
    			],
	    		dest: 'tmp/build.js'
	    	}
	    },

	    uglify: {
	    	options: {
	    		stripBanners: true,
	    		banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	    	},

	    	build: {
	    		src: 'tmp/build.js',
	    		dest: 'access/js/main.min.js'
	    	}
	    },

		less: {
			production: {
				options: {
					paths: ["css"]
				},
				files: {
					"tmp/main.css": "access/src/less/main.less"
				}
			}
		},

		autoprefixer: {
		    options: {
		        browsers: ['last 2 versions']
		    },
		    main: {
		        // expand: true,
		        // flatten: true,
		        src: 'tmp/main.css'
		    }
		},

	    cssmin: {
	    	with_banner: {
	    		options: {
	    			banner: '/* My minified CSS */'
	    		},

	    		files: {
	    			'access/css/main.min.css' : [
	    				'tmp/main.css',
	    				'access/bower/blueimp-gallery.css',
	    				// 'access/bower/bootstrap-modal.css' - Disable modal
    				]
	    		}
	    	}
	    },

		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 5,
					progressive: true
				},
				files: [
					{
						expand: true,
						cwd: 'access/src/img/',
						src: ['**/*.{png,jpg,gif,svg}'],
						dest: 'access/img/'
					}
				]
			}
		},

		// compress: {
		// 	main: {
		// 		options: {
		// 			mode: 'gzip'
		// 		},
		// 		expand: true,
		// 		cwd: 'css/',
		// 		src: ['**/*'],
		// 		dest: 'assets/'
		// 	}
		// },

		'sails-linker': {
			addScripts: {
				options: {
					startTag: '<!--SCRIPTS-->',
					endTag: '<!--SCRIPTS END-->',
					fileTmpl: '<script src="/%s"></script>',
					appRoot: 'access/js/'
				},
				files: {
					'tmp/html/*.html': ['js/*.js']
				},
			},
			addStyles: {
				options: {
					startTag: '<!--STYLE-->',
					endTag: '<!--STYLE END-->',
					fileTmpl: '<link rel="stylesheet" type="text/css" href="/%s">',
					appRoot: 'access/css/'
				},
				files: {
					'tmp/html/*.html': ['css/*.css']
				},
			}
		},

		// htmlmin: { - Disable htmlmin
		// 	dist: {
		// 		options: {
		// 			removeComments: true,
		// 			collapseWhitespace: true
		// 		},
		// 		files: {
		// 			'tmp/html/index.html': 'tmp/html/index.html',
		// 			'tmp/html/about.html': 'tmp/html/about.html',
		// 			'tmp/html/handmade.html': 'tmp/html/handmade.html',
		// 		}
		// 	}
		// },

	    multi_language: {
	        main: {
	          resources: 'access/src/lang/',
	          options: {
	            tag: '{{ }}',
	            src: 'tmp/html/index.html',
	            dest: 'tmp'
	          }
	        },
	        about: {
	          resources: 'access/src/lang/',
	          options: {
	            tag: '{{ }}',
	            src: 'tmp/html/about.html',
	            dest: 'tmp'
	          }
	        },
	        handmade: {
	          resources: 'access/src/lang/',
	          options: {
	            tag: '{{ }}',
	            src: 'tmp/html/handmade.html',
	            dest: 'tmp'
	          }
	        }
	    },

		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['tmp/*.ua.html'], 
						dest: '', 
						filter: 'isFile',
						rename: function(dest, src) {
							return dest+/[a-z]*\.[a-z][a-z]\.html/.exec(src)[0].replace(/\.[a-z][a-z]/, '');
						}
					},
					{
						expand: true,
						src: ['tmp/*.en.html'], 
						dest: 'en/', 
						filter: 'isFile',
						rename: function(dest, src) {
							return dest+/[a-z]*\.[a-z][a-z]\.html/.exec(src)[0].replace(/\.[a-z][a-z]/, '');
						}
					},
					{
						expand: true,
						src: ['tmp/*.pl.html'], 
						dest: 'pl/', 
						filter: 'isFile',
						rename: function(dest, src) {
							return dest+/[a-z]*\.[a-z][a-z]\.html/.exec(src)[0].replace(/\.[a-z][a-z]/, '');
						}
					}
				]
			}
		},

		clean : {
		    yourTarget : {
		        src : ['tmp/*', 'access/src/templates/handlebarsStatic.html']
		    }
		},

	    watch: {
	    	scripts: {
		    	files: ['access/src/js/*.js'],
		    	tasks: ['jshint', 'handlebars', 'concat', 'uglify', 'clean']
	    	},
	    	css: {
		    	files: ['access/src/less/*.less'],
		    	tasks: ['less', 'autoprefixer', 'cssmin', 'clean', 'sails-linker']
	    	},
	    	html: {
		    	files: ['access/src/templates/*.html'],
		    	tasks: ['compile-handlebars', 'includes', 'multi_language', 'sails-linker', 'copy']
	    	},
	    	img: {
		    	files: ['access/src/img/*.{png,jpg,gif}'],
		    	tasks: ['imagemin']
	    	}
	    },

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-sails-linker');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-multi-language');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('main-bower-files');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-includes');
	// grunt.loadNpmTasks('grunt-contrib-htmlmin'); - Disable htmlmin

	grunt.file.defaultEncoding = 'utf-8';
	grunt.file.preserveBOM = true;

	grunt.registerTask('default', ['jshint',
		'handlebars',
		'compile-handlebars',
		'includes',
		'concat',
		'uglify',
		'less',
		'autoprefixer',
		'cssmin',
		'imagemin',
		'multi_language',
		'sails-linker',
		'copy',
		'clean',
		'watch'
	]);
};