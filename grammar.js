// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');

const myLexer = moo.compile({           // NB: First things match first. The order of this list matters.
  WS:      /[ \t]+/,    
  comment: /\/\/.*?$/,
  float:   /[-+]?[0-9]*\.[0-9]+/, 
  incrementor: ['++', '--'], 
  number:  /0|[1-9][0-9]*/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  char:    /'.'/,
  lparen:  '(',
  rparen:  ')',
  lbrace:  '{',
  rbrace:  '}',
  lbrack:  '[',
  rbrack:  ']',
  conditional: ['==', '<', '>', '<=', '>='],
  logical: ['&&', '||'],
  var_type: ['volatile', 'int', 'void', 'char', 'string'], 
  identifier: {match: /[a-zA-Z][a-zA-Z_0-9]*/, type:  moo.keywords({
    control_key: ['else', 'if'],
    loop_key: ['for', 'while'],
  })},
  assign: '=',
  comma: ',', 
  operation: ['+', '-', '/', '*'],
  EL: ';', 
  NL:      { match: /\n/, lineBreaks: true },
});
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["statement", "_ml"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_ml", "statements$ebnf$1"], "postprocess":  
        (data) => {
            return data[1].map(item => item[0]);
        }
                },
    {"name": "statement", "symbols": ["var_declare"], "postprocess": id},
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["method"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "statement", "symbols": ["control"], "postprocess": id},
    {"name": "statement", "symbols": ["loop"], "postprocess": id},
    {"name": "var_declare$ebnf$1$subexpression$1", "symbols": [(myLexer.has("var_type") ? {type: "var_type"} : var_type), "_"]},
    {"name": "var_declare$ebnf$1", "symbols": ["var_declare$ebnf$1$subexpression$1"]},
    {"name": "var_declare$ebnf$1$subexpression$2", "symbols": [(myLexer.has("var_type") ? {type: "var_type"} : var_type), "_"]},
    {"name": "var_declare$ebnf$1", "symbols": ["var_declare$ebnf$1", "var_declare$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "var_declare", "symbols": ["var_declare$ebnf$1", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("EL") ? {type: "EL"} : EL)], "postprocess": 
        (data) => {
            return {
                type: "var_declare",
                var_types: data[0].map(item => item[0]),
                var_name: data[1],
            }
        }
                },
    {"name": "var_assign$ebnf$1$subexpression$1", "symbols": [(myLexer.has("var_type") ? {type: "var_type"} : var_type), "_"]},
    {"name": "var_assign$ebnf$1", "symbols": ["var_assign$ebnf$1$subexpression$1"]},
    {"name": "var_assign$ebnf$1$subexpression$2", "symbols": [(myLexer.has("var_type") ? {type: "var_type"} : var_type), "_"]},
    {"name": "var_assign$ebnf$1", "symbols": ["var_assign$ebnf$1", "var_assign$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "var_assign", "symbols": ["var_assign$ebnf$1", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr", "_", (myLexer.has("EL") ? {type: "EL"} : EL)], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_types: data[0].map(x => x[0]),
                var_name: data[1],
                value: data[5]
            }
        }
                    },
    {"name": "var_assign", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr", "_", (myLexer.has("EL") ? {type: "EL"} : EL)], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                    },
    {"name": "expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("char") ? {type: "char"} : char)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": ["identifiers"], "postprocess": id},
    {"name": "expr", "symbols": ["fun_call__"], "postprocess": id},
    {"name": "identifiers$ebnf$1", "symbols": []},
    {"name": "identifiers$ebnf$1$subexpression$1", "symbols": [(myLexer.has("lbrack") ? {type: "lbrack"} : lbrack), (myLexer.has("identifier") ? {type: "identifier"} : identifier), (myLexer.has("rbrack") ? {type: "rbrack"} : rbrack)]},
    {"name": "identifiers$ebnf$1", "symbols": ["identifiers$ebnf$1", "identifiers$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifiers", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "identifiers$ebnf$1"], "postprocess": 
        (data) => {
            return {
                type: "identifiers", 
                primary: data[0],
                auxiliary: data[1].map(x => x[1])
            }
        }
                },
    {"name": "method", "symbols": ["fun_signature", "fun_body"], "postprocess": 
        (data) => {
            return {
                type: "method",
                signature: data[0],
                body: data[1]
            }
        }
                },
    {"name": "fun_signature", "symbols": [(myLexer.has("var_type") ? {type: "var_type"} : var_type), "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "fun_params", {"literal":")"}, "_ml", {"literal":"{"}], "postprocess": 
        (data) => {
            return {
                type: "fun_signature",
                name: data[2],
                params: data[5], 
                returns: data[0]
            }
        }
                },
    {"name": "fun_body", "symbols": ["statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "fun_body", 
                statements: data[0], 
            };
        }
                },
    {"name": "fun_params$ebnf$1", "symbols": []},
    {"name": "fun_params$ebnf$1$subexpression$1$ebnf$1", "symbols": [(myLexer.has("comma") ? {type: "comma"} : comma)], "postprocess": id},
    {"name": "fun_params$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fun_params$ebnf$1$subexpression$1", "symbols": ["_ml", "fun_params$ebnf$1$subexpression$1$ebnf$1", "_", (myLexer.has("var_type") ? {type: "var_type"} : var_type), "__", (myLexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "fun_params$ebnf$1", "symbols": ["fun_params$ebnf$1", "fun_params$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "fun_params", "symbols": ["fun_params$ebnf$1"], "postprocess": 
        (data) => {
            return {
                type: "fun_params",
                param_types: data[0].map(x => x[3]),
                param_values: data[0].map(x => x[5])
            }
        }
                },
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "arg_list", {"literal":")"}, "_", (myLexer.has("EL") ? {type: "EL"} : EL)], "postprocess": 
        (data) => {
            return {
                type: "fun_call",
                fun_name: data[0],
                arguments: data[3]
            }
        }
                },
    {"name": "fun_call__", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "arg_list", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "fun_call__",
                fun_name: data[0],
                arguments: data[3]
            }
        }
                },
    {"name": "arg_list$ebnf$1", "symbols": []},
    {"name": "arg_list$ebnf$1$subexpression$1$ebnf$1", "symbols": [(myLexer.has("comma") ? {type: "comma"} : comma)], "postprocess": id},
    {"name": "arg_list$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "arg_list$ebnf$1$subexpression$1", "symbols": ["_ml", "expr", "_ml", "arg_list$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "arg_list$ebnf$1", "symbols": ["arg_list$ebnf$1", "arg_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arg_list", "symbols": ["arg_list$ebnf$1"], "postprocess": 
        (data) => {
            return {
                type: "arg_list",
                arg_values: data[0].map(x => x[1])
            }
        }
                },
    {"name": "control", "symbols": ["condition", "control_body"], "postprocess":  
        (data) => {
            return {
                type: "control", 
                condition: data[0], 
                body: data[1]
            }
        } 
                },
    {"name": "condition$ebnf$1$subexpression$1", "symbols": [(myLexer.has("control_key") ? {type: "control_key"} : control_key), "_"]},
    {"name": "condition$ebnf$1", "symbols": ["condition$ebnf$1$subexpression$1"]},
    {"name": "condition$ebnf$1$subexpression$2", "symbols": [(myLexer.has("control_key") ? {type: "control_key"} : control_key), "_"]},
    {"name": "condition$ebnf$1", "symbols": ["condition$ebnf$1", "condition$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "condition$ebnf$2", "symbols": []},
    {"name": "condition$ebnf$2$subexpression$1", "symbols": [(myLexer.has("logical") ? {type: "logical"} : logical), "_", "check", "_"]},
    {"name": "condition$ebnf$2", "symbols": ["condition$ebnf$2", "condition$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "condition", "symbols": ["condition$ebnf$1", {"literal":"("}, "_", "check", "_", "condition$ebnf$2", {"literal":")"}, "_ml", {"literal":"{"}], "postprocess": 
        (data) => {
            return {
                type: "condition",
                control_keys: data[0].map(x => x[0]),
                checks: [data[3], ...data[5].map(x => x[2])],
                logicals: data[5].map(x => x[0]), 
            };
        }
                },
    {"name": "check", "symbols": ["expr", "_", (myLexer.has("conditional") ? {type: "conditional"} : conditional), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "check", 
                left: data[0], 
                conditional: data[2], 
                right: data[4], 
            };
        }
                },
    {"name": "control_body", "symbols": ["statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "control_body", 
                statements: data[0], 
            };
        }
                },
    {"name": "loop", "symbols": ["loop_params", "loop_body"], "postprocess":  
        (data) => {
            return {
                type: "loop", 
                loop_params: data[0], 
                body: data[1]
            }
        } 
                },
    {"name": "loop_params", "symbols": [(myLexer.has("loop_key") ? {type: "loop_key"} : loop_key), "_", {"literal":"("}, "var_assign", "_", "stop_condition", "_", "incrementor", "_", {"literal":")"}, "_ml", {"literal":"{"}], "postprocess": 
        (data) => {
            return {
                type: "loop_params", 
                loop_key: data[0], 
                counter_var: data[3], 
                stop_condition: data[5], 
                incrementor: data[7], 
            }
        }
                },
    {"name": "loop_params", "symbols": [(myLexer.has("loop_key") ? {type: "loop_key"} : loop_key), "_", {"literal":"("}, "_", "check", "_", {"literal":")"}, "_ml", {"literal":"{"}], "postprocess": 
        (data) => {
            return {
                type: "loop_params", 
                loop_key: data[0], 
                check: data[4],
            }
        }
                },
    {"name": "stop_condition", "symbols": ["expr", "_", (myLexer.has("conditional") ? {type: "conditional"} : conditional), "_", "expr", "_", (myLexer.has("EL") ? {type: "EL"} : EL)], "postprocess": 
        (data) => {
            return {
                type: "stop_condition", 
                left: data[0], 
                conditional: data[2], 
                right: data[4], 
            }
        }
                },
    {"name": "incrementor", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"++"}], "postprocess": 
        (data) => {
            return {
                type: "incrementor", 
                identifier: data[0], 
                op: data[1],
            }
        }
                },
    {"name": "incrementor", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"--"}], "postprocess": 
        (data) => {
            return {
                type: "incrementor", 
                identifier: data[0], 
                op: data[1],
            }
        }
                },
    {"name": "loop_body", "symbols": ["statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "control_body", 
                statements: data[0], 
            };
        }
            },
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
