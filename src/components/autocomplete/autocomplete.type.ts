export type Option = Readonly<{ label: string; key?: string; }>
export type AutocompleteProps = Readonly<
  {
    options: Option[];
    onChange: (value: Option, event: React.SyntheticEvent | null) => void
    onClick: (value: Option, event: React.SyntheticEvent | null) => void
    placeholder: string
    label: string;
    isLoading: boolean
    defaultValue?: Option;
  }>

