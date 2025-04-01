declare global {
    interface Window {
      ethereum?: any; // You can use `any` or a specific type for the Ethereum provider
    }
  }
  
  export {};
  