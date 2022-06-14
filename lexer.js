const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({           // NB: First things match first. The order of this list matters.
  WS:      /[ \t]+/,    
  comment: /\/\/.*?$/,
  float:   /[-+]?[0-9]*\.[0-9]+/, 
  number:  /0|[1-9][0-9]*/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  char:    /'.'/,
  lparen:  '(',
  rparen:  ')',
  lbrace:  '{',
  rbrace:  '}',
  conditional: ['==', '<', '>', '<=', '>='],
  control: ['if', 'else if', 'else'],
  loop: [/^for$/, /^while$/],  
  var_type: ['volatile', 'int', 'void', 'char', 'string'], 
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  assign: '=',
  comma: ',', 
  operation: ['+', '-', '/', '*'],
//   dot: '.', 
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