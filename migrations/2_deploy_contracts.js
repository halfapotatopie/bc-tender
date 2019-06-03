const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const Tender = artifacts.require("Tender");
const HashGenerator = artifacts.require("HashGenerator");

const tenderByteCode = '0x60806040526040516200166138038062001661833981018060405260808110156200002957600080fd5b8101908080516401000000008111156200004257600080fd5b828101905060208101848111156200005957600080fd5b81518560018202830111640100000000821117156200007757600080fd5b5050929190602001805190602001909291908051906020019092919080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360019080519060200190620000f892919062000124565b50603c83024201600381905550603c8202600354016004819055508060028190555050505050620001d3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200016757805160ff191683800117855562000198565b8280016001018555821562000198579182015b82811115620001975782518255916020019190600101906200017a565b5b509050620001a79190620001ab565b5090565b620001d091905b80821115620001cc576000816000905550600101620001b2565b5090565b90565b61147e80620001e36000396000f3fe608060405260043610610088576000357c0100000000000000000000000000000000000000000000000000000000900480631f7c30fd1461008d57806343d726d6146101735780634717f97c1461018a578063553545d2146101e85780636a0054d1146102165780637a9353701461022d578063eced028014610272578063ff3a9c7e14610302575b600080fd5b34801561009957600080fd5b50610171600480360360808110156100b057600080fd5b81019080803590602001906401000000008111156100cd57600080fd5b8201836020820111156100df57600080fd5b8035906020019184600183028401116401000000008311171561010157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919080359060200190929190803590602001909291905050506103a7565b005b34801561017f57600080fd5b5061018861045b565b005b34801561019657600080fd5b5061019f61050b565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b610214600480360360208110156101fe57600080fd5b8101908080359060200190929190505050610569565b005b34801561022257600080fd5b5061022b610743565b005b34801561023957600080fd5b506102706004803603604081101561025057600080fd5b810190808035906020019092919080359060200190929190505050610bd2565b005b34801561027e57600080fd5b5061028761117a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102c75780820151818401526020810190506102ac565b50505050905090810190601f1680156102f45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561030e57600080fd5b50610317611246565b6040518080602001858152602001848152602001838152602001828103825286818151815260200191508051906020019080838360005b8381101561036957808201518184015260208101905061034e565b50505050905090810190601f1680156103965780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b3373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561040257600080fd5b8360019080519060200190610418929190611358565b50603c83024201600381905550603c820260035401600481905550806002819055506000600760016101000a81548160ff02191690831515021790555050505050565b3373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156104b657600080fd5b600760019054906101000a900460ff1615156104d157600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b600080600454804211151561051f57600080fd5b600760019054906101000a900460ff16151561053a57600080fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660065492509250509091565b600354804210151561057a57600080fd5b61058333611302565b156105f857604080519081016040528083815260200142815250600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015590505061073f565b670de0b6b3a7640000600254023414151561067b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4465706f73697420616d6f756e7420697320696e636f7272656374210000000081525060200191505060405180910390fd5b604080519081016040528083815260200142815250600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000155602082015181600101559050506001600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5050565b3373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561079e57600080fd5b60045480421115156107af57600080fd5b600760019054906101000a900460ff161515156107cb57600080fd5b6000600a80549050141561080a577f33e08f6e3768eedb2e4bacee86a18a76b6f19c3b73f0d070f3e1ee5c9456b8c360405160405180910390a1610bb4565b6108126113d8565b60008090506000670de0b6b3a76400006002540290505b600760009054906101000a900460ff1615801561084c5750600a80549050821015155b1561099857600a8281548110151561086057fe5b90600052602060002090600302016060604051908101604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509250670de0b6b3a764000083600001510281846040015173ffffffffffffffffffffffffffffffffffffffff16310310151561098a578260400151600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600001516006819055506001600760006101000a81548160ff021916908315150217905550610993565b81806001019250505b610829565b6109a06113d8565b60006001840190505b600a80549050811015610ad857600a818154811015156109c557fe5b90600052602060002090600302016060604051908101604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509150670de0b6b3a764000082600001510283836040015173ffffffffffffffffffffffffffffffffffffffff163103101515610acb57816040015173ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f19350505050158015610ac9573d6000803e3d6000fd5b505b80806001019150506109a9565b50600760009054906101000a900460ff1615610b82577fd69c971831c5571301c3ea9e7226489c0ce4c2f498bb8f90f7e17772e273a062600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600654604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1610baf565b7f33e08f6e3768eedb2e4bacee86a18a76b6f19c3b73f0d070f3e1ee5c9456b8c360405160405180910390a15b505050505b6001600760016101000a81548160ff02191690831515021790555050565b6003548042111515610be357600080fd5b6004548042101515610bf457600080fd5b610bfd33611302565b1515610c0857600080fd5b6060848460405160200180838152602001828152602001925050506040516020818303038152906040529050600081805190602001209050610c48611410565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604080519081016040529081600082015481526020016001820154815250509050806000015182141515610d49576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001807f496e636f7272656374206e6f6e636520616e642f6f722062696420616d6f756e81526020017f742100000000000000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b610d516113d8565b606060405190810160405280888152602001836020015181526020013373ffffffffffffffffffffffffffffffffffffffff1681525090506000600a8054905090506000809050610da06113d8565b610da86113d8565b60008090505b84811015610fa557610dbe6113d8565b600a82815481101515610dcd57fe5b90600052602060002090600302016060604051908101604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505090508415610ee05783925080935082600a83815481101515610e6f57fe5b9060005260206000209060030201600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050610f97565b80600001518d1180610f08575080600001518d148015610f07575080602001518860200151105b5b15610f955780935086600a83815481101515610f2057fe5b9060005260206000209060030201600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505060019450610f96565b5b5b508080600101915050610dae565b5082151561103e57600a8590806001815401808255809150509060018203906000526020600020906003020160009091929091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506110cb565b600a8290806001815401808255809150509060018203906000526020600020906003020160009091929091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008082016000905560018201600090555050600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055505050505050505050505050565b60606003544210156111c3576040805190810160405280600e81526020017f42696464696e6720506572696f640000000000000000000000000000000000008152509050611243565b60045442101561120a576040805190810160405280601181526020017f526576656c6174696f6e20506572696f640000000000000000000000000000008152509050611243565b6040805190810160405280600381526020017f456e64000000000000000000000000000000000000000000000000000000000081525090505b90565b606060008060006001600254600354600454838054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112ed5780601f106112c2576101008083540402835291602001916112ed565b820191906000526020600020905b8154815290600101906020018083116112d057829003601f168201915b50505050509350935093509350935090919293565b6000600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061139957805160ff19168380011785556113c7565b828001600101855582156113c7579182015b828111156113c65782518255916020019190600101906113ab565b5b5090506113d4919061142d565b5090565b6060604051908101604052806000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b604080519081016040528060008019168152602001600081525090565b61144f91905b8082111561144b576000816000905550600101611433565b5090565b9056fea165627a7a72305820b277c6d52109ed2bb18aa2bccc4c703b3e9abf65faf563f1efc31dc60fd8568a0029';

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(HashGenerator);
  deployer.deploy(Tender, 'abc', 2, 2, 2);
};
