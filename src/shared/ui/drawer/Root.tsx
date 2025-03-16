import Drawer, { RootProps } from "@corvu/drawer";

const DrawerRoot = (props: RootProps) => {
  return <Drawer side="left" breakPoints={[0.75]} {...props} />;
};

export default DrawerRoot;
