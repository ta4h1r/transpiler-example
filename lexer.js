const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({           // NB: First things match first. The order of this list matters.
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

module.exports = lexer;

// main(); 

async function main() {
    const code = (await fs.readFile("ex1.small")).toString();
    lexer.reset(code);
    while (true) {
        const token = lexer.next();
        if (!token) {
            break;
        }
        console.log(token);
    }

}