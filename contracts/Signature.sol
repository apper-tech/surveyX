pragma solidity >=0.4.21 <0.6.0;
contract Signature {
    struct Sign {
        address signer;
        string signature;
        bytes32 serverSignature;
    }
    mapping(address => Sign) public signStruct;
    address[] public signList;
    function getSign(address addr) public view returns(address,string memory,bytes32) {
        for (uint i = 0; i < signList.length; i++) {
            if(signList[i] == addr)
            return(
              signStruct[signList[i]].signer,
              signStruct[signList[i]].signature,
              signStruct[signList[i]].serverSignature);
        }
    }
    function storeSign(address addr,string memory sign)private returns(bool) {
        signList.push(addr);
        signStruct[addr].signer = addr;
        signStruct[addr].signature = sign;
        signStruct[addr].serverSignature = keccak256(abi.encodePacked(sign));
        return true;
    }
    function verifySign(address winner,bytes32 msgHash, uint8 v, bytes32 r, bytes32 s/*,string memory sig,bool st*/)
    public pure returns (address) {
        address addr = ecrecover(msgHash, v, r, s);
        addr = winner;
        //if(st)
       // storeSign(addr,sig);
      return addr;
    }
}