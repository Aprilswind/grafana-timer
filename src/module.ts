import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Panel Heading',
      defaultValue: 'Panel Default Value',
    })
    .addNumberInput({
      path: 'seconds',
      name: 'Number of seconds for the timer',
      defaultValue: 5,
    }); 
});
