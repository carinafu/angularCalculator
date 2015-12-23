(function(){

var Calc=function(){
	this.result=0;
};

Calc.prototype.initResult = function(num){
	this.result=num;
	return this;
};

Calc.prototype.add = function(num){
	this.result=this.result + num;
	return this;
};

Calc.prototype.substract = function(num){
	this.result=this.result - num;
	return this;
};

Calc.prototype.multiply = function(num){
	this.result=this.result * num;
	return this;
};

Calc.prototype.divide = function(num){
	if(num!=0){
		this.result=this.result / num;
		return this;	
	}
	else{
		throw new Error("can not divide by 0");
	}
	
};

Calc.prototype.reset = function(){
	this.result=0;
	return this;
};

Calc.prototype.equals = function(){
	var copyResult=this.result;
	this.reset();
	return copyResult;
};

window.Calc=Calc;
	
})();

