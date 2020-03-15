import { UIManagerStatic, UIManager } from "react-native";
declare module "react-native" {
  interface UIManagerStatic {
    dispatchViewManagerCommand: (
      reactTag: number,
      commandId: number,
      data: any
    ) => void;
  }
}
