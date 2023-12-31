// import { init } from "@web3-onboard/react";
// import walletLinkModule from "@web3-onboard/walletlink";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const chainids = [19, 14, 16];

const walletConnect = walletConnectModule({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModalOptions: {
    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"],
  },
  connectFirstChainId: true,
});

const injected = injectedModule();

const w3opts = {
  wallets: [injected, walletConnect],
  chains: [
    {
      id: `0x${chainids[0].toString(16)}`,
      token: "SGB",
      label: "Songbird",
      rpcUrl: "https://rpc.viri.uk/http",
    },
    {
      id: `0x${chainids[1].toString(16)}`,
      token: "FLR",
      label: "FLR Mainnet",
      rpcUrl: "https://rpc.viri.uk/flrhttp",
    },
    {
      id: `0x${chainids[2].toString(16)}`,
      token: "CFLR",
      label: "Coston Local",
      rpcUrl: "https://rpc.sgbftso.com/testhttp",
    },
  ],
  notify: {
    desktop: {
      enabled: true,
      transactionHandler: (transaction) => {
        // console.log({ transaction });
        // eslint-disable-next-line react/destructuring-assignment
        if (transaction.eventCode === "txPool") {
          return {
            type: "success",
            message: "Your transaction from #1 DApp is in the mempool",
          };
        }
        return null;
      },
      position: "bottomRight",
    },
    mobile: {
      enabled: true,
      // eslint-disable-next-line consistent-return
      transactionHandler: (transaction) => {
        // console.log({ transaction });
        if (transaction.eventCode === "txPool") {
          return {
            type: "success",
            message: "Your transaction from #1 DApp is in the mempool",
          };
        }
      },
      position: "bottomRight",
    },
  },
  accountCenter: {
    desktop: {
      position: "bottomRight",
      enabled: true,
      minimal: true,
    },
    mobile: {
      position: "bottomRight",
      enabled: true,
      minimal: true,
    },
  },
  appMetadata: {
    name: "Viridissima.Es",
    icon: "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/assets/0xbADF00D6387958a3E7747C0A0CF5E5a06dcc90c0.png",
    description:
      "A portal to all things green and crypto. Connect your wallet to use features like FTSO",
  },
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: "We support these wallets, please choose:",
          sidebar: {
            heading: "Welcome!",
            subheading: "Connect your wallet",
            paragraph:
              "Connecting your wallet will allow you do use services like FTSO and others that are available " +
              "here.",
          },
        },
      },
    },
  },
};

export default w3opts;
