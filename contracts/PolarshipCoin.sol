pragma solidity ^0.4.18;

contract PolarshipCoin {
    
    string public name; // token name
    string public symbol;
    uint256 public totalSupply;
    uint256 public price;
    
    address public owner;
    
    mapping(address => uint256) public balanceOf; // balance of respective addresses
     
    //event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor(uint256 _supply, uint256 _tokenPerEth, string _name, string _symbol){
        balanceOf[msg.sender] = _supply;
        price = 1 ether / _tokenPerEth; // unit type conversion study required
        name = _name;
        symbol = _symbol;
        totalSupply = _supply;
        owner = msg.sender; // address
    }
    
    modifier onlyOwner() {if (msg.sender != owner) throw;
        _; // why do i have to add this??
    }
    
    /*function sendToken(address _to, uint256 _value) onlyOwner{
        if(balanceOf[msg.sender] < _value) throw;
        if(balanceOf[_to] + _value < balanceOf[_to]) throw; // in case of sending negative
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        // Transfer(msg.sender, _to, _value)
    }*/
    
    function () payable {
        if(msg.value <=0 || balanceOf[owner] <= 0) throw;
        
        uint256 amount = msg.value;
        if(amount > 0){ // will be throwed
            owner.transfer(amount);
        }
        balanceOf[msg.sender] += amount/price; // 1 token = 1/2 eth
        balanceOf[owner] -= amount/price;
    }
    
}