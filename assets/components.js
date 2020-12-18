import { AboutComponent } from "./components/About";
import { HomeComponent } from "./components/Home";

export default {
    HomeComponent,
    AboutComponent
}

if (import.meta.hot) {
    import.meta.hot.accept()
}