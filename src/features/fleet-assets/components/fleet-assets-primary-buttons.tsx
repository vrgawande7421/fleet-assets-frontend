import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFleetAssets } from './fleet-assets-provider'

export function FleetAssetsPrimaryButtons() {
  const { setOpen } = useFleetAssets()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Asset</span> <Plus size={18} />
      </Button>
    </div>
  )
}
