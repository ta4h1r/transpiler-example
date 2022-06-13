@{%
const myLexer = require("./lexer");
%}

@lexer myLexer






statements
    -> _ml (statement _ml):*
        {% 
            (data) => {
                return data[1].map(item => item[0]);
            }
        %}


statement
    -> var_declare  {% id %}
    | var_assign    {% id %}
    | method    {% id %}


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
    |  %number     {% id %}
    |  %identifier {% id %}











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




# fun_call
#     -> _ %identifier _ "(" _ (param_list _):? ")" %EL
#         {%
#             (data) => {
#                 return {
#                     type: "fun_call",
#                     fun_name: data[0],
#                     arguments: data[4] ? data[4][0] : []
#                 }
#             }
#         %}




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