import type { LibraryRegistry } from "@vertigis/web/config";

import CustomComponent, {
    ExampleComponentModel,
} from "./components/CustomComponent";

const LAYOUT_NAMESPACE = "custom.67ac07ad";

export default function (registry: LibraryRegistry): void {

    // Custom button
    registry.registerComponent({
        name: "custom",
        namespace: LAYOUT_NAMESPACE,
        getComponentType: () => CustomComponent,
        itemType: "custom-model",
        title: "Custom Componenty"
    });
    registry.registerModel({
        getModel: (config) => new ExampleComponentModel(config),
        itemType: "custom-model",
    });
}
