import styles                          from "./autocomplete.module.css";
import * as React                      from "react";
import { AutocompleteProps, Option }   from "./autocomplete.type";
import { useEffect, useState } from "react";

const removeSymbols = (value: string) => {
  return value.replaceAll(new RegExp('\/\/', 'g'), '')
};
const match = (value: string, compareValue: string) => {
  return removeSymbols(value).match(new RegExp(`${removeSymbols(compareValue)}`, 'gi'))
}
const matchSearch = (value: string, receiver: Option[]) => {
  return receiver.filter(item => {
    return match(item.label, removeSymbols(value))
  });
}

const ref = {current: 0};
const debounce = (fn: TimerHandler, timeout: number) => {
  clearTimeout(ref.current);
  ref.current = setTimeout(fn, timeout);
};

export const Autocomplete = ({options, onChange, onClick, placeholder, label, isLoading}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Option>({label: ''});
  const [values, setValues] = useState<Option[]>([]);

  useEffect(() => {
    setValues(options);
  }, [options])
  console.log(values);

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
          className={`${styles.autocompleteMain} ${styles.icon} ${open ? styles.iconOpen : styles.iconClose}`}
        />
        {open && <ul className={styles.options}>
          {values.length ? values.map((val, index) => {
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
              onClick={(event) => {
                onClick(val, null);
                setValue(val);
                setOpen(!open);
              }}
            >
              {matchesLabel || val.label}
            </li>)
          }): <div>{isLoading ? "Loading..." : "No options"}</div>}
        </ul>}
    </div>
  )
}
