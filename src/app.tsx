import { PropsWithChildren } from 'react';
import './promise.prototype.finally.js';
import { debug, Sentry } from '@kqinfo/ui';
import './app.less';

Sentry.init();

debug();

const App = (props: PropsWithChildren<{}>) => props.children;

export default App;
