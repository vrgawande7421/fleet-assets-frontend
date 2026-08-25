import { FleetAssetsActionDialog } from './fleet-assets-action-dialog'
import { FleetAssetsDeleteDialog } from './fleet-assets-delete-dialog'
import { useFleetAssets } from './fleet-assets-provider'
import { FleetAssetsViewDialog } from './fleet-assets-view-dialog'

export function FleetAssetsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFleetAssets()
  return (
    <>
      <FleetAssetsActionDialog
        key='fleet-asset-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <FleetAssetsActionDialog
            key={`fleet-asset-edit-${currentRow._id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <FleetAssetsViewDialog
            key={`fleet-asset-view-${currentRow._id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <FleetAssetsDeleteDialog
            key={`fleet-asset-delete-${currentRow._id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
