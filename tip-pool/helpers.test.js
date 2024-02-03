describe("Helpers tests (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    billAmtInput.value = 120000;
    tipAmtInput.value = 120;
    submitPaymentInfo();

    billAmtInput.value = 120000;
    tipAmtInput.value = 10;
    submitPaymentInfo();

    billAmtInput.value = 100000;
    tipAmtInput.value = 10;
    submitPaymentInfo();
  });

  it('should add bill amount, tip amount, and tip Percent using sumPaymentTotal()', function () {
    let totBill = sumPaymentTotal('billAmt');
    let totTip = sumPaymentTotal('tipAmt');
    let totTipPercent = sumPaymentTotal('tipPercent');

    expect(totBill).toEqual(120000+120000+100000);
    expect(totTip).toEqual(140);
  });

  it('should calculate tip percentage using calculateTipPercent()', function () {
  

    expect(calculateTipPercent(1000, 10)).toEqual(1);
    expect(calculateTipPercent(1000, 0)).toEqual(0);
  });


  it('should calculate tip percentage using calculateTipPercent()', function () {
  

    expect(calculateTipPercent(1000, 10)).toEqual(1);
    expect(calculateTipPercent(1000, 0)).toEqual(0);
  });

  it('Should append a td with an innerText set to "value" into the provided tr using appendTd(tr, value)',
  function(){
    myElement = document.createElement("tr");
    myTd = document.createElement("td");
    myTd.innerText = "Hello!";
    myElement.append(myTd);

    elemetnToBeTested = document.createElement("tr");
    appendTd(elemetnToBeTested, "Hello!");
    expect(elemetnToBeTested).toEqual(myElement);
  });

  it(`Should append a td with an innerText set to "X" into the provided tr using appendDeleteBtn(tr). If the 
    X is clicked, the parent tr must be deleted`,
  function(){
    let myTable = document.createElement("tbody");
    let myElement = document.createElement("tr");
    myTable.append(myElement);
    let myTd = document.createElement("td");
    myTd.innerText = "Hello!";
    myElement.append(myTd);
    myTd = document.createElement("td");
    myTd.innerText = 'X';
    myElement.append(myTd);
    
    myTd.addEventListener("click", handleServerDeletion);

    let myTableToBeTested = document.createElement("tbody");
    let myElementTOBeTested = document.createElement("tr");
    myTableToBeTested.append(myElementTOBeTested);
    let myTdToBeTested = document.createElement("td");
    myTdToBeTested.innerText = "Hello!";
    myElementTOBeTested.append(myTdToBeTested);
    appendDeleteBtn(myElementTOBeTested);

    
    expect(myTable).toEqual(myTableToBeTested);


    simulate(myTd, "click");

    simulate(myTableToBeTested.querySelectorAll("tr td")[1], "click");
    expect(myTable).toEqual(myTableToBeTested);

  });

  afterEach(function() {
    // teardown logic

    billAmtInput.value = '';
    tipAmtInput.value = '';


    // serverNameInput.value = '';
    // allServers = {};
    // serverId = 0;
    allPayments = {};
    paymentId = 0;
    for (let node of document.querySelectorAll("table#paymentTable tbody tr")){
      node.remove();
    }
    // for (let node of serverTbody.querySelectorAll("tr")){
    //   node.remove();
    // }
    for (let node of summaryTds){
      node.innerText='';
    }
    // serverTbody.querySelector("tr").remove();

  });
});

