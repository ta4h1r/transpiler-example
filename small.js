// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./lexer");
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
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
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
            return data[0];
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
