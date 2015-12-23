
'use strict';
var appCtrl = angular.module('appCtrl', []);

appCtrl.controller('calcCtrl', ['$scope','analyExp', function($scope,analyExp){
	$scope.calculator=new Calc();
	$scope.expression='';
	var inputStack=[];
	var exp='';
	$scope.result = 0;

	var getResult=function(num,oper){
		//according to oper,use calc obj calculate the value
		switch(oper){
			case '+':
			$scope.calculator.add(num);
			return $scope.calculator.result;

			case '-':
			$scope.calculator.substract(num);
			return $scope.calculator.result;

			case '*':
			$scope.calculator.multiply(num);
			return $scope.calculator.result;

			case '/':
			//prevent from divide 0
			if(num==0){
				return null;
			}
			$scope.calculator.divide(num);
			return $scope.calculator.result;

			default:
			$scope.calculator.reset();
			break;
		}

	}
	
	$scope.press=function(key){

		$scope.expression=$scope.expression+key;
		//if input a number, keep it in exp, 
		//until user input an operator or '()', push exp into inputSack first, then push key.
		var numString = "0123456789.";
		if(numString.indexOf(key) > -1){
			//key is a number
			exp=exp+key;
		}
		else{
			if(exp!=''){
				inputStack.push(new Number(exp));
				exp='';
			}
			inputStack.push(key);

		}
	};

	$scope.clearAll=function(){
		//initialise the calculator
		$scope.expression='';
		inputStack=[];
		$scope.result = 0;
		$scope.calculator.reset();	
	};

	$scope.executeEval=function(){
		//if input number without operater then press =,
		//display the number as result
		if(!isNaN($scope.expression)){
			$scope.result=new Number($scope.expression);
			$scope.expression='';
			return;
		}
		//after press =, push previous number into inputStack;
		if(exp!=''){
			inputStack.push(new Number(exp));
			exp='';
		}

		//use analyExp to analy the input expression
		//return outputQueue,which alreay transfer infix notation to Reverse Polish notation (RPN)
		var outputQueue=analyExp.analy(inputStack);
		var outputStack = [];
		//use  Reverse Polish notation to calculate the value
		while(outputQueue.length > 0)
		{
			var cur = outputQueue.shift();

			if(!analyExp.isOperator(cur))
			{
				outputStack.push(cur);
			}else
			{
				if(outputStack.length < 2)
				{
					$scope.expression='invalid expression';
					$scope.calculator.reset();
					$scope.result=0;
					return;
				}
				var sec = outputStack.pop();
				var fir = outputStack.pop();

				$scope.calculator.initResult(fir);
				var result=getResult(sec, cur);
				if(result==null){
					$scope.expression='invalid expression,can not divide 0';
					$scope.calculator.reset();
					$scope.result=0;
					return;
				}

				outputStack.push(result);
			}
		}

		if(outputStack.length != 1)
		{
			$scope.expression='invalid expression';
			$scope.calculator.reset();
			$scope.result=0;
			return;
		}else
		{
			$scope.result = $scope.calculator.equals();
			$scope.expression='';
		}
	};


}]);


