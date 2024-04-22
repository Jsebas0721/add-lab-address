import { useState } from "react";
import AccountSearch from "./AccountSearch";
import Header from "./Header";
import Account from "./Account";
import LabSearch from "./LabSearch";
import LabInfo from "./LabInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [accountInfo, setAccountInfo] = useState([]);
  const [labInfo, setLabInfo] = useState([]);
  const [isAddingLab, setIsAddingLab] = useState(false);
  const [recordSucess, setRecordSucess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  function addLabAddress() {
    let labAddress = {
      account_no: accountInfo.default["customer_code"],
      lab_code: labInfo[0]["customer_code"],
    };

    fetch(`https://cycling-api.cvoapis.com/magento/add_lab`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(labAddress),
    })
      .then((resp) => {
        if (resp.ok) {
          setShowMessage(true);
          setRecordSucess(true);
          setAccountInfo([]);
          setLabInfo([]);
          setIsAddingLab(!isAddingLab);
        } else if (resp.status >= 400) {
          setShowMessage(true);
          setRecordSucess(false);
        }
      })
      .catch((errorMessage) => {
        console.log(`Something Went Wrong. ${errorMessage}`);
      });
  }

  let postMessage = recordSucess ? (
    <p className="post-message success">
      Lab address added!{" "} 
      <FontAwesomeIcon icon={faThumbsUp} bounce style={{ color: "#ffffff" }} />
    </p>
  ) : (
    <p className="post-message failed">Failed to save address.</p>
  );

  if (showMessage) {
    setInterval(() => {
      setShowMessage(false);
    }, 4000);
  }

  return (
    <div className="app-container">
      <Header />
      <AccountSearch
        onSetAccountInfo={setAccountInfo}
        isAddingLab={isAddingLab}
      />
      {accountInfo.length !== 0 ? (
        <Account
          accountEntities={accountInfo}
          onSetIsAddingLab={setIsAddingLab}
          isAddingLab={isAddingLab}
          onSetLabInfo={setLabInfo}
        />
      ) : null}
      {isAddingLab ? <LabSearch onSetLabInfo={setLabInfo} /> : null}
      {labInfo.length !== 0 && isAddingLab ? (
        <LabInfo labEntities={labInfo} />
      ) : null}
      {labInfo.length !== 0 && isAddingLab ? (
        <button onClick={addLabAddress} className="confirm-button">
          COMFIRM{" "}
          <FontAwesomeIcon icon={faCircleCheck} />
        </button>
      ) : null}
      {showMessage ? postMessage : null}
    </div>
  );
}

export default App;
