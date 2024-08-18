import * as React from "react";

export default function useAutoFocus<RefType extends HTMLElement>() {
    const inputRef = React.useRef<RefType>(null);

    React.useEffect(() => {
        const node = inputRef.current;
        if (node) {
            node.focus();
        }
    }, []);

    return inputRef;
}

// マウント時に自動でfocusあてるhooks
