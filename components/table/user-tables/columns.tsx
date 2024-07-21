import { User } from "@/constants/data";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { table } from "console";

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
      checked = {row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'company',
    header: 'COMPANY'
  },
  {
    accessorKey: 'role',
    header: 'ROlE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  }
]