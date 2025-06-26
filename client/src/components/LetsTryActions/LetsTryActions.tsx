import { actions } from "../../utils/actions";
import ActionItem from "./ActionItem";
import { Fade } from "react-awesome-reveal";

const LetsTryActions = () => {
  return (
    <Fade direction="up" fraction={0}>
      <div className="max-w-[700px] mx-auto  py-10 px-5">
        <h2 className="text-lg font-semibold">Let&apos;s try</h2>
        <div className="py-5 grid gap-3 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
          {actions.map((item) => (
            <ActionItem key={item.actionName} {...item} />
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default LetsTryActions;
