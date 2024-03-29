let monthlyPayment = null;
window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {

  document.querySelector("input#loan-rate").defaultValue = "12.0";
  document.querySelector("input#loan-years").defaultValue = "1";
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let vals = getCurrentUIValues();
  monthlyPayment = calculateMonthlyPayment(vals);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const i = values.rate/12.0;
  const monthlyAmount = (values.amount*i)/(1-(1+i)**(-values.years*12.0));
  return String(monthlyAmount.toFixed(2));

}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.querySelector("span#monthly-payment").innerText = monthly;
}
