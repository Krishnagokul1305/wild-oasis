function Table({ children }) {
  return <table className="min-w-full bg-grey-0">{children}</table>;
}

function TableHead({ children }) {
  return (
    <thead>
      <tr className="bg-grey-50 border-b border-grey-100 uppercase tracking-wider font-semibold text-grey-600">
        {children}
      </tr>
    </thead>
  );
}

function TableBody({ data, render }) {
  // if (data.length == 0) return;
  return (
    <tbody className="bg-grey-0 text-grey-400">
      {data?.length == 0 ? <EmptyTable /> : data?.map(render)}
    </tbody>
  );
}

function EmptyTable({ colSpan }) {
  return (
    <tr >
      <td
        className="flex items-center justify-center w-full py-5 text-lg"
        colSpan={colSpan}
      >
        No data to show
      </td>
    </tr>
  );
}

Table.TableHead = TableHead;
Table.TableBody = TableBody;

export default Table;
