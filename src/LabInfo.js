import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faEye, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function LabInfo({ labEntities }) {

  const { customer_code, address_name, addr2, addr3, country_code } =
    labEntities[0];
  const labAddress = addr2 + " " + addr3 + " " + country_code;

  return (
    <div>
      <div className="line-divider"></div>
      <table className="lab-table">
        <tbody>
          <tr>
            <th className="lab-table__header">
              Lab Code <FontAwesomeIcon icon={faKeyboard} />
            </th>
            <th className="lab-table__header">
              Lab Name <FontAwesomeIcon icon={faEye} />
            </th>
            <th className="lab-table__header">
              Address <FontAwesomeIcon icon={faLocationDot} />
            </th>
          </tr>
          <tr>
            <td className="lab-table__content">{customer_code}</td>
            <td className="lab-table__content">{address_name}</td>
            <td className="lab-table__content">{labAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LabInfo;
