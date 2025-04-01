import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';

import { useState, useEffect, useContext, useRef } from 'react'

import FormData from 'form-data'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiOutlineCopy } from 'react-icons/ai';

import { IoIconName } from 'react-icons/io5';
import { ethers } from 'ethers';
import axios from 'axios';
import { contractAddress, contractABI } from './constants'

let ipfsHashGlobal = '';
let signglobal = '';

function Issuer() {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    })
    const [progress, setProgress] = useState([]);
    const [connected, setConnected] = useState(false)
    const [cid, setCid] = useState('');  // Make sure `cid` is initialized

    const [signature, setSignature] = useState('')
    const [page, setPage] = useState('sign')
    const [account, setAccount] = useState('')
    const [showSignerInput, setShowSignerInput] = useState(false)
    const [signedTxData, setSignedTxData] = useState([])
    const [receivedTxData, setReceivedTxData] = useState([])
    const [selectedTx, setSelectedTx] = useState(null);


    const closeModal = () => setSelectedTx(null);
    const fileInputRef = useRef(null);
    const receiverRef = useRef(null);
    const messageRef = useRef(null);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleAutomation = async () => {
        try {
            // Step 1: Upload File to IPFS
            setProgress((prev) => [...prev, { message: 'Uploading file to IPFS...', completed: false }]);
            await delay(5000); // Simulate 5 seconds delay (replace with actual logic)
            const IpfsHash = await handleUploadImg(); // Get the IPFS Hash from the upload function
            if (!IpfsHash) {
                toast.error('Failed to upload the file to IPFS.');
                return;
            }
            setCid(IpfsHash); // Set the cid state with the IpfsHash
            setProgress((prev) => [...prev.slice(0, -1), { message: 'File uploaded successfully.', completed: true }]);
    
            // Step 2: Sign CID
            setProgress((prev) => [...prev, { message: 'Signing CID...', completed: false }]);
            await delay(5000); // Simulate 10 seconds delay (replace with actual logic)
    
            // Use the IpfsHash directly here instead of `cid`
            const signedCid = await handlegetSignature(IpfsHash);
            setSignature(signedCid);
            setProgress((prev) => [...prev.slice(0, -1), { message: 'CID signed successfully.', completed: true }]);
    
            // Step 3: Default Receiver Details
            const receiver = receiverRef.current?.value || '0x21fF6FcC89e8ed65318059527d390FaF6aC5830a';
            const message = messageRef.current?.value || 'Default certificate message';
    
            // Step 4: Save to Blockchain
            setProgress((prev) => [...prev, { message: 'Saving data to blockchain...', completed: false }]);
            await delay(5000); // Simulate 10 seconds delay (replace with actual logic)
            await handlesaveData({ cidd: IpfsHash, signature: signedCid, receiver, message }); // Use IpfsHash here
            setProgress((prev) => [...prev.slice(0, -1), { message: 'Data saved successfully.', completed: true }]);
    
            toast.success('Document issued successfully!');
        } catch (error) {
            console.error('Automation failed:', error);
            toast.error('An error occurred during the process.');
        }
    };
    

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(signature)
            .then(() => {
                // Optionally, you can show a success message here
                console.log('Copied to clipboard!');
            })
            .catch((error) => {
                // Handle error if clipboard access fails
                console.error('Failed to copy:', error);
            });
    };

    const handleconnectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                // Switching to the correct network
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }], // chainId must be in hexadecimal
                });

                setAccount(accounts[0]);

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                setState({ provider, signer, contract });

                console.log('Connected accounts', accounts);
                setConnected(true); // Set connected to true

            } else {
                alert('Please install Metamask');
            }
        } catch (error) {
            console.log(error);
        }
    };



    const handleUploadImg = async () => {
        console.log('Upload image called');
    
        const formData = new FormData();
        const file = fileInputRef.current?.files[0]; // Access the file using the ref
    
        console.log('File is: ', file);
        if (!file) {
            console.log('No file uploaded');
            toast.error('Please select the certificate first!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
    
        formData.append('file', file);
        console.log(formData);
    
        console.log('New Pinata IPFS added');
        toast('Uploading...please wait', {
            position: 'top-right',
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    
        try {
            const response = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        pinata_api_key: 'cc2e560077cf5de826f0',
                        pinata_secret_api_key: '8d8c5864dea3229f5687b88407027a9a2a115073688a630e9be92ed8f7b70946',
                    },
                }
            );
            console.log('IPFS hash generated!');
            console.log('Response:', response.data); // Check the full response data
            const ipfsHash = response.data.IpfsHash;
            ipfsHashGlobal = ipfsHash;
            console.log("hello ", ipfsHashGlobal);
            
            if (ipfsHash) {
                return ipfsHash; // Return the IPFS hash
            }
    
            console.log('IPFS Hash not found in response');
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
        }
    };
    
    


    const handlegetSignature = async () => {
       
        if (! ipfsHashGlobal ) {
            console.log('cid is',  ipfsHashGlobal )
            console.log('toastify error')
            toast.error('please upload the certificate to IPFS first!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            return
        }
        const packedMessage = ethers.utils.solidityPack(['string'], [ipfsHashGlobal])
        console.log('packed msg: ', packedMessage)
        const hash = ethers.utils.keccak256(packedMessage)

        const res = await window.ethereum.request({
            method: 'personal_sign',
            params: [account, hash],
        })
        console.log('signature:', res)
        signglobal= res;
        setSignature(res)
    }

    const handlecheckValidity = async () => {
        let signingAuthority = document.querySelector('#signer').value;
    
        // Remove surrounding quotes, if any
        if (signingAuthority[0] === '"') {
            signingAuthority = signingAuthority.substring(1, signingAuthority.length - 1);
        }
    
        // Validate the signingAuthority as an Ethereum address
        if (!ethers.utils.isAddress(signingAuthority)) {
            console.error('Invalid Ethereum address:', signingAuthority);
            document.querySelector('#valid').innerHTML = `<h1>Invalid Ethereum address</h1>`;
            return;
        }
    
        const msg = document.querySelector('#msg').value;
        const signature = document.querySelector('#signature').value;
    
        try {
            // Call the contract's verify method
            const valid = await state.contract.verify(signingAuthority, msg, signature);
    
            console.log('Signature is', valid);
            document.querySelector('#valid').innerHTML = `<h1>${valid ? 'Valid' : 'Invalid'}</h1>`;
        } catch (error) {
            console.error('Error verifying signature:', error);
            document.querySelector('#valid').innerHTML = `<h1>Error verifying signature</h1>`;
        }
    };
    

    const handlesaveData = async () => {
        const receiver = receiverRef.current?.value || '0x21fF6FcC89e8ed65318059527d390FaF6aC5830a';
        const message = messageRef.current?.value || 'Default certificate message';
    
        // Hardcoded CID for testing

    
        if (!receiver || !message) {
            toast.error('Receiver and message are required!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
    
        // Ensure cid and signature are valid
        if (!ipfsHashGlobal || !signglobal) {
            toast.error('CID or signature is invalid!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
    
        console.log('Receiver:', receiver);
        console.log('Message:', message);
        console.log('CID:',ipfsHashGlobal);
        console.log('Signature:', signglobal);
    
        // Notify the user about the blockchain transaction
        toast.info('Transaction submitted to the blockchain!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    
        try {
            // Send data to the blockchain
            const saved = await state.contract.storeSignature(
                account,
                receiver,
                String(ipfsHashGlobal), // Ensure cid is a string
                signglobal,
                message
            );
            await saved.wait();
    
            // Notify user of success
            toast.success('Data successfully stored in blockchain! Check the data section', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    
            console.log('saveData ', saved);
    
            // POST data to the database
            console.log('Saving data to the database...');
            const response = await fetch("https://backendpramanik.onrender.com/issuer/saveData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    account,
                    receiver,
                    cid: String(ipfsHashGlobal), // Ensure cid is a string
                    signature:signglobal,
                    message,
                }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to save data to the database");
            }
    
            const result = await response.json();
            console.log('Data saved to the database:', result);
    
            // Notify user of database success
            toast.success('Data successfully stored in database!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log('Error saving data:', error);
    
            // Notify user of failure
            toast.error('Transaction or database operation failed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    
    

    const handlesetSenderData = async () => {
        console.log('setsenderData is called...!!')
        console.log('account: ', account)
        if (state.contract) {
            console.log('contract is: ', state.contract)
            const senderTxIds =
                await state.contract.retrieveSenderSignaturesTxIds(account)
            console.log(senderTxIds)
            setSignedTxData([])
            await senderTxIds.forEach(async (id) => {
                const transaction = await state.contract.getTransactionById(id)
                setSignedTxData((prev) => [...prev, transaction])
            })
        }
    }

    const handlesetReceiverData = async () => {
        if (state.contract) {
            const receiverTxIds =
                await state.contract.retrieveRecieverSignaturesTxIds(account)

            setReceivedTxData([])
            console.log('receiverTxIds', receiverTxIds)
            await receiverTxIds.forEach(async (id) => {
                const transaction = await state.contract.getTransactionById(id)
                setReceivedTxData((prev) => [...prev, transaction])
            })
        }
    }

    const handlegetSignerAddress = async () => {
        const msg = document.querySelector('#msg').value
        const signature = document.querySelector('#signature').value
        const signerAddress = await state.contract.getSigner(msg, signature)
        console.log('signature is', signerAddress)
        document.querySelector('#valid').innerHTML = `<h1>${signerAddress}</h1>`
    }

    return (
        <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', boxShadow: 1, p: 2 }}>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold', color: 'text.primary' }}>ISSUE DOCUMENT</Typography>
                <Button
                    onClick={handleconnectWallet}
                    variant="contained"
                    color="primary"
                    sx={{
                        m: 2,
                        px: 4,
                        py: 2,
                        borderRadius: 1,
                        '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                >
                    {connected ? 'Wallet Connected' : 'Connect Wallet'}
                </Button>
            </Box>
    
            {connected ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'gray.50' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 600, bgcolor: 'white', borderRadius: 2, boxShadow: 3, p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>Upload and Issue Document</Typography>
    
                        {/* Step 1: Upload File */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>Upload File</Typography>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                                <TextField
                                    type="file"
                                    inputRef={fileInputRef} // Attach ref
                                    sx={{ flex: 1 }}
                                />
                                   <TextField
                                    type="text"
                                    messageRef={receiverRef} // Attach ref
                                    sx={{ flex: 1 }}
                                />
                                <Button
                                    onClick={handleAutomation}
                                    variant="contained"
                                    color="primary"
                                    sx={{ alignSelf: 'flex-start', marginTop: 2 }}
                                >
                                    Upload & Issue
                                </Button>
                            </Box>
                        </Box>
    
                        {/* Step Progress */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Progress:</Typography>
                            {progress.map((step, index) => (
                                <Typography key={index} variant="body2" sx={{ color: step.completed ? 'success.main' : 'text.secondary' }}>
                                    {index + 1}. {step.message}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Typography variant="h6">Connect your wallet to continue</Typography>
                </Box>
            )}
    
            <ToastContainer position="top-right" />
        </Box>
    );
    

      
}

export default Issuer
