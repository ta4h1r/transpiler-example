@{%
const moo = require('moo');

const myLexer = moo.compile({           // NB: First things match first. The order of this list matters.
  WS:      /[ \t]+/,    
  comment: /\/\/.*?$/,
  float:   /[-+]?[0-9]*\.[0-9]+/, 
  incrementor: ['++', '--'], 
  number:  /0|[1-9][0-9]*/,
  bang: '!', 
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  char:    /'.'/,
  lparen:  '(',
  rparen:  ')',
  lbrace:  '{',
  rbrace:  '}',
  lbrack:  '[',
  rbrack:  ']',
  conditional: ['==', '!=', '<', '>', '<=', '>='],
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
%}

@lexer myLexer






statements
    -> _ml (statement %EL:* _ml):*
        {% 
            (data) => {
                return data[1].map(item => item[0]);
            }
        %}

statement
    -> var_declare  {% id %}
    | var_assign    {% id %}
    | method        {% id %}
    | fun_call      {% id %}
    | control       {% id %}
    | loop          {% id %}

var_declare
    -> (%var_type _):+ %identifier _ %EL
        {%
            (data) => {
                return {
                    type: "var_declare",
                    var_types: data[0].map(item => item[0]),
                    var_name: data[1],
                }
            }
        %}

var_assign
    -> (%var_type _):+ %identifier _ "=" _ expr _ %EL
            {%
                (data) => {
                    return {
                        type: "var_assign",
                        var_types: data[0].map(x => x[0]),
                        var_name: data[1],
                        value: data[5]
                    }
                }
            %}
        | %identifier _ "=" _ expr _ %EL
            {%
                (data) => {
                    return {
                        type: "var_assign",
                        var_name: data[0],
                        value: data[4]
                    }
                }
            %}

expr
    -> %string     {% id %}
    |  %char       {% id %}
    |  %float      {% id %}
    |  %number     {% id %}
    |  identifiers {% id %}
    |  fun_call__  {% id %}

identifiers 
    -> %identifier (%lbrack %identifier %rbrack):*
        {%
            (data) => {
                return {
                    type: "identifiers", 
                    primary: data[0],
                    auxiliary: data[1].map(x => x[1])
                }
            }
        %}








method 
    -> fun_signature fun_body
        {%
            (data) => {
                return {
                    type: "method",
                    signature: data[0],
                    body: data[1]
                }
            }
        %}

fun_signature
    -> %var_type _ %identifier _ "(" fun_params ")" _ml "{"
        {%
            (data) => {
                return {
                    type: "fun_signature",
                    name: data[2],
                    params: data[5], 
                    returns: data[0]
                }
            }
        %}

fun_body
    -> statements "}"
        {%
            (data) => {
                return {
                    type: "fun_body", 
                    statements: data[0], 
                };
            }
        %}

fun_params
    -> (_ml %comma:? _ %var_type __ %identifier):*
        {%
            (data) => {
                return {
                    type: "fun_params",
                    param_types: data[0].map(x => x[3]),
                    param_values: data[0].map(x => x[5])
                }
            }
        %}

fun_call
    -> (%bang _):* %identifier _ "(" arg_list ")" _ %EL
        {%
            (data) => {
                return {
                    type: "fun_call",
                    bang: data[0].map(b => b[0]),
                    fun_name: data[1],
                    arguments: data[4]
                }
            }
        %}

fun_call__           # Without the semi-colon, for use in conditional statements
    -> (%bang _):* %identifier _ "(" arg_list ")"
        {%
            (data) => {
                return {
                    type: "fun_call__",
                    bang: data[0].map(b => b[0]),
                    fun_name: data[1],
                    arguments: data[4]
                }
            }
        %}

arg_list 
    -> (_ml expr _ml %comma:?):*
        {%
            (data) => {
                return {
                    type: "arg_list",
                    arg_values: data[0].map(x => x[1])
                }
            }
        %}









control
    -> condition control_body   
        {% 
            (data) => {
                return {
                    type: "control", 
                    condition: data[0], 
                    body: data[1]
                }
            } 
        %}

condition 
    -> (%control_key _):+ "(" _ check _ (%logical _ check _):* ")" _ml "{"
        {%
            (data) => {
                return {
                    type: "condition_check_logical",
                    control_keys: data[0].map(x => x[0]),
                    checks: [data[3], ...data[5].map(x => x[2])],
                    logicals: data[5].map(x => x[0]), 
                };
            }
        %}
    | (%control_key _):+ "(" _ %identifier _ ")" _ml "{"
        {%
            (data) => {
                return {
                    type: "condition_id",
                    control_keys: data[0].map(x => x[0]),
                    checks: data[3]
                };
            }
        %}

check
    -> expr _ %conditional _ expr    # Comparison of two variables
     {%
            (data) => {
                return {
                    type: "check", 
                    left: data[0], 
                    conditional: data[2], 
                    right: data[4], 
                };
            }
        %}

control_body
    -> statements "}"
        {%
            (data) => {
                return {
                    type: "control_body", 
                    statements: data[0], 
                };
            }
        %}





loop
    -> loop_params loop_body    
        {% 
            (data) => {
                return {
                    type: "loop", 
                    loop_params: data[0],
                    body: data[1]
                }
            } 
        %}

loop_params
    -> %loop_key _ "(" var_assign _ stop_condition _ incrementor _ ")" _ml "{"     # Match for loop syntax
        {%
            (data) => {
                return {
                    type: "loop_params_stop", 
                    loop_key: data[0], 
                    counter_var: data[3], 
                    stop_condition: data[5], 
                    incrementor: data[7], 
                }
            }
        %}
    |  %loop_key _ "(" _ check _ ")" _ml "{"    # Match while loop syntax
        {%
            (data) => {
                return {
                    type: "loop_params_check", 
                    loop_key: data[0], 
                    check: data[4],
                }
            }
        %}
    |  %loop_key _ "(" _ expr _ ")" _ml "{"    # Match while loop syntax
        {%
            (data) => {
                return {
                    type: "loop_params_expr", 
                    loop_key: data[0], 
                    check: data[4],
                }
            }
        %}

stop_condition 
    -> expr _ %conditional _ expr _ %EL
        {%
            (data) => {
                return {
                    type: "stop_condition", 
                    left: data[0], 
                    conditional: data[2], 
                    right: data[4], 
                }
            }
        %}

incrementor
    -> %identifier "++" 
        {%
            (data) => {
                return {
                    type: "incrementor", 
                    identifier: data[0], 
                    op: data[1],
                }
            }
        %}
    |  %identifier "--" 
        {%
            (data) => {
                return {
                    type: "incrementor", 
                    identifier: data[0], 
                    op: data[1],
                }
            }
        %}

loop_body
-> statements "}"
    {%
        (data) => {
            return {
                type: "control_body", 
                statements: data[0], 
            };
        }
    %}



# Mandatory line-break with optional whitespace around it
__lb_ -> (_ %NL):+ _

# Optional multi-line whitespace
_ml -> (%WS | %NL):*

# Mandatory multi-line whitespace
__ml -> (%WS | %NL):+

# Optional whitespace
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+