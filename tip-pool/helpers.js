
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}


// expects a table row element, appends a button to that table row, attach an event listener so that
// when that button is clicked, the table row this button belongs to gets deleted.

function appendDeleteBtn(tr, type = "server"){
  let newTd = document.createElement('td');
  newTd.innerText = 'X';
  tr.append(newTd);
  if (type === "server"){
    newTd.addEventListener("click", handleServerDeletion);
  }
  else if (type === "payment"){
    newTd.addEventListener("click", handlePaymentDeletion);
  }
  }
  


// Function added by me to handle a server deletion
function handleServerDeletion(e){
  // e.target.parentElement.remove();
  let serverIDToBeDeleted = e.target.parentElement.getAttribute("id");
  delete allServers[serverIDToBeDeleted];
  e.target.parentElement.remove();
  updateServerTable();
}


// Function added by me to handke a payment deletion
function handlePaymentDeletion(e){
  // e.target.parentElement.remove();
  let paymentIDToBeDeleted = e.target.parentElement.getAttribute("id");
  delete allPayments[paymentIDToBeDeleted];
  e.target.parentElement.remove();
  updateServerTable();
  updateSummary();
}

// A function added by me to simulate mouse click (found in Stack Overflow)

function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
  }