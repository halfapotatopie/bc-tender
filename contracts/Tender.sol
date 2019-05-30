pragma solidity ^0.5.3;

contract Tender {
 
    enum tenderPeriod { bidding, revelation, end }
    
    address private owner;
    string private projectDescription;
    uint private deposit;
    uint private biddingEnd;
    uint private revelationEnd;
    address private winner;
    uint private highestBid;
    bool private winnerExists;
    mapping(address => bytes32) hashedBids;
    mapping(address => bool) bidExists;
    bid[] private bidQueue;
    
    
    event tenderEndsWithWinner(address winner, uint bid);
    event tenderEndsWithoutWinner();

    struct bid {
        uint amount;
        address owner;
    }
    
    constructor(string desc, uint biddingDuration, uint revelationDuration, uint depositAmount) public payable {
        this.owner = msg.sender;
        this.projectDescription = desc;
        this.biddingEnd = now + (biddingDuration * 1 minutes);
        this.revelationEnd = this.biddingEnd + (revelationDuration * 1 minutes);
        this.deposit = depositAmount;
    }
    
    modifier onlyBefore(uint time) { 
        require(now < time); 
        _; 
    }

    modifier onlyAfter(uint time) { 
        require(now > time); 
        _; 
    }
    
    modifier ownerOnly() {
        require(this.owner == msg.sender);
        _;
    }
    
    function hasBidBefore(address bidder) private returns (bool) {
        return bidExists[bidder];
    }
    
    function bid(bytes32 hashedBid) public payable onlyBefore(this.biddingEnd) {
        if (hasBidBefore(msg.sender)) {
            hashedBids[msg.sender] = hashedBid;
        } else {
            // TODO: check msg.value and receives deposit, handle error if not enough
            hashedBids[msg.sender] = hashedBid;
            bidExists[msg.sender] = true;
        }
    }

    function reveal(uint nonce, uint bid) public onlyAfter(this.biddingEnd) onlyBefore(this.revelationEnd) {
        require(hasBidBefore[msg.sender]);
        
        bytes toHash = abi.encodePacked(nonce, bid);
        bytes32 revealHash = keccak256(toHash);
        
        if (revealHash == this.hashedBids[msg.sender]) {
            // TODO: add to bidQueue
        }
    }
    
    // TODO: to implement!
    function reopenTender(string desc, uint biddingDuration, uint revelationDuration, uint depositAmount) public ownerOnly() {
        
    }
    
    // TODO: to implement!
    function endRevelation() public ownerOnly() {
        
    }    
    
    // TODO: implement function to retrieve results after ending of revelation, function to find out the current period {bidding,
    // revelation, end}
    
}
