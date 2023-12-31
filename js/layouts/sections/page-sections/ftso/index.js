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

// Sections components
// import BaseLayout from "layouts/sections/components/BaseLayout";
// import View from "layouts/sections/components/View";

// Features page components
import WrapUnwrap from "layouts/sections/page-sections/ftso/components/WrapUnwrap";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import View2 from "../../components/View2";
import './components/WrapUnwrap/a.css'
// eslint-disable-next-line import/no-cycle
import BaseLayout from "../../components/BaseLayout";
import MKBox from "../../../../components/MKBox";
import MKTypography from "../../../../components/MKTypography";
import MKButton from "../../../../components/MKButton";
import Rewards from "./components/Rewards";
import Providers from "./components/SetProviders";
// import simpleModal from "../../attention-catchers/modals/components/SimpleModal";

// const isConnected = false;

// Features page components code
// import featuresOneCode from "layouts/sections/page-sections/featuers/components/FeaturesOne/code";

function FTSOOptions(/* type, title */{sec}) {
  const [show, setShow] = useState(true);

  const toggleModal = () => setShow(!show);

  // eslint-disable-next-line no-unused-vars
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [COIN, setCoin] = useState("coins");

  function modal() {
    return (
      <MKBox component="section" py={6}>
        <Container>
          <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
            <Slide direction="down" in={show} timeout={500}>
              <MKBox
                position="relative"
                width="500px"
                display="flex"
                flexDirection="column"
                borderRadius="xl"
                bgColor="white"
                shadow="xl"
              >
                <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                  <MKTypography variant="h5">Connect wallet first!</MKTypography>
                  <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                </MKBox>
                <Divider sx={{ my: 0 }} />
                <MKBox p={2}>
                  <MKTypography variant="body2" color="secondary" fontWeight="regular">
                    Before you can wrap, delegate or claim your rewards, you need to connect your
                    wallet to either the Songbird or Flare network.
                    <br />
                    <br />
                    If you want to delegate to a Flare TSO, please connect to the Flare Network, and
                    likewise for Songbird. Your choices of provider will vary depending on the
                    selected network.
                  </MKTypography>
                </MKBox>
                <Divider sx={{ my: 0 }} />
                <MKBox display="flex" justifyContent="space-between" p={1.5}>
                  <MKButton variant="gradient" color="dark" onClick={()=>{toggleModal(); connect()}}>
                    Connect now
                  </MKButton>
                </MKBox>
              </MKBox>
            </Slide>
          </Modal>
        </Container>
      </MKBox>
    );
  }

  useEffect(() => {
    // console.log(wallet);
    if (wallet?.chains[0]?.id === "0x13") {
      setCoin("SGB");
    }
    if (wallet?.chains[0]?.id === "0xe") {
      setCoin("FLR");
    }
  }, [wallet]);


  useEffect(()=>{

  }, [sec])

// alert(sec)
  if(sec==="prov") {
    return (
        <BaseLayout
            title={`Choose TSO providers for ${COIN}`}
            breadcrumb={[
              {label: "FTSO", route: "/sections/page-sections/ftso"},
              {label: "Choose Providers"},
            ]}
        >
          <View2 className="bbo" style={{overflow: "hidden !important"}}
                 title="Choose providers to delegate your coins to"
          >
            {!connecting && wallet ? <Providers coin={COIN}/> : modal()}
          </View2>
        </BaseLayout>
    );
  }
  if(sec==="wrap") {
    return (
        <BaseLayout
            title={`Wrap or Unwrap your ${COIN}`}
            breadcrumb={[
              {label: "FTSO", route: "/sections/page-sections/ftso"},
              {label: "Wrap / Unwrap"},
            ]}
        >
          <View2 className="bbo" style={{overflow: "hidden !important"}}
                 title={`Convert your ${COIN} into Wrapped ${COIN} so you can delegate to your chosen provider(s)`}
          >
            {!connecting && wallet ? <WrapUnwrap coin={COIN}/> : modal()}
          </View2>
        </BaseLayout>
    );
  }
  if(sec==="rewa") {
    return (
        <BaseLayout
            title={`Claim your ${COIN} earnings`}
            breadcrumb={[
              {label: "FTSO", route: "/sections/page-sections/ftso"},
              {label: "Claim TSO Rewards"},
            ]}
        >
          <View2 className="bbo" style={{overflow: "hidden !important"}}
                 title={`Claim your ${COIN} rewards from your chosen provider(s)`}
          >
            {!connecting && wallet ? <Rewards coin={COIN}/> : modal()}
          </View2>
        </BaseLayout>
    );
  }
    return null;

}

export default FTSOOptions;
