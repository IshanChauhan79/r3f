import { forwardRef } from "react";
import DrunkEffect from "./DrunkEffect";

const Drunk = (props, ref) => {
  const effect = new DrunkEffect(props);

  return <primitive object={effect} ref={ref} />;
};
const DrunkRef = forwardRef(Drunk);
export default DrunkRef;
