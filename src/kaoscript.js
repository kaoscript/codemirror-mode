/**
 * kaoscript.js
 * Version 0.2.0
 * October 5th, 2016
 *
 * Copyright (c) 2016 Baptiste Augrain
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 **/
CodeMirror.defineSimpleMode('kaoscript', {
	start: [
		{
			regex: /'/,
			token: 'string',
			next: 'string_dq'
		},
		{
			regex: /'/,
			token: 'string',
			next: 'string_sq'
		},
		{
			regex: /`/,
			token: 'string',
			next: 'template'
		},
		{
			regex: /\b(class|const|func|enum|impl|let|struct|type)(\s+)([a-zA-Z_$][\w$]*)\b/,
			token: ['keyword', null, 'def']
		},
		{
			regex: /\b(?:0(?:b|B)[01]+|0(?:o|O)[0-7]+|0(?:x|X)[0-9a-fA-F]+|[0-9]+(?:\.[0-9]+)?)\b/,
			token: 'number'
		},
		{
			regex: /\b(import)(\s*\{)/,
			token: ['keyword', null],
			next: 'import_block'
		},
		{
			regex: /\bimport(?!\s*[:\(])\b/,
			token: 'keyword',
			next: 'import_line'
		},
		{
			regex: /\b(?:await|break|catch|continue|do|else|export|extern|finally|for|if|include|return|switch|throw|try|unless|until|while|as|by|from|in|is|of|til|to|with|async|extends|final|private|protected|public|static|new)(?!\s*:)\b/,
			token: 'keyword'
		},
		{
			regex: /\b(?:super|this|Array|array|Boolean|bool|class|enum|Function|func|Number|number|Object|object|RegExp|String|string)(?!\s*:)\b/,
			token: 'atom'
		},
		{
			regex: /\b(?:true|false|null|Infinity|NaN)(?!\s*:)\b/,
			token: 'builtin'
		},
		{
			regex: /#!?\[.*\]/,
			token: 'meta'
		},
		{
			regex: /\/\/.*/,
			token: 'comment'},
		{
			regex: /\/\*/,
			token: 'comment',
			next: 'comment_asterisk'
		},
		{
			regex: /\-{3,}/,
			token: 'comment',
			next: 'comment_dash'
		},
		{
			regex: /[-+\/*=<>!&\|\^\?:]+|\.\.\./,
			token: 'operator'
		},
		{
			regex: /\.[a-zA-Z_$][\w$]*/,
			token: 'property'
		},
		{
			regex: /[a-zA-Z_$][\w$]*/,
			token: 'variable-2'
		},
		{
			regex: /[\{\[\(]/,
			indent: true
		},
		{
			regex: /[\}\]\)]/,
			dedent: true
		}
	],
	comment_asterisk: [
		{
			regex: /.*?\*\//,
			token: 'comment',
			next: 'start'
		},
		{
			regex: /.*/,
			token: 'comment'
		}
	],
	comment_dash: [
		{
			regex: /\-{3,}/,
			token: 'comment',
			next: 'start'
		},
		{
			regex: /.*/,
			token: 'comment'
		}
	],
	import_block: [
		{
			regex: /}/,
			next: 'start'
		},
		{
			regex: /\b(from)(\s*[^:].*$)/,
			token: ['keyword', null]
		},
		{
			regex: /\bas(?!\s*:)\b/,
			token: 'keyword'
		},
		{
			regex: /[a-zA-Z_$][\w$]*/,
			token: 'variable-2'
		},
		{
			regex: /{/,
			next: 'import_block'
		}
	],
	import_line: [
		{
			regex: /\b(from)(\s*[^:].*$)/,
			token: ['keyword', null],
			next: 'start'
		},
		{
			regex: /\bas(?!\s*:)\b/,
			token: 'keyword'
		},
		{
			regex: /[a-zA-Z_$][\w$]*/,
			token: 'variable-2'
		}
	],
	string_dq: [
		{
			regex: /'/,
			token: 'string',
			next: 'start'
		},
		{
			regex: /(?:[^\\']|\\(?:.|$))*/,
			token: 'string'
		}
	],
	string_sq: [
		{
			regex: /'/,
			token: 'string',
			next: 'start'
		},
		{
			regex: /(?:[^\\']|\\(?:.|$))*/,
			token: 'string'
		}
	],
	template: [
		{
			regex: /`/,
			token: 'string',
			next: 'start'
		},
		{
			regex: /\\\(/,
			next: 'template_var'
		},
		{
			regex: /(?:[^\\`]|\\(?:[^\(]|$))*/,
			token: 'string'
		}
	],
	template_var: [
		{
			regex: /\)/,
			next: 'template'
		},
		{
			regex: /[a-zA-Z_$][\w$]*/,
			token: 'variable-2'
		}
	],
	meta: {
		dontIndentStates: ['comment'],
		electricInput: /^\s*\}$/,
		blockCommentStart: '/*',
		blockCommentEnd: '*/',
		lineComment: '//',
		closeBrackets: '()[]{}\'\'""``',
		fold: 'brace'
	}
});

CodeMirror.defineMIME('application/kaoscript', 'kaoscript');