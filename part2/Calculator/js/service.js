'use strict';

/* Services */
var analysisService = angular.module('analysisService', []);

analysisService.service('analyExp', function(){

	var outputStack = [];
	var outputQueue = [];
	this.isOperator=function(value){
		var operatorString = "+-*/()";
		return operatorString.indexOf(value) > -1
	};

	var getPriority=function(value){
		switch(value){
			case '+':
			case '-':
			return 1;
			case '*':
			case '/':
			return 2;
			default:
			return 0;
		}
	};

	var priority=function(o1, o2){
		return getPriority(o1) <= getPriority(o2);
	};

	this.analy=function(inputStack){

		while(inputStack.length > 0){
			//get the first input key
			var cur = inputStack.shift();
			//if cur is operator
			if(this.isOperator(cur)){
    			//it is a '(',push it into outputStack
    			if(cur == '('){

    				outputStack.push(cur);
    			}
      			//if it is ')',pop outputStack until meet '('
      			//push the pop key into outputQueue
      			//do not push '('
      			//if there is no '(', sent an error msg.
      			else if(cur == ')'){

      				var po = outputStack.pop();
      				while(po != '(' && outputStack.length > 0){

      					outputQueue.push(po);
      					po = outputStack.pop();
      				}

      				if(po != '('){

      					outputQueue = [];
      					return outputQueue;
      				}
      			}
				//if it is '+-*/', compare the priority with the operater in the top of outputStack
				//if its priority is lower or equal to the top operater, pop the top operator and push it into outputQueue
				//loop above, until it do not meet the condition,then push this operator into outputStack
				else{
					while(outputStack.length > 0 && priority(cur, outputStack[outputStack.length - 1]) ){

						outputQueue.push(outputStack.pop());
					}
					outputStack.push(cur);
				}
			}
    		//if it is a number,push it into outputQueue
    		else{

    			outputQueue.push(new Number(cur));
    		}
    	}

		//if inputStack is empty while there still has operator in the outputStack
		//if the top element in the outputStack is '()',throw error msg
		//pop outputStack and push into outputQueue
		if(outputStack.length > 0)
		{
			if(outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '(')
			{
				outputQueue = [];
				return outputQueue;
			}
			while(outputStack.length > 0)
			{
				outputQueue.push(outputStack.pop());
			}
		}

		return outputQueue;

	};

	
});
