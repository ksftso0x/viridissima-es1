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
import {useEffect, useState} from "react";
import {useConnectWallet} from "@web3-onboard/react";
import {ethers} from "ethers"
// import Wrapunwrapfield from "../../../../../../assets/theme/components/wrapunwrapfield";

// import switchPng from '../../../../../../assets/images/logos/switch.png'
import Select from 'react-select';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {providers} from 'ftso-signal-providers/bifrost-wallet.providerlist.json'
import PercentagesSlider from 'react-percentages-slider'
import MKButton from "../../../../../../components/MKButton";
import {chainData} from "../../../../../../chains"
import "./a.css"
// eslint-disable-next-line import/order
import useTheme from '@mui/material/styles/useTheme'
import getSelectTheme from './SelectTheme'
// import ProviderBox from "../../../../../../components/ProviderBox";

const abi = [
    'function deposit() payable',
    'function withdraw(uint256 amount)',
    'function balanceOf(address) view returns(uint256)',
    'function getCurrentRewardEpoch() view returns(uint256)',
    'function getStateOfRewards(address, uint256) view returns(address[] ftsos, uint256[] amounts, bool[] claimed, bool claimable)',
    'function claimReward(address, uint256[]) returns(uint256)',
    'function getEpochsWithClaimableRewards() view returns(uint256 start , uint256 end)',
    'function delegatesOf(address) view returns(address[] delegateAddresses, uint256[] bips, uint256 count, uint256 delegationMode)',
    'function delegate(address, uint256)',
    'function undelegateAll()'
]

// console.log(providers)

const chains = {};
chains["0xe"] = 5;
chains[14] = 5;
chains["0x13"] = 2;
chains[19] = 2;


function Providers({coin}) {
    const [dPercent, setDp] = useState([
        { text: "Viridissima", color:"#33cc33", percentage: 75, provId: 0},
        { text: "FTSO.AU", color: "#33cc33", percentage: 25, provId: 0 }
        ])

    // eslint-disable-next-line no-unused-vars
    const [{wallet, connecting}, connect, disconnect] = useConnectWallet();

    const pct = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const addrOpts = []

    useEffect(()=>{
        const dState = selectedOptions;
        // console.log(dState)
        let pState = dPercent;
        if(dState.length===1){
            pState[0].percentage=100
            pState[0].color="#33cc33"
            pState[0].provId=dState[0].value
            pState[0].text = dState[0].label;
            pState=[pState[0]]
        }
        if(dState.length===2){
            const tState = [{}, {}]
            tState[0].percentage=dState[0]?.percent? dState[0].percent : 50
            tState[0].color="#33cc33"
            tState[0].provId=dState[0].value
            tState[0].text = dState[0].label;
            tState[1].percentage=dState[0]?.percent? (100 - dState[0].percent) : 50
            tState[1].color="#33cc33"
            tState[1].provId=dState[1].value
            tState[1].text = dState[1].label;

            pState=tState
        }
        if(dState.length===0){
            pState[0].percentage=-1
            pState[0].color="#cc3333"
            pState[0].provId=0
            pState[0].text = "No Providers Selected";
            pState=[pState[0]]
        }


        // console.log(pState)

        setDp(pState)

    }, [selectedOptions])

    useEffect(async ()=>{
        const prov = new ethers.providers.Web3Provider(wallet.provider);
        const chainDec = parseInt(wallet.chains[0].id, 16);
        const wnataddress  = chainData[chains[chainDec]].wNat;
        const wNat = new ethers.Contract(wnataddress, abi, prov);
        const dDat = await wNat.delegatesOf(wallet.accounts[0].address);
        // console.log("DELE", dDat, addrOpts[dDat.delegateAddresses[0]], addrOpts[dDat.delegateAddresses[1]])
        const pCount = parseInt(dDat.count.toString(), 10)
        const pTemp = []
        let pcTmp;
        for(let i = 0 ; i < pCount; i+=1){
            pcTmp = parseFloat(parseInt(dDat.bips[i], 10).toString())/100
            pTemp.push( {
                label:addrOpts[dDat.delegateAddresses[i]].label,
                value:dDat.delegateAddresses[i],
                icon:addrOpts[dDat.delegateAddresses[i]].icon,
                percent:pcTmp
            })
        }
        setSelectedOptions(pTemp)
        // console.log("ptemp", pTemp)

    }, [])

    function importAll(r) {
        const images = {};
        r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
        return images
    }

    const images = importAll(require.context('../../../../../../assets/ftsoicons/', false, /\.(png|jpe?g|svg)$/));

    // console.log(images);

    const ProviderChooser = theprops => {

        console.log(theprops)

        const opts = []
        // eslint-disable-next-line no-plusplus
        opts.push(
            {
                label: "Viridissima TSO",
                value: "0xbADF00D6387958a3E7747C0A0CF5E5a06dcc90c0",
                icon: images["0xbADF00D6387958a3E7747C0A0CF5E5a06dcc90c0.png"]
            }
        )

        const chainDec = parseInt(wallet.chains[0].id, 16);

        for (let i = 0; i < providers.length; i+=1) {

            if (providers[i].chainId === chainDec) {
                opts.push(
                    {
                        label: providers[i].name,
                        value: providers[i].address,
                        icon: images[`${providers[i].address}.png`]
                    }
                )
                addrOpts[providers[i].address] = opts[opts.length-1]
            }
        }

        // console.log("ao", addrOpts)

        const theme = useTheme()
        const formThemeColors = getSelectTheme(theme)

         return (
             // eslint-disable-next-line no-shadow
            <Select theme={theme => ({
                ...theme,
                colors: {
                    ...formThemeColors
                }})} style={{width: "100%", backgroundColor: "black", flexBasis: "100%"}}
                    styles={{

                        menu: provided => ({...provided, backgroundColor: "#111", zIndex: 9999, width: "100%",}),
                        // option: (provided, state) => ( {
                        //     ...provided,
                        //     backgroundColor: state.isSelected ? "rgba(189,197,209,.3)" : "black",
                        // })
                    }}

                    placeholder="Search for, or select a TSO"
                    options={opts}
                    isSearchable
                    isMulti
                    value={selectedOptions}
                    onChange={(o) => setSelectedOptions(o)}
                    isOptionDisabled={() => selectedOptions.length >= 2}
                    formatOptionLabel={item => (
                        <div style={{maxHeight:"32px", display: "flex"}} className="country-option">
                            <img style={{maxHeight:"32px", maxWidth: "32px", marginRight:"8px"}} src={item?.icon?.default} alt="-" />
                            <div>{item.label}</div>
                        </div>
                    )}
                    createOptionPosition="last"
            />
        )
    }

    async function setDelegations() {
        const prov = new ethers.providers.Web3Provider(wallet.provider);
        const chainDec = parseInt(wallet.chains[0].id, 16);
        const wnataddress = chainData[chains[chainDec]].wNat;
        const wNat = new ethers.Contract(wnataddress, abi, prov.getSigner());
        // const FtsoRewardManagerR = new ethers.Contract(frmaddress, abi, prov);
        const opts = {gasLimit: 8000000}
        const dp0 = Math.floor(dPercent[0].percentage * 100)
        const Promises = []
        for (let i = 0; i < selectedOptions.length; i += 1) {
            if(i===0) {
                // console.log("DELEGATE", i, selectedOptions[i].value, dp0)
                Promises.push(wNat.delegate(selectedOptions[i].value, dp0, opts))
            } else {
                // console.log("DELEGATE", i, selectedOptions[i].value, 10000-dp0)
                Promises.push(wNat.delegate(selectedOptions[i].value, (9999-dp0).toString(), opts))
            }

            // const ceps = await wNat.delegate()
        }
        if(selectedOptions.length===0){
            Promises.push(wNat.undelegateAll(opts))
        }

        // console.log(Promises)

        await Promise.all(Promises)
    }



    return (
        <MKBox className="bbo" style={{background: "rgba(16,24,16,1)", overflowY: "hidden"}} component="section"
               py={{xs: 1, md: 1}}>

            <Container alignItems="top" style={{display: "flex", flexWrap: "wrap"}}>

                <div className="swapper">
                    {!pct ? <ProviderChooser/> :
                        <> {pct === 1 ?
                            <>
                                <ProviderChooser/>
                                {/* <ProviderBox
                                logo={`https://github.com/xrpdevs/ftso-signal-providers/raw/master/assets/${pi1?.addr}.png`}
                                coin={coin}
                                name={pi1?.addr?.substring(0,10)}
                                balance={pi1?.amount}
                            /> */}</> :
                            <>
                                <ProviderChooser />
                                {/*    <ProviderBox
                                logo={`https://github.com/xrpdevs/ftso-signal-providers/raw/master/assets/${pi1?.addr}.png`}
                                coin={coin}
                                name={pi1?.addr?.substring(0,10)}
                                balance={pi1?.amount}
                            />
                                <ProviderBox
                                    logo={`https://github.com/xrpdevs/ftso-signal-providers/raw/master/assets/${pi2?.addr}.png`}
                                    coin={coin}
                                    name={pi2?.addr?.substring(0,10)}
                                    balance={pi2?.amount}
                                /> */}</>
                        } </>
                    }
                    <div style={{marginTop: "8px", color: "black"}}>
                        { dPercent[0].percentage>-1 ?
                    <PercentagesSlider style={{marginTop: "8px", color: "black"}} divisions={dPercent} setDivisions={setDp}/>
                            :
                            <div style={{width:"100%", margin: "auto", borderRadius:"8px", minHeight:"48px", color: "green", border: "1px dotted darkgreen", textAlign:"center"}}>No provider(s) selected</div> }
                    </div>
                    {/* //  Total: {ctot?.toFixed(4)} RM Balance: {rmbal?.toFixed(4)} */}
                    <Grid container item justifyContent="center" xs={12} mt={1} mb={1}>
                        {/* {rmbal > ctot ? */}
                        <MKButton onClick={() => setDelegations()} style={{width: "98%"}} type="submit" variant="gradient"
                                  color="info">
                            Set Delegations for {coin}
                        </MKButton>
                        {/*:*/}
                        {/* <MKButton disabled onClick={()=>doClaim()} style={{width:"98%"}}  type="submit" variant="gradient" color="info"> */}
                        {/*    Waiting for RM to refill... */}
                        {/* </MKButton> */}
                        {/*      } */}
                    </Grid>
                </div>

                <div className="bobby" style={{margin: "0 auto"}}>
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
                        <MKTypography style={{whiteSpace: "break-spaces"}} variant="body2" color="text" pl={2}>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Simply use the dropdown to select one or two TSOs to delegate your W{coin} to.
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            You can search for a provider by typing in the select box.
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
                        <MKTypography style={{whiteSpace: "break-spaces"}} variant="body2" color="text" pl={2}>
                            If you have selected a single provider, 100% of your W{coin} will be delegated to that provider,
                            however, if you select two, you can use the slider below the select box to set percentages.
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
                        <MKTypography style={{whiteSpace: "break-spaces"}} variant="body2" color="text" pl={2}>
                            Finally, click on the &quot;set delegations&quot; button to confirm your choices.
                        </MKTypography>
                    </MKBox>
                </div>

            </Container>
        </MKBox>
    );
}

export default Providers;
