describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it(`should add two servers and check if we the tip is correctly divided between the two 
  servers -- updateServerTable()`, function(){
      submitServerInfo();
      // serverNameInput.value = 'Denise';
      document.querySelector("input#billAmt").value = 12000;
      document.querySelector("input#tipAmt").value = 10;
      submitPaymentInfo();
      serverNameInput.value = 'Bob';
      submitServerInfo();
      expect(document.querySelectorAll("table#serverTable tbody tr td")[1].innerText).toEqual("$5.00");
      expect(document.querySelectorAll("table#serverTable tbody tr")[0].querySelectorAll("td")[1].innerText).toEqual("$5.00");

      
    })

  afterEach(function() {
    // teardown logic
    serverNameInput.value = '';
    allServers = {};
    serverId = 0;
    allPayments = {};
    paymentId = 0;
    
    for (let node of serverTbody.querySelectorAll("tr")){
      node.remove();
    }
    for (let node of summaryTds){
      node.innerText='';
    }

    for (let node of document.querySelectorAll("table#paymentTable tbody tr")){
      node.remove();
    }
    // serverTbody.querySelector("tr").remove();

  });
});

