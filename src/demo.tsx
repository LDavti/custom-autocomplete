import { Autocomplete } from "./components";
import { useEffect, useState } from "react";
import { Option } from "./components/autocomplete/autocomplete.type";

const publicAPIurl = 'https://www.amiiboapi.com/api/amiibo'

export const Demo = () => {
  const [val, setVal] = useState<string>();
  const [data, setData] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const resp = await fetch(`${publicAPIurl}${val ? `?name=${encodeURIComponent(val)}` : ''}`, {
        method  : 'GET',
        redirect: 'follow'
      });
      if (resp.ok) {
        const res = await resp.json();
        setData(res.amiibo.map((val: { name: string; head: string; tail: string }) => ({
          label: val.name,
          key  : `${val.head}.${val.tail}`
        })))
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [val])

  return (
    <div>
      <h1>This is a demo page for the autocomplete component</h1>
      <p>Hint: Try to search for <i>Daisy</i> or <i>Mario</i></p>
      <Autocomplete
        isLoading={isLoading}
        label={'Nintendo Amiibo'}
        placeholder={'Select your Amiibo'}
        options={data}
        onChange={value => {
          setVal(value.label)
        }}
        onClick={value => {
          setVal(value.label)
        }}
      />
    </div>
  );
}
