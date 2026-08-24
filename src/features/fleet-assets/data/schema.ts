import { z } from 'zod'

export const tyreSpecificationsSchema = z.object({
  tyreSize: z.string().min(1, 'Tyre Size is required'),
  construction: z.enum(['Radial', 'Bias'], {
    message: 'Construction is required',
  }),
  pattern: z.string().optional(),
  loadIndex: z.string().optional(),
  speedRating: z.string().optional(),
  plyRating: z.string().optional(),
  tubeType: z.enum(['Tubeless', 'Tube'], {
    message: 'Tube Type is required',
  }),
})

export const fleetAssetSchema = z.object({
  assetCode: z.string().min(1, 'Asset Code is required'),
  assetName: z.string().min(1, 'Asset Name is required'),
  assetType: z.enum(['Tyre', 'Other'], {
    message: 'Asset Type is required',
  }),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  status: z.enum(['Active', 'Inactive']).default('Active'),
  description: z.string().optional(),
  tyreSpecifications: tyreSpecificationsSchema.optional(),
})

export type FleetAsset = z.infer<typeof fleetAssetSchema> & {
  _id: string
  createdAt: string
  updatedAt: string
}
