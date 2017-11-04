function Calculator(inputStr) {
    this.tokenStream = [];
  
    this.tokenTypes = [
      ['NUMBER', /^\d+/],
      ['ADD', /^\+/],
      ['SUB', /^\-/],
      ['MUL', /^\*/],
      ['DIV', /^\//],
      ['LPAREN', /^\(/],
      ['RPAREN', /^\)/],
    ];
  }
  
  Calculator.prototype.lexer = function(inputStr) {
    inputStr.split('').forEach((char) => {
      var correctToken = this.tokenTypes.filter(function(token) {
        var regExp = token[1];
        if (char.search(regExp) !== -1) {
          return true;
        }
      })[0]
      this.tokenStream.push({name: correctToken[0], value: char})
    })
  }
  
  const a = new Calculator();
  a.lexer('1+1');
  console.log(a);