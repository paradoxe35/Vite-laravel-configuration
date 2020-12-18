import "./styles/main.scss"
import Turbolinks from 'turbolinks'
import loadComponents from 'gia/loadComponents';
import components from './components';

Turbolinks.start()
loadComponents(components);