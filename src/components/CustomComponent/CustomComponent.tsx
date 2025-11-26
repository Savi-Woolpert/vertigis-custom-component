import {
    LayoutElement,
    LayoutElementProperties,
} from "@vertigis/web/components";
import React, { useState } from "react";

// We will create this model in the next step.
import ExampleComponentModel from "./CustomComponentModel";
import { useWatchAndRerender } from "@vertigis/web/ui";
import FeatureLayer from "esri/layers/FeatureLayer";

const CustomComponent = (
    props: LayoutElementProperties<ExampleComponentModel>
) => {

    const { model, id, width, height, slot, stretch } = props;
    const [hidden, setHidden] = useState(false);

    useWatchAndRerender(model, "exampleValue"); // Re-render when exampleValue changes

    const addLayerToMap = async (): Promise<void> => {
        try {
            const layer = new FeatureLayer({
                url: "https://services-ap1.arcgis.com/P744lA0wf4LlBZ84/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/2",
                title: "Dynamic Feature Layer",
            });

            // Try common locations for the Esri Map instance exposed by the model:
            const esriMap = (model as any)?.map?.map || (model as any)?.map?.view?.map || (props as any)?.map?.map;

            if (esriMap && typeof esriMap.add === "function") {
                esriMap.add(layer);
                try {
                    await (layer as any).load?.();
                    const view = (model as any)?.map?.view || (props as any)?.view;
                    if (view && (layer as any).fullExtent) {
                        view.goTo((layer as any).fullExtent);
                    }
                } catch (e) {
                    console.warn("Layer added but failed to load or zoom:", e);
                }
                return;
            }

            // Fallback: try using the framework messaging command if available.
            if ((model as any)?.messages?.commands?.map?.addLayer) {
                await (model as any).messages.commands.map.addLayer.execute({ layer });
                return;
            }

            console.warn("Map instance not found on model or props. Inspect `model` and `props` to locate the view/map.");
        } catch (err) {
            console.error("Failed to add layer:", err);
        }
    };

    return (
        <LayoutElement {...props}>
            <button
                onClick={addLayerToMap}
            >
                {model.exampleValue || "Click me"}
            </button>
        </LayoutElement>
    );
};

export default CustomComponent;