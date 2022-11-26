import { getFieldDisplayValues, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import React, {useEffect, useState} from 'react';
import { useTheme2 as useTheme } from '@grafana/ui';
import ProgressBar from "@ramonak/react-progress-bar";
import "./index.css"

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, width, height, replaceVariables, fieldConfig, data }) => {
  const {seconds, text} = options
  const [progress, setProgress] = useState<number>(0)
  const [numeric, setNumeric] = useState<number>(0)
  const theme = useTheme();
  console.log("rerender")
  useEffect(() => {
    try {
      const meta = getFieldDisplayValues({
        reduceOptions: { calcs: ['lastNotNull'] },
          data: data.series,
          replaceVariables,
          fieldConfig,
          theme
      })
      console.log(meta)
      if (meta && meta.length) {
        const {display} = meta[0]
        setNumeric(display.numeric)
      }
    } catch (e) {
      console.log("error", e) 
    }
  }, [])
  useEffect(() => {
    if (numeric) {
      const timer = setInterval(() => {
        setProgress((p: number) => p + 1)
      }, 1000)
      setTimeout(() => clearInterval(timer), seconds * 1000)
      return () => clearInterval(timer)
    } else {
      console.log(numeric)
      return () => {}
    }
  }, [seconds, numeric])
  return (
   <div 
    style={{
    backgroundColor: theme.colors.background.canvas,
    width: width,
    height: height
   }} className={`flex flex-col justify-evenly items-center p-4 rounded-xl shadow-lg`}>
   <div className='flex justify-between w-full'>
    <p className={`text-4xl text-[${theme.colors.text.primary}]`}> {numeric ? text : "Casting in progress"} </p>
    { numeric ? <p className={`text-[${theme.colors.text.secondary}]`}> {seconds - progress} sec remaining </p> : <p> </p> } 
   </div>
    <ProgressBar height="12px" customLabel=" " baseBgColor={theme.colors.background.primary} bgColor={theme.colors.info.shade} maxCompleted={seconds} completed={numeric ? progress : seconds} className="w-full" />
   </div> 
  );
};


