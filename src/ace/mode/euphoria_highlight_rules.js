define(function(require, exports, module) {

var oop = require("pilot/oop");
var lang = require("pilot/lang");
var DocCommentHighlightRules = require("ace/mode/doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

euphoriaHighlightRules = function() {

    var docComment = new DocCommentHighlightRules();

    var builtinFunctions = lang.arrayToMap(
        ("?|abort|and_bits|append|arctan|atom|c_func|c_proc|call|call_func|" +
         "call_proc|clear_screen|close|command_line|compare|cos|date|delete|" +
         "delete_routine|equal|find|floor|get_key|getc|getenv|gets|hash|head|" +
         "include_paths|insert|integer|length|log|machine_func|machine_proc|" +
         "match|mem_copy|mem_set|not_bits|object|open|option_switches|or_bits|" +
         "peek|peek2s|peek2u|peek4s|peek4u|peek_string|peeks|pixel|platform|" +
         "poke|poke2|poke4|position|power|prepend|print|printf|puts|rand|" +
         "remainder|remove|repeat|replace|routine_id|sequence|sin|splice|" +
         "sprintf|sqrt|system|system_exec|tail|tan|task_clock_start|" +
         "task_clock_stop|task_create|task_list|task_schedule|task_self|" +
         "task_status|task_suspend|task_yield|time|trace|xor_bits").split("|")
    );

    var keywords = lang.arrayToMap(
        ("and|as|break|by|case|constant|continue|do|else|elsedef|elsif|" +
        "elsifdef|end|entry|enum|exit|export|fallthru|for|function|global|" +
        "goto|if|ifdef|include|label|loop|namespace|not|or|override|procedure|" +
        "public|retry|return|routine|switch|then|to|type|until|while|with|" +
        "without|xor"
        ).split("|")
    );

    var buildinConstants = lang.arrayToMap(
        ("NULL").split("|")
    );

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
	            token : "comment",
	            regex : "--.*$"
	        },
	        docComment.getStartRule("doc-start"),
	        {
	            token : "comment", // multi line comment
	            regex : "\\/\\*",
	            next : "comment"
	        }, {
	            token : "string", // single line
	            regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
	        }, {
	            token : "string", // multi line string start
	            regex : '["].*\\\\$',
	            next : "qqstring"
	        }, {
	            token : "string", // single line
	            regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
	        }, {
	            token : "string", // multi line string start
	            regex : "['].*\\\\$",
	            next : "qstring"
	        }, {
	            token : "constant.numeric", // hex
	            regex : "0[xtdb][0-9a-fA-F]+\\b"
	        }, {
                token : "constant.numeric", // old hex
                regex : "#[0-9a-fA-F]+\\b"
	        }, {
	            token : "constant.numeric", // float
	            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
	        }, {
              token : "constant", // <CONSTANT>
              regex : "[A-Z][a-zA-Z0-9.]+"
	        }, {
              token : "keyword", // pre-compiler directivs
              regex : "(?:include|ifdef|elsifdef|elsedef|with|without)"
          }, {
	            token : function(value) {
	                if (value == "this")
	                    return "variable.language";
	                else if (keywords[value])
	                    return "keyword";
                    else if (builtinFunctions[value])
                        return "support.function";
	                else if (buildinConstants[value])
	                    return "constant.language";
	                else if (value == "debugger")
	                    return "invalid.deprecated";
	                else
	                    return "identifier";
	            },
	            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
	        }, {
	            token : "keyword.operator",
	            regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"
	        }, {
	            token : "lparen",
	            regex : "[[({]"
	        }, {
	            token : "rparen",
	            regex : "[\\])}]"
	        }, {
	            token : "text",
	            regex : "\\s+"
	        }
        ],
        "comment" : [
	        {
	            token : "comment", // closing comment
	            regex : ".*?\\*\\/",
	            next : "start"
	        }, {
	            token : "comment", // comment spanning whole line
	            regex : ".+"
	        }
        ],
        "qqstring" : [
            {
	            token : "string",
	            regex : '(?:(?:\\\\.)|(?:[^"\\\\]))*?"',
	            next : "start"
	        }, {
	            token : "string",
	            regex : '.+'
	        }
        ],
        "qstring" : [
	        {
	            token : "string",
	            regex : "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
	            next : "start"
	        }, {
	            token : "string",
	            regex : '.+'
	        }
        ]
    };

    this.addRules(docComment.getRules(), "doc-");
    this.$rules["doc-start"][0].next = "start";
};

oop.inherits(euphoriaHighlightRules, TextHighlightRules);

exports.euphoriaHighlightRules = euphoriaHighlightRules;
});
