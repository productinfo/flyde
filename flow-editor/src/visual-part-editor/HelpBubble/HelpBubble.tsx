import {
  Classes,
  Dialog,
  H4,
  HotkeysDialog2,
  IHotkeysDialogProps,
  Menu,
  MenuDivider,
  MenuItem,
  setHotkeysDialogProps,
} from "@blueprintjs/core";
import { HotkeysDialog2Props } from "@blueprintjs/core/lib/esm/components/hotkeys/hotkeysDialog2";
import { Hotkey } from "@blueprintjs/core/lib/esm/components/hotkeys/hotkey";

import { IPopover2Props, Popover2 } from "@blueprintjs/popover2";
import classNames from "classnames";

import React from "react";
import {
  currentHotkeys,
  HotkeysMenuData,
} from "../../lib/react-utils/use-hotkeys";

import CustomReactTooltip from "../../lib/tooltip";
import { helpIcon } from "./icon";

export interface HelpBubbleProps {}

const popperModifiers: IPopover2Props["modifiers"] = {
  offset: { enabled: true, options: { offset: [0, 20] } },
  preventOverflow: { enabled: true, options: { padding: 10 } },
};

function hotkeyToBpHotkey(hotkey: {
  key: string;
  menuData: HotkeysMenuData;
}): HotkeysDialog2Props["hotkeys"][0] {
  return {
    combo: hotkey.key,
    label: hotkey.menuData.text,
    group: hotkey.menuData.group,
  };
}

const groupsOrder = ["Viewport Controls", "Editing", "Selection"];

export const HelpBubble: React.FC<HelpBubbleProps> = () => {
  const [hotkeysModalOpen, setHotkeysModalOpen] = React.useState(false);

  const bpHotkeys = Array.from(currentHotkeys.entries()).map(
    ([keys, menuData]) => hotkeyToBpHotkey({ key: keys, menuData })
  );

  const groupedHotkeys = bpHotkeys.reduce((acc, hotkey) => {
    if (!acc[hotkey.group]) {
      acc[hotkey.group] = [];
    }
    acc[hotkey.group].push(hotkey);
    return acc;
  }, {} as { [key: string]: HotkeysDialog2Props["hotkeys"] });

  const groupsArray = Object.entries(groupedHotkeys).sort((a, b) => {
    return groupsOrder.indexOf(b[0]) - groupsOrder.indexOf(a[0]);
  });

  const hotkeysModal = (
    <Dialog
      isOpen={hotkeysModalOpen}
      onClose={() => setHotkeysModalOpen(false)}
    >
      <div className={Classes.DIALOG_BODY}>
        {groupsArray.map(([group, hotkeys]) => (
          <React.Fragment>
            <H4>{group}</H4>
            {hotkeys.map((hotkey) => {
              return <Hotkey {...hotkey} key={hotkey.combo} />;
            })}
          </React.Fragment>
        ))}
      </div>
    </Dialog>
  );

  const menu = (
    <Menu>
      <MenuItem text="Hotkeys" onClick={() => setHotkeysModalOpen(true)} />
      <MenuItem
        text="Documentation"
        href="https://www.flyde.dev/docs"
        target="_blank"
      />
      <MenuDivider />
      <MenuItem
        text="Discord"
        href="https://discord.gg/x7t4tjZQP8"
        target="_blank"
      />
    </Menu>
  );
  return (
    <div className="help-bubble" data-tip="Help">
      <CustomReactTooltip />
      <Popover2 content={menu} modifiers={popperModifiers}>
        <div dangerouslySetInnerHTML={{ __html: helpIcon }} />
      </Popover2>
      {hotkeysModal}
    </div>
  );
};
