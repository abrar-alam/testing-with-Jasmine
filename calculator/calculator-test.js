
it('should calculate the monthly rate correctly', function () {
  // ...
  expect(calculateMonthlyPayment({
    amount: 0,
    years: 3,
    rate: -5.6
  })).toEqual("0.00")
});


it("should return a result with 2 decimal places", function() {
  // ..
  expect(calculateMonthlyPayment({
    amount: 0,
    years: 3,
    rate: -5.6
  })).toEqual("0.00")
});

/// etc
