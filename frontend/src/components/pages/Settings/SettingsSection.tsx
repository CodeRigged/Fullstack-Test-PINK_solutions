import { Grid2 as Grid } from "@mui/material"
import { ReactElement } from "react"

interface SettingsSectionProps {
  components: ReactElement[]
}

/**
 * Renders a section of settings with a grid layout.
 *
 * @param {SettingsSectionProps} props - The props object containing the components to render.
 * @param {ReactElement[]} props.components - The components to render in the section.
 * @return {ReactElement} The rendered section of settings.
 */
const SettingsSection = ({ components }: SettingsSectionProps) => {
  return (
    <Grid className="section" container alignItems="center" spacing={2}>
      {components.map((component, i) => (
        <Grid size={{ xs: 12, md: 6 }} key={`component-${i}`}>
          {component}
        </Grid>
      ))}
    </Grid>
  )
}
export default SettingsSection
