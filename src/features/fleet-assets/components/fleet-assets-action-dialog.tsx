/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { fleetAssetSchema, type FleetAsset } from '../data/schema'
import type { z } from 'zod'
import api from '../../../services/api'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

type FleetAssetForm = z.infer<typeof fleetAssetSchema>

type FleetAssetActionDialogProps = {
  currentRow?: FleetAsset
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FleetAssetsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: FleetAssetActionDialogProps) {
  const isEdit = !!currentRow
  const form = useForm<FleetAssetForm>({
    resolver: zodResolver(fleetAssetSchema as any),
    defaultValues: isEdit
      ? {
        assetCode: currentRow.assetCode,
        assetName: currentRow.assetName,
        assetType: currentRow.assetType,
        brand: currentRow.brand,
        model: currentRow.model,
        status: currentRow.status,
        description: currentRow.description || '',
        tyreSpecifications: currentRow.tyreSpecifications,
      }
      : {
        assetCode: '',
        assetName: '',
        assetType: 'Tyre',
        brand: '',
        model: '',
        status: 'Active',
        description: '',
        tyreSpecifications: {
          tyreSize: '',
          construction: 'Radial',
          pattern: '',
          loadIndex: '',
          speedRating: '',
          plyRating: '',
          tubeType: 'Tubeless',
        },
      },
  })

  const assetType = form.watch('assetType')

  const onSubmit = async (values: FleetAssetForm) => {
    try {
      if (values.assetType !== 'Tyre') {
        values.tyreSpecifications = undefined
      }

      if (isEdit) {
        await api.put(`/fleet-assets/${currentRow._id}`, values)
        toast.success('Asset updated successfully')
      } else {
        await api.post('/fleet-assets', values)
        toast.success('Asset created successfully')
      }
      form.reset()
      onOpenChange(false)
      window.dispatchEvent(new Event('refresh-assets'))
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader className='text-start'>
          <DialogTitle>{isEdit ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the asset here. ' : 'Create new asset here. '}
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[60vh] w-full pr-4'>
          <Form {...form}>
            <form
              id='fleet-asset-form'
              onSubmit={form.handleSubmit(onSubmit as any)}
              className='space-y-4 p-1'
            >
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control as any}
                  name='assetCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Code <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., TYR-001' {...field} disabled={isEdit} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name='assetName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Name <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., 295/80 R22.5' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name='assetType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Type <span className="text-destructive">*</span></FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select type'
                        items={[
                          { label: 'Tyre', value: 'Tyre' },
                          { label: 'Other', value: 'Other' },
                        ]}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., MRF' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name='model'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., Steel Muscle' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status <span className="text-destructive">*</span></FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select status'
                        items={[
                          { label: 'Active', value: 'Active' },
                          { label: 'Inactive', value: 'Inactive' },
                        ]}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control as any}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Optional description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {assetType === 'Tyre' && (
                <div className='mt-6 space-y-4 rounded-md border p-4'>
                  <h4 className='font-medium text-sm text-muted-foreground uppercase'>Tyre Specifications</h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control as any}
                      name='tyreSpecifications.tyreSize'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tyre Size <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., 295/80 R22.5' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name='tyreSpecifications.construction'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Construction <span className="text-destructive">*</span></FormLabel>
                          <SelectDropdown
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder='Select construction'
                            items={[
                              { label: 'Radial', value: 'Radial' },
                              { label: 'Bias', value: 'Bias' },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name='tyreSpecifications.pattern'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pattern</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., Steel Muscle' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name='tyreSpecifications.loadIndex'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Load Index</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., 152' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name='tyreSpecifications.speedRating'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Speed Rating</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., M' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name='tyreSpecifications.plyRating'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ply Rating</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., 18 PR' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control as any}
                      name='tyreSpecifications.tubeType'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tube Type <span className="text-destructive">*</span></FormLabel>
                          <SelectDropdown
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder='Select tube type'
                            items={[
                              { label: 'Tubeless', value: 'Tubeless' },
                              { label: 'Tube', value: 'Tube' },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='fleet-asset-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
