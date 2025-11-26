This project was bootstrapped with the [VertiGIS Studio Web SDK](https://github.com/vertigis/vertigis-web-sdk).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the project in development mode. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will automatically reload if you make changes to the code. You will see build errors and warnings in the console.

### `npm run build`

Builds the library for production to the `build` folder. It optimizes the build for the best performance.

Your custom library is now ready to be deployed!

See the [section about deployment](https://developers.vertigis.com/docs/web/sdk-deployment/) in the [Developer Center](https://developers.vertigis.com/docs/web/overview/) for more information.

## Learn More

Find [further documentation on the SDK](https://developers.vertigis.com/docs/web/sdk-overview/) on the [VertiGIS Studio Developer Center](https://developers.vertigis.com/docs/web/overview/)



## **VertiGIS Custom Component Development Guide**

This document is designed to help developers quickly get up to speed by providing a concise overview, rather than navigating through tutorials or the full official documentation. While reviewing the official documentation is strongly recommended, it can be overwhelming and time-consuming.

***

### **Overview**

The layout of a VertiGIS custom component is very similar to that of a React application. However, there are a few additional steps:

*   In React, components are automatically registered when created.
*   In VertiGIS, components **must be manually registered** with the SDK using the `registry.registerComponent` and `registry.registerModel` methods.

***

### **Folder Structure**

You can have multiple components under the `src/components` folder. For maintainability, each component should reside in its own folder.

A typical component folder contains:

*   **Component.tsx** – The React component.
*   **ComponentModel.tsx** – The model class extending `ComponentModelBase`.
*   **index.ts** – (Optional) For convenience, exports the component and model.
*   **Component.css / Component.scss** – (Optional) For styling.

**Root folder:**

*   **index.ts** – This is where you register components and models with the SDK. For convenience, we’ll refer to this file as **root.ts** in this document.

**App folder:**

*   **app.json** – Defines configuration and custom props for components.
*   layout.xml – Blueprint for the application’s visual structure.

This file determines how components are arranged in the UI. It uses XML tags to define panels, regions, and custom components.

Example:
```xml
<layout xmlns:custom="your.custom.namespace">
    <custom:example id="custom-1"/>
</layout>
```
Here, the xmlns:custom namespace maps to your custom component registration, and <custom:example> places your component in the layout.



***

### **Component Registration**

Once you create a component, you need to register it with the application and define any custom props. These props can be manipulated later and provide a way to configure the component for future use.

#### **Example app.json snippet**

```json
{
    "$type": "custom-model", // Used in root.ts when registering the component. Must be unique.
    "id": "custom-1",
    "title": "Custom Instance",
    "exampleValue": "Hello from app.json" // Custom prop passed via app.json.
}
```

#### **Registration in root.ts**

```typescript
// Custom button registration
registry.registerComponent({
    name: "custom",
    namespace: LAYOUT_NAMESPACE,
    getComponentType: () => CustomComponent,
    itemType: "custom-model",
    title: "Custom Component"
});

registry.registerModel({
    getModel: (config) => new ExampleComponentModel(config),
    itemType: "custom-model",
});
```

***

### **Important Notes**

*   The `itemType` in `registry.registerComponent` and `registry.registerModel` must match the `$type` in `app.json`.
*   Custom props like `exampleValue` should be defined in the model using `serializable` decorators and `_getSerializableProperties()`.
*   When using custom components in `layout.xml`, declare the namespace (e.g., `xmlns:custom="your.custom.namespace"`) and reference the component like `<custom:example/>`.

***
