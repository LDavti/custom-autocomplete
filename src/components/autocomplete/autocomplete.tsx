import * as React                               from "react";
import { AutocompleteProps, Option }            from "./autocomplete.type";
import { useEffect, useState }                  from "react";
import { debounce, matchSearch, removeSymbols } from "../../util";

import styles                                   from "./autocomplete.module.css";

export const Autocomplete = ({options, onChange, onClick, placeholder, label, isLoading}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Option>({label: ''});
  const [values, setValues] = useState<Option[]>([]);

  useEffect(() => {
    setValues(options);
  }, [options])

  return (
    <div className={styles.autocompleteWrapper}>
      <div className={styles.label}>{label}</div>
      <input
        aria-label={label}
        placeholder={placeholder}
        type="text"
        value={value.label}
        onChange={(event) => {
          setValue({label: event.target.value});
          debounce(() => {
            onChange({label: event.target.value}, event);
            setValues(matchSearch(event.target.value, options));
          }, 1000);
        }}
        onClick={() => {
          setOpen(!open);
        }}
        className={`${styles.autocompleteInput} ${styles.icon} ${open ? styles.iconOpen : styles.iconClose}`}
      />
      {open && <ul className={styles.options}>
        {values.length ? values.map((val) => {
          let matchesLabel;
          if (value.label) {
            const regex = new RegExp(`${removeSymbols(value.label)}`, 'gi');
            const matches = val?.label?.match(regex);
            const unMatches = val?.label?.split(regex);
            if (matches && unMatches) {
              matchesLabel = unMatches.map((v1, ind) => {
                return <><span>{v1}</span>{matches && matches[ind] && (<b>{matches[ind]}</b>)}</>;
              });
            }
          }
          return (<li
            role="button"
            key={val.key}
            onClick={() => {
              onClick(val, null);
              setValue(val);
              setOpen(!open);
            }}
          >
            {matchesLabel || val.label}
          </li>)
        }) : <div>{isLoading ? "Loading..." : "No options"}</div>}
      </ul>}
    </div>
  )
}
