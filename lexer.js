const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({
  WS:      /[ \t]+/,
  comment: /\/\/.*?$/,
  number:  /0|[1-9][0-9]*/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  char:  /'(?:\\["\\]|[^\n"\\])*'/,
  lparen:  '(',
  rparen:  ')',
  lbrace:  '{',
  rbrace:  '}',
  var_type: ['volatile', 'int', 'void', 'char', 'string'], 
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  assign: '=',
  comma: ',', 
  operation: ['+', '-', '/', '*'],
  dot: '.', 
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