import { motion } from "framer-motion";
import { useState } from "react";
import ArrowDown from "../assets/arrow-down.svg";
import { createTexts, useTranslation } from "~/utils/i18n";
import PortableTextComponent, {
  PortableTextProps,
} from "./PortableTextComponent";

type Props = {
  title: string;
  content: PortableTextProps;
  textStyle?: string;
};

export const ExpandableBlockComponent = ({
  title,
  content,
  textStyle,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const buttonVariants = { clicked: { rotate: 180 } };

  return (
    <div className="border self-start w-full my-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-controls="expanded-content"
        aria-expanded={isExpanded}
        className="flex w-full items-center h-12 justify-between px-5"
      >
        <span className="text-xl">{title}</span>
        <motion.div
          animate={isExpanded ? "clicked" : "notClicked"}
          transition={{ duration: 0.7 }}
          variants={buttonVariants}
        >
          <img className="m-0" src={ArrowDown} alt={t(texts.buttonAltText)} />
        </motion.div>
      </button>
      <motion.div
        id="expanded-content"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
        style={{ overflow: "hidden" }}
      >
        <div className="mx-4 mb-4">
          <div className="flex flex-row mt-4 gap-6">
            <PortableTextComponent
              textData={content}
              textStyle={textStyle}
            ></PortableTextComponent>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const texts = createTexts({
  buttonAltText: {
    nb: "Pil",
    en: "Arrow",
  },
});
