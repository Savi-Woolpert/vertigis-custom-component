import {
    ComponentModelBase,
    ComponentModelProperties,
    serializable,
    PropertyDefs,
    importModel,
} from "@vertigis/web/models";
import type { MapModel } from "@vertigis/web/mapping";

interface ExampleComponentModelProperties
    extends ComponentModelProperties {
    exampleValue?: string;
}

// The serializable decorator marks this class as being serializable
// so it can be serialized to/from the app.json configuration of
// your app.
@serializable
export default class ExampleComponentModel extends ComponentModelBase<ExampleComponentModelProperties> {
    exampleValue: string;
    // Declare a dependency on the map component so the framework injects it.
    @importModel("map-extension")
    map: MapModel;

    // This method defines how the model will be serialized and deserialized into
    // an app item. We override it to include our new property `exampleValue`.
    protected _getSerializableProperties(): PropertyDefs<ExampleComponentModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            exampleValue: {
                serializeModes: ["initial"],
                default: "Add layer to map",
            },
        };
    }
}