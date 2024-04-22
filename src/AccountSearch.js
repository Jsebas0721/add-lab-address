import { useState } from "react";

function AccountSearch({ onSetAccountInfo, isAddingLab }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);


  function getAccountData(e) {
    e.preventDefault();
    
    if(accountNumber.trim().length === 0){
      setError("Please enter an account number.");
      setShowError(true);
      return;
    }
    
    fetch(
      `https://cycling-api.cvoapis.com/magento/account/${accountNumber}`
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((account) => {
          if(account.length !== 0){
            onSetAccountInfo(account);
          }else{
            onSetAccountInfo([]);
            setShowError(true);
            setError("Account number doesn't exist. Please try again.");
          }
        });
      } else if (resp.status >= 400) {
        setShowError(true);
        setError("Failed to fetch data.");
      }
      setAccountNumber("");
      
    })
    .catch((errorMessage) => {
      setError(`Something Went Wrong. ${errorMessage}`);
    });
  }
  
  if(error !== ''){
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  }
  
  function handleChange(e) {
    setAccountNumber(e.target.value);
  }


  return (
    <div className="account-search">
      <p>Enter Account Number:</p>
      {/* <div className="acc-input-box"> */}
        <form className="account-search__form"  name="acc-search-form" onSubmit={getAccountData}>
          <input
            onChange={handleChange}
            value={accountNumber}
            type="text"
            pattern="[0-9]*"
            title="Please use numeric values"
            placeholder="Search"
            disabled={isAddingLab}
          />
          <i className="fa fa-search icon"></i>
        </form>
      {/* </div> */}
      {showError ? (<p className="account-search__message">{error}</p>) : null}
    </div>
  );
}

export default AccountSearch;
