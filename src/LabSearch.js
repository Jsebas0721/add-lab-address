import { useState } from "react";

function LabSearch({ onSetLabInfo }) {
  const [labCode, setLabCode] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  function getLabData(e) {
    e.preventDefault();

    if (labCode.trim().length === 0) {
      setError("Please enter a Lab Code.");
      setShowError(true);
      return;
    }

    fetch(`https://cycling-api.cvoapis.com/magento/lab/${labCode}`)
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((labData) => {
            if (labData.length !== 0) {
              onSetLabInfo(labData);
            } else {
              onSetLabInfo([]);
              setShowError(true);
              setError("Lab Code doesn't exist. Please try again.");
            }
          });
        } else if (resp.status >= 400) {
          setShowError(true);
          setError("Failed to fetch data.");
        }
        setLabCode("");
      })
      .catch((error) => {
        setError(`Something went wrong. ${error}`);
      });
  }

  if (error !== "") {
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  }

  function handleChange(e) {
    setLabCode(e.target.value);
  }

  return (
    <div className="lab-search">
      <form className="lab-search__form" onSubmit={getLabData}>
        <input
          onChange={handleChange}
          value={labCode}
          type="text"
          placeholder="Lab Code"
        />
      </form>
      {showError ? <p className="account-search__message">{error}</p> : null}
    </div>
  );
}

export default LabSearch;
