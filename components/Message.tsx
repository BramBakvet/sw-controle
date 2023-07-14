import { RxCrossCircled } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

type Props = {
    title: string;
    className?: string;
}

function Message({title, className}: Props) {
  return (
    <div className={twMerge(`flex flex-row justify-between bg-red-300 p-5 mx-10 rounded-lg border-2 border-black`, className)}>
        {/* TITLE AND TEXT */}
        <div className="flex flex-col">
            {/* TITLE */}
            <div className="font-bold text-white">
                {title}
            </div>
            {/* TEXT */}
            <div>
                <p className="text-white">
                    This is website is not approved by the staff of habbo MinDef.
                </p>
            </div>
        </div>
        {/* SYMBOL */}
        <div>
            <RxCrossCircled color="red" size={50} />
        </div>
    </div>
  )
}

export default Message