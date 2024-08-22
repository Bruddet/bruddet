import { VisualEditing } from "@sanity/visual-editing/remix";

import { client } from "../../cms/clientConfig";
import { useLiveMode } from "../../cms/loader";

export default function LiveVisualEditing() {
  useLiveMode({ client });

  return <VisualEditing />;
}
