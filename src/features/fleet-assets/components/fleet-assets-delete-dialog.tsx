'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type FleetAsset } from '../data/schema'
import api from '../../../services/api'
import { toast } from 'sonner'

type FleetAssetDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: FleetAsset
}

export function FleetAssetsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: FleetAssetDeleteDialogProps) {
  const [value, setValue] = useState('')

  const handleDelete = async () => {
    if (value.trim() !== currentRow.assetCode) return

    try {
      await api.delete(`/fleet-assets/${currentRow._id}`)
      toast.success('Asset deactivated successfully')
      onOpenChange(false)
      window.dispatchEvent(new Event('refresh-assets'))
    } catch (_error) {
      toast.error('Failed to deactivate asset')
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      form='fleet-assets-delete-form'
      disabled={value.trim() !== currentRow.assetCode}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Deactivate Asset
        </span>
      }
      desc={
        <form
          id='fleet-assets-delete-form'
          onSubmit={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className='space-y-4'
        >
          <p className='mb-2'>
            Are you sure you want to deactivate{' '}
            <span className='font-bold'>{currentRow.assetCode}</span>?
            <br />
            This action will mark the asset as{' '}
            <span className='font-bold'>Inactive</span> in the system.
          </p>

          <Label className='my-2'>
            Asset Code:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter asset code to confirm.'
              autoFocus
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              This will deactivate the asset and update its status.
            </AlertDescription>
          </Alert>
        </form>
      }
      confirmText='Deactivate'
      destructive
    />
  )
}
