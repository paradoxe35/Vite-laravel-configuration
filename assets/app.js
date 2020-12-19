import "preact/debug";
import "./styles/main.scss"
import Turbolinks from 'turbolinks'
import loadComponents from 'gia/loadComponents';
import config from 'gia/config';
import components from './components';


Turbolinks.start()
// @ts-ignore
config.set('log', process.env.NODE_ENV === 'development');
loadComponents(components);
