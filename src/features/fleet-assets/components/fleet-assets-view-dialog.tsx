import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { type FleetAsset } from '../data/schema'
import { Separator } from '@/components/ui/separator'

type FleetAssetViewDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: FleetAsset
}

export function FleetAssetsViewDialog({
  open,
  onOpenChange,
  currentRow,
}: FleetAssetViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>Fleet Asset</DialogTitle>
          <div className='text-sm text-muted-foreground'>
            <span className='font-bold'>{currentRow.assetCode}</span>
            {currentRow.tyreSpecifications?.tyreSize && (
              <span className='ml-2'>{currentRow.tyreSpecifications.tyreSize}</span>
            )}
          </div>
        </DialogHeader>
        
        <Separator className='my-2' />

        <div className='space-y-6'>
          <div>
            <h4 className='mb-3 text-sm font-semibold text-muted-foreground uppercase'>
              Basic Information
            </h4>
            <div className='grid grid-cols-3 gap-2 text-sm'>
              <div className='text-muted-foreground'>Asset Code</div>
              <div className='col-span-2 font-medium'>{currentRow.assetCode}</div>
              
              <div className='text-muted-foreground'>Asset Type</div>
              <div className='col-span-2 font-medium'>{currentRow.assetType}</div>
              
              <div className='text-muted-foreground'>Brand</div>
              <div className='col-span-2 font-medium'>{currentRow.brand}</div>
              
              <div className='text-muted-foreground'>Model</div>
              <div className='col-span-2 font-medium'>{currentRow.model}</div>
              
              <div className='text-muted-foreground'>Status</div>
              <div className='col-span-2 font-medium'>{currentRow.status}</div>
            </div>
          </div>

          {currentRow.assetType === 'Tyre' && currentRow.tyreSpecifications && (
            <div>
              <h4 className='mb-3 text-sm font-semibold text-muted-foreground uppercase'>
                Specifications
              </h4>
              <div className='grid grid-cols-3 gap-2 text-sm'>
                <div className='text-muted-foreground'>Tyre Size</div>
                <div className='col-span-2 font-medium'>{currentRow.tyreSpecifications.tyreSize}</div>
                
                <div className='text-muted-foreground'>Construction</div>
                <div className='col-span-2 font-medium'>{currentRow.tyreSpecifications.construction}</div>
                
                <div className='text-muted-foreground'>Pattern</div>
                <div className='col-span-2 font-medium'>{currentRow.tyreSpecifications.pattern || '-'}</div>
                
                <div className='text-muted-foreground'>Load Index</div>
                <div className='col-span-2 font-medium'>{currentRow.tyreSpecifications.loadIndex || '-'}</div>
                
                <div className='text-muted-foreground'>Speed Rating</div>
                <div className='col-span-2 font-medium'>{currentRow.tyreSpecifications.speedRating || '-'}</div>
                
                <div className='text-muted-foreground'>Ply Rating</div>
                <div className='col-span-2 font-medium'>{currentRow.tyreSpecifications.plyRating || '-'}</div>
                
                <div className='text-muted-foreground'>Tube Type</div>
                <div className='col-span-2 font-medium'>{currentRow.tyreSpecifications.tubeType}</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
