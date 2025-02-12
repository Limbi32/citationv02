import Tooltip from "./Tooltips/Tooltips";
import { FaEdit } from "react-icons/fa";

export function Update({ onUpdate }: { onUpdate: () => void }) {
  return (
    <Tooltip text="Modifier">
      <button
        className=" rounded-lg p-2 focus:ring-2"
        disabled={false}
        onClick={onUpdate}
      >
        <FaEdit style={{ fontSize: "15px" }} />
      </button>
    </Tooltip>
  );
}
