import { Contract, providers } from 'ethers';
import Head from 'next/head';
import Web3Modal from "web3modal";
import {WHITELIST_CONTRACT_ADDRESS, abi} from "../constants";
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {

  /**setting up state variables to keep track of number of whitelisted account, is walled connected, 
   * whether the addressed has joined the whitelist and loading state during which the transaction is going on **/
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const [walletConnected, setWalletConnnected] = useState(false);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  
  const web3ModalRef = useRef();

/** Returns a Provider or Signer object representing ethereum RPC with or without siging ability of metamask attached
 * A Provider is needed to interact with the blockchain - reading transations, reading balances, reading state etc...
 * 
 * A Signer is a special kind of provider which is able to do write transaction in a blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   * 
   * @param {*} needSigner - True if you need the signer, default false otherwise
 */

  const getProviderOrSigner = async (needSigner = false) =>{
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
    if(chainId != 5){
      window.alert("Change network to Goerli");
      throw new Error("Change network to Goerli");
    }
    if (needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }

  const addAddressToWhitelist = async () => {
    try{
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const tx = await whitelistContract.addAddressToWhitelist();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    }catch(err){
      console.error(err);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try{
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numberOfWhitelisted = await whitelistContract.numberOfWhitelistedAddress();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch(err){
      console.error(err);
    }
  };

  const checkIfAddressInWhitelist = async () => {
    try{
      const signer = await getProviderOrSigner(true);
    const whitelistContract = new Contract(
      WHITELIST_CONTRACT_ADDRESS,
      abi,
      signer
    );
    const address = await signer.getAddress();
    const _joinedWhitelist = await whitelistContract.whitelistedAddress(address);
    setJoinedWhitelist(_joinedWhitelist);
    }catch(err){
      console.error(err);
    }    
  };

  const connectWallet = async () =>{
    try{
      await getProviderOrSigner();
      setWalletConnnected(true);

      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();
    }catch(err){
      console.error(err);
    }
  };

  const renderButton = () => {
    if(walletConnected) {
      if(joinedWhitelist){
        return(
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if(loading){
        return <button className={styles.button}>Loading...</button>;
      } else {
        return(<button onClick={addAddressToWhitelist} className = {styles.button}>
          Join the Whitelist
        </button>
        );
      }
    }else {
        return(
          <button onClick={connectWallet} className = {styles.button}>
            Connect Your wallet
          </button>
        );
      }
    };

    useEffect( () => {
      if(!walletConnected){
        web3ModalRef.current = new Web3Modal({
          network: "goerli",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();
      }
    }, [walletConnected]);
  
  return (
    <div>
      <Head>
        <title>Whitelist</title>
        <meta name='description' content='Whitellist-Dapp' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Minions!</h1>
          <div className = {styles.description}>
            It&apos;s an NFT collection for fans of Minions.
          </div>
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src ="./min.png" />
        </div>
      </div>
      <footer className={styles.footer}>
        Made with &#10084; by Crypto Minions
      </footer>
    </div>
      );
}
