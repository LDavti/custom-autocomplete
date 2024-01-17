import { Option } from "../components/autocomplete/autocomplete.type";

export const removeSymbols = (value: string) => {
  //using regex matching for highlighting tne matching part of the text
  return value.replaceAll(new RegExp('\/\/', 'g'), '')
};
export const match = (value: string, compareValue: string) => {
  //here applying `gi` flag to make our search case-insensitive (this means that lowercase letters will be matched with uppercase and vice versa)
  return removeSymbols(value).match(new RegExp(`${removeSymbols(compareValue)}`, 'gi'))
}
export const matchSearch = (value: string, receiver: Option[]) => {
  return receiver.filter(item => {
    return match(item.label, removeSymbols(value))
  });
}
