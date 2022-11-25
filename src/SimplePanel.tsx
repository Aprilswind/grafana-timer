import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import React, {useEffect, useState} from 'react';
import { useTheme } from '@grafana/ui';
import ProgressBar from "@ramonak/react-progress-bar";
import "./index.css"

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options }) => {
  const {seconds} = options
  const [progress, setProgress] = useState<number>(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p: number) => p + 1)
    }, 1000)
    setTimeout(() => clearInterval(timer), seconds * 1000)
    return () => clearInterval(timer)
  }, [seconds])
  const theme = useTheme();
  console.log(theme)
  return (
   <div className={`bg-[${theme.colors.bg2}] w-full h-full flex flex-col justify-evenly items-center p-4 rounded`}>
   <div className='flex justify-between w-full'>
    <p className={`text-4xl text-[${theme.colors.textStrong}]`}> Time to load the next shot </p>
    <p className={`text-[${theme.colors.textWeak}]`}> {seconds - progress} sec remaining </p>  
   </div>
    <ProgressBar height="12px" customLabel=" " baseBgColor={theme.colors.bg2} bgColor={theme.colors.bgBlue1} maxCompleted={seconds} completed={progress} className="w-full" />
   </div> 
  );
};


