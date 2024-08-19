import { VisualEditing } from "@sanity/visual-editing/remix";

import { client } from "../../cms/sanity/clientConfig";
import { useLiveMode } from "../../cms/sanity/loader";

export default function LiveVisualEditing() {
  useLiveMode({ client });

  return <VisualEditing />;
}
