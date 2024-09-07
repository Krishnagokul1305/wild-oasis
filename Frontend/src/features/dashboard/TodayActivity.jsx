import Table from "../../ui/Table";
import ActivitiesRow from "./ActivitiesRow";

function TodayActivity({ activities }) {
  return (
    <div className="h-full bg-grey-100 col-span-2 rounded-md border border-grey-200 text-xs">
      <Table>
        <Table.TableHead>
          <th className="p-4 text-left">Cabin</th>
          <th className="p-4 text-left">Guest</th>
          <th className="p-4 text-left">EntryTime</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left"></th>
        </Table.TableHead>
        <Table.TableBody
          data={activities}
          render={(activity) => <ActivitiesRow activity={activity} />}
        />
      </Table>
    </div>
  );
}

export default TodayActivity;
