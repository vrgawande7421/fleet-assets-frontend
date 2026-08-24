import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type FleetAsset } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const fleetAssetsColumns: ColumnDef<FleetAsset>[] = [
  {
    accessorKey: 'assetCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Asset Code' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap font-medium'>{row.getValue('assetCode')}</div>
    ),
  },
  {
    accessorKey: 'assetName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Asset Name' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('assetName')}</div>
    ),
  },
  {
    accessorKey: 'assetType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('assetType')}</div>
    ),
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('brand')}</div>
    ),
  },
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Model' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('model')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const badgeColor = status === 'Active' 
        ? 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'
        : 'bg-neutral-300/40 border-neutral-300 text-neutral-900 dark:text-neutral-200'

      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {status}
          </Badge>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created Date' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return <div className='w-fit text-nowrap'>{date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}</div>
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
