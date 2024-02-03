describe("Payment test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    billAmtInput.value = 12000;
    tipAmtInput.value = 120;
  });

  it('should add a new payment with the tip allPayments on submitPaymentInfo()', function () {
    submitPaymentInfo();

    expect(Object.keys(allPayments).length).toEqual(1);
    expect(Number(allPayments['payment' + paymentId].billAmt)).toEqual(12000);
  });

  it('should add a new entry in the allPayments using createCurPayment()', function () {
    submitPaymentInfo();
    expect(allPayments).toEqual({payment1: {billAmt:'12000', tipAmt: '120', tipPercent: 1}});
  });

  it('should add a new entry in the payment table using appendPaymentTable()', function () {
    submitPaymentInfo();
    let nodeLst = paymentTbody.querySelectorAll("tr td");
    expect(nodeLst[0].innerText).toEqual('$12000');
    expect(nodeLst[1].innerText).toEqual('$120');
    expect(nodeLst[2].innerText).toEqual('1%');

    // expect(allPayments).toEqual({payment1: {billAmt:'12000', tipAmt: '120', tipPercent: 1}});
  });

  
  it('should add a new entry in the summary table using updateSummary()', function () {
    submitPaymentInfo();
    billAmtInput.value = 10000;
    tipAmtInput.value = 100;
    submitPaymentInfo();
    let billTotStr = summaryTds[0].innerText;
    let tipTotStr = summaryTds[1].innerText;
    let tipPercentAvg = summaryTds[2].innerText;
    expect(billTotStr).toEqual(`$${12000+10000}`);
    expect(tipTotStr).toEqual(`$${100+120}`);
    expect(tipPercentAvg).toEqual(`${1}%`);
  });

  afterEach(function() {
    // teardown logic

    billAmtInput.value = 0;
    tipAmtInput.value = 0;


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

