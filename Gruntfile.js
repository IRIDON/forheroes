module.exports = function (grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

		// jshint: {     // описываем как будет проверять наш код - jsHint
		// 	options: {
		// 		curly: true,
		// 		eqeqeq: false,
		// 		immed: true,
		// 		latedef: true,
		// 		newcap: true,
		// 		noarg: true,
		// 		sub: true,
		// 		undef: true,
		// 		eqnull: true,
		// 		browser: true,
		// 		globals: {
		// 			jQuery: true,
		// 			$: true,
		// 			console: true
		// 		}
		// 	},
		// 	'<%= pkg.name %>': {  //вставляем название проекта из package.json
		// 		src: [ 'js/script.js' ]  //какие файлы надо проверять
		// 	}
		// },
		handlebars: {
			compile: {
				options: {
					namespace: "JST"
				},
				files: {
					'js/appTemplates.js': 'templates/*.hbs'
				}
			}
		},

	    concat: {
	    	dist: {
	    		src: ['js/script.js', 'js/jquery.flexslider-min.js', 'js/jquery.blueimp-gallery.min.js', 'js/blueimp-gallery.min.js', 'js/handlebars-v3.0.3.js', 'js/appTemplates.js'],
	    		dest: 'js/build.js'
	    	}
	    },

		// removelogging: {
		// 	dist: {
		// 		src: "js/build.js",
		// 		dest: "js/build.clean.js",

		// 		options: {
		// 			// see below for options. this is optional.
		// 		}
		// 	}
		// },

	    uglify: {
	    	options: {
	    		stripBanners: true,
	    		banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	    	},

	    	build: {
	    		src: 'js/build.js',
	    		dest: 'js/main.min.js'
	    	}
	    },

		less: {
			production: {
				options: {
					paths: ["css"],
				},
				files: {
					"css/main.css": "css/main.less"
				}
			}
		},

		autoprefixer: {
		    options: {
		        browsers: ['last 2 versions', 'ie 8', 'ie 9']
		    },
		    main: {
		        // expand: true,
		        // flatten: true,
		        src: 'css/main.css'
		    }
		},

	    cssmin: {
	    	with_banner: {
	    		options: {
	    			banner: '/* My minified CSS */'
	    		},

	    		files: {
	    			'css/main.min.css' : ['css/main.css']
	    		}
	    	}
	    },

		imagemin: {
			dynamic: {
				options: {                       // Target options 
					optimizationLevel: 3,
					progressive: true
				},
				files: [{
					expand: true,                  // Enable dynamic expansion 
					cwd: 'images/',                   // Src matches are relative to this path 
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
					dest: 'images/'                  // Destination path prefix 
				}]
			}
		},

		clean : {
		    yourTarget : {
		        src : ["js/build*", "css/main.css"]
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

	    watch: {
	    	scripts: {
		    	files: ['js/*.js'],
		    	tasks: ['concat', 'uglify', 'clean']
	    	},
	    	css: {
		    	files: ['css/*.less'],
		    	tasks: ['less', 'autoprefixer', 'cssmin', 'clean']
	    	}
	    },

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-remove-logging');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-handlebars');

	grunt.registerTask('default', ['handlebars', 'concat', 'uglify', 'less', 'autoprefixer', 'cssmin', 'imagemin', 'clean', 'watch']);
};