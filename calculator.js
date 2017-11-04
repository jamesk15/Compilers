function Calculator(inputStr) {
    this.tokenStream = [];
    
}
// 1+(2*3)+4
Calculator.prototype.lexer = function(inputStr) {
    inputStr.split('').forEach(function(char) {
         var correctToken = tokenTypes.filter(function(token) {
             var regExp = token[1];
             if (char.search(regExp) !== -1) {
                 return true;
             }
         })
         this.tokenStream.push({name: correctToken[0], value: char})
    })
}


var tokenTypes = [
    ["NUMBER",    /^\d+/ ],
    ["ADD",       /^\+/  ],
    ["SUB",       /^\-/  ],
    ["MUL",       /^\*/  ],
    ["DIV",       /^\//  ],
    ["LPAREN",    /^\(/  ],
    ["RPAREN",    /^\)/  ]
];
console.log('helloworld');
/*
1+(2*3)+4

[ {name: "NUMBER",     value: "1" },
{name: "ADD",     value: "+" },
{name: "LPAREN",     value: "(" },
{name: "NUMBER",     value: "2" },
{name: "MUL",     value: "*" },
{name: "NUMBER",     value: "3" },
{name: "RPAREN",     value: "" },
{name: "ADD",     value: "+" },
{name: "NUMBER",     value: "4" }]

*/