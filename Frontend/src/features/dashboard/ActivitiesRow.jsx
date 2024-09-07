import Tag from "../../ui/Tag";
import { convertStringToTime } from "../../utils/helpers";

function ActivitiesRow({ activity }) {
  const statusToTagName = {
    unConfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <tr className="border-b border-grey-100 text-base px-3">
      <td className="p-4 font-semibold text-grey-600">
        {activity?.cabin?.name}
      </td>

      <td className="p-4">
        <span className="font-medium">{activity?.user?.fullName}</span>
      </td>

      <td className="p-4">
      <span className="font-medium">{convertStringToTime( activity?.checkIn)}</span>
      </td>

      <td className="p-4">
        <Tag type={statusToTagName[activity.status]}>{activity.status}</Tag>
      </td>
    </tr>
  );
}

export default ActivitiesRow;
