pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Survey {
  
  struct SurveyData {
    uint surveyId;
    string title;
    string description;
    string[3] options;
    uint256 creationDate;
    string code;
    uint participantCount;
  }
  struct participantData {
    address surveyAddress;
    uint selectedOption;
  }
  mapping(address => SurveyData) public surveys;
  mapping (uint => address) surveysIndex;
  mapping(address => participantData) public participants;
  mapping (uint => address) participantsIndex;
  mapping (address=>uint) public deposits;
  uint public surveyCount;
  uint public participantsCount;

  constructor() public {
  }
  function addSurvey (
    string memory _title,
    string memory _desc,
    address _owner,
    string memory option1,
    string memory option2,
    string memory option3,
    string memory _code) public returns(bool)  {
    require(bytes(_title).length > 0,"Title Can't be Empty!");
    require(bytes(_desc).length > 0,"Please add a description");
    surveyCount++;
    string[3] memory options = [option1,option2,option3];
    surveys[_owner] = SurveyData(surveyCount, _title, _desc,options ,now,_code, 0);
    surveysIndex[surveyCount] = _owner;
    return true;
  }
  function surveyExsist(address _owner)public view returns(bool){
    if(surveys[_owner].surveyId > 0) {
      return true;
    }
    return false;
  }
  function castVote(uint option,string memory _code) public returns(string memory) {
    address addr = getSurveyAddressByCode(_code);
    if( addr == address(0)) {
      return "no address";
    }
    participants[msg.sender] = participantData(addr,option);
    participantsCount++;
    participantsIndex[participantsCount] = msg.sender;
    surveys[addr].participantCount++;
    return "done";
  }
  function getSurveyByAddress(address _owner) public view 
  returns(
    string memory,
    string memory,
    string memory,
    string memory,
    string memory,
    uint,
    uint256,
    string memory,
    uint
    ) {
    SurveyData memory survey = surveys[_owner];
    return (
      survey.title,
      survey.description,
      survey.options[0],
      survey.options[1],
      survey.options[2],
      survey.surveyId,
      survey.creationDate,
      survey.code,
      survey.participantCount);
  }
  function compareStrings (bytes memory a, bytes memory b) internal pure returns (bool) {
    return keccak256(a) == keccak256(b);
  }

  function getSurveyAddressByCode(string memory _code) public view returns(address) 
  {
    for (uint index = 1; index <= surveyCount; index++) {
      address surveyAddress = surveysIndex[index];
      if(compareStrings(bytes(_code),bytes(surveys[surveyAddress].code))) {
        return surveyAddress;
      }
    }
  }
  function getSurveyResultsByCode(string memory _code) public view returns(uint,uint,uint) 
  {
    uint op1;
    uint op2;
    uint op3;
    address surveyAddress = getSurveyAddressByCode(_code);
    for (uint index = 1; index <= participantsCount; index++) {
      address partAddress = participantsIndex[index];
      if(participants[partAddress].surveyAddress == surveyAddress) {
        if(participants[partAddress].selectedOption == 1 ) {
          op1++;
        }
        if(participants[partAddress].selectedOption == 2 ) {
          op2++;
        }
        if(participants[partAddress].selectedOption == 3 ) {
          op3++;
        }
      }
    }
    return (op1,op2,op3);
  }
  function getSurveyWinnerCode(string memory _code,uint rand) public returns(address) 
  {
    address surveyAddress = getSurveyAddressByCode(_code);
    for (uint index = 1; index <= participantsCount; index++) {
      address partAddress = participantsIndex[index];
      if(participants[partAddress].surveyAddress == surveyAddress) {
        if(index == rand ) {
          surveys[surveyAddress] = SurveyData(-0, "", "",["","",""], 0, "", 0);
          participants[partAddress] = participantData(address(0) ,-0);
          participantsIndex[index] = address(0);
          surveysIndex[index] = address(0);
          if(surveyCount > 0) {
            surveyCount--;
          }
          return partAddress;
        }
      }
    }
  }
}
