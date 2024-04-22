import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLocationDot,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

function Account({ accountEntities, onSetIsAddingLab, isAddingLab, onSetLabInfo }) {
  
  const { customer_code, address_name } = accountEntities.default;

  return (
    <div>
      <div className="line-divider"></div>
      <table className="account-table">
        <tbody>
          <tr>
            <th className="account-table__header">
              Customer Account <FontAwesomeIcon icon={faUser} />
            </th>
            <th className="account-table__header">
              Address Name <FontAwesomeIcon icon={faLocationDot} />
            </th>
          </tr>
          <tr>
            <td className="account-table__content">{customer_code}</td>
            <td className="account-table__content">{address_name}</td>
          </tr>
        </tbody>
      </table>
      {!isAddingLab ? (
        <button
          className="add-lab-button"
          onClick={() => onSetIsAddingLab(!isAddingLab)}
        >
          Add New Lab{" "}
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="add-icon"
            flip
            size="lg"
          />
        </button>
      ) : (
          <button
            className="cancel-button"
            onClick={() => {
              onSetIsAddingLab(!isAddingLab)
              onSetLabInfo([])
            }}
          >
            Cancel{" "}
            <FontAwesomeIcon
              icon={faCircleMinus}
              className="cancel-icon"
              flip
              size="lg"
            />
          </button>
      )}
    </div>
  );
}

export default Account;
