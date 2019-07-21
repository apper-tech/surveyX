pragma solidity >=0.4.21 <0.6.0;
import './Signature.sol';

contract Survey {
   address public signatureAddress;
    constructor (address _addr) public {
        signatureAddress = _addr;
    }

  struct SurveyStruct {
    string Id;
    address owner;
    bytes32 sHash;
    bool done;
  }
  struct ParticipantStruct {
    string Id;
    string SId;
    address owner;
  }
  struct ClaimStruct {
    string SId;
    address winner;
    uint prize;
  }

  mapping(address => SurveyStruct) public surveyStruct;
  address[] public surveyList;

  mapping(address => ParticipantStruct) public participantStruct;
  address[] public participantList;

  mapping(uint => ClaimStruct) public claimStruct;
  uint public claimCount;

  address[] Claimed;

  function addSurvey(string memory _id,address _owner,string memory _data) public payable returns(bool) {
    require(!compare(_id, ""),'Id Too Small');
     surveyList.push(_owner);
     surveyStruct[_owner].Id = _id;
     surveyStruct[_owner].owner = _owner;
     surveyStruct[_owner].sHash = keccak256(abi.encodePacked(_data));
     surveyStruct[_owner].done = false;
     return true;
  }
  function endSurvey(string memory _id,address _winner,uint _prize) public returns(bool) {
     for (uint i = 0; i < surveyList.length; i++) {
          if(compare(_id, surveyStruct[surveyList[i]].Id))
           {
            surveyStruct[surveyList[i]].done = true;
            claimStruct[claimCount].SId = _id;
            claimStruct[claimCount].winner = _winner;
            claimStruct[claimCount].prize = _prize;
             return true;
           }
    }
    return false;
  }
  function cancelSurvey(address _owner) public returns(bool) {
     for (uint i = 0; i < surveyList.length; i++) {
          if(surveyStruct[surveyList[i]].owner == _owner)
           {
             delete(surveyStruct[surveyList[i]]);
             delete(surveyList[i]);
             return true;
           }
    }
    return false;
  }
  function claimPrize(address _winner,bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public returns(bool) {
    Signature instanceSignature = Signature(signatureAddress);
    address addr = instanceSignature.verifySign(_winner,msgHash,v,r,s);
    if(addr == _winner)
    {
      for (uint i = 0; i < claimCount;i++) {
       if(claimStruct[i].winner == _winner)
       {
        if(address(this).balance < claimStruct[i].prize) revert('no enough coin');
        msg.sender.transfer(claimStruct[i].prize);
        Claimed.push(_winner);
        return true;
       }
      }
    }
    return false;
  }
  function checkPrize() public view returns(address[] memory) {
    return Claimed;
  }
  function getBalance() public view returns(uint256) {
    return address(this).balance;
  }
  function addParticipation(string memory _id,string memory _sid,address _owner) public returns(bool) {
    require(!compare(_id, ""),'Id Too Small');
    require(!compare(_sid, ""),'SId Too Small');
     participantList.push(_owner);
     participantStruct[_owner].Id = _id;
     participantStruct[_owner].SId = _sid;
     participantStruct[_owner].owner = _owner;
     return true;
  }
  function compare(string memory first,string memory second) private pure returns(bool)  {
    return keccak256(abi.encodePacked(first)) == keccak256(abi.encodePacked(second));
  }
  function surveyExsist(address _owner) public view returns(bool){
   if(surveyStruct[_owner].owner == _owner && !surveyStruct[_owner].done)
     return true;
    return false;
  }
  function getSurveyByAddress(address _owner) public view returns (string memory) {
     for (uint i = 0; i < surveyList.length; i++) {
            if(surveyList[i] == _owner)
            {
              if(!surveyStruct[_owner].done)
               return surveyStruct[surveyList[i]].Id;
            else
               return "done";
            }
    }
  }
  function getparticipantByAddress(address _owner) public view returns (string memory,string memory) {
     for (uint i = 0; i < participantList.length; i++) {
            if(participantList[i] == _owner)
            return (participantStruct[participantList[i]].Id,
                    participantStruct[participantList[i]].SId);
    }
  }
}