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
// import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import {useEffect, useState} from "react";
import {useConnectWallet} from "@web3-onboard/react";
import {ethers} from "ethers"
// import Wrapunwrapfield from "../../../../../../assets/theme/components/wrapunwrapfield";

// import switchPng from '../../../../../../assets/images/logos/switch.png'
import MKButton from "../../../../../../components/MKButton";
import {chainData} from "../../../../../../chains"
import "./a.css"
import ProviderBox from "../../../../../../components/ProviderBox";

const abi = [
    'function deposit() payable',
    'function withdraw(uint256 amount)',
    'function balanceOf(address) view returns(uint256)',
    'function getCurrentRewardEpoch() view returns(uint256)',
    'function getStateOfRewards(address, uint256) view returns(address[] ftsos, uint256[] amounts, bool[] claimed, bool claimable)',
    'function claimReward(address, uint256[]) returns(uint256)',
    'function getEpochsWithClaimableRewards() view returns(uint256 start , uint256 end)'
]

const chains = {};
chains["0xe"] = 5;
chains[14] = 5;
chains["0x13"] = 2;
chains[19] = 2;

function Rewards({coin}) {

  // eslint-disable-next-line no-unused-vars
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  // const [wbal, swbal] = useState("0");
 //  const wbal="4884";
  // const [nbal, snbal] = useState("0");
  const [pct, spct] = useState(0); // providers, current week
  // const [plw, splw] = useState(0); // providers, last week
  const [pi1, spi1] = useState({})
  const [pi2, spi2] = useState({})
  const [lw1, slw1] = useState({})
  const [lw2, slw2] = useState({})
  const [ctot, sctot] = useState(parseFloat("0.0"));
  // const [ltot, sltot] = useState(parseFloat("0.0"));

  const [rmbal, srm] = useState(parseFloat("0.0"));

  async function getBalanceRM(address){
    const prov = new ethers.providers.Web3Provider(wallet.provider);

    const bal = await prov.getBalance(address);
    srm(parseFloat(ethers.utils.formatEther(bal)))
  }

  async function getRewardInfo(){

    const prov = new ethers.providers.Web3Provider(wallet.provider);
    const chainDec = parseInt(wallet.chains[0].id, 16);
    // alert(chainDec)
    const fmaddress  = chainData[chains[chainDec]].ftsoManager;
   // console.log(fmaddress)
    const frmaddress = chainData[chains[chainDec]].ftsoRewardManager;
    await getBalanceRM(frmaddress)
    const FtsoManager = new ethers.Contract(fmaddress, abi, prov);
    const FtsoRewardManager = new ethers.Contract(frmaddress, abi, prov.getSigner());
// console.log((await FtsoManager.getCurrentRewardEpoch()).toString());
    let rEpoch = parseInt((await FtsoManager.getCurrentRewardEpoch()).toString(), 10); rEpoch -=1;

    let rInfo = await FtsoRewardManager.getStateOfRewards(wallet.accounts[0].address, rEpoch.toString());
    let ilen = rInfo[0].length;
    if(ilen) {
      spct(ilen);
      if(ilen>0){
        slw1({addr: rInfo[0][0], amount: parseFloat(ethers.utils.formatEther(rInfo[1][0]).toString()).toFixed(4) })
        // sltot(parseFloat(ethers.utils.formatEther(rInfo[1][0]).toString()))
      }

      if(ilen>1){
        slw2({addr: rInfo[0][1], amount: parseFloat(ethers.utils.formatEther(rInfo[1][1]).toString()).toFixed(4) })
        // const t = parseFloat(ethers.utils.formatEther(rInfo[1][0]).toString())+parseFloat(ethers.utils.formatEther(rInfo[1][1]).toString())
        // sltot(parseFloat(t.toFixed(4)))
      }

    }

    // current rewards accruing

    rEpoch = parseInt((await FtsoManager.getCurrentRewardEpoch()).toString(), 10);

    rInfo = await FtsoRewardManager.getStateOfRewards(wallet.accounts[0].address, rEpoch.toString());
    ilen = rInfo[0].length;
    if(ilen) {
      // spct(ilen);
      if(ilen>0){
        spi1({addr: rInfo[0][0], amount: parseFloat(ethers.utils.formatEther(rInfo[1][0]).toString()).toFixed(4) })
        sctot(parseFloat(ethers.utils.formatEther(rInfo[1][0]).toString()))
      }

      if(ilen>1){
        spi2({addr: rInfo[0][1], amount: parseFloat(ethers.utils.formatEther(rInfo[1][1]).toString()).toFixed(4) })
        const t = parseFloat(ethers.utils.formatEther(rInfo[1][0]).toString())+parseFloat(ethers.utils.formatEther(rInfo[1][1]).toString())
        sctot(parseFloat(t.toFixed(4)))
      }

    }


    // console.log(rInfo)

  }



  async function doClaim(){
    const prov = new ethers.providers.Web3Provider(wallet.provider);
    const chainDec = parseInt(wallet.chains[0].id, 16);
    const frmaddress = chainData[chains[chainDec]].ftsoRewardManager;
    const FtsoRewardManager = new ethers.Contract(frmaddress, abi, prov.getSigner());
    // const FtsoRewardManagerR = new ethers.Contract(frmaddress, abi, prov);
    const ceps = await FtsoRewardManager.getEpochsWithClaimableRewards();

    const opts = { gasLimit: 8000000 }
    const r = await FtsoRewardManager.claimReward(wallet.accounts[0].address, [ceps.end.toString()], opts);
    await r.wait(1)
  }

  useEffect(()=> {
    getRewardInfo()
  }, []);

  return (
    <MKBox className="bbo" style={{margin:"0px !important", padding: "0px !important", border:"1px solid red", background:"rgba(16,24,16,1)", overflowY: "hidden"}} component="section" py={{ xs: 1, md: 1 }}>

      {/* <Container alignItems="top" > */}

            <div className="swapper" style={{display: "flex", flexWrap:"wrap"}}>
            { !pct ? null :
                <> {pct === 1 ?
                    <ProviderBox
                        logo={`https://github.com/xrpdevs/ftso-signal-providers/raw/master/assets/${pi1?.addr}.png`}
                        coin={coin}
                        name={pi1?.addr?.substring(0,10)}
                        balance={pi1?.amount}
                        lastBal={lw1?.amount}
                    /> :
                    <><ProviderBox
                        logo={`https://github.com/xrpdevs/ftso-signal-providers/raw/master/assets/${pi1?.addr}.png`}
                        coin={coin}
                        name={pi1?.addr?.substring(0,10)}
                        balance={pi1?.amount}
                        lastBal={lw1?.amount}
                    />
                     <ProviderBox
                         logo={`https://github.com/xrpdevs/ftso-signal-providers/raw/master/assets/${pi2?.addr}.png`}
                         coin={coin}
                         name={pi2?.addr?.substring(0,10)}
                         balance={pi2?.amount}
                         lastBal={lw2?.amount}
                         /></>
                   } </>
            }
              Total: { ctot ? <> {console.log("CTOT:", ctot, typeof ctot)} {ctot?.toFixed(4)} RM Balance: {rmbal?.toFixed(4)} </> : null }
            <Grid container item justifyContent="center" xs={12} mt={1} mb={1}>
              {rmbal > ctot ?
                  <MKButton onClick={()=>doClaim()} style={{width:"98%"}} type="submit" variant="gradient" color="info">
                    Claim {coin}
                  </MKButton>
                  :
                  <MKButton disabled onClick={()=>doClaim()} style={{width:"98%"}}  type="submit" variant="gradient" color="info">
                    Waiting for RM to refill...
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
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                If you see "waiting for RM to refill", please check back in a few hours, by which time the Reward Manager contract's funds for claiming should have been replenished.
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
                The amounts shown here are for the current week. If you forgot to claim at any time during the last 10 weeks, when you hit the claim button, those weeks will be claimed for too.
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
                Remember - If you wrap your recently claimed rewards, your rewards will increase over time as your WSGB amount is compounded.
              </MKTypography>
            </MKBox>
          </div>

      {/* </Container> */}
    </MKBox>
  );
}

export default Rewards;
