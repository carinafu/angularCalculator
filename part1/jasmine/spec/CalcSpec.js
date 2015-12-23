describe("calc", function() {
  var result1, result2, result3;
  var calculator = new Calc();

  // beforeEach(function() {
  //   calculator = new Calc();
  // });

  it("should be able to add a number", function() {
    calculator.add(5);
    expect(calculator.result).toEqual(5);
  });

  it("should be able to substract a number", function() {
    calculator.substract(4);
    expect(calculator.result).toEqual(1);
  });

  it("should be able to multiply a number", function() {
    calculator.multiply(6);
    expect(calculator.result).toEqual(6);
  });

  it("should be able to divide a number", function() {
    calculator.add(5).divide(2);
    expect(calculator.result).toEqual(5.5);
  });

  it("should be able to reset a number", function() {
    calculator.add(5).reset();
    expect(calculator.result).toEqual(0);
  });

  it("should be able to calculate numbers", function() {
    result1=calculator.add(1).add(2).multiply(2).substract(4).equals();
    expect(result1).toEqual(2);
  });

  it("should be able to calculate numbers", function() {
    result2=calculator.add(5).multiply(2).substract(5).equals();
    expect(result2).toEqual(5);
  });

  it("should be able to calculate numbers", function() {
    result3=calculator.add(6).divide(2).multiply(0.5).equals();
    expect(result3).toEqual(1.5);
  });


});
