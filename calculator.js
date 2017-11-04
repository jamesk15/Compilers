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

  Calculator.prototype.peek = function(){
    return this.tokenStream[0];
  }

  Calculator.prototype.get = function(){
    return this.tokenStream.shift();
  }

  Calculator.prototype.parseExpression = function(){
    let term = this.parseTerm();
    let a = this.parseA();
    return new TreeNode('Expression', term, a);
  }

  Calculator.prototype.parseTerm = function(){
    let factor = this.parseFactor();
    let b = this.parseB();
    return new TreeNode('Factor', factor, b)
  }

  Calculator.prototype.parseFactor = function(){
    if(this.peek().name === 'LPAREN'){
      this.get();
      let exp = this.parseExpression();
      this.get();
      return new TreeNode('Factor', '(', exp, ')');

    } else if (this.peek().name === 'SUB'){
      this.get();
      return new TreeNode('F', '-', parseFactor());

    } else {
      return new TreeNode('NUMBER')
    }

    return new TreeNode();
  }

  Calculator.prototype.parseA = function(){
    let next = this.peek();
    if(next && next.name === 'ADD') {
      this.get();
      return new TreeNode('A','+', this.parseTerm(), this.parseA());
    } else if (next && next.name === 'SUB'){
      this.get();
      return new TreeNode('A','-', this.parseTerm(), this.parseA());
    } else {
      return new TreeNode('A');
    }
  }

  function TreeNode(name) {
    this.name = name;
    this.children = [...arguments].slice(1);
  }
  
  const a = new Calculator();
  a.lexer('1+1');
  
  
  console.dir(tree);

  