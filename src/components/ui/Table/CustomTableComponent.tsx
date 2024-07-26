import { ColumnDef, flexRender, RowData } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { Transaction } from "./MainTable";
import SpinnerLoader from "../loader";
export type Renderable<TProps> = React.ReactNode | React.ComponentType<TProps>;

interface TableComponentProps {
  table: any;
  isPending: boolean;
  columns: ColumnDef<Transaction>[];
}
type tableHeaderGroupType = {
  id: string;
  headers: [
    {
      id: string;
      isPlaceholder: boolean;
      column: any;
      getContext: () => any;
      getRowModel: () => {
        rows: {
          id: string;
          getIsSelected: () => boolean;
        };
      };
    }
  ];
};

const TableComponent = ({ table, columns, isPending }: TableComponentProps) => {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup: tableHeaderGroupType) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isPending ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-14 text-center">
              <SpinnerLoader color="border-mainColor" size="small" />
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows?.length ? (
          table
            .getRowModel()
            .rows.map(
              (row: {
                id: string;
                getIsSelected: () => boolean;
                getVisibleCells: () => any;
              }) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row
                    .getVisibleCells()
                    .map(
                      (cell: {
                        id: string;
                        column: any;
                        getContext: () => any;
                      }) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    )}
                </TableRow>
              )
            )
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
