var web3Provider = null;
var PolarshipContract;
const nullAddress = "0x0000000000000000000000000000000000000000";

function init(){
	
	initWeb3();
}

function initWeb3() {
  if (typeof web3 !== 'undefined' && typeof web3.currentProvider !== 'undefined') {
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3Provider);
  } else {    
    console.error('No web3 provider found. Please install Metamask on your browser.');
    alert('No web3 provider found. Please install Metamask on your browser.');
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  
  // we init The Wrestling contract infos so we can interact with it
  initContract();
}

function initContract(){
	$.getJSON('PolarshipCoin.json', function(data) {
		PolarshipContract = TruffleContract(data);
		
		PolarshipContract.setProvider(web3Provider);
		
		//getEvents();	but event not included
		
		getCoinName();
		//getTotalSupply();
		getBalance();
		bindEvents();
		getSymbolName();
		//getDonorAddress();
	}); 
}

function bindEvents() {
	$(document).on('click', '#transferButton', doDonate); 
}   

function getCoinName() {
		PolarshipContract.deployed().then(function(instance) {
			return instance.name.call(); 
		}).then(function(result){
			$("#coinName").text(result);
		}).catch(function(err){
			console.log(err.message);
		});
}

function getSymbolName() {
		PolarshipContract.deployed().then(function(instance) {
			return instance.symbol.call(); 
		}).then(function(result){
			$("#symbolName").text(result);
		}).catch(function(err){
			console.log(err.message);
		});
}

function getTotalSupply() {
		PolarshipContract.deployed().then(function(instance) {
			return instance.totalSupply.call(); 
		}).then(function(result){
			$("#totalSupply").text(result);
		}).catch(function(err){
			console.log(err.message);
		});
}

function getBalance() {
	web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
	  
      var account = accounts[0];
	  
		PolarshipContract.deployed().then(function(instance) {
			return instance.balanceOf.call(account); 
		}).then(function(result){
			$("#balanceOf").text(result);
		}).catch(function(err){
			console.log(err.message);
		});
	});
}

function doDonate() {
	
	web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
	  
      var account = accounts[0];
	  var toAddress = $('#transferAddress').val();
	  var amount = parseInt($('#transferAmount').val());
	  
	  console.log(toAddress+"_"+amount);
		PolarshipContract.deployed().then(function(instance){
			return instance.sendTransaction({from:account, value: web3.toWei(amount, 'ether')});
			//return instance.sendTransaction({from:account, to: instance.address, value: web3.toWei(amount, 'ether')});
		
		}).then(function(txHash){
			console.log(txHash);
		});
	});
}

$(function() {
  $(window).load(function() {
    init();
  });
});