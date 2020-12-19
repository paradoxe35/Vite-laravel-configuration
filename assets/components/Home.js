import GiaComponent from '../utils/GiaComponent'

export default class HomeComponent extends GiaComponent {

    async require() {
        this.main = (await import('./Home/Main')).default
    }

    mount() {
        this.main(this.element)
    }
}