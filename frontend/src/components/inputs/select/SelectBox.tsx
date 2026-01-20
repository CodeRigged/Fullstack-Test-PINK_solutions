import { Autocomplete, TextField } from "@mui/material"
import { SyntheticEvent } from "react"
import { Nullable } from "~/types/utils"

export type SelectBoxOption<T> = {
  hint?: string
  label: string
  value: NonNullable<T>
}

interface SelectBoxProps {
  label?: React.ReactNode
  onChange: (event: SyntheticEvent, selectedOption: Nullable<SelectBoxOption<unknown>>) => void
  options: SelectBoxOption<unknown>[]
  selected: unknown
}

/**
 * Renders a select box component with customizable options and selected value.
 *
 * @param {string} label - The label for the select box.
 * @param {Array<SelectBoxOption<unknown>>} options - An array of options for the select box.
 * @param {unknown} selected - The currently selected value.
 * @param {(event: SyntheticEvent, selectedOption: Nullable<SelectBoxOption<unknown>>) => void} onChange - The callback function to handle value change.
 * @return {ReactElement} The rendered select box component.
 */
const SelectBox = ({ label, options, selected, onChange }: SelectBoxProps) => {
  const selectedOption = options.find(option => option.value === selected)
  const containsHints = options.some(option => option.hint)
  const hint = containsHints ? (selectedOption?.hint ?? " ") : ""

  return (
    <Autocomplete
      value={selectedOption || null}
      onChange={onChange}
      disablePortal
      options={options}
      renderInput={params => <TextField {...params} label={label} helperText={hint} />}
    />
  )
}
export default SelectBox
