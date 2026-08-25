import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { FleetAssets } from '@/features/fleet-assets'

const fleetAssetsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  status: z
    .array(z.union([z.literal('Active'), z.literal('Inactive')]))
    .optional()
    .catch([]),
  brand: z
    .array(
      z.union([
        z.literal('MRF'),
        z.literal('Apollo'),
        z.literal('CEAT'),
        z.literal('Bridgestone'),
        z.literal('Other'),
      ])
    )
    .optional()
    .catch([]),
  search: z.string().optional().catch(''),
  sort: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/fleet-assets/')({
  validateSearch: fleetAssetsSearchSchema,
  component: FleetAssets,
})
