/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.viridissima.es/product/material-kit-react
* Copyright 2021 viridissima.es (https://www.viridissima.es)

Coded by www.viridissima.es

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import {useState} from "react";
import {useConnectWallet} from "@web3-onboard/react";
import {ethers} from "ethers"
import Wrapunwrapfield from "../../../../../../assets/theme/components/wrapunwrapfield";
import flrLogo   from '../../../../../../assets/images/logos/flare.png'
import sgbLogo   from '../../../../../../assets/images/logos/sgb.png'
import switchPng from '../../../../../../assets/images/logos/switch.png'
import MKButton from "../../../../../../components/MKButton";
import {chainData} from "../../../../../../chains"
import "./a.css"

const abi = [
    'function deposit() payable',
    'function withdraw(uint256 amount)',
    'function balanceOf(address) view returns(uint256)'
]

const chains = {};
chains["0xe"] = 5;
chains[14] = 5;
chains["0x13"] = 2;
chains[19] = 2;

function WrapUnwrap({coin}) {

  // eslint-disable-next-line no-unused-vars
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [wbal, swbal] = useState("0");
  const [nbal, snbal] = useState("0");
  const wcoin = `W${coin}`;
  let logo;

  const [tw, stw] = useState(true)

  async function getBalanceNat(){
    const prov = new ethers.providers.Web3Provider(wallet.provider);

    const bal = await prov.getBalance(wallet.accounts[0].address);
    snbal(parseFloat(ethers.utils.formatEther(bal)).toFixed(4).toString())
  }

  async function getBalanceWrapped(){
    const prov = new ethers.providers.Web3Provider(wallet.provider);
    const chainDec = parseInt(wallet.chains[0].id, 16);
    // alert(chainDec)
    const address = chainData[chains[chainDec]].wNat;
    const contract = new ethers.Contract(address, abi, prov);
    const bal = await contract.balanceOf(wallet.accounts[0].address);
    swbal(parseFloat(ethers.utils.formatEther(bal)).toFixed(4).toString())
  }

  getBalanceWrapped()
  getBalanceNat()

  async function doWrap(wrap){

    const prov = new ethers.providers.Web3Provider(wallet.provider);
    const chainDec = parseInt(wallet.chains[0].id, 16);
    // alert(chainDec)
    const address = chainData[chains[chainDec]].wNat;
    const contract = new ethers.Contract(address, abi, prov.getSigner());

    if(wrap){
      const amount = document.getElementById(coin).value;
      const options = {gasLimit: 8000000, value: ethers.utils.parseUnits(amount, "ether")}
      const r = await contract.deposit(options);
      await r.wait(1)

    } else {
      const amount = document.getElementById(`W${coin}`).value;
      const options = {gasLimit: 8000000, value: 0 }
      const r = await contract.withdraw(ethers.utils.parseUnits(amount, "ether"), options);
      await r.wait(1)
    }

    await getBalanceNat()
    await getBalanceWrapped()

  }

  // function wrap(amount){
  //   let prov = new ethers.providers.Web3Provider(wallet.provider)
  //   const contract = new ethers.Contract(address, abi, prov);
  //   //ctr=ethers.
  // }

  function toggleWrap(){
    if(tw){ stw(false) } else { stw(true) }
  }

  if(coin==="FLR"){
    logo=flrLogo;
  } else {
    logo=sgbLogo;
  }

  return (
    <MKBox className="bbo" style={{background:"rgba(16,24,16,1)", overflowY: "hidden"}} component="section" py={{ xs: 1, md: 1 }}>

      <Container alignItems="top" style={{display: "flex", flexWrap:"wrap"}}>

            <div className="swapper" style={{display: "flex", flexWrap:"wrap"}}>
            {tw ?
                <Wrapunwrapfield logo={logo} name={coin} balance={nbal} enabled />
                :
                <Wrapunwrapfield logo={logo} name={wcoin} balance={wbal} enabled />
            }
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,no-alert,jsx-a11y/no-static-element-interactions */}
            <div style={{width:"24px", height:"34px", display:"block",marginLeft:"auto",marginRight:"auto",marginTop:"-10px",zIndex:5,marginBottom:"-20px"}} onClick={()=>toggleWrap()}>
              <img style={{width:"24px", height:"24px", display:"block",marginLeft:"auto",marginRight:"auto",marginTop:"0px", zIndex:5, marginBottom:"-10px"}} src={switchPng} alt="sw"/>
            </div>
            {tw ?
                <Wrapunwrapfield logo={logo} name={wcoin} balance={wbal} />
                :
                <Wrapunwrapfield logo={logo} name={coin} balance={nbal} />
            }
            <Grid container item justifyContent="center" xs={12} mt={1} mb={1}>
              {tw ?
                  <MKButton onClick={()=>doWrap(true)} style={{width:"98%"}} type="submit" variant="gradient" color="info">
                    Wrap {coin}
                  </MKButton>
                  :
                  <MKButton onClick={()=>doWrap(false)} style={{width:"98%"}}  type="submit" variant="gradient" color="info">
                    Unwrap {wcoin}
                  </MKButton>
              }
            </Grid>
        </div>

          <div className="bobby" style={{margin:"0 auto"}}>
            <MKBox display="flex" alignItems="center" p={2}>
              <MKBox className="imw"
                  width="3rem"
                  height="3rem"
                  variant="gradient"
                  bgColor="info"
                  color="white"
                  coloredShadow="info"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="xl"
              >
                <Icon fontSize="small">mediation</Icon>
              </MKBox>
              <MKTypography style={{whiteSpace:"break-spaces"}} variant="body2" color="text" pl={2}>
                Wrapped coins are used to delegate to your chosen TSO providers. You are still able to spend or otherwise transfer them.
              </MKTypography>
            </MKBox>
            <MKBox display="flex" alignItems="center" p={2}>
              <MKBox className="imw"
                  width="3rem"
                  height="3rem"
                  variant="gradient"
                  bgColor="info"
                  color="white"
                  coloredShadow="info"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="xl"
              >
                <Icon fontSize="small">settings_overscan</Icon>
              </MKBox>
              <MKTypography style={{whiteSpace:"break-spaces"}} variant="body2" color="text" pl={2}>
                The more coins you have wrapped and delegated, the greater your potential rewards become.
              </MKTypography>
            </MKBox>
            <MKBox display="flex" alignItems="center" p={2}>
              <MKBox className="imw"
                  width="3rem"
                  height="3rem"
                  variant="gradient"
                  bgColor="info"
                  color="white"
                  coloredShadow="info"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="xl"
              >
                <Icon fontSize="small">token</Icon>
              </MKBox>
              <MKTypography style={{whiteSpace:"break-spaces"}} variant="body2" color="text" pl={2}>
                Wrapping your rewarded coins compounds your rewards!
              </MKTypography>
            </MKBox>
          </div>

      </Container>
    </MKBox>
  );
}

export default WrapUnwrap;
