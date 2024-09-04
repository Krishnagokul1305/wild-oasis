import Table from "../../ui/Table";

function TodayActivity() {
  return (
    <div className="h-full bg-grey-100 col-span-2 rounded-md border border-grey-200 text-sm">
      <Table>
        <Table.TableHead>
          <th className="p-4 text-left">Cabin</th>
          <th className="p-4 text-left">Guest</th>
          <th className="p-4 text-left">Stay Duration</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left"></th>
        </Table.TableHead>
        {/* <Table.TableBody/> */}
      </Table>
    </div>
  );
}

export default TodayActivity;
