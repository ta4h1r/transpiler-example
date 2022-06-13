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
    # | fun_signature    {% id %}


var_declare
    -> (%var_type _):+ %identifier _ %EL
        {%
            (data) => {
                console.log(data)
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
                    // console.log(data)
                    return {
                        type: "var_assign",
                        var_name: data[0],
                        value: data[4]
                    }
                }
            %}



expr
    -> %string     {% id %}
    |  %char     {% id %}
    |  %number     {% id %}
    |  %identifier {% id %}
    # |  fun_call    {% id %}



    
param_list
    -> %identifier (__ %identifier):*
        {%
            (data) => {
                const repeatedPieces = data[1];
                const restParams = repeatedPieces.map(piece => piece[1]);
                return [data[0], ...restParams];
            }
        %}









# fun_signature
#     -> %var_type _ %identifier _ "(" _ (param_list _):* ")" _ %NL:* _ "{" _
#         {%
#             (data) => {
#                 // console.log(data)
#                 return {
#                     type: "fun_signature",
#                     name: data[2],
#                     args: data[6], 
#                     return: data[0]
#                 }
#             }
#         %}


# fun_body
#     -> expr
#         {%
#             (data) => {
#                 return [data[0]];
#             }
#         %}
#     |  _ml statements __lb_ "}"
#         {%
#             (data) => {
#                 return data[2];
#             }
#         %}










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