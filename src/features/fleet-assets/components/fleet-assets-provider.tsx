import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type FleetAsset } from '../data/schema'

type FleetAssetsDialogType = 'add' | 'edit' | 'view' | 'delete'

type FleetAssetsContextType = {
  open: FleetAssetsDialogType | null
  setOpen: (str: FleetAssetsDialogType | null) => void
  currentRow: FleetAsset | null
  setCurrentRow: React.Dispatch<React.SetStateAction<FleetAsset | null>>
}

const FleetAssetsContext = React.createContext<FleetAssetsContextType | null>(null)

export function FleetAssetsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<FleetAssetsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<FleetAsset | null>(null)

  return (
    <FleetAssetsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </FleetAssetsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFleetAssets = () => {
  const fleetAssetsContext = React.useContext(FleetAssetsContext)

  if (!fleetAssetsContext) {
    throw new Error('useFleetAssets has to be used within <FleetAssetsContext>')
  }

  return fleetAssetsContext
}
